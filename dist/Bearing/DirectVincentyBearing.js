"use strict";
/**
 * Value object for a "Direct Vincenty" bearing calculation result.
 *
 * @author    clemdesign <contact@clemdesign.fr>
 * @license   https://opensource.org/licenses/MIT
 * @link
  */
Object.defineProperty(exports, "__esModule", { value: true });
class DirectVincentyBearing {
    /**
     * Bearing constructor.
     *
     * @param {Coordinate} destination
     * @param {number} bearingFinal
     */
    constructor(destination, bearingFinal) {
        this.destination = destination;
        this.bearingFinal = bearingFinal;
    }
    /**
     * @return Coordinate
     */
    getDestination() {
        return this.destination;
    }
    /**
     * @return number
     */
    getBearingFinal() {
        return this.bearingFinal;
    }
}
exports.DirectVincentyBearing = DirectVincentyBearing;
