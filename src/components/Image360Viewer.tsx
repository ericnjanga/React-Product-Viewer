import image1 from "../assets/images/image3.jpg";
import Viewer360 from "./three.tsx";

const Image360Viewer = () => {
  return (
    <div className="viewer-container">
      <Viewer360
        imageUrl={image1}
        height="500px"
        autoRotate={true}
        rotationSpeed={0.3}
      />
    </div>
  );
};

export default Image360Viewer;
