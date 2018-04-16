/**
 * Coordinate Implementation
 *
 * @author    clemdesign <contact@clemdesign.fr>
 * @license   https://opensource.org/licenses/MIT
 * @link
  */
import { GeometryInterface } from "./GeometryInterface";
import { Ellipsoid } from "./Ellipsoid";
import { DistanceInterface } from "./Distance/DistanceInterface";
import { FormatterInterface } from "./Formatter/Coordinate/FormatterInterface";
export declare class Coordinate implements GeometryInterface {
    lat: number;
    lng: number;
    ellipsoid: Ellipsoid;
    /**
     * @param {number} lat -90.0 .. +90.0
     * @param {number} lng -180.0 .. +180.0
     * @param {Ellipsoid} ellipsoid if omitted, WGS-84 is used
     */
    constructor(lat: number, lng: number, ellipsoid?: Ellipsoid | null);
    /**
     * @returns {number}
     */
    getLat(): number;
    /**
     * @returns {number}
     */
    getLng(): number;
    /**
     * Returns an array containing the point
     *
     * @returns {Array<this>}
     */
    getPoints(): Array<this>;
    /**
     * @returns {Ellipsoid}
     */
    getEllipsoid(): Ellipsoid;
    /**
     * Calculates the distance between the given coordinate
     * and this coordinate.
     *
     * @param {Coordinate} coordinate
     * @param {DistanceInterface} calculator instance of distance calculation class
     * @returns {number}
     */
    getDistance(coordinate: Coordinate, calculator: DistanceInterface): number;
    /**
     * @param {FormatterInterface} formatter
     * @returns {string}
     */
    format(formatter: FormatterInterface): string;
    /**
     * Validates latitude
     *
     * @param {number} latitude
     * @returns {boolean}
     */
    protected static isValidLatitude(latitude: number): boolean;
    /**
     * Validates longitude
     *
     * @param {number} longitude
     * @returns {boolean}
     */
    protected static isValidLongitude(longitude: number): boolean;
    /**
     * Checks if the given value is between lower
     * and upper bounds (including the bounds values).
     *
     * @param {number} value
     * @param {number} lower
     * @param {number} upper
     * @returns {boolean}
     */
    protected static isNumericInBounds(value: number, lower: number, upper: number): boolean;
}
