import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useLocation,
} from "react-router-dom";
import "./App.scss";
import ReactPlayer from "react-player";
import { motion } from "framer-motion";
import { AnimatePresence } from "framer-motion";
import { NavigationProvider, useNavigation } from "./NavigationContext";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import ThreeDModels from "./pages/ThreeDModels.tsx";

const Home = () => {
  const { isBack, setIsBack } = useNavigation();
  const pageVariants = {
    initial: { x: isBack ? "100%" : "-100%", opacity: 0 },
    animate: {
      x: 0,
      opacity: 1,
      transition: { duration: 0.3, ease: "easeInOut" },
    },
    exit: {
      x: isBack ? "-100%" : "100%",
      opacity: 0,
      transition: { duration: 0.2, ease: "easeInOut" },
    },
  };

  useEffect(() => {
    setTimeout(() => {
      setIsBack(false);
    }, 0.5);
  });

  return (
    <motion.div
      initial="initial"
      animate="animate"
      exit="exit"
      variants={pageVariants}
      className="page"
    >
      <div className="container">
        <div className="col">
          <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container-fluid">
              <Link to={"/"}>
                <b>360 Viewer App</b>
              </Link>
            </div>
          </nav>

          <ul className="list-group">
            <li className="list-group-item d-flex justify-content-between align-items-center">
              <Link to={"/3D-models"}>Using 3D Models</Link>
            </li>
            <li className="list-group-item d-flex justify-content-between align-items-center">
              <Link to={"/videos"}>Using videos</Link>
            </li> 
          </ul>
        </div>
      </div>
    </motion.div>
  );
};

const Route1 = () => {
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
        <div className="col">
          <h3>Caramels shortbread caramels</h3>
          <p>
            Sesame snaps candy cake oat cake shortbread soufflé. Caramels
            shortbread caramels cotton candy biscuit oat cake. Toffee sugar plum
            wafer cupcake oat cake chupa chups sugar plum. Caramels gingerbread
            cupcake marzipan toffee wafer chocolate ice cream bonbon.
          </p>
          <ReactPlayer
            url="/videos/alpha.mp4"
            playing={false}
            controls={true}
            width="100%"
            height="auto"
          />

          <br />
          <br />

          <h3>Caramels shortbread caramels</h3>
          <p>
            Sesame snaps candy cake oat cake shortbread soufflé. Caramels
            shortbread caramels cotton candy biscuit oat cake. Toffee sugar plum
            wafer cupcake oat cake chupa chups sugar plum. Caramels gingerbread
            cupcake marzipan toffee wafer chocolate ice cream bonbon.
          </p>
          <ReactPlayer
            url="/videos/beta.mp4"
            playing={false}
            controls={true}
            width="100%"
            height="auto"
          />
        </div>
      </div>
    </motion.div>
  );
};

const Route2 = () => {
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
        <div className="col">
          <h3>Caramels shortbread caramels</h3>
          <p>
            Hello, hello ... Sesame snaps candy cake oat cake shortbread
            soufflé. Caramels shortbread caramels cotton candy biscuit oat cake.
            Toffee sugar plum wafer cupcake oat cake chupa chups sugar plum.
            Caramels gingerbread cupcake marzipan toffee wafer chocolate ice
            cream bonbon.
          </p>
          <ReactPlayer
            url="/videos/beta.mp4"
            playing={false}
            controls={true}
            width="100%"
            height="auto"
          />

          <br />
          <br />

          <h3>Caramels shortbread caramels</h3>
          <p>
            Sesame snaps candy cake oat cake shortbread soufflé. Caramels
            shortbread caramels cotton candy biscuit oat cake. Toffee sugar plum
            wafer cupcake oat cake chupa chups sugar plum. Caramels gingerbread
            cupcake marzipan toffee wafer chocolate ice cream bonbon.
          </p>
          <ReactPlayer
            url="/videos/alpha.mp4"
            playing={false}
            controls={true}
            width="100%"
            height="auto"
          />
        </div>
      </div>
    </motion.div>
  );
};

const AnimatedRoutes = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode="sync">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Home />} />
        <Route path="/videos" element={<Route1 />} />
        <Route path="/route2" element={<Route2 />} />
        <Route path="/3D-models" element={<ThreeDModels />} />
      </Routes>
    </AnimatePresence>
  );
};

function App() {
  return (
    <NavigationProvider>
      <Router>
        <AnimatedRoutes />
      </Router>
    </NavigationProvider>
  );
}

export default App;
