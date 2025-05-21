import { ReactNode } from "react";
import { motion } from "framer-motion";
const pageVariants = {
  hidden: { opacity: 0.6, y: 100 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  exit: { opacity: 0, y: -100, transition: { duration: 0.5 } },
};
const BottomToTop = ({ children }: { children: ReactNode }) => {
  return (
    <motion.div initial="hidden" animate="visible" variants={pageVariants}>
      {children}
    </motion.div>
  );
};

export default BottomToTop;
