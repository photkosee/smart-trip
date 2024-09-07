import Image from "next/image";
import { useRouter } from "next/navigation";
import { LayoutDashboard, LogOut } from "lucide-react";
import { googleLogout } from "@react-oauth/google";

import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { authLogout } from "@/lib/features/auth/authSlice";
import { useAppDispatch } from "@/lib/hooks";

interface AuthTabProps {
  picture?: string;
}

const AuthTab = ({ picture }: AuthTabProps) => {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const handleLogout = () => {
    googleLogout();
    dispatch(authLogout());
    router.push("/");
  };

  return (
    <div className="flex items-center gap-x-4 mr-3">
      <Button
        variant={"outline"}
        className="rounded-full hidden sm:block"
        onClick={() => router.push("/dashboard")}
      >
        Dashboard
      </Button>

      <Popover>
        <PopoverTrigger>
          <Image
            src={picture ? picture : "/placeholder.svg"}
            alt="User Image"
            width={0}
            height={0}
            className="size-[45px] rounded-full cursor-pointer border
            border-gray-300"
            priority
            unoptimized
          />
        </PopoverTrigger>
        <PopoverContent className="p-1 w-[150px] text-sm flex flex-col gap-y-1">
          <div
            onClick={() => router.push("/dashboard")}
            className="hover:bg-gray-50 p-2 rounded-lg
            cursor-pointer flex gap-x-2 items-center sm:hidden"
          >
            <LayoutDashboard className="text-gray-500 size-4" />
            Dashboard
          </div>
          <div
            onClick={handleLogout}
            className="hover:bg-gray-50 p-2 rounded-lg
            cursor-pointer flex gap-x-2 items-center"
          >
            <LogOut className="text-gray-500 size-4" />
            Sign Out
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default AuthTab;
