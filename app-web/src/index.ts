import { GlobeInstance } from "globe.gl";
import { emitArc } from "./globe/emitArc";
import { initialiseGlobe } from "./globe/globe";
import { getOwnCoordinates } from "./httpServices/coordinates";
import { getDistanceBetween } from "./httpServices/distance";


window.addEventListener('DOMContentLoaded', () => {
  doTheCoolStuff();
});

async function doTheCoolStuff() {
  const loadingPlaceholderEl = document.querySelector('.loading-placeholder') as HTMLElement;
  const contentEl = document.querySelector('.content') as HTMLElement;
  const globeContainerEl = document.querySelector('.globe-container') as HTMLElement;
  const captionEl = document.querySelector('.caption') as HTMLElement;
  
  let globe: GlobeInstance;

  const { latitude: ownLatitude, longitude: ownLongitude } = await getOwnCoordinates();
  const ownLocationData = [{
    lat: Number(ownLatitude),
    lng: Number(ownLongitude),
  }];

  // ⛔️ DO NOT TRY THIS AT HOME ⛔️
  // the edge request is so fast we barely get to see that beautiful 
  // loading animation we worked so hard on. Let's give users at least
  // a few seconds glimpse into it ^.^
  setTimeout(() => {
    // we're done loading the data we need so let's display
    // the appropriate view
    loadingPlaceholderEl.classList.remove('loading');
    contentEl.classList.remove('loading');

    globe = initialiseGlobe(globeContainerEl);

    globe.ringsData(ownLocationData);
    globe.pointOfView({
      // always start at own coordinates
      lat: ownLatitude,
      lng: ownLongitude
    });

    globe.onGlobeClick(async ({ lat: endLat, lng: endLng }) => {
      let distanceBetween = await getDistanceBetween({
        latitude: Number(ownLatitude),
        longitude: Number(ownLongitude)
      }, {
        latitude: endLat,
        longitude: endLng
      });

      emitArc(globe, {
        startLat: ownLatitude, 
        startLng: ownLongitude, 
        endLat, 
        endLng,
      });

      captionEl.innerHTML = `the distance between us on the surface of Earth is ${distanceBetween} kilometers`;
    });
  }, 2000);
}


