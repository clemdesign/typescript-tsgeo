/**
 * Value object for a "Inverse Vincenty" bearing calculation result.
 *
 * @author    clemdesign <contact@clemdesign.fr>
 * @license   https://opensource.org/licenses/MIT
 * @link
  */
export declare class InverseVincentyBearing {
    /**
     * @var {number}
     */
    private distance;
    /**
     * @var {number}
     */
    private bearingInitial;
    /**
     * @var {number}
     */
    private bearingFinal;
    /**
     * Bearing constructor.
     *
     * @param {Coordinate} distance
     * @param {number} bearingInitial
     * @param {number} bearingFinal
     */
    constructor(distance: number, bearingInitial: number, bearingFinal: number);
    /**
     * @return number
     */
    getDistance(): number;
    /**
     * @return number
     */
    getBearingInitial(): number;
    /**
     * @return number
     */
    getBearingFinal(): number;
}
