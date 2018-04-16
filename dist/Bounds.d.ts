/**
 * Coordinate Bounds Class
 *
 * @author    clemdesign <contact@clemdesign.fr>
 * @license   https://opensource.org/licenses/MIT
 * @link
  */
import { Coordinate } from "./Coordinate";
export declare class Bounds {
    /**
     * @var Coordinate
     */
    protected northWest: Coordinate;
    /**
     * @var Coordinate
     */
    protected southEast: Coordinate;
    /**
     *
     * @param {Coordinate} northWest
     * @param {Coordinate} southEast
     */
    constructor(northWest: Coordinate, southEast: Coordinate);
    /**
     * Getter
     *
     * @returns {Coordinate}
     */
    getNorthWest(): Coordinate;
    /**
     * Getter
     *
     * @returns {Coordinate}
     */
    getSouthEast(): Coordinate;
    /**
     * @returns {number}
     */
    getNorth(): number;
    /**
     * @returns {number}
     */
    getSouth(): number;
    /**
     * @returns {number}
     */
    getWest(): number;
    /**
     * @returns {number}
     */
    getEast(): number;
    /**
     * Calculates the center of this bounds object and returns it as a
     * Coordinate instance.
     *
     * @returns {Coordinate}
     */
    getCenter(): Coordinate;
    /**
     *
     * @returns {number}
     */
    protected getCenterLng(): number;
}
