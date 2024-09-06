import Image from "next/image";
import { DocumentData } from "firebase/firestore";
import { Calendar, MapPin, PersonStanding } from "lucide-react";

import DisplayedBudget from "@/app/dashboard/components/DisplayedBudget";

interface HeroSectionProps {
  trip?: DocumentData;
}

const HeroSection = ({ trip }: HeroSectionProps) => {
  const place = trip?.userPreferences?.place;
  const budget = trip?.userPreferences?.budget;
  const dayCount = trip?.userPreferences?.dayCount;
  const peopleCount = trip?.userPreferences?.peopleCount;

  return (
    <section
      className="w-full flex flex-col md:flex-row-reverse items-center gap-y-2 max-w-4xl
      mx-auto bg-white text-black px-5 md:px-7 md:gap-x-5 md:justify-center"
    >
      <div
        className="flex flex-col items-center md:items-start w-full lg:max-w-2xl
        mx-auto gap-y-7 order-2 md:order-1 max-w-[400px]"
      >
        <h1
          className="w-full text-center md:text-start font-extrabold
          text-4xl lg:text-5xl 2xl:text-6xl"
        >
          It&apos;s time to set sail
        </h1>
        <div className="w-full flex flex-col gap-y-3">
          <div
            className="flex items-center gap-x-2 justify-center md:justify-start
            text-center text-wrap"
          >
            <MapPin />
            {place}
          </div>

          <div
            className="flex items-center gap-x-2 justify-center md:justify-start
            text-center"
          >
            <Calendar />
            {dayCount} day{dayCount > 1 ? "s" : ""}
          </div>

          {trip?.userPreferences?.budget ? (
            <DisplayedBudget budget={budget} />
          ) : null}

          {peopleCount ? (
            <div
              className="flex items-center justify-center md:justify-start
              text-center flex-wrap"
            >
              {" "}
              {Array.from({ length: peopleCount }, (_, index) => (
                <PersonStanding key={index} className="size-5 md:size-6" />
              ))}
            </div>
          ) : null}
        </div>
      </div>

      <Image
        src="/placeholder.svg"
        alt="Hero image"
        priority
        width={1080}
        height={1080}
        className="h-[40vh] lg:h-[50vh] object-cover mx-auto w-auto
        order-1 md:order-2"
      />
    </section>
  );
};

export default HeroSection;
