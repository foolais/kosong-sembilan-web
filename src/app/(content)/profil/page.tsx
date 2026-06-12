"use client";

import BackButton from "@/components/button/back-button";
import LogoutButton from "@/components/button/logout-button";
import { useAuthStore } from "@/features/auth/auth.store";

const ProfilPage = () => {
  const user = useAuthStore((state) => state.user);

  return (
    <div>
      <BackButton />
      <h2 className="text-lg font-semibold mt-4">Profil Pengguna</h2>
      <div className="mt-4 mb-8 space-y-2">
        <p className="font-semibold">
          <span className="font-normal">Nama:</span> {user?.name}
        </p>
        <p className="font-semibold">
          <span className="font-normal">Email:</span> {user?.email}
        </p>
      </div>
      <LogoutButton />
    </div>
  );
};

export default ProfilPage;
