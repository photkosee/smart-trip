import Image from "next/image";

const FeatureSection = () => {
  return (
    <section className="bg-white py-12 text-black">
      <div className="mx-auto px-5 lg:px-7 my-10">
        <div className="text-center">
          <h5 className="text-base text-[#61e288] font-medium uppercase tracking-wide">
            smart trip
          </h5>
          <h2 className="text-center text-3xl md:text-4xl xl:text-5xl font-bold">
            The best tool to plan your trip!
          </h2>

          <p className="mx-auto max-w-2xl m-5 text-lg text-neutral-400">
            Wave farewell to planning headaches and embrace tailored
            recommendations, optimized itineraries, and smooth dining
            experiences.
          </p>
        </div>

        <div
          className="mx-auto mt-10 md:mt-14 h-full max-w-6xl grid gap-7
          grid-cols-1 md:grid-cols-2 xl:grid-cols-3"
        >
          <div
            className="w-full rounded-xl border border-solid border-gray-200 p-5
            last:md:col-span-2 last:xl:col-span-1"
          >
            <div className="flex items-center gap-x-3">
              <Image
                src={"/feature1.svg"}
                alt="Tailor Your Adventure"
                loading="lazy"
                width={250}
                height={250}
                className="w-auto h-[50px] md:h-[80px]"
              />
              <p className="leading-2 text-lg sm:text-xl lg:text-2xl font-bold">
                Tailor Your Adventure
              </p>
            </div>

            <p className="mt-2 text-base text-neutral-400">
              Customize your journey by easily adding, editing, or removing
              activities from your itinerary.
            </p>
          </div>

          <div
            className="w-full rounded-xl border border-solid border-gray-200 p-5
            last:md:col-span-2 last:xl:col-span-1"
          >
            <div className="flex items-center gap-x-3">
              <Image
                src={"/feature2.svg"}
                alt="Efficient Route Planning"
                loading="lazy"
                width={250}
                height={250}
                className="w-auto h-[50px] md:h-[80px]"
              />
              <p className="leading-2 text-lg sm:text-xl lg:text-2xl font-bold">
                Efficient Route Planning
              </p>
            </div>

            <p className="mt-2 text-base text-neutral-400">
              Our AI algorithms evaluate your preferences to design the most
              efficient route, saving you both time and effort.
            </p>
          </div>

          <div
            className="w-full rounded-xl border border-solid border-gray-200 p-5
            last:md:col-span-2 last:xl:col-span-1"
          >
            <div className="flex items-center gap-x-3">
              <Image
                src={"/feature3.svg"}
                alt="Local Dining Recommendations"
                loading="lazy"
                width={250}
                height={250}
                className="w-auto h-[50px] md:h-[80px]"
              />
              <p className="leading-2 text-lg sm:text-xl lg:text-2xl font-bold">
                Local Dining Recommendations
              </p>
            </div>

            <p className="mt-2 text-base text-neutral-400">
              Explore local cuisines and hidden gems suggested by our AI,
              customized to your preferences.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeatureSection;
