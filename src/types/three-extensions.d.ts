// src/types/three-extensions.d.ts
declare module "three/examples/jsm/controls/OrbitControls" {
  import { Camera, EventDispatcher /*, MOUSE, TOUCH */} from "three";
  export class OrbitControls extends EventDispatcher {
    constructor(object: Camera, domElement: HTMLElement);

    object: Camera;
    domElement: HTMLElement;

    enabled: boolean;
    target: THREE.Vector3;
    minDistance: number;
    maxDistance: number;
    enableDamping: boolean;
    dampingFactor: number;
    enableZoom: boolean;
    zoomSpeed: number;
    enableRotate: boolean;
    rotateSpeed: number;
    enablePan: boolean;
    panSpeed: number;
    screenSpacePanning: boolean;
    keyPanSpeed: number;
    autoRotation: boolean;
    autoRotationSpeed: number;
    autoRotate: boolean;
    autoRotateSpeed: number;

    update(): void;
    reset(): void;
  }
}

declare module "three/examples/jsm/loaders/GLTFLoader" {
  import { Object3D } from "three";
  export class GLTFLoader {
    load(
      url: string,
      onLoad: (gltf: { scene: Object3D }) => void,
      onProgress?: (xhr: ProgressEvent) => void,
      onError?: (error: ErrorEvent) => void
    ): void;
  }
}
