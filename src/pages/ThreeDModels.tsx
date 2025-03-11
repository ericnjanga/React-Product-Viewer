import { useNavigation } from "../NavigationContext.tsx";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { motion } from "framer-motion";
import Image360Viewer, { Image360Viewer2 } from "../components/Image360Viewer.tsx";

const ThreeDModels = () => {
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
          <h1>3D Product Viewing</h1>
          <p>We use <a href="https://threejs.org/" target="_blank">Three.js</a> to display 3D product models, allowing customers to interact with products by <span className="badge text-bg-info">rotating</span>, <span className="badge text-bg-info">zooming</span>, and <span className="badge text-bg-info">viewing them from different angles</span>. This enhances the shopping experience by providing a realistic and immersive way to explore items before purchase.</p>
          
          
          <br />
          <br />




          <h2>3D models</h2>
          <p><span className="badge text-bg-primary">.glb</span> files offer a 3D experience  that includes not only textures but also geometry, lighting, animations, and materials in a single file. <small>(Other formats like <span className="badge text-bg-secondary">.obj</span> or <span className="badge text-bg-secondary">.fbx</span> are available, but offer less performance (slower loading time, fewer options).</small></p>

          <Image360Viewer />
          
          <br />
          <br />

          <h2>Images</h2>
          <p><span className="badge text-bg-primary">.jpg</span> files are limited to a 2D experience despite being lightweight and fast-loading.</p>
          <Image360Viewer2 />
        </div>
      </div>
    </motion.div>
  );
};

export default ThreeDModels;
