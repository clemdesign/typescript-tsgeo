/**
 * Coordinate Implementation
 *
 * @author    clemdesign <contact@clemdesign.fr>
 * @license   https://opensource.org/licenses/MIT
 * @link
  */

import {GeometryInterface} from "./GeometryInterface";
import {Ellipsoid} from "./Ellipsoid";
import {DistanceInterface} from "./Distance/DistanceInterface";
import {FormatterInterface} from "./Formatter/Coordinate/FormatterInterface";

export class Coordinate implements GeometryInterface {

  lat: number;

  lng: number;

  ellipsoid: Ellipsoid;

  /**
   * @param {number} lat -90.0 .. +90.0
   * @param {number} lng -180.0 .. +180.0
   * @param {Ellipsoid} ellipsoid if omitted, WGS-84 is used
   */
  constructor(lat: number, lng: number, ellipsoid: Ellipsoid | null = null) {
    this.lat = lat;
    this.lng = lng;

    if (ellipsoid !== null) {
      this.ellipsoid = ellipsoid;
    } else {
      this.ellipsoid = Ellipsoid.createDefault();
    }
  }

  /**
   * @returns {number}
   */
  getLat(): number {
    return this.lat;
  }

  /**
   * @returns {number}
   */
  getLng(): number {
    return this.lng;
  }

  /**
   * Returns an array containing the point
   *
   * @returns {Array<this>}
   */
  getPoints(): Array<this> {
    return [this];
  }

  /**
   * @returns {Ellipsoid}
   */
  getEllipsoid(): Ellipsoid {
    return this.ellipsoid;
  }

  /**
   * Calculates the distance between the given coordinate
   * and this coordinate.
   *
   * @param {Coordinate} coordinate
   * @param {DistanceInterface} calculator instance of distance calculation class
   * @returns {number}
   */
  getDistance(coordinate: Coordinate, calculator: DistanceInterface): number {
    return calculator.getDistance(this, coordinate);
  }


  /**
   * @param {FormatterInterface} formatter
   * @returns {string}
   */
  format(formatter: FormatterInterface) {
    return formatter.format(this);
  }

  /**
   * Validates latitude
   *
   * @param {number} latitude
   * @returns {boolean}
   */
  protected static isValidLatitude(latitude: number): boolean {
    return Coordinate.isNumericInBounds(latitude, -90.0, 90.0);
  }

  /**
   * Validates longitude
   *
   * @param {number} longitude
   * @returns {boolean}
   */
  protected static isValidLongitude(longitude: number): boolean {
    return Coordinate.isNumericInBounds(longitude, -180.0, 180.0);
  }

  /**
   * Checks if the given value is between lower
   * and upper bounds (including the bounds values).
   *
   * @param {number} value
   * @param {number} lower
   * @param {number} upper
   * @returns {boolean}
   */
  protected static isNumericInBounds(value: number, lower: number, upper: number): boolean {
    return !(value < lower || value > upper);
  }
}