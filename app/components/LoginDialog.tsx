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
import { useToast } from "@/hooks/use-toast";
import { useAppDispatch } from "@/lib/hooks";
import { authLogin } from "@/lib/features/auth/authSlice";

interface LoginDialogProps {
  open: boolean;
  setOpen: Dispatch<React.SetStateAction<boolean>>;
  callback?: () => void;
}

const LoginDialog = ({ open, setOpen, callback }: LoginDialogProps) => {
  const { toast } = useToast();
  const dispatch = useAppDispatch();

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
        dispatch(authLogin(data));
        if (callback) {
          callback();
        }
      } else {
        toast({
          variant: "destructive",
          title: "Uh oh! Something went wrong.",
          description: data.error.message,
        });
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: error as string,
      });
    }
  };

  const handleLogin = useGoogleLogin({
    onSuccess: (codeResponse) => {
      getUserInfo(codeResponse.access_token);
    },
    onError: (error) => {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: error as string,
      });
    },
  });

  const handleLoginDemo = () => {
    const user = {
      id: "demo",
      name: "Demo User",
      email: "demo@example.com",
      verified_email: true,
      given_name: "Demo",
      family_name: "User",
      picture: "",
    };

    dispatch(authLogin(user));
    if (callback) {
      callback();
    }
  };

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
                onClick={() => handleLogin()}
                className="gap-x-2"
              >
                <FcGoogle className="w-6 h-6" />
                Sign In with Google
              </Button>

              <Button variant={"outline"} onClick={() => handleLoginDemo()}>
                Try Demo
              </Button>
            </div>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default LoginDialog;
