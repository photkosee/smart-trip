"use client";

import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { useAppSelector } from "@/lib/hooks";
import { Button } from "@/components/ui/button";
import LoginDialog from "@/app/components/LoginDialog";
import AuthTab from "@/app/components/AuthTab";

const Header = () => {
  const router = useRouter();
  const [top, setTop] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(false);
  const { id, picture } = useAppSelector((state) => state.auth);

  useEffect(() => {
    // Whether the current scroll position is at the top of the page
    const scrollYPosition = () =>
      window.scrollY > 0 ? setTop(true) : setTop(false);

    window.addEventListener("scroll", scrollYPosition);

    return () => window.removeEventListener("scroll", scrollYPosition);
  }, []);

  return (
    <header
      className={`sticky py-3 sm:p-4 top-0 z-30 transition-all w-full flex ${
        top && "bg-white shadow-lg"
      }`}
    >
      <div className="container max-w-6xl mx-auto px-2 sm:px-5">
        <div className="flex justify-between items-center gap-x-6 mx-auto">
          <Link href={id ? "/dashboard" : "/"}>
            <Image
              src="/logo.svg"
              alt="Logo"
              width={0}
              height={0}
              priority
              className="w-auto h-[40px] sm:h-[50px]"
            />
          </Link>

          {id ? (
            <AuthTab picture={picture || ""} />
          ) : (
            <Button
              variant={!top ? "default" : "outline"}
              className="self-center rounded-full mr-3"
              onClick={() => setOpen(true)}
            >
              Sign In
            </Button>
          )}
        </div>
      </div>

      <LoginDialog
        open={open}
        setOpen={setOpen}
        callback={() => {
          router.push("/dashboard");
          setOpen(false);
        }}
      />
    </header>
  );
};

export default Header;
