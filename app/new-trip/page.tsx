"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import AutoCompleteInput from "@/app/new-trip/components/AutoCompleteInput";
import BudgetPicker from "@/app/new-trip/components/BudgetPicker";
import DatePickerWithRange from "@/app/new-trip/components/DatePickerWithRange";
import PeoplePicker from "@/app/new-trip/components/PeoplePicker";
import LoginDialog from "@/app/components/LoginDialog";
import LoadingDialog from "@/app/new-trip/components/LoadingDialog";
import { useAppSelector } from "@/lib/hooks";
import { geminiGenerateTrip } from "@/app/action";

const NewTripPage = () => {
  const router = useRouter();
  const { place, dayCount, budget, peopleCount, companions } = useAppSelector(
    (state) => state.newTrip
  );
  const { email } = useAppSelector((state) => state.auth);
  const [open, setOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const generateTrip = async () => {
    const budgetToString =
      budget === 0 ? "cheap" : budget === 1 ? "mid" : "high";
    const currUser = JSON.parse(localStorage.getItem("user")!);

    setLoading(true);

    const docId = await geminiGenerateTrip({
      place,
      dayCount,
      companions,
      peopleCount,
      budget: budgetToString,
      email: currUser?.email,
    });

    if (docId) {
      router.push(`/dashboard/${docId}`);
    } else {
      setLoading(false);
    }
  };

  const handlePlanTrip = () => {
    if (!email) {
      setOpen(true);
    } else {
      generateTrip();
    }
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
          onClick={handlePlanTrip}
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
