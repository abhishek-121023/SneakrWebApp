declare module '@ar-js-org/ar.js/three.js/build/ar.js' {
  export class ArToolkitSource {
    constructor(params: { sourceType: string; sourceWidth: number; sourceHeight: number });
    init(): Promise<void>;
    onResizeElement();
    copyElementSizeTo(element: HTMLElement);
    ready: boolean;
    domElement: HTMLElement;
  }

  export class ArToolkitContext {
    constructor(params: { cameraParametersUrl: string; detectionMode: string });
    init(): Promise<void>;
    update(element: HTMLElement);
    arController: { canvas: HTMLElement } | null;
  }

  export class ArMarkerControls {
    constructor(context: ArToolkitContext, object: any, params: any);
  }
} 