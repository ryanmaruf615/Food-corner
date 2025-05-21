import { motion } from "framer-motion";
import { ReactNode } from "react";

const CardAnimation = ({ children }: { children: ReactNode }) => {
  return (
    <motion.div
      className="rounded"
      whileHover={{
        scale: 1.01,
        boxShadow: "0px 5px 15px rgba(0, 0, 0, 0.1)",
      }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      {children}
    </motion.div>
  );
};

export default CardAnimation;
