import { GlobeInstance } from "globe.gl";
import { Arc } from "./defaultConfig";

export interface Arc {
  startLat: number;
  startLng: number;
  endLat: number;
  endLng: number;
};

export function emitArc(globe: GlobeInstance, arc: Arc) {
  const arcDashAnimateTime = globe.arcDashAnimateTime() as number;
  const arcDashLength = globe.arcDashLength() as number;

  globe.arcsData([...globe.arcsData(), arc]);

  // add and remove arc after 1 cycle
  setTimeout(() => globe.arcsData(globe.arcsData().filter(d => d !== arc)), arcDashAnimateTime * 2);

  // add and remove target rings
  setTimeout(() => {
    const targetRing = { lat: arc.endLat, lng: arc.endLng };

    globe.ringsData([...globe.ringsData(), targetRing]);
    setTimeout(() => globe.ringsData(globe.ringsData().filter(r => r !== targetRing)), arcDashAnimateTime * arcDashLength);
  }, arcDashAnimateTime);
}