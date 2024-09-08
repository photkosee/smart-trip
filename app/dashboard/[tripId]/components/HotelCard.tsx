import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { DocumentData } from "firebase/firestore";
import { CircleDollarSign, MapPin, Star } from "lucide-react";

import { fetchImage } from "@/app/action";

interface HotelCardProps {
  hotel: DocumentData;
}

const HotelCard = ({ hotel }: HotelCardProps) => {
  const [image, setImage] = useState<string>("");

  // useEffect(() => {
  //   hotel &&
  //     fetchImage(
  //       {
  //         textQuery: hotel.hotelName,
  //       },
  //       setImage
  //     );
  // }, [hotel]);

  return (
    <Link
      className="flex flex-col gap-y-1 text-black text-sm
      cursor-pointer hover:scale-105 transition-all max-w-[300px]"
      href={`https://www.google.com/maps/search/?api=1&query=${
        hotel.hotelName + hotel.hotelAddress
      }`}
      target="_blank"
    >
      <Image
        src={image ? image : "/placeholder.svg"}
        alt="Hotel Image"
        width={0}
        height={0}
        unoptimized
        className="rounded-xl h-[170px] w-[300px] object-cover object-center
        border border-gray-100"
      />

      <h4 className="font-medium text-lg">{hotel.hotelName}</h4>
      <div className="flex gap-x-1">
        <div className="size-4 pt-[2px]">
          <MapPin className="size-4 text-red-500" />
        </div>
        <p className="text-gray-500">{hotel.hotelAddress}</p>
      </div>
      <div className="flex gap-x-1 items-center">
        <CircleDollarSign className="size-4 text-green-500" />
        <p>{hotel.price}</p>
      </div>
      <div className="flex gap-x-1 items-center">
        <Star className="size-4 text-yellow-500" />
        <p>{hotel.rating} stars</p>
      </div>
    </Link>
  );
};

export default HotelCard;
