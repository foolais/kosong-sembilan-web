"use client";

import { useRouter } from "next/navigation";
import { Button } from "../ui/button";
import { ChevronLeft } from "lucide-react";

type IProps = {
  options?: {
    isSubmitting: boolean;
    isDeleting: boolean;
  };
};

const BackButton = ({ options }: IProps) => {
  const router = useRouter();
  return (
    <div className="flex items-center gap-2">
      <Button
        variant="secondary"
        size-="xs"
        className="h-8 p-2 cursor-pointer"
        onClick={() => router.back()}
        disabled={options?.isSubmitting || options?.isDeleting}
      >
        <ChevronLeft className="size-4" />
      </Button>
      <span className="font-semibold">Kembali</span>
    </div>
  );
};

export default BackButton;
