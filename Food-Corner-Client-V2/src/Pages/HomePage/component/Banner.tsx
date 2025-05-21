import { Link } from "react-router-dom";
import img2 from "../../../assets/BgImage/bg.jpg";
const Banner = () => {
  return (
    <div
      className="  hero relative min-h-[590px] xl:min-h-[700px] px-3 py-5 "
      style={{ backgroundImage: `url(${img2})` }}
    >
      <div className="lg:absolute lg:left-[150px] lg:bottom-1/2 md:left-[100px] md:top-25 lg:top-28 text-center lg:text-left">
        <h1 className="mb-5 text-5xl md:text-7xl  font-bold text-orange-400">
          Delicious Foods With <br /> Wonderful Eating
        </h1>
        <p className="mb-5 text-2xl font-semibold text-green-500">
          Satisfy Your Cravings
        </p>
        <div className="">
          <button className="btn  hover:bg-orange-500  outline-none bg-orange-400 border-none  text-white  duration-500 ">
            <Link to="/food-item">Explore Now</Link>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Banner;
