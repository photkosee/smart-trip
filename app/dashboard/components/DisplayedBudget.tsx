import { CircleDollarSign } from "lucide-react";

const DisplayedBudget = ({ budget }: { budget: string }) => {
  return (
    <div className="w-full flex gap-x-1 justify-center md:justify-start">
      <CircleDollarSign className="text-green-500" />
      <CircleDollarSign
        className={`${budget !== "cheap" ? "text-green-500" : "text-gray-300"}`}
      />
      <CircleDollarSign
        className={`${budget !== "cheap" ? "text-green-500" : "text-gray-300"}`}
      />
      <CircleDollarSign
        className={`${budget === "high" ? "text-green-500" : "text-gray-300"}`}
      />
      <CircleDollarSign
        className={`${budget === "high" ? "text-green-500" : "text-gray-300"}`}
      />
    </div>
  );
};

export default DisplayedBudget;
