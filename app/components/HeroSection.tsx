import Link from "next/link";
import Image from "next/image";
import { BiTrip } from "react-icons/bi";

import { Button } from "@/components/ui/button";

const HeroSection = () => {
  return (
    <section
      className="w-full flex flex-col md:flex-row-reverse items-center gap-y-7 max-w-4xl
      mx-auto bg-white text-black px-5 md:px-7 md:gap-x-5 md:justify-center"
    >
      <div
        className="flex flex-col items-center md:items-start mx-auto gap-y-7
        lg:max-w-xl w-full max-w-[400px]"
      >
        <h1
          className="w-full text-center md:text-start font-extrabold
          text-4xl lg:text-5xl 2xl:text-6xl"
        >
          Plan Your Next Adventure
        </h1>
        <p
          className="w-full text-center md:text-start lg:text-lg 2xl:text-xl
          max-w-3xl text-neutral-600"
        >
          Create, customize, and optimize your itineraries with this free AI
          trip planner. Perfect for vacations, workations, and everyday
          adventures.
        </p>

        <Link
          href="/new-trip"
          className="w-full flex justify-center md:justify-start"
        >
          <Button
            className="px-7 py-6 rounded-full bg-green-800 hover:bg-green-700
            text-xl gap-x-2"
          >
            <BiTrip />
            Create a new trip
          </Button>
        </Link>
      </div>

      <Image
        src="/hero-banner.svg"
        alt="Hero Banner"
        priority
        width={1080}
        height={1080}
        className="object-cover mx-auto h-[300px] w-[300px] sm:w-[350px] md:h-[350px] lg:w-[450px] lg:h-[450px]"
      />
    </section>
  );
};

export default HeroSection;
