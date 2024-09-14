import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { DocumentData } from "firebase/firestore";
import { CircleDollarSign, Star } from "lucide-react";

import { fetchImage } from "@/app/action";

interface PlanCardProps {
  plan: DocumentData;
}

const PlanCard = ({ plan }: PlanCardProps) => {
  const [image, setImage] = useState<string>("");

  // useEffect(() => {
  //   plan &&
  //     fetchImage(
  //       {
  //         textQuery: plan.placeName,
  //       },
  //       setImage
  //     );
  // }, [plan]);

  return (
    <Link
      href={
        "https://www.google.com/maps/search/?api=1&query=" + plan?.placeName
      }
      target="_blank"
    >
      <div
        className="bg-gray-50 border rounded-xl flex gap-x-3 p-3
        cursor-pointer transition-all hover:scale-105 hover:shadow-md"
      >
        <Image
          src={image ? image : "/placeholder.jpeg"}
          alt="Place Image"
          width={0}
          height={0}
          unoptimized
          className="flex-shrink-0 size-[130px] rounded-xl my-auto
          object-cover object-center hidden sm:block"
        />
        <div className="flex flex-col gap-y-1 text-sm text-black max-w-[550px]">
          <div className="flex flex-col">
            <p className="font-medium text-orange-600">{plan?.timeToVisit}</p>
            <p className="font-bold">{plan?.placeName}</p>
          </div>
          <p className="text-gray-500">{plan?.placeDetails}</p>
          <div className="flex gap-x-1 items-center">
            <CircleDollarSign className="size-4 text-green-500" />
            <p>{plan?.ticketPricing}</p>
          </div>
          <div className="flex gap-x-1 items-center">
            <Star className="size-4 text-yellow-500" />
            <p>{plan?.rating} stars</p>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default PlanCard;
