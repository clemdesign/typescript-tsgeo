"use strict";
/**
 * Value object for a "Inverse Vincenty" bearing calculation result.
 *
 * @author    clemdesign <contact@clemdesign.fr>
 * @license   https://opensource.org/licenses/MIT
 * @link
  */
Object.defineProperty(exports, "__esModule", { value: true });
class InverseVincentyBearing {
    /**
     * Bearing constructor.
     *
     * @param {Coordinate} distance
     * @param {number} bearingInitial
     * @param {number} bearingFinal
     */
    constructor(distance, bearingInitial, bearingFinal) {
        this.distance = distance;
        this.bearingInitial = bearingInitial;
        this.bearingFinal = bearingFinal;
    }
    /**
     * @return number
     */
    getDistance() {
        return this.distance;
    }
    /**
     * @return number
     */
    getBearingInitial() {
        return this.bearingInitial;
    }
    /**
     * @return number
     */
    getBearingFinal() {
        return this.bearingFinal;
    }
}
exports.InverseVincentyBearing = InverseVincentyBearing;
