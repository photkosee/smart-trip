"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";

const Header = () => {
  const [top, setTop] = useState<boolean>(false);

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
      <div className="container max-w-6xl mx-auto px-5">
        <div className="flex justify-between items-center gap-x-6 mx-auto">
          <div className="flex gap-x-1 items-center">
            <Image
              src="/smart-trip-logo.png"
              alt="Logo"
              priority
              width={35}
              height={35}
            />
            <h2 className="text-xl">Smart Trip</h2>
          </div>
          <Button className="self-center rounded-full">Sign In</Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
