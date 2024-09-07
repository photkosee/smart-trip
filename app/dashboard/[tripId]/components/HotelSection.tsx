import { DocumentData } from "firebase/firestore";

import HotelCard from "@/app/dashboard/[tripId]/components/HotelCard";

interface HotelSectionProps {
  trip?: DocumentData;
}

const HotelSection = ({ trip }: HotelSectionProps) => {
  const hotels = trip?.tripData?.hotel_options;

  return (
    <section className="bg-white py-10 text-black w-full max-w-6xl px-5 md:px-10">
      <div className="w-full flex flex-col justify-center items-center gap-y-7 px-5 md:px-10">
        <h2 className="text-xl font-bold lg:self-start">
          Hotel Recommendation
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 w-full gap-5">
          {hotels &&
            hotels.map((hotel: any, index: number) => (
              <div key={index} className="w-full flex justify-center">
                <HotelCard hotel={hotel} />
              </div>
            ))}
        </div>
      </div>
    </section>
  );
};

export default HotelSection;
