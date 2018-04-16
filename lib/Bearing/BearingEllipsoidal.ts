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
import {DirectVincentyBearing} from "./DirectVincentyBearing";
import {InverseVincentyBearing} from "./InverseVincentyBearing";

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
    let inverseVincenty = this.inverseVincenty(point1, point2);

    if(inverseVincenty === null) return -999;

    return inverseVincenty.getBearingInitial();
  }

  /**
   * Calculates the final bearing between the two points.
   *
   * @param {Coordinate} point1
   * @param {Coordinate} point2
   * @returns {number}
   */
  calculateFinalBearing(point1: Coordinate, point2: Coordinate): number {
    let inverseVincenty = this.inverseVincenty(point1, point2);

    if(inverseVincenty === null) return -999;

    return inverseVincenty.getBearingFinal();
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
    return this.directVincenty(point, bearing, distance).getDestination();
  }


  /**
   * Calculates the final bearing angle for a destination point.
   * The method expects a starting point point, the bearing angle,
   * and the distance to destination.
   *
   * @param {Coordinate} point
   * @param {number} bearing the bearing angle between 0 and 360 degrees
   * @param {number} distance the distance to the destination point in meters
   * @returns {number}
   */
  calculateDestinationFinalBearing(point: Coordinate, bearing: number, distance: number): number {
    return this.directVincenty(point, bearing, distance).getBearingFinal();
  }

  private directVincenty(point: Coordinate, bearing: number, distance: number): DirectVincentyBearing {
    let phi1 = MathMore.deg2rad(point.getLat());
    let lambda1 = MathMore.deg2rad(point.getLng());
    let alpha1 = MathMore.deg2rad(bearing);

    let a = point.getEllipsoid().getA();
    let b = point.getEllipsoid().getB();
    let f = 1 / point.getEllipsoid().getF();

    let sin_alpha1 = Math.sin(alpha1);
    let cos_alpha1 = Math.cos(alpha1);

    let tanU1 = (1 - f) * Math.tan(phi1);
    let cosU1 = 1 / Math.sqrt(1 + tanU1 * tanU1);
    let sinU1 = tanU1 * cosU1;
    let omega1 = Math.atan2(tanU1, cos_alpha1);
    let sin_alpha = cosU1 * sin_alpha1;
    let cosSq_alpha = 1 - sin_alpha * sin_alpha;
    let uSq = cosSq_alpha * (a * a - b * b) / (b * b);
    let A = 1 + uSq / 16384 * (4096 + uSq * (-768 + uSq * (320 - 175 * uSq)));
    let B = uSq / 1024 * (256 + uSq * (-128 + uSq * (74 - 47 * uSq)));

    let omega = distance / (b * A);
    let iterations = 0;
    let omega_s;
    let cos2omega;
    let sin_omega;
    let cos_omega;
    let teta_omega;

    do {
      cos2omega = Math.cos(2 * omega1 + omega);
      sin_omega = Math.sin(omega);
      cos_omega = Math.cos(omega);
      teta_omega = B * sin_omega * (cos2omega + B / 4 * (cos_omega * (-1 + 2 * cos2omega * cos2omega) - B / 6 * cos2omega * (-3 + 4 * sin_omega * sin_omega) * (-3 + 4 * cos2omega * cos2omega)));
      omega_s = omega;
      omega = distance / (b * A) + teta_omega;
    } while (Math.abs(omega - omega_s) > 1e-12 && ++iterations < 200);

    if (iterations >= 200) {
      throw null;
    }

    let tmp = sinU1 * sin_omega - cosU1 * cos_omega * cos_alpha1;
    let phi2 = Math.atan2(sinU1 * cos_omega + cosU1 * sin_omega * cos_alpha1, (1 - f) * Math.sqrt(sin_alpha * sin_alpha + tmp * tmp));
    let lambda = Math.atan2(sin_omega * sin_alpha1, cosU1 * cos_omega - sinU1 * sin_omega * cos_alpha1);
    let C = f / 16 * cosSq_alpha * (4 + f * (4 - 3 * cosSq_alpha));
    let L = lambda - (1 - C) * f * sin_alpha * (omega + C * sin_omega * (cos2omega + C * cos_omega * (-1 + 2 * cos2omega * cos2omega)));
    let lambda2 = MathMore.fmod(lambda1 + L + 3 * Math.PI, 2 * Math.PI) - Math.PI;

    let alpha2 = Math.atan2(sin_alpha, -tmp);
    alpha2 = MathMore.fmod(alpha2 + 2 * Math.PI, 2 * Math.PI);

    return new DirectVincentyBearing(
      new Coordinate(MathMore.rad2deg(phi2), MathMore.rad2deg(lambda2), point.getEllipsoid()),
      MathMore.rad2deg(alpha2)
    );
  }

  private inverseVincenty(point1: Coordinate | null, point2: Coordinate | null): InverseVincentyBearing | null {

    if((point1 === null) || (point2 === null)){
      return null;
    }

    let phi1 = MathMore.deg2rad(point1.getLat());
    let phi2 = MathMore.deg2rad(point2.getLat());
    let lambda1 = MathMore.deg2rad(point1.getLng());
    let lambda2 = MathMore.deg2rad(point2.getLng());

    let a = point1.getEllipsoid().getA();
    let b = point1.getEllipsoid().getB();
    let f = 1 / point1.getEllipsoid().getF();

    let L = lambda2 - lambda1;

    let tanU1 = (1 - f) * Math.tan(phi1);
    let cosU1 = 1 / Math.sqrt(1 + tanU1 * tanU1);
    let sinU1 = tanU1 * cosU1;
    let tanU2 = (1 - f) * Math.tan(phi2);
    let cosU2 = 1 / Math.sqrt(1 + tanU2 * tanU2);
    let sinU2 = tanU2 * cosU2;

    let lambda = L;

    let iterations = 0;
    let sin_lambda;
    let cos_lambda;
    let sinSq_omega;
    let sin_omega;

    let cos_omega;
    let omega;
    let sin_alpha;
    let cosSq_alpha;
    let cos2omega;
    let C;
    let lambda_p;

    do {
      sin_lambda = Math.sin(lambda);
      cos_lambda = Math.cos(lambda);
      sinSq_omega = (cosU2 * sin_lambda) * (cosU2 * sin_lambda)
        + (cosU1 * sinU2 - sinU1 * cosU2 * cos_lambda) * (cosU1 * sinU2 - sinU1 * cosU2 * cos_lambda);
      sin_omega = Math.sqrt(sinSq_omega);

      if (sin_omega == 0) {
        return null;
      }

      cos_omega = sinU1 * sinU2 + cosU1 * cosU2 * cos_lambda;
      omega = Math.atan2(sin_omega, cos_omega);
      sin_alpha = cosU1 * cosU2 * sin_lambda / sin_omega;
      cosSq_alpha = 1 - sin_alpha * sin_alpha;

      cos2omega = 0;
      if (cosSq_alpha !== 0.0) {
        cos2omega = cos_omega - 2 * sinU1 * sinU2 / cosSq_alpha;
      }

      C = f / 16 * cosSq_alpha * (4 + f * (4 - 3 * cosSq_alpha));
      lambda_p = lambda;
      lambda = L + (1 - C) * f * sin_alpha * (omega + C * sin_omega * (cos2omega + C * cos_omega * (-1 + 2 * cos2omega * cos2omega)));
    } while (Math.abs(lambda - lambda_p) > 1e-12 && ++iterations < 200);

    if (iterations >= 200) {
      return null;
    }

    let uSq = cosSq_alpha * (a * a - b * b) / (b * b);
    let A = 1 + uSq / 16384 * (4096 + uSq * (-768 + uSq * (320 - 175 * uSq)));
    let B = uSq / 1024 * (256 + uSq * (-128 + uSq * (74 - 47 * uSq)));
    let teta_omega = B * sin_omega * (cos2omega + B / 4 * (cos_omega * (-1 + 2 * cos2omega * cos2omega) - B / 6 * cos2omega * (-3 + 4 * sin_omega * sin_omega) * (-3 + 4 * cos2omega * cos2omega)));

    let s = b * A * (omega - teta_omega);

    let alpha1 = Math.atan2(cosU2 * sin_lambda, cosU1 * sinU2 - sinU1 * cosU2 * cos_lambda);
    let alpha2 = Math.atan2(cosU1 * sin_lambda, -sinU1 * cosU2 + cosU1 * sinU2 * cos_lambda);

    alpha1 = MathMore.fmod(alpha1 + 2 * Math.PI, 2 * Math.PI);
    alpha2 = MathMore.fmod(alpha2 + 2 * Math.PI, 2 * Math.PI);

    s = MathMore.round10(s, -3);

    return new InverseVincentyBearing(s, MathMore.rad2deg(alpha1), MathMore.rad2deg(alpha2));
  }
}