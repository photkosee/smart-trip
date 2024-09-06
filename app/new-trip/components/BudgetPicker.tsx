import { Slider } from "@/components/ui/slider";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { setBudget } from "@/lib/features/newTrip/newTripSlice";

const BudgetPicker = () => {
  const dispatch = useAppDispatch();
  const budget = useAppSelector((state) => state.newTrip.budget);

  return (
    <div className="flex flex-col gap-y-5">
      <Slider
        value={[budget]}
        max={2}
        step={1}
        className="text-lime-200"
        onValueChange={(value) => dispatch(setBudget(value[0]))}
      />
      <div className="flex justify-between w-full">
        <button
          className="flex-1 flex justify-start"
          onClick={() => dispatch(setBudget(0))}
        >
          Cheap
        </button>
        <button
          className="flex-1 flex justify-center"
          onClick={() => dispatch(setBudget(1))}
        >
          Mid
        </button>
        <button
          className="flex-1 flex justify-end"
          onClick={() => dispatch(setBudget(2))}
        >
          High
        </button>
      </div>
    </div>
  );
};

export default BudgetPicker;
