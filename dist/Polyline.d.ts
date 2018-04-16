/**
 * Polyline Implementation
 *
 * @author    clemdesign <contact@clemdesign.fr>
 * @license   https://opensource.org/licenses/MIT
 * @link
  */
import { GeometryInterface } from "./GeometryInterface";
import { DistanceInterface } from "./Distance/DistanceInterface";
import { FormatterInterface } from "./Formatter/Polyline/FormatterInterface";
import { Coordinate } from "./Coordinate";
import { Line } from "./Line";
export declare class Polyline implements GeometryInterface {
    points: Array<Coordinate>;
    /**
     * @param {Coordinate} point
     */
    addPoint(point: Coordinate): void;
    /**
     * @return array
     */
    getPoints(): Array<Coordinate>;
    /**
     * Return all polygon point's latitudes.
     *
     * @return number[]
     */
    getLats(): Array<number>;
    /**
     * Return all polygon point's longitudes.
     *
     * @returns {Array<number>}
     */
    getLngs(): Array<number>;
    /**
     * @returns {number}
     */
    getNumberOfPoints(): number;
    /**
     *
     * @param {FormatterInterface} formatter
     * @returns {string}
     */
    format(formatter: FormatterInterface): string;
    /**
     * @return array
     */
    getSegments(): Array<Line>;
    /**
     * Calculates the length of the polyline.
     *
     * @param {DistanceInterface} calculator
     * @returns {number}
     */
    getLength(calculator: DistanceInterface): number;
    /**
     * Create a new polygon with reversed order of points, i. e. reversed
     * polygon direction.
     *
     * @return Polygon
     */
    getReverse(): Polyline;
}
