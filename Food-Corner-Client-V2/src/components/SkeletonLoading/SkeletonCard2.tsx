import React from "react";
import { motion } from "framer-motion";

const skeletonVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.3 },
  },
};

const SkeletonCard_Two: React.FC = () => {
  return (
    <motion.div
      className="w-72 h-[450px] shadow border rounded-xl p-4 animate-pulse bg-gray-200"
      variants={skeletonVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Image Section */}
      <div className="w-full h-2/3 bg-gray-300 rounded-xl mb-4"></div>

      {/* Title Section */}
      <div className="h-6 bg-gray-300 rounded mb-2"></div>

      {/* Description Section */}
      <div className="h-4 bg-gray-300 rounded mb-2"></div>
      <div className="h-4 bg-gray-300 rounded mb-4"></div>

      {/* Price and Size Section */}
      <div className="flex justify-between">
        <div className="w-1/3 h-6 bg-gray-300 rounded"></div>
        <div className="w-1/3 h-6 bg-gray-300 rounded"></div>
      </div>
    </motion.div>
  );
};

export default SkeletonCard_Two;
