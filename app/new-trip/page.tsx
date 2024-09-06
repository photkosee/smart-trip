"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import AutoCompleteInput from "@/app/new-trip/components/AutoCompleteInput";
import BudgetPicker from "@/app/new-trip/components/BudgetPicker";
import DatePickerWithRange from "@/app/new-trip/components/DatePickerWithRange";
import PeoplePicker from "@/app/new-trip/components/PeoplePicker";
import LoginDialog from "@/app/components/LoginDialog";
import LoadingDialog from "./components/LoadingDialog";
import { useAppSelector } from "@/lib/hooks";

const NewTripPage = () => {
  const router = useRouter();
  const { place, dayCount, budget, peopleCount, companions } = useAppSelector(
    (state) => state.newTrip
  );
  const [open, setOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const { toast } = useToast();

  const generateTrip = async () => {
    const budgetToString =
      budget === 0 ? "cheap" : budget === 1 ? "mid" : "high";
    const user = JSON.parse(localStorage.getItem("user")!);

    if (!user) {
      setOpen(true);
      return;
    }

    setLoading(true);
    try {
      const response = await fetch("/api/generate-trip", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          place,
          dayCount,
          budget: budgetToString,
          peopleCount,
          companions,
          email: user.email,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        router.push(`/dashboard/${data.id}`);
      } else {
        toast({
          variant: "destructive",
          title: "Uh oh! Something went wrong.",
          description: "There was a problem with your request.",
        });
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: error as string,
      });
    }

    setLoading(false);
  };

  return (
    <main
      className="flex min-h-[80vh] flex-col items-center justify-between
      pt-9 pb-[180px] bg-white"
    >
      <div className="container max-w-xl flex flex-col gap-y-10 px-5 text-lg">
        <h2 className="text-xl lg:text-3xl text-center">
          Plan your next adventure
        </h2>

        <div className="flex flex-col gap-y-3">
          <h3>Where do you want to go?</h3>
          <AutoCompleteInput />
          <DatePickerWithRange />
        </div>

        <div className="flex flex-col gap-y-5">
          <h3>What is your budget?</h3>
          <BudgetPicker />
        </div>

        <PeoplePicker />

        <Button
          className="px-7 py-6 rounded-full bg-green-800 hover:bg-green-700
          text-lg mx-auto mt-7"
          onClick={() => generateTrip()}
          disabled={!place || !dayCount || loading}
        >
          Plan my trip
        </Button>
      </div>

      <LoginDialog
        open={open}
        setOpen={setOpen}
        callback={() => generateTrip()}
      />

      <LoadingDialog open={loading} />
    </main>
  );
};

export default NewTripPage;
