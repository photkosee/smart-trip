import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { deleteDoc, doc, DocumentData } from "firebase/firestore";
import { Calendar, MapPin, PersonStanding, Trash2 } from "lucide-react";

import { db } from "@/app/firebase";
import { fetchImage } from "@/app/action";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import DisplayedBudget from "@/app/dashboard/[tripId]/components/DisplayedBudget";

interface HeroSectionProps {
  trip?: DocumentData;
}

const HeroSection = ({ trip }: HeroSectionProps) => {
  const route = useRouter();
  const [image, setImage] = useState<string>("");
  const place = trip?.userPreferences?.place;
  const budget = trip?.userPreferences?.budget;
  const dayCount = trip?.userPreferences?.dayCount;
  const peopleCount = trip?.userPreferences?.peopleCount;

  // useEffect(() => {
  //   trip &&
  //     fetchImage(
  //       {
  //         textQuery: trip?.userPreferences?.place,
  //       },
  //       setImage
  //     );
  // }, [trip]);

  const handleDeleteTrip = async () => {
    await deleteDoc(doc(db, "Trips", trip?.id as string));
    route.push("/dashboard");
    toast({
      title: "Trip Deleted",
      description: "Your trip has been deleted",
    });
  };

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
            text-center md:text-start text-wrap"
          >
            <MapPin className="flex-shrink-0 hidden md:block" />
            {place}
          </div>

          <div
            className="flex items-center gap-x-2 justify-center md:justify-start
            text-center"
          >
            <Calendar />
            {dayCount} day{dayCount > 1 ? "s" : ""}
          </div>

          {budget ? <DisplayedBudget budget={budget} /> : null}

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

          <Button
            className="w-full p-5 rounded-full bg-red-700 hover:bg-red-600
            text-md gap-x-2"
            onClick={handleDeleteTrip}
          >
            <Trash2 className="size-4" />
            Delete Trip
          </Button>
        </div>
      </div>

      <Image
        src={image ? image : "/placeholder.svg"}
        alt="Hero image"
        width={0}
        height={0}
        unoptimized
        className="w-full max-w-[400px] lg:max-w-[500px] h-auto max-h-[350px]
        mx-auto order-1 md:order-2 rounded-xl object-cover"
      />
    </section>
  );
};

export default HeroSection;
