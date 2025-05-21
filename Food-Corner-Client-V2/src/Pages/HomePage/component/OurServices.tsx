import img1 from "../../../assets/services/bg3.jpg";
import img2 from "../../../assets/services/food.png";

import img3 from "../../../assets/services/chef.png";
import img4 from "../../../assets/services/clean.png";
import img5 from "../../../assets/services/order.png";
import img6 from "../../../assets/services/place.png";
import img7 from "../../../assets/services/time.png";
import { LazyLoadImage } from "react-lazy-load-image-component";
const OurServices = () => {
  const parallax = {
    /* The image used */
    backgroundImage: `url(${img1})`,
    minHeight: "500px",
    backgroundAttachment: "fixed",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
  };
  return (
    <div className="relative py-10 " style={parallax}>
      <div className=" container mx-auto backdrop-blur-sm pt-3">
        <div className="container  mx-auto z-50 ">
          <div className=" grid grid-cols-1  md:grid-cols-3 lg:grid-cols-3 gap-2 md:gap-10 items-center md:mx-20 mx-4 text-white">
            <div className=" md:col-span-2 lg:col-span-1">
              <div className=" flex flex-col gap-5">
                <h1 className="text-5xl">We are more than multiple survice</h1>
                <p>
                  This is a type of restaurant which typically serves food and
                  drinks, in addition to light refreshment such as backed goods
                  or snacks. The term comes from he rench word meaning food.
                </p>
                {/* <button className='btn btn-primary w-1/2'>Discover Now</button> */}
              </div>
            </div>
            <div className="">
              <LazyLoadImage
                alt={"Image"}
                src={img2} // use normal <img> attributes as props
                className="hover:-translate-y-1 duration-700 min-w-[200px]"
              />

              {/* <img className='hover:-translate-y-1 duration-700 min-w-[200px]' src={img2} alt="" /> */}
            </div>
            <div className="grid md:col-span-3 lg:col-span-1 text-white grid-cols-2 gap-9">
              <div className="flex gap-5">
                <img className="w-[50px] h-[50px]" src={img6} alt="" />
                <h1>Foodie Place</h1>
              </div>
              <div className="flex gap-5">
                <img className="w-[50px] h-[50px]" src={img7} alt="" />
                <h1>24/7 Service</h1>
              </div>
              <div className="flex gap-5">
                <img className="w-[50px] h-[50px]" src={img5} alt="" />
                <h1>Online Order</h1>
              </div>
              <div className="flex gap-5">
                <img className="w-[50px] h-[50px]" src={img3} alt="" />
                <h1>Super Chef</h1>
              </div>
              <div className="flex gap-5">
                <img className="w-[50px] h-[50px]" src={img4} alt="" />
                <h1>Clean Kitchen</h1>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OurServices;
