"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAppSelector } from "@/lib/hooks";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const [loaded, setLoaded] = useState<boolean>(false);
  const { id } = useAppSelector((state) => state.auth);

  useEffect(() => {
    if (!id) {
      router.push("/");
    } else {
      setLoaded(true);
    }
  }, [id]);

  if (!id) {
    return <div className="bg-white h-screen" />;
  }

  // prevent hydration
  return <>{loaded ? children : <div className="bg-white h-screen" />}</>;
};

export default DashboardLayout;
