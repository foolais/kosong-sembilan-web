"use client";

import { useFamilies } from "@/features/family/family.hooks";
import { useFamilyStore } from "@/features/family/family.store";
import { useEffect, useRef } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./ui/accordion";
import { IFamilyData } from "@/models/Family";
import { User, Users } from "lucide-react";
import { useRouter } from "next/navigation";

const ListFamily = () => {
  const router = useRouter();
  const searchValue = useFamilyStore((state) => state.searchFamily);

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } = useFamilies({
    search: searchValue,
  });

  const loadMoreRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const families = data?.pages.flatMap((page) => page.data) ?? [];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      },
      {
        root: containerRef.current,
        threshold: 0.5,
      }
    );

    if (loadMoreRef.current) {
      observer.observe(loadMoreRef.current);
    }

    return () => observer.disconnect();
  }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

  return (
    <div
      ref={containerRef}
      className="h-[70svh] overflow-y-auto sm:w-md sm:mx-auto"
    >
      <Accordion type="multiple" className="max-w-lg space-y-4">
        {families.map((family: IFamilyData) => (
          <AccordionItem
            key={family._id.toString()}
            value={family._id.toString()}
          >
            <AccordionTrigger className="hover:bg-secondary cursor-pointer px-4 text-lg flex items-start gap-2">
              <User className="size-6 shrink-0 mt-0.5" />
              <span className="min-w-0 break-word">{family.headFamily}</span>
            </AccordionTrigger>
            <AccordionContent>
              <ul className="space-y-1 text-foreground">
                {family.members.map((member) => (
                  <li
                    key={member._id.toString()}
                    className="hover:bg-primary cursor-pointer px-4 py-2 flex items-start gap-2 text-base"
                    onClick={() =>
                      router.push(`/daftar-keluarga/${family._id}`)
                    }
                  >
                    <Users className="size-5 shrink-0 mt-0.5" />
                    <span className="min-w-0 break-word">{member.name}</span>
                  </li>
                ))}
              </ul>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
      <div ref={loadMoreRef} className="h-5" />

      {isFetchingNextPage && (
        <p className="text-center py-2 animate-pulse">Memuat data...</p>
      )}

      {!hasNextPage && families.length > 0 && (
        <p className="py-4 text-center text-sm text-muted-foreground">
          Semua data telah dimuat
        </p>
      )}

      {families.length === 0 && (
        <p className="py-4 text-center text-sm text-muted-foreground">
          Tidak ada data
        </p>
      )}
    </div>
  );
};

export default ListFamily;
