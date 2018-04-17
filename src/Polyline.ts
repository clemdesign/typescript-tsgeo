/**
 * Polyline Implementation
 *
 * @author    clemdesign <contact@clemdesign.fr>
 * @license   https://opensource.org/licenses/MIT
 * @link
  */

import {GeometryInterface} from "./GeometryInterface";
import {DistanceInterface} from "./Distance/DistanceInterface";
import {FormatterInterface} from "./Formatter/Polyline/FormatterInterface";
import {Coordinate} from "./Coordinate";
import {Line} from "./Line";

export class Polyline implements GeometryInterface {

  points: Array<Coordinate> = [];

  /**
   * @param {Coordinate} point
   */
  addPoint(point: Coordinate) {
    this.points.push(point);
  }

  /**
   * @return array
   */
  getPoints(): Array<Coordinate> {
    return this.points;
  }

  /**
   * Return all polygon point's latitudes.
   *
   * @return number[]
   */
  getLats(): Array<number> {
    let lats = [];

    for (let point of this.points) {
      lats.push(point.getLat())
    }

    return lats;
  }

  /**
   * Return all polygon point's longitudes.
   *
   * @returns {Array<number>}
   */
  getLngs(): Array<number> {
    let lngs = [];

    for (let point of this.points) {
      lngs.push(point.getLng())
    }

    return lngs;
  }

  /**
   * @returns {number}
   */
  getNumberOfPoints(): number {
    return this.points.length;
  }

  /**
   *
   * @param {FormatterInterface} formatter
   * @returns {string}
   */
  format(formatter: FormatterInterface) {
    return formatter.format(this);
  }

  /**
   * @return array
   */
  getSegments(): Array<Line> {
    let segments: Array<Line> = [];

    if (this.points.length < 2) {
      return segments;
    }

    let previousPoint = this.points[0];

    let passLoop = true;
    for (let point of this.points) {
      if (!passLoop) {
      segments.push(new Line(previousPoint, point));
      previousPoint = point;
    }
      passLoop = false;
    }

    return segments;
  }


  /**
   * Calculates the length of the polyline.
   *
   * @param {DistanceInterface} calculator
   * @returns {number}
   */
  getLength(calculator: DistanceInterface): number {
    let distance = 0.0;

    if (this.points.length <= 1) {
      return distance;
    }

    for (let segment of this.getSegments()) {
      distance += segment.getLength(calculator);
    }

    return distance;
  }

  /**
   * Create a new polygon with reversed order of points, i. e. reversed
   * polygon direction.
   *
   * @return Polygon
   */
  getReverse(): Polyline {
    let reversed = new Polyline();
    let points_reversed = this.points.reverse();

    for (let point of points_reversed) {
      reversed.addPoint(point);
    }

    return reversed;
  }
}