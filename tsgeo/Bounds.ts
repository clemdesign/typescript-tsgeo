/**
 * Coordinate Bounds Class
 *
 * @author    clemdesign <contact@clemdesign.fr>
 * @license   https://opensource.org/licenses/MIT
 * @link
  */
import {Coordinate} from "./Coordinate";


export class Bounds {

  /**
   * @var Coordinate
   */
  protected northWest;

  /**
   * @var Coordinate
   */
  protected southEast;

  /**
   *
   * @param {Coordinate} northWest
   * @param {Coordinate} southEast
   */
  constructor(northWest: Coordinate, southEast: Coordinate) {
    this.northWest = northWest;
    this.southEast = southEast;
  }

  /**
   * Getter
   *
   * @returns {Coordinate}
   */
  getNorthWest(): Coordinate {
    return this.northWest;
  }

  /**
   * Getter
   *
   * @returns {Coordinate}
   */
  getSouthEast(): Coordinate {
    return this.southEast;
  }

  /**
   * @returns {number}
   */
  getNorth(): number {
    return this.northWest.getLat();
  }

  /**
   * @returns {number}
   */
  getSouth(): number {
    return this.southEast.getLat();
  }

  /**
   * @returns {number}
   */
  getWest(): number {
    return this.northWest.getLng();
  }

  /**
   * @returns {number}
   */
  getEast(): number {
    return this.southEast.getLng();
  }

  /**
   * Calculates the center of this bounds object and returns it as a
   * Coordinate instance.
   *
   * @returns {Coordinate}
   */
  getCenter(): Coordinate {
    let centerLat = (this.getNorth() + this.getSouth()) / 2;

    return new Coordinate(centerLat, this.getCenterLng());
  }

  /**
   *
   * @returns {number}
   */
  protected getCenterLng(): number {
    let centerLng = (this.getEast() + this.getWest()) / 2;

    let overlap = this.getWest() > 0 && this.getEast() < 0;

    if (overlap && centerLng > 0) {
      return -180.0 + centerLng;
    }

    if (overlap && centerLng < 0) {
      return 180.0 + centerLng;
    }

    if (overlap && centerLng == 0) {
      return 180.0;
    }

    return centerLng;
  }

}