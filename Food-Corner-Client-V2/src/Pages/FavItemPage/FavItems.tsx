import LoadingUi from "../../components/common/LoadingUi/LoadingUi";
import ReactHelemt from "../../components/common/ReactHelmet/ReactHelemt";
import SectionHeader from "../../components/common/SectionHeader/SectionHeader";
import { Effect } from "../../components/FramerMotion/Effect";
import { useGetUserFavMenuQuery } from "../../Redux/api/favMenuApi/favMenuApi";
import { useAppSelector } from "../../Redux/hooks";
import FavCard from "./FavCard";

const FavItems = () => {
  const { user } = useAppSelector((state) => state.auth);
  const { data, isLoading } = useGetUserFavMenuQuery(undefined, {
    skip: !user || user?.role !== "customer",
  });

  return (
    <div>
      <ReactHelemt title=": Fav-Items"></ReactHelemt>
      <SectionHeader text="Your Favourite Items"></SectionHeader>
      {isLoading ? (
        <LoadingUi />
      ) : (
        <Effect>
          {" "}
          <div className="container mx-auto px-2 my-5">
            {data?.products.map((item) => (
              <FavCard itemData={item} key={item._id}></FavCard>
            ))}
          </div>
        </Effect>
      )}
    </div>
  );
};

export default FavItems;
