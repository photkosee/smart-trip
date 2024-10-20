import Image from "next/image";

const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-200 py-10 sm:py-14">
      <div className="mx-auto container max-w-6xl px-5">
        <div className="flex flex-col gap-y-1 items-center">
          <Image
            src="/logo.svg"
            alt="Logo"
            width={0}
            height={0}
            priority
            className="w-auto h-[40px] sm:h-[50px]"
          />
          <div className="text-lg text-neutral-600 text-center">
            Turn your next trip into a hassle-free experience with Smart Trip.
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
