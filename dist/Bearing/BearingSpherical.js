"use strict";
/**
 * Calculation of bearing between two points using a
 * simple spherical model of the earth.
 *
 * @author    clemdesign <contact@clemdesign.fr>
 * @license   https://opensource.org/licenses/MIT
 * @link
  */
Object.defineProperty(exports, "__esModule", { value: true });
const Coordinate_1 = require("../Coordinate");
const MathMore_1 = require("../Functions/MathMore");
class BearingSpherical {
    /**
     * This method calculates the initial bearing between the
     * two points.
     *
     * @param {Coordinate} point1
     * @param {Coordinate} point2
     * @returns {number} Bearing Angle
     */
    calculateBearing(point1, point2) {
        let lat1 = MathMore_1.MathMore.deg2rad(point1.getLat());
        let lat2 = MathMore_1.MathMore.deg2rad(point2.getLat());
        let lng1 = MathMore_1.MathMore.deg2rad(point1.getLng());
        let lng2 = MathMore_1.MathMore.deg2rad(point2.getLng());
        let y = Math.sin(lng2 - lng1) * Math.cos(lat2);
        let x = Math.cos(lat1) * Math.sin(lat2) - Math.sin(lat1) * Math.cos(lat2) * Math.cos(lng2 - lng1);
        let bearing = MathMore_1.MathMore.rad2deg(Math.atan2(y, x));
        if (bearing < 0) {
            bearing = MathMore_1.MathMore.fmod(bearing + 360, 360);
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
    calculateFinalBearing(point1, point2) {
        let initialBearing = this.calculateBearing(point2, point1);
        return MathMore_1.MathMore.fmod(initialBearing + 180, 360);
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
    calculateDestination(point, bearing, distance) {
        let D = distance / BearingSpherical.EARTH_RADIUS;
        let B = MathMore_1.MathMore.deg2rad(bearing);
        let phi = MathMore_1.MathMore.deg2rad(point.getLat());
        let lambda = MathMore_1.MathMore.deg2rad(point.getLng());
        let phi2 = Math.asin(Math.sin(phi) * Math.cos(D) + Math.cos(phi) * Math.sin(D) * Math.cos(B));
        let lambda2 = lambda + Math.atan2(Math.sin(B) * Math.sin(D) * Math.cos(phi), Math.cos(D) - Math.sin(phi) * Math.sin(phi));
        return new Coordinate_1.Coordinate(MathMore_1.MathMore.rad2deg(phi2), MathMore_1.MathMore.rad2deg(lambda2));
    }
}
/**
 * Earth radius in meters.
 */
BearingSpherical.EARTH_RADIUS = 6371009.0;
exports.BearingSpherical = BearingSpherical;
