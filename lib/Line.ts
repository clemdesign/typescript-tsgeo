/**
 * Line Implementation
 *
 * @author    clemdesign <contact@clemdesign.fr>
 * @license   https://opensource.org/licenses/MIT
 * @link
  */
import {GeometryInterface} from "./GeometryInterface";
import {Coordinate} from "./Coordinate";
import {DistanceInterface} from "./Distance/DistanceInterface";


export class Line implements GeometryInterface {

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
  constructor(point1: Coordinate, point2: Coordinate) {
    this.point1 = point1;
    this.point2 = point2;
  }

  /**
   * @param {Coordinate} point1
   */
  setPoint1(point1: Coordinate) {
    this
      .point1 = point1;
  }

  /**
   * @returns {Coordinate}
   */
  getPoint1(): Coordinate {
    return this.point1;
  }

  /**
   * @param {Coordinate} point2
   */
  setPoint2(point2: Coordinate) {
    this
      .point2 = point2;
  }

  /**
   * @returns {Coordinate}
   */
  getPoint2(): Coordinate {
    return this.point2;
  }

  /**
   * Returns an array containing the two points.
   *
   * @returns {Array<Coordinate>}
   */
  getPoints(): Array<Coordinate> {
    return [this.point1, this.point2];
  }

  /**
   * Calculates the length of the line (distance between the two
   * coordinates).
   *
   * @param {DistanceInterface} calculator instance of distance calculation class
   * @returns {number}
   */
  getLength(calculator: DistanceInterface): number {
    return calculator.getDistance(this.point1, this.point2);
  }

  //TODO: Implement BearingInterface

  /**
   * Create a new instance with reversed point order, i. e. reversed direction.
   *
   * @return Line
   */
  getReverse(): Line {
    return new Line(this.point2, this.point1);
  }

}