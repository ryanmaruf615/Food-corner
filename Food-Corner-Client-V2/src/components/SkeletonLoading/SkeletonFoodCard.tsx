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

const SkeletonFoodCard: React.FC = () => {
  return (
    <motion.div
      className="shadow-md w-80 sm:w-96 animate-pulse"
      variants={skeletonVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="p-4 shadow-inner">
        <div className="grid gap-3 sm:gap-0.5 sm:grid-cols-2 items-center">
          {/* Image Skeleton */}
          <div className="mx-auto sm:mx-0 w-40 h-40 bg-gray-300 rounded-lg"></div>

          {/* Text Section Skeleton */}
          <div>
            {/* Title Skeleton */}
            <div className="h-6 bg-gray-300 rounded mb-2"></div>

            {/* Rating Skeleton */}
            <div className="w-24 h-4 bg-gray-300 rounded mb-2"></div>

            {/* Description Skeleton */}
            <div className="h-4 bg-gray-300 rounded mb-1"></div>
            <div className="h-4 bg-gray-300 rounded mb-4"></div>

            {/* Price and Size Section */}
            <div className="flex justify-between">
              <div className="flex gap-5">
                <div className="w-16 h-6 bg-gray-300 rounded"></div>
                <div className="w-12 h-6 bg-gray-300 rounded"></div>
              </div>

              {/* Cart Icon Skeleton */}
              <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default SkeletonFoodCard;
