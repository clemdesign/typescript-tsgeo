/**
 * Line Implementation
 *
 * @author    clemdesign <contact@clemdesign.fr>
 * @license   https://opensource.org/licenses/MIT
 * @link
  */
import { GeometryInterface } from "./GeometryInterface";
import { Coordinate } from "./Coordinate";
import { DistanceInterface } from "./Distance/DistanceInterface";
export declare class Line implements GeometryInterface {
    /**
     * @var Coordinate
     */
    protected point1: Coordinate;
    /**
     * @var Coordinate
     */
    protected point2: Coordinate;
    /**
     * @param {Coordinate} point1
     * @param {Coordinate} point2
     */
    constructor(point1: Coordinate, point2: Coordinate);
    /**
     * @param {Coordinate} point1
     */
    setPoint1(point1: Coordinate): void;
    /**
     * @returns {Coordinate}
     */
    getPoint1(): Coordinate;
    /**
     * @param {Coordinate} point2
     */
    setPoint2(point2: Coordinate): void;
    /**
     * @returns {Coordinate}
     */
    getPoint2(): Coordinate;
    /**
     * Returns an array containing the two points.
     *
     * @returns {Array<Coordinate>}
     */
    getPoints(): Array<Coordinate>;
    /**
     * Calculates the length of the line (distance between the two
     * coordinates).
     *
     * @param {DistanceInterface} calculator instance of distance calculation class
     * @returns {number}
     */
    getLength(calculator: DistanceInterface): number;
    /**
     * Create a new instance with reversed point order, i. e. reversed direction.
     *
     * @return Line
     */
    getReverse(): Line;
}
