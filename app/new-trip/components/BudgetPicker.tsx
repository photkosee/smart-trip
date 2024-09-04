import { Slider } from "@/components/ui/slider";
import { useNewTripContext } from "@/app/new-trip/NewTripContext";

const BudgetPicker = () => {
  const { budget, setBudget } = useNewTripContext();

  return (
    <div className="flex flex-col gap-y-5">
      <Slider
        defaultValue={[budget]}
        max={2}
        step={1}
        className="text-lime-200"
        onValueChange={(value) => setBudget(value[0])}
      />
      <div className="flex justify-between w-full">
        <p className="flex-1">Cheap</p>
        <p className="flex-1 flex justify-center">Mid</p>
        <p className="flex-1 flex justify-end">High</p>
      </div>
    </div>
  );
};

export default BudgetPicker;
