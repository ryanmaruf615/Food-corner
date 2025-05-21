import { useParams } from "react-router-dom";
import SectionHeader from "../../components/common/SectionHeader/SectionHeader";
import { useGetMenuDetailsQuery } from "../../Redux/api/menuApi/menuApi";
import { useState } from "react";
import { FoodDetailsContent } from "./FoodDetailsContent";
import LoadingUi from "../../components/common/LoadingUi/LoadingUi";
import ReactHelemt from "../../components/common/ReactHelmet/ReactHelemt";

import { Effect } from "../../components/FramerMotion/Effect";

const FoodDetails = () => {
  const [index, setIndex] = useState(0);
  const { id } = useParams<{ id: string }>();
  const { data: menuDetails, isLoading } = useGetMenuDetailsQuery(
    { id: id as string },
    { skip: !id }
  );

  console.log(menuDetails);
  return (
    <>
      <ReactHelemt title=": Menu-Details"></ReactHelemt>
      <SectionHeader text="Menu Details" />
      {isLoading ? (
        <LoadingUi />
      ) : (
        <Effect>
          <FoodDetailsContent
            menuDetails={menuDetails}
            index={index}
            setIndex={setIndex}
          />
        </Effect>
      )}
    </>
  );
};

export default FoodDetails;
