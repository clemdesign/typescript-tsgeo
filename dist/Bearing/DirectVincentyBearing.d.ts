/**
 * Value object for a "Direct Vincenty" bearing calculation result.
 *
 * @author    clemdesign <contact@clemdesign.fr>
 * @license   https://opensource.org/licenses/MIT
 * @link
  */
import { Coordinate } from "../Coordinate";
export declare class DirectVincentyBearing {
    /**
     * @var {Coordinate}
     */
    private destination;
    /**
     * @var {number}
     */
    private bearingFinal;
    /**
     * Bearing constructor.
     *
     * @param {Coordinate} destination
     * @param {number} bearingFinal
     */
    constructor(destination: Coordinate, bearingFinal: number);
    /**
     * @return Coordinate
     */
    getDestination(): Coordinate;
    /**
     * @return number
     */
    getBearingFinal(): number;
}
