import { Button } from "@/components/ui/button";
import AutoCompleteInput from "./components/AutoCompleteInput";
import BudgetPicker from "./components/BudgetPicker";
import { DatePickerWithRange } from "./components/DatePickerWithRange";
import PeoplePicker from "./components/PeoplePicker";

const NewTripPage = () => {
  return (
    <main className="flex min-h-[80vh] flex-col items-center justify-between py-7 bg-white">
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

        <Button className="px-7 py-6 rounded-full bg-[#33b377] hover:bg-[#61e288] text-lg mx-auto">
          Plan my trip
        </Button>
      </div>
    </main>
  );
};

export default NewTripPage;
