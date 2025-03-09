import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
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
  const sphereRef = useRef<THREE.Mesh | null>(null); // Référence pour la sphère

  useEffect(() => {
    if (!containerRef.current) return;

    // Initialisation de la scène
    if (!sceneRef.current) {
      sceneRef.current = new THREE.Scene();
    }

    // Création de la caméra
    if (!cameraRef.current) {
      const camera = new THREE.PerspectiveCamera(
        75,
        containerRef.current.clientWidth / containerRef.current.clientHeight,
        0.1,
        1000,
      );
      camera.position.set(0, 0, 0.1);
      cameraRef.current = camera;
    }

    // Création du renderer
    if (!rendererRef.current) {
      const renderer = new THREE.WebGLRenderer({ antialias: true });
      renderer.setSize(
        containerRef.current.clientWidth,
        containerRef.current.clientHeight,
      );
      containerRef.current.appendChild(renderer.domElement);
      rendererRef.current = renderer;
    }

    // Suppression de l'ancienne sphère si elle existe
    if (sphereRef.current) {
      sceneRef.current?.remove(sphereRef.current);
      sphereRef.current.geometry.dispose();
      sphereRef.current.material.dispose();
      sphereRef.current = null;
    }

    // Chargement de la texture panoramique
    const textureLoader = new THREE.TextureLoader();
    textureLoader.load(
      imageUrl,
      (texture) => {
        const geometry = new THREE.SphereGeometry(5, 60, 40);
        geometry.scale(-1, 1, 1);
        const material = new THREE.MeshBasicMaterial({ map: texture });
        const sphere = new THREE.Mesh(geometry, material);
        sceneRef.current?.add(sphere);
        sphereRef.current = sphere; // Stocker la sphère actuelle
      },
      undefined,
      (error) => {
        console.error("Erreur lors du chargement de la texture:", error);
      },
    );

    // Ajout des contrôles OrbitControls
    if (!controlsRef.current) {
      const controls = new OrbitControls(
        cameraRef.current,
        rendererRef.current.domElement,
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

    // Fonction d'animation
    const animate = () => {
      requestAnimationFrame(animate);
      controlsRef.current?.update();
      rendererRef.current?.render(sceneRef.current, cameraRef.current);
    };
    animate();

    // Gestion du redimensionnement
    const handleResize = () => {
      if (!containerRef.current || !cameraRef.current || !rendererRef.current)
        return;
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
