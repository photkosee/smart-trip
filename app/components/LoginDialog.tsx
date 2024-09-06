import Image from "next/image";
import { Dispatch } from "react";
import { FcGoogle } from "react-icons/fc";
import { useGoogleLogin } from "@react-oauth/google";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface DialogProps {
  open: boolean;
  setOpen: Dispatch<React.SetStateAction<boolean>>;
}

const LoginDialog = ({ open, setOpen }: DialogProps) => {
  const getUserInfo = async (token: string) => {
    try {
      const response = await fetch(
        `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${token}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "Application/json",
          },
        }
      );

      const data = await response.json();
      if (response.ok) {
        localStorage.setItem("user", JSON.stringify(data));
      } else {
        // Put an alert
        console.log("error");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const login = useGoogleLogin({
    onSuccess: (codeResponse) => {
      console.log(codeResponse);
      getUserInfo(codeResponse.access_token);
    },
    onError: (error) => {
      console.log("Login Failed:", error);
    },
  });

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>
            <Image
              src="/logo.svg"
              alt="Logo"
              width={0}
              height={0}
              className="w-auto h-14 mx-auto"
            />
          </DialogTitle>
          <DialogDescription>
            <div className="text-center flex flex-col gap-y-3">
              <p>Sign in to continue</p>
              <Button
                variant={"outline"}
                onClick={() => login()}
                className="gap-x-2"
              >
                <FcGoogle className="w-6 h-6" />
                Sign In with Google
              </Button>
            </div>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default LoginDialog;
