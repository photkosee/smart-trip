import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { DocumentData } from "firebase/firestore";
import { Calendar, MapPin } from "lucide-react";

import { fetchImage } from "@/app/action";

interface TripCardProps {
  trip: DocumentData;
}

const TripCard = ({ trip }: TripCardProps) => {
  const [image, setImage] = useState<string>("");
  const dayCount = trip?.userPreferences?.dayCount;
  const placeName = trip?.userPreferences?.place;

  // useEffect(() => {
  //   trip &&
  //     fetchImage(
  //       {
  //         textQuery: trip.userPreferences?.place,
  //       },
  //       setImage
  //     );
  // }, [trip]);

  return (
    <Link
      className="flex flex-col gap-y-1 text-black
      cursor-pointer hover:scale-105 transition-all max-w-[300px]"
      href={`/dashboard/${trip.id}`}
    >
      <Image
        src={image ? image : "/placeholder.svg"}
        alt="Trip Image"
        width={0}
        height={0}
        unoptimized
        className="rounded-xl h-[170px] w-[300px] object-cover object-center
        border border-gray-100"
      />

      <div className="flex flex-col">
        <div className="flex gap-x-2">
          <div className="size-4 pt-[3.5px]">
            <MapPin className="size-4" />
          </div>
          <p className="font-bold">{placeName}</p>
        </div>
        <div className="flex items-center gap-x-2 text-gray-500">
          <Calendar className="size-4" />
          {dayCount} day{dayCount > 1 ? "s" : ""}
        </div>
      </div>
    </Link>
  );
};

export default TripCard;
