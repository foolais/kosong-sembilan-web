"use client";

import { cn } from "@/lib/utils";
import { Home, ListCollapse, Plus } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "./ui/button";

const TabsNavigation = () => {
  const pathname = usePathname();
  return (
    <div className="absolute bottom-4 py-1.5 w-5/6 rounded-4xl max-w-sm left-1/2 -translate-x-1/2 bg-secondary shadow-2xl flex items-center justify-evenly border-2 border-foreground">
      <Link
        href="/dashboard"
        className={cn(
          "flex flex-col items-center gap-1 transition-all text-foreground ",
          pathname === "/dashboard"
            ? "border-b-2 border-b-foreground"
            : "hover:text-muted-foreground"
        )}
      >
        <Home className="size-6" />
      </Link>
      <Link href="/tambah-keluarga">
        <Button size="icon">
          <Plus className="text-foreground size-6" />
        </Button>
      </Link>
      <Link
        href="/daftar-keluarga"
        className={cn(
          "flex flex-col items-center gap-1 transition-all text-foreground ",
          pathname === "/daftar-keluarga"
            ? "border-b-2 border-b-foreground"
            : "hover:text-foreground"
        )}
      >
        <ListCollapse className="size-6" />
      </Link>
    </div>
  );
};

export default TabsNavigation;
