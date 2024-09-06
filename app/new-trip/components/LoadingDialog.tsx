"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Progress } from "@/components/ui/progress";

interface LoadingDialogProps {
  open: boolean;
}

const LoadingDialog = ({ open }: LoadingDialogProps) => {
  const [progress, setProgress] = useState<number>(0);

  useEffect(() => {
    if (open) {
      setProgress(0);
    } else {
      setProgress(100);
    }

    const timer = setInterval(
      () =>
        setProgress((prev) => {
          const increment = Math.floor(Math.random() * 10) + 1;
          if (prev + increment > 99) {
            return prev;
          }
          return prev + increment;
        }),
      1500
    );
    return () => clearInterval(timer);
  }, [open]);

  return (
    <Dialog open={open}>
      <DialogContent
        hideCloseButton
        className="flex flex-col items-center justify-center gap-y-5"
      >
        <DialogTitle className="text-center">Planning ...</DialogTitle>

        <Image
          src={"/loading.svg"}
          alt="loading"
          width={0}
          height={0}
          className="w-auto h-40"
          priority
        />
        <>
          {progress < 30 ? "Start planning your trip ..." : null}
          {progress >= 30 && progress < 60
            ? "Looking for good places to visit ..."
            : null}
          {progress >= 60 && progress < 80
            ? "Are there any yummy foods ..."
            : null}
          {progress >= 80 && progress < 100 ? "Finalizing the plan ..." : null}
        </>
        <Progress value={progress} className="w-[60%]" />
      </DialogContent>
    </Dialog>
  );
};

export default LoadingDialog;
