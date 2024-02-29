import { atom } from "jotai";

/**
 * Global toggle for sound on/off.
 */
export const soundEnabledAtom = atom(true);

/**
 * Bridge atom between canvas and HTML so some HTML elements
 * can't be targeted by the laser eyes.
 */
export const laserEyesEnabledAtom = atom(false);
