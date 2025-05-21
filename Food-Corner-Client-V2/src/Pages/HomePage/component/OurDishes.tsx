import { Rating } from "@smastrom/react-rating";
import "@smastrom/react-rating/style.css";

import { Link } from "react-router-dom";
import { useTimeBasedMenuQuery } from "../../../Redux/api/menuApi/menuApi";
import { useAppDispatch } from "../../../Redux/hooks";
import { filterMenuAvailable } from "../../../Redux/feature/menuFiltterSlice/menuFilterSlice";
import SkeletonCard from "../../../components/SkeletonLoading/SkeletonCard";
import CardAnimation from "../../../components/FramerMotion/CardAnimation";

const OurDishes = () => {
  const { data, isLoading } = useTimeBasedMenuQuery("");
  const dispatch = useAppDispatch();
  console.log(data);
  return (
    <div className="container mx-auto px-1 my-5 ">
      <div className="grid  lg:grid-cols-7 gap-3 items-center">
        <div className="lg:col-span-2  text-orange-400 text-nowrap font-semibold">
          {data?.availableTime.breakfast && <p>It's Breakfast Time</p>}
          {data?.availableTime.lunch && <p>It's Lunch Time</p>}
          {data?.availableTime.dinner && <p>It's Dinner Time</p>}
          <p></p>
          <p className="text-4xl sm:text-5xl text-green-500 font-bold">
            Our Dishes
          </p>
        </div>
        <div className=" lg:col-span-4">
          <p className="font-semibold  ">
            Embark on a Thai Taste Odyssey!Immerse yourself in the vibrant
            flavors of Thailand, where every dish is a harmonious blend of
            sweet, spicy, and savory delights.
          </p>
        </div>
        <div className="ms-auto">
          <Link
            onClick={() =>
              dispatch(
                filterMenuAvailable(
                  data?.availableTime.breakfast
                    ? "breakfast"
                    : data?.availableTime.dinner
                    ? "dinner"
                    : data?.availableTime.lunch
                    ? "lunch"
                    : ""
                )
              )
            }
            to={"/food-item"}
            className="text-green-500 text-sm me-1 md:me-0 font-semibold"
          >
            VIEW MORE {"->"}
          </Link>
        </div>
      </div>
      <div className="my-5 grid gap-10 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 justify-items-center">
        {data?.data?.map((item) => (
          <CardAnimation key={item._id}>
            {" "}
            <div key={item._id} className="rounded-lg  w-72">
              <div className="p-5 overflow-hidden ">
                <Link to={`/food-item/${item._id}`}>
                  {" "}
                  <figure>
                    <img
                      className="rounded-3xl object-cover hover:scale-105 duration-300 h-64 "
                      src={item.photo}
                      alt={item.title}
                    />
                  </figure>
                </Link>
              </div>
              <div className="px-4 pb-4">
                <h2 className="card-title">{item.title}</h2>
                <p>
                  {" "}
                  {item?.description.length > 45
                    ? item.description.slice(0, 45) + "..."
                    : item?.description}
                </p>
                <div className="card-actions justify-between mt-2">
                  <p className="font-bold text-green-500 ">
                    {item.price[0].price}{" "}
                    <span className="text-orange-400">Tk</span>
                  </p>
                  <Rating readOnly style={{ maxWidth: 100 }} value={4}></Rating>
                </div>
              </div>
            </div>
          </CardAnimation>
        ))}
        {isLoading && (
          <>
            <SkeletonCard></SkeletonCard>
            <SkeletonCard></SkeletonCard>
            <SkeletonCard></SkeletonCard>
            <SkeletonCard></SkeletonCard>
          </>
        )}
      </div>
    </div>
  );
};

export default OurDishes;
