import { Slider } from "@/components/ui/slider";
import { useNewTripContext } from "@/app/new-trip/NewTripContext";

const BudgetPicker = () => {
  const { budget, setBudget } = useNewTripContext();

  return (
    <div className="flex flex-col gap-y-5">
      <Slider
        value={[budget]}
        max={2}
        step={1}
        className="text-lime-200"
        onValueChange={(value) => setBudget(value[0])}
      />
      <div className="flex justify-between w-full">
        <button
          className="flex-1 flex justify-start"
          onClick={() => setBudget(0)}
        >
          Cheap
        </button>
        <button
          className="flex-1 flex justify-center"
          onClick={() => setBudget(1)}
        >
          Mid
        </button>
        <button
          className="flex-1 flex justify-end"
          onClick={() => setBudget(2)}
        >
          High
        </button>
      </div>
    </div>
  );
};

export default BudgetPicker;
