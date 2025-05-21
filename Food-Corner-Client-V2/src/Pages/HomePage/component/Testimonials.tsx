import img1 from "..//..//../assets/testimonial.png";
import { Swiper, SwiperSlide } from "swiper/react";
import { Rating } from "@smastrom/react-rating";
import "@smastrom/react-rating/style.css";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import { useGetRatingUsQuery } from "../../../Redux/api/ratingApi/ratingApi";
import { IRateUs } from "../../../interface/rateUs.interface";
export const Testimonials = () => {
  const { data } = useGetRatingUsQuery("");
  console.log(data);
  return (
    <div className="grid grid-cols-1  md:grid-cols-3 gap-5 items-center container mx-auto my-10">
      <div className="col-span-1 mx-2">
        <img
          alt={"Testimonials"}
          src={img1} // use normal <img> attributes as props
          className="w-[200px]"
        />
        {/* <img className='w-[200px]' src={img1} alt="" /> */}
        <h1 className="text-5xl mt-2">What our customer say about us</h1>
        <p className="mt-2">
          We provide you with complete meal prep which includes the prepackaged
          necessary ingredients for a divine dinner as well as an easy to follow
          recipe guide in beautifull.
        </p>
        <div className="flex gap-5 mt-2">
          <div>
            <h1 className="text-5xl font-bold text-green-600">
              {data?.data?.totalCustomer}+
            </h1>
            <p className="font-bold">Happy Customers</p>
          </div>
          <div>
            <h1 className="text-5xl font-bold text-green-600">
              {data?.data?.totalMenu}+
            </h1>
            <p className="font-bold">Food Menu</p>
          </div>
        </div>
      </div>
      <div className="col-span-2 ">
        <Swiper
          slidesPerView={1}
          spaceBetween={10}
          pagination={{
            clickable: true,
          }}
          breakpoints={{
            640: {
              slidesPerView: 2,
              spaceBetween: 20,
            },
            768: {
              slidesPerView: 3,
              spaceBetween: 20,
            },
            1024: {
              slidesPerView: 4,
              spaceBetween: 20,
            },
          }}
          className="mySwiper"
        >
          {(data?.data?.result as IRateUs[])?.map((cmt, n: number) => {
            return (
              <SwiperSlide key={n}>
                <div className=" flex items-center flex-col ">
                  <div className="w-14 rounded-full bg-orange-400 h-14">
                    <img
                      src={cmt?.customer?.photo}
                      alt=""
                      className="rounded-full object-cover"
                    />
                  </div>
                  <div className="text-center my-2">{cmt?.comment}</div>
                  <Rating
                    readOnly
                    style={{ maxWidth: 100 }}
                    value={cmt?.rating}
                  ></Rating>
                </div>
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
    </div>
  );
};
