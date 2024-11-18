import { DocumentData } from "firebase/firestore";

import PlanCard from "@/app/dashboard/[tripId]/components/PlanCard";

interface PlanSectionProps {
  trip?: DocumentData;
}

const PlanSection = ({ trip }: PlanSectionProps) => {
  const itineraries = trip?.tripData?.itinerary;

  return (
    <section className="bg-white py-10 text-black w-full max-w-6xl px-5 md:px-10">
      <div className="w-full flex flex-col justify-center items-center gap-y-5 md:px-10">
        <h2 className="text-xl font-bold lg:self-start">Plans</h2>
        <div className="w-full flex flex-col gap-y-7">
          {itineraries &&
            itineraries.map((itinerary: DocumentData, index: number) => (
              <div
                key={index}
                className="w-full flex flex-col gap-y-3 items-center md:items-start"
              >
                <h4 className="font-medium text-lg">
                  Day {index + 1} :{" "}
                  <span className="text-emerald-400">{itinerary.theme}</span>
                </h4>
                <div className="flex flex-col gap-y-2">
                  {itinerary.plan &&
                    itinerary.plan.map((plan: DocumentData, index: number) => (
                      <div key={index} className="text-neutral-400 text-base">
                        <PlanCard plan={plan} />
                      </div>
                    ))}
                </div>
              </div>
            ))}
        </div>
      </div>
    </section>
  );
};

export default PlanSection;
