import ReactHelemt from "../../components/common/ReactHelmet/ReactHelemt";
import { motion } from "framer-motion";
import Banner from "./component/Banner";
import NewsLetter from "./component/NewsLetter";
import OurDishes from "./component/OurDishes";
import OurServices from "./component/OurServices";
import { Testimonials } from "./component/Testimonials";
import { TopRatedItem } from "./component/TopRatedItem";

const HomePage = () => {
  const fadeInVariant = {
    hidden: { opacity: 0.5 },
    visible: { opacity: 1, transition: { duration: 0.7 } },
  };

  return (
    <motion.div initial="hidden" animate="visible" variants={fadeInVariant}>
      <ReactHelemt title=" : Home"></ReactHelemt>
      <Banner />

      <OurDishes />

      <OurServices />

      <TopRatedItem />

      <NewsLetter />

      <Testimonials />
    </motion.div>
  );
};

export default HomePage;
