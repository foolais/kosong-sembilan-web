"use client";

import { useFamilies } from "@/features/family/family.hooks";
import { useFamilyStore } from "@/features/family/family.store";
import { useEffect, useMemo, useRef, useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./ui/accordion";
import { IFamilyData, IFamilyMember } from "@/models/Family";
import { Loader, User, Users } from "lucide-react";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import HighlightText from "./highlight-text";

const ListFamily = () => {
  const router = useRouter();
  const searchFamily = useFamilyStore((state) => state.searchFamily);

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } =
    useFamilies({
      search: searchFamily,
    });
  const [manualOpenedItems, setManualOpenedItems] = useState<string[]>([]);

  const loadMoreRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const families = useMemo(
    () => data?.pages.flatMap((page) => page.data) ?? [],
    [data]
  );

  const autoOpenedItems = useMemo(() => {
    if (!searchFamily.trim()) return manualOpenedItems;

    const keyword = searchFamily.toLowerCase();

    return families
      .filter((family) => {
        return (
          family.headFamily.toLowerCase().includes(keyword) ||
          family.members.some((member: IFamilyMember) =>
            member.name.toLowerCase().includes(keyword)
          )
        );
      })
      .map((family) => family._id.toString());
  }, [families, searchFamily, manualOpenedItems]);

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

  if (isLoading) {
    return (
      <div className="max-w-md h-[50vh] flex items-center justify-center">
        <Loader className="animate-spin size-8" />
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className="h-[70svh] overflow-y-auto sm:w-md sm:mx-auto"
    >
      <Accordion
        type="multiple"
        value={autoOpenedItems}
        onValueChange={setManualOpenedItems}
        className="max-w-lg space-y-4"
      >
        {families.map((family: IFamilyData) => (
          <AccordionItem
            key={family._id.toString()}
            value={family._id.toString()}
          >
            <AccordionTrigger
              className={cn(
                "cursor-pointer px-4 text-lg flex items-start gap-2 ",
                family.status === "resident"
                  ? "bg-primary hover:bg-primary/80"
                  : "bg-secondary hover:bg-secondary/80"
              )}
            >
              <User className="size-6 shrink-0 mt-0.5" />
              <HighlightText text={family.headFamily} search={searchFamily} />
            </AccordionTrigger>
            <AccordionContent>
              <ul className="space-y-1 text-foreground">
                {family.members.map((member) => (
                  <li
                    key={member._id.toString()}
                    className="hover:bg-slate-100 cursor-pointer px-4 py-2 flex items-start gap-2 text-base"
                    onClick={() =>
                      router.push(`/daftar-keluarga/${family._id}`)
                    }
                  >
                    <Users className="size-5 shrink-0 mt-0.5" />
                    <HighlightText text={member.name} search={searchFamily} />
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
        <p className="py-2 text-center text-sm text-muted-foreground">
          Semua data telah dimuat
        </p>
      )}

      {families.length === 0 && (
        <p className="py-2 text-center text-sm text-muted-foreground">
          Tidak ada data
        </p>
      )}
    </div>
  );
};

export default ListFamily;
