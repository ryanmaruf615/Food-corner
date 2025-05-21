import React from "react";
import { motion } from "framer-motion";

// Define the animation variants for framer-motion
const skeletonVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  pulse: {
    opacity: [0.6, 1],
    transition: {
      duration: 1,
      repeat: Infinity,
      repeatType: "reverse" as const,
    }, // Explicitly casting "reverse" to match the expected type
  },
};

// SkeletonCard component with no props, purely for display purposes
const SkeletonCard: React.FC = () => {
  return (
    <motion.div
      className="rounded-lg w-72"
      initial="hidden"
      animate="visible"
      variants={skeletonVariants}
    >
      {/* Skeleton Image */}
      <div className="p-5">
        <motion.div
          className="rounded-3xl bg-gray-300 h-64 w-full animate-pulse"
          variants={skeletonVariants}
          animate="pulse"
        ></motion.div>
      </div>

      {/* Skeleton Content */}
      <div className="px-4 pb-4">
        {/* Skeleton Title */}
        <motion.div
          className="bg-gray-300 h-6 w-3/4 rounded-md animate-pulse mb-2"
          variants={skeletonVariants}
          animate="pulse"
        ></motion.div>

        {/* Skeleton Description */}
        <motion.div
          className="bg-gray-300 h-4 w-full rounded-md animate-pulse mb-1"
          variants={skeletonVariants}
          animate="pulse"
        ></motion.div>
        <motion.div
          className="bg-gray-300 h-4 w-5/6 rounded-md animate-pulse"
          variants={skeletonVariants}
          animate="pulse"
        ></motion.div>

        {/* Skeleton Price and Rating */}
        <div className="flex justify-between items-center mt-4">
          <motion.div
            className="bg-gray-300 h-6 w-16 rounded-md animate-pulse"
            variants={skeletonVariants}
            animate="pulse"
          ></motion.div>
          <motion.div
            className="bg-gray-300 h-6 w-24 rounded-md animate-pulse"
            variants={skeletonVariants}
            animate="pulse"
          ></motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default SkeletonCard;
