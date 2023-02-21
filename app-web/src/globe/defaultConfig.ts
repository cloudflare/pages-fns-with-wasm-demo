/* -------------------------------- */
/*           MISCELLANEOUS          */
/* -------------------------------- */
export const globeImage = '//unpkg.com/three-globe/example/img/earth-night.jpg';
export const colorInterpolator = t => `rgba(255, 255, 170, ${Math.sqrt(1-t)})`;

/* -------------------------------- */
/*       ARCS LAYER DEFAULTS        */
/* -------------------------------- */
export const Arc = {
  stroke: 0.3,
  dashLength: 1,
  dashStroke: 3,
  dashGap: 2,
  dashInitialGap: 1,
  dashAnimateTime: 1000,
  transitionDuration: 0,
} as const;

/* -------------------------------- */
/*       RINGS LAYER DEFAULTS       */
/* -------------------------------- */

export const Ring = {
  resolution: 100,
  maxRadius: 5,
  repeatPeriod: 2000,
} as const;

/* -------------------------------- */
/*          GLOBE CONTROLS          */
/* -------------------------------- */

export const Controls = {
  autoRotate: true,
  autoRotateSpeed: 0.3,
} as const;