/**
 * Implementation of distance calculation with Vincenty Method
 *
 * @author    clemdesign <contact@clemdesign.fr>
 * @license   https://opensource.org/licenses/MIT
 * @link
  */

import {DistanceInterface} from "./DistanceInterface";
import {Coordinate} from "../Coordinate";
import {MathMore} from "../Functions/MathMore";

export class Vincenty implements DistanceInterface {

  /**
   * @param {Coordinate} point1
   * @param {Coordinate} point2
   *
   * @return number|null
   */
  getDistance(point1: Coordinate, point2: Coordinate): number | null {
    if (point1.getEllipsoid().getName() !== point2.getEllipsoid().getName()) {
      return null;
    }

    let lat1 = MathMore.deg2rad(point1.getLat());
    let lat2 = MathMore.deg2rad(point2.getLat());
    let lng1 = MathMore.deg2rad(point1.getLng());
    let lng2 = MathMore.deg2rad(point2.getLng());

    let a = point1.getEllipsoid().getA();
    let b = point1.getEllipsoid().getB();
    let f = (1 / point1.getEllipsoid().getF());

    let L = lng2 - lng1;
    let U1 = Math.atan((1 - f) * Math.tan(lat1));
    let U2 = Math.atan((1 - f) * Math.tan(lat2));

    let iterationLimit = 100;
    let lambda = L;

    let sinU1 = Math.sin(U1);
    let sinU2 = Math.sin(U2);
    let cosU1 = Math.cos(U1);
    let cosU2 = Math.cos(U2);

    let lambdaP;
    let cosSqAlpha;
    let sinSigma;
    let cos2SigmaM;
    let cosSigma;
    let sigma;

    do {
      let sinLambda = Math.sin(lambda);
      let cosLambda = Math.cos(lambda);

      sinSigma = Math.sqrt(
        (cosU2 * sinLambda) * (cosU2 * sinLambda) +
        (cosU1 * sinU2 - sinU1 * cosU2 * cosLambda) * (cosU1 * sinU2 - sinU1 * cosU2 * cosLambda)
      );

      if (sinSigma == 0) {
        return 0.0;
      }

      cosSigma = sinU1 * sinU2 + cosU1 * cosU2 * cosLambda;

      sigma = Math.atan2(sinSigma, cosSigma);

      let sinAlpha = cosU1 * cosU2 * sinLambda / sinSigma;

      cosSqAlpha = 1 - sinAlpha * sinAlpha;

      cos2SigmaM = 0;
      if (cosSqAlpha != 0) {
        cos2SigmaM = cosSigma - 2 * sinU1 * sinU2 / cosSqAlpha;
      }

      let C = f / 16 * cosSqAlpha * (4 + f * (4 - 3 * cosSqAlpha));

      lambdaP = lambda;

      lambda = L + (1 - C) * f * sinAlpha * (sigma + C * sinSigma * (cos2SigmaM + C * cosSigma * (-1 + 2 * cos2SigmaM * cos2SigmaM)));
    } while (Math.abs(lambda - lambdaP) > 1e-12 && --iterationLimit > 0);

    if (iterationLimit === 0) {
      return null;
    }

    let uSq = cosSqAlpha * (a * a - b * b) / (b * b);
    let A = 1 + uSq / 16384 * (4096 + uSq * (-768 + uSq * (320 - 175 * uSq)));
    let B = uSq / 1024 * (256 + uSq * (-128 + uSq * (74 - 47 * uSq)));
    let deltaSigma = B * sinSigma * (cos2SigmaM + B / 4 * (cosSigma * (-1 + 2 * cos2SigmaM * cos2SigmaM) - B / 6 * cos2SigmaM * (-3 + 4 * sinSigma * sinSigma) * (-3 + 4 * cos2SigmaM * cos2SigmaM)));
    let s = b * A * (sigma - deltaSigma);

    return MathMore.round10(s, -3);

  }
}