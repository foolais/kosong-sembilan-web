"use client";

import { useLogout } from "@/features/auth/auth.hooks";
import { Button } from "./ui/button";
import { LogOut } from "lucide-react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const LogoutButton = () => {
  const logoutMutation = useLogout();
  const router = useRouter();

  const onLogout = () => {
    logoutMutation.mutate(undefined, {
      onSuccess: (response) => {
        toast.success(response.message);
        router.replace("/login");
      },
      onError: (error) => {
        console.log(error);
        toast.error(error.message || "Terjadi kesalahan");
      },
    });
  };

  return (
    <Button
      variant="destructive"
      className="cursor-pointer flex items-center justify-center"
      onClick={onLogout}
    >
      Logout <LogOut />
    </Button>
  );
};

export default LogoutButton;
