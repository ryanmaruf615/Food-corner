import { ReactNode } from "react";
import { motion } from "framer-motion";

export const Effect = ({ children }: { children: ReactNode }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        type: "spring",
        stiffness: 300,
        damping: 15,
        duration: 0.6,
      }}
      className="h-full"
    >
      {children}
    </motion.div>
  );
};
