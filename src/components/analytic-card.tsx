"use client";

import { Loader2, Home, Users, UserCheck } from "lucide-react";
import { useAnalytic } from "@/features/analytic/analytic.hooks";

const AnalyticCard = () => {
  const { data, isLoading } = useAnalytic();

  const analytic = data?.data;

  if (isLoading) {
    return (
      <div className="flex justify-center py-8">
        <Loader2 className="size-6 animate-spin" />
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-3">
      <div className="col-span-2 rounded-2xl border border-foreground bg-card p-5 shadow-sm">
        <div className="flex items-center gap-2 text-muted-foreground">
          <Users className="size-5" />
          <span>Total Orang</span>
        </div>
        <p className="mt-3 text-4xl font-bold">{analytic?.totalPeople ?? 0}</p>
      </div>
      <div className="rounded-2xl border border-foreground bg-card p-4 shadow-sm">
        <div className="flex items-center gap-2 text-muted-foreground">
          <Home className="size-4" />
          <span className="text-sm">Warga</span>
        </div>
        <p className="mt-2 text-2xl font-bold">
          {analytic?.totalResident ?? 0}
        </p>
      </div>
      <div className="rounded-2xl border border-foreground bg-card p-4 shadow-sm">
        <div className="flex items-center gap-2 text-muted-foreground">
          <UserCheck className="size-4" />
          <span className="text-sm">Kos</span>
        </div>

        <p className="mt-2 text-2xl font-bold">
          {analytic?.totalBoarding ?? 0}
        </p>
      </div>
    </div>
  );
};

export default AnalyticCard;
