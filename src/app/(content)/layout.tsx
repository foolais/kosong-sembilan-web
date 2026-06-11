import Header from "@/components/header";
import TabsNavigation from "@/components/tabs-navigation";
import React from "react";

const LayoutContent = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-screen max-w-3xl mx-auto">
      <Header />
      <main className="flex-1 h-[calc(100dvh-4rem)] overflow-y-auto p-4 bg-card rounded-t-4xl border-t-2 border-t-foreground sm:border-2 sm:border-foreground">
        {children}
      </main>
      <TabsNavigation />
    </div>
  );
};

export default LayoutContent;
