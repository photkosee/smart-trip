"use client";

import { Button } from "@/components/ui/button";
import { useNewTripContext } from "@/app/new-trip/NewTripContext";
import AutoCompleteInput from "@/app/new-trip/components/AutoCompleteInput";
import BudgetPicker from "@/app/new-trip/components/BudgetPicker";
import DatePickerWithRange from "@/app/new-trip/components/DatePickerWithRange";
import PeoplePicker from "@/app/new-trip/components/PeoplePicker";

const NewTripPage = () => {
  const { place, dayCount, budget, peopleCount, companions } =
    useNewTripContext();

  const generateTrip = async () => {
    try {
      const response = await fetch("/api/generate-trip", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          place,
          dayCount,
          budget,
          peopleCount,
          companions,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        // Need to store the data
        console.log(data);
      } else {
        // Put an alert
        console.log("error");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <main
      className="flex min-h-[80vh] flex-col items-center justify-between
        pt-7 pb-[180px] bg-white"
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
          className="px-7 py-6 rounded-full bg-[#33b377] hover:bg-[#61e288]
            text-lg mx-auto"
          onClick={generateTrip}
        >
          Plan my trip
        </Button>
      </div>
    </main>
  );
};

export default NewTripPage;
