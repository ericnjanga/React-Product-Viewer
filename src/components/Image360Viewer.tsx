// import image1 from "../assets/images/image3.jpg";
// import sneakers from "../assets/images/sneakers.glb";
import milan from "../assets/images/milan.jpg";
import Viewer360 from "./three-config2.tsx";
import Viewer360Beta from "./three-config1.tsx";

const Image360Viewer = () => {
  return (
    <div className="viewer-container">
      <Viewer360
        imageUrl='/models/wine-bottle.glb'
        height="500px"
        autoRotate={true}
        rotationSpeed={0.3}
      />
    </div>
  );
};

export const Image360Viewer2 = () => {
  return (
    <div className="viewer-container">
      <Viewer360Beta
        imageUrl={milan}
        height="500px"
        autoRotate={true}
        rotationSpeed={0.3}
      />
    </div>
  );
};

export default Image360Viewer; 
