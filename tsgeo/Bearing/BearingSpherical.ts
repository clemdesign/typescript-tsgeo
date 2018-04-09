/**
 * Calculation of bearing between two points using a
 * simple spherical model of the earth.
 *
 * @author    clemdesign <contact@clemdesign.fr>
 * @license   https://opensource.org/licenses/MIT
 * @link
  */

import {Coordinate} from "../Coordinate";
import {MathMore} from "../Functions/MathMore";
import {BearingInterface} from "./BearingInterface";

export class BearingSpherical implements BearingInterface {
  /**
   * Earth radius in meters.
   */
  static EARTH_RADIUS = 6371009.0;

  /**
   * This method calculates the initial bearing between the
   * two points.
   *
   * @param {Coordinate} point1
   * @param {Coordinate} point2
   * @returns {number} Bearing Angle
   */
  calculateBearing(point1: Coordinate, point2: Coordinate): number {
    let lat1 = MathMore.deg2rad(point1.getLat());
    let lat2 = MathMore.deg2rad(point2.getLat());
    let lng1 = MathMore.deg2rad(point1.getLng());
    let lng2 = MathMore.deg2rad(point2.getLng());

    let y = Math.sin(lng2 - lng1) * Math.cos(lat2);
    let x = Math.cos(lat1) * Math.sin(lat2) - Math.sin(lat1) * Math.cos(lat2) * Math.cos(lng2 - lng1);

    let bearing = MathMore.rad2deg(Math.atan2(y, x));

    if (bearing < 0) {
      bearing = MathMore.fmod(bearing + 360, 360);
    }

    return bearing;
  }

  /**
   * Calculates the final bearing between the two points.
   *
   * @param {Coordinate} point1
   * @param {Coordinate} point2
   * @returns {number}
   */
  calculateFinalBearing(point1: Coordinate, point2: Coordinate): number {
    let initialBearing = this.calculateBearing(point2, point1);

    return MathMore.fmod(initialBearing + 180, 360);
  }

  /**
   * Calculates a destination point for the given point, bearing angle,
   * and distance.
   *
   * @param {Coordinate} point
   * @param {number} bearing the bearing angle between 0 and 360 degrees
   * @param {number} distance the distance to the destination point in meters
   * @returns {Coordinate}
   */
  calculateDestination(point: Coordinate, bearing: number, distance: number): Coordinate {
    let D = distance / BearingSpherical.EARTH_RADIUS;
    let B = MathMore.deg2rad(bearing);
    let phi = MathMore.deg2rad(point.getLat());
    let lambda = MathMore.deg2rad(point.getLng());

    let phi2 = Math.asin(Math.sin(phi) * Math.cos(D) + Math.cos(phi) * Math.sin(D) * Math.cos(B));
    let lambda2 = lambda + Math.atan2(Math.sin(B) * Math.sin(D) * Math.cos(phi), Math.cos(D) - Math.sin(phi) * Math.sin(phi));

    return new Coordinate(MathMore.rad2deg(phi2), MathMore.rad2deg(lambda2));
  }
}