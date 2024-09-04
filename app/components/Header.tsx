"use client";

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
      className={`
      ${
        top ? "bg-white shadow-lg dark:bg-accent" : "dark:bg-transparent"
      } sticky py-4 top-0 z-30 transition-all w-full flex
      `}
    >
      <div className="container max-w-6xl mx-auto px-5">
        <div className="flex justify-between items-center gap-x-6 mx-auto">
          <h2 className="text-xl">Smart Trip</h2>
          <Button className="self-center rounded-full">Sign In</Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
