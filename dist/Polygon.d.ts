/**
 * Polygon Implementation
 *
 * @author    clemdesign <contact@clemdesign.fr>
 * @license   https://opensource.org/licenses/MIT
 * @link
  */
import { GeometryInterface } from "./GeometryInterface";
import { DistanceInterface } from "./Distance/DistanceInterface";
import { FormatterInterface } from "./Formatter/Polygon/FormatterInterface";
import { Coordinate } from "./Coordinate";
import { Line } from "./Line";
export declare class Polygon implements GeometryInterface {
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
     * Determine if given geometry is contained inside the polygon. This is
     * assumed to be true, if each point of the geometry is inside the polygon.
     *
     * Edge cases:
     *
     * - it's not detected when a line between two points is outside the polygon
     * - @see contains() for more restrictions
     *
     * @param {GeometryInterface} geometry
     * @returns {boolean}
     */
    containsGeometry(geometry: GeometryInterface): boolean;
    /**
     * Determine if given point is contained inside the polygon. Uses the PNPOLY
     * algorithm by W. Randolph Franklin. Therfore some edge cases may not give the
     * expected results, e. g. if the point resides on the polygon boundary.
     *
     * @see http://www.ecse.rpi.edu/Homepages/wrf/Research/Short_Notes/pnpoly.html
     *
     * For special cases this calculation leads to wrong results:
     *
     * - if the polygons spans over the longitude boundaries at 180/-180 degrees
     *
     * @param {Coordinate} point
     * @returns {boolean}
     */
    contains(point: Coordinate): boolean;
    /**
     * Calculates the polygon perimeter.
     *
     /**
     *
     * @param {DistanceInterface} calculator instance of distance calculation class
     * @returns {number}
     */
    getPerimeter(calculator: DistanceInterface): number;
    /**
     * Calculates the polygon area.
     *
     * This algorithm gives inaccurate results as it ignores
     * ellipsoid parameters other than to arithmetic mean radius.
     * The error should be < 1 % for small areas.
     *
     * @return number
     */
    getArea(): number;
    /**
     * Create a new polygon with reversed order of points, i. e. reversed
     * polygon direction.
     *
     * @return Polygon
     */
    getReverse(): Polygon;
}
