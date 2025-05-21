import { Link } from "react-router-dom";
import logo from "../../../assets/logo.png";
const Footer = () => {
  return (
    <>
      <footer className="rounded-lg mt-5 shadow-inner">
        <div className="w-full  p-4 md:py-8">
          <div className="sm:flex sm:items-center sm:justify-between">
            <div className=" mb-4 grid justify-items-center sm:mb-0 space-x-3 rtl:space-x-reverse ">
              <img width={90} src={logo} alt="" />
              <span className="self-center text-orange-400 text-2xl font-semibold whitespace-nowrap ">
                Food-Corner
              </span>
            </div>
            <ul className="flex flex-wrap items-center mb-6 text-sm font-medium  sm:mb-0 ">
              <li>
                <Link
                  to="/contact-us"
                  className="hover:underline text-orange-400 me-4 md:me-6"
                >
                  Contact Us
                </Link>
              </li>
              <li>
                <Link
                  to="/about-us"
                  className="hover:underline text-orange-400"
                >
                  About Us
                </Link>
              </li>
            </ul>
          </div>
          <hr className="my-6  sm:mx-auto border-yellow-400 lg:my-8" />
          <span className="block text-sm sm:text-center  text-orange-400">
            © 2024 . All Rights Reserved. md.tazwarul.islam.07@gmail.com
          </span>
        </div>
      </footer>
    </>
  );
};

export default Footer;
