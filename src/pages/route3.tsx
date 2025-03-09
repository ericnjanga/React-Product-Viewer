import { useNavigation } from "../NavigationContext.tsx";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { motion } from "framer-motion";
import Image360Viewer from "../components/Image360Viewer.tsx";

const Route3 = () => {
  const { isBack, setIsBack } = useNavigation();
  const navigate = useNavigate();
  const pageVariants = {
    initial: { x: isBack ? "-100%" : "100%", opacity: 0 },
    animate: {
      x: 0,
      opacity: 1,
      transition: { duration: 0.3, ease: "easeInOut" },
    },
    exit: {
      x: isBack ? "100%" : "-100%",
      opacity: 0,
      transition: { duration: 0.2, ease: "easeInOut" },
    },
  };

  useEffect(() => {
    setIsBack(true); // Mark as "backward" navigation
  });

  return (
    <motion.div
      initial="initial"
      animate="animate"
      exit="exit"
      variants={pageVariants}
      className="page"
    >
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          <button
            onClick={() => {
              navigate("/");
            }}
          >
            <span className="icon-back material-symbols-outlined">
              arrow_back
            </span>
          </button>
        </div>
      </nav>
      <div className="container">
        <div className="max-w-[500px]">
          <h2>Visualiseur 360°</h2>
          <Image360Viewer />
        </div>
      </div>
    </motion.div>
  );
};

export default Route3;
