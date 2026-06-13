import { User } from "lucide-react";
import { Button } from "../ui/button";
import Link from "next/link";

const ProfileButton = () => {
  return (
    <Link href="/profil">
      <Button variant="secondary" size="sm" className="cursor-pointer border-2">
        <User />
      </Button>
    </Link>
  );
};

export default ProfileButton;
