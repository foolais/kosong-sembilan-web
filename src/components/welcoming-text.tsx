"use client";

import { useAuthStore } from "@/features/auth/auth.store";

const WelcomingText = () => {
  const user = useAuthStore((state) => state.user);
  return (
    <h2 className="text-lg font-semibold">Selamat Datang, {user?.name}👋</h2>
  );
};

export default WelcomingText;
