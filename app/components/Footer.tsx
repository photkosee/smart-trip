import Link from "next/link";
import { FaLinkedin } from "react-icons/fa";
import { FaGithubSquare } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-secondary py-10 sm:py-14 text-green-800">
      <div className="mx-auto container flex justify-center text-2xl sm:text-3xl gap-x-7">
        <Link
          href="https://github.com/photkosee/smart-trip"
          target="_blank"
          className="hover:text-green-600 transition-all"
        >
          <FaGithubSquare />
        </Link>

        <Link
          href="https://www.linkedin.com/in/phot-kosee/"
          target="_blank"
          className="hover:text-green-600 transition-all"
        >
          <FaLinkedin />
        </Link>
      </div>
    </footer>
  );
};

export default Footer;
