import Image from "next/image";

const PromoteSection = () => {
  return (
    <section className="my-3 md:mt-10 bg-white text-black">
      <div className="container m-7 mx-auto max-w-5xl px-3">
        <h2
          className="px-5 text-center text-3xl lg:text-4xl xl:text-5xl lg:px-10
          font-bold mb-10"
        >
          An&nbsp;
          <span className="text-[#61e288]">AI-Powered</span>
          &nbsp;Tool
        </h2>

        <div className="flex flex-wrap my-5">
          <div
            className="w-full flex flex-col justify-center items-center
            sm:items-start sm:w-1/2 p-5 gap-y-3"
          >
            <h4
              className="bg-[#61e288]/70 text-2xl lg:text-3xl
              font-bold px-2 sm:pl-0"
            >
              Try this out
            </h4>
            <p className="mb-5 text-gray-600 text-center sm:text-start">
              Create your ideal itinerary with Smart Trip. Our advanced
              algorithms consider your preferences to craft the perfect travel
              plan tailored just for you.
            </p>
          </div>

          <div className="w-full sm:w-1/2">
            <Image
              src={"/promote1.svg"}
              alt="Try this out"
              loading="lazy"
              width={250}
              height={250}
              className="mx-auto"
            />
          </div>
        </div>

        <div className="flex flex-col-reverse sm:flex-row flex-wrap items-center">
          <div className="w-full sm:w-1/2">
            <Image
              src={"/promote2.svg"}
              alt="Find Your Inspiration"
              loading="lazy"
              width={250}
              height={250}
              className="mx-auto"
            />
          </div>

          <div className="w-full p-5 sm:w-1/2">
            <div
              className="w-full flex flex-col justify-center items-center
              sm:items-end gap-y-3"
            >
              <h4
                className="bg-[#61e288]/70 text-2xl lg:text-3xl
                font-bold text-end px-2 sm:pr-0"
              >
                Find Your Inspiration
              </h4>
              <p className="mb-5 text-gray-600 text-center sm:text-end">
                Discover valuable travel insights, explore suggested
                attractions, and seamlessly incorporate them into your own
                adventure with Smart Trip.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PromoteSection;
