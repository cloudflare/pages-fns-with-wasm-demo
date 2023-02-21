import { Arc, colorInterpolator, globeImage, Ring } from "./defaultConfig";
import Globe, { GlobeInstance } from "globe.gl";

let globe: GlobeInstance;

/**
 * Create a Globe object and initialise it with our predefined defaults
 */
export function initialiseGlobe(containerElement: HTMLElement): GlobeInstance {
  if(!containerElement || !(containerElement instanceof HTMLElement)) {
    throw new Error(`Missing or invalid container element. Cannot initialise globe without a valid container DOM node. Received ${containerElement}.`);
  }

  if(!globe) {
    globe = Globe();
  }

  globe(containerElement)
    /** globe image */ 
    .globeImageUrl(globeImage)

    /** arcs layer */
    .arcStroke(Arc.stroke)
    .arcDashGap(Arc.dashGap)
    .arcDashLength(Arc.dashLength)
    .arcDashInitialGap(Arc.dashInitialGap)
    .arcDashAnimateTime(Arc.dashAnimateTime)
    .arcsTransitionDuration(Arc.transitionDuration)

    /** rings layer */
    .ringColor(() => colorInterpolator)
    .ringMaxRadius(Ring.maxRadius)
    .ringResolution(Ring.resolution)
    .ringRepeatPeriod(Ring.repeatPeriod);

  globe.controls().autoRotate = true;
  globe.controls().autoRotateSpeed = 0.3;

  return globe;
}