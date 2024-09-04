import { createContext, useContext, useState } from "react";

import { CompanionsType } from "@/app/types";

interface NewTripContextType {
  dayCount: number;
  budget: number;
  peopleCount: number;
  companions: CompanionsType;
  setDayCount: (count: number) => void;
  setBudget: (budget: number) => void;
  setPeopleCount: (count: number) => void;
  setCompanions: (companions: CompanionsType) => void;
}

const NewTripContext = createContext<NewTripContextType | undefined>(undefined);

export const NewTripProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [dayCount, setDayCount] = useState<number>(0);
  const [budget, setBudget] = useState<number>(0);
  const [peopleCount, setPeopleCount] = useState<number>(1);
  const [companions, setCompanions] = useState<CompanionsType>("family");

  return (
    <NewTripContext.Provider
      value={{
        dayCount,
        budget,
        peopleCount,
        companions,
        setDayCount,
        setBudget,
        setPeopleCount,
        setCompanions,
      }}
    >
      {children}
    </NewTripContext.Provider>
  );
};

export const useNewTripContext = () => {
  const context = useContext(NewTripContext);
  if (context === undefined) {
    throw new Error("useNewTripContext must be used within an NewTripProvider");
  }
  return context;
};
