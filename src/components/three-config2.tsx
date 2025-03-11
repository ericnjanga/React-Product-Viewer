import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader"; // Import GLTFLoader
import "../pages/style/index.scss";

interface Viewer360Props {
  imageUrl: string;
  width?: string;
  height?: string;
  autoRotate?: boolean;
  rotationSpeed?: number;
}

const Viewer360: React.FC<Viewer360Props> = ({
  imageUrl,
  width = "100%",
  height = "400px",
  autoRotate = true,
  rotationSpeed = 0.5,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const controlsRef = useRef<OrbitControls | null>(null);
  const modelRef = useRef<THREE.Object3D | null>(null); // Reference to the 3D model


 
  useEffect(() => {
    if (!containerRef.current) return;
  
    // Initialize the scene, camera, and renderer
    if (!sceneRef.current) {
      sceneRef.current = new THREE.Scene();
    }
  
    if (!cameraRef.current) {
      const camera = new THREE.PerspectiveCamera(
        75,
        containerRef.current.clientWidth / containerRef.current.clientHeight,
        0.1,
        1000,
      );
      camera.position.set(3, 0, 1); // Adjusted to view from the side (along the x-axis)
      cameraRef.current = camera;
    }
  
    if (!rendererRef.current) {
      const renderer = new THREE.WebGLRenderer({ antialias: true });
      renderer.setSize(
        containerRef.current.clientWidth,
        containerRef.current.clientHeight,
      );
      containerRef.current.appendChild(renderer.domElement);
      renderer.setClearColor(0xffffff, 1); // Set background to white
      rendererRef.current = renderer;
    }
  
    // Add lighting
    const ambientLight = new THREE.AmbientLight(0x404040, 0.8); // Increase ambient light intensity
    sceneRef.current?.add(ambientLight);
  
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1); // Increase intensity for better illumination
    directionalLight.position.set(5, 5, 5).normalize(); // Move light to a better position
    sceneRef.current?.add(directionalLight);
  
    // Optional: Add another light source to illuminate the darker side
    const fillLight = new THREE.DirectionalLight(0xffffff, 0.6); // Lower intensity for the fill light
    fillLight.position.set(-5, -5, -5).normalize(); // Light coming from the opposite direction
    sceneRef.current?.add(fillLight);
  
    // Remove old model if it exists
    if (modelRef.current) {
      sceneRef.current?.remove(modelRef.current);
      modelRef.current = null;
    }
  
    // Load model or texture
    if (imageUrl.endsWith(".glb")) {
      const loader = new GLTFLoader();
      loader.load(
        imageUrl,
        (gltf) => {
          const model = gltf.scene;
          sceneRef.current?.add(model);
          modelRef.current = model;
  
          // Scale the model to make it larger
          model.scale.set(3, 3, 3); // Scale the model by a factor of 3
  
          // Rotate the model to orient it properly if needed
          model.rotation.y = Math.PI / 2; // Rotate 90 degrees to show the side
        },
        undefined,
        (error) => {
          console.error("Error loading .glb file:", error);
        }
      );
    } else {
      const textureLoader = new THREE.TextureLoader();
      textureLoader.load(
        imageUrl,
        (texture) => {
          const geometry = new THREE.SphereGeometry(5, 60, 40);
          geometry.scale(-1, 1, 1);
          const material = new THREE.MeshStandardMaterial({ map: texture });
          const sphere = new THREE.Mesh(geometry, material);
          sceneRef.current?.add(sphere);
          modelRef.current = sphere;
  
          // Scale the sphere to make it larger
          sphere.scale.set(3, 3, 3); // Scale the sphere by a factor of 3
  
          // Rotate the sphere to orient it properly if needed
          sphere.rotation.y = Math.PI / 2; // Rotate 90 degrees to show the side
        },
        undefined,
        (error) => {
          console.error("Error loading texture:", error);
        }
      );
    }
  
    // Add OrbitControls for interaction
    if (!controlsRef.current) {
      const controls = new OrbitControls(
        cameraRef.current,
        rendererRef.current.domElement
      );
      controls.enableZoom = true;
      controls.enablePan = false;
      controls.rotateSpeed = 0.3;
      controls.autoRotate = autoRotate;
      controls.autoRotateSpeed = rotationSpeed;
      controls.enableDamping = true;
      controls.dampingFactor = 0.05;
      controlsRef.current = controls;
    }
  
    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);
      if (sceneRef.current && cameraRef.current) {
        controlsRef.current?.update();
        rendererRef.current?.render(sceneRef.current, cameraRef.current);
      }
    };
    animate();
  
    // Handle window resize
    const handleResize = () => {
      if (!containerRef.current || !cameraRef.current || !rendererRef.current) return;
      const width = containerRef.current.clientWidth;
      const height = containerRef.current.clientHeight;
      cameraRef.current.aspect = width / height;
      cameraRef.current.updateProjectionMatrix();
      rendererRef.current.setSize(width, height);
    };
  
    window.addEventListener("resize", handleResize);
  
    return () => {
      window.removeEventListener("resize", handleResize);
      if (rendererRef.current) {
        containerRef.current?.removeChild(rendererRef.current.domElement);
        rendererRef.current.dispose();
      }
    };
  }, [imageUrl, autoRotate, rotationSpeed]);

  
  return (
    <div className="image3d" ref={containerRef} style={{ width, height }} />
  );
};

export default Viewer360;
