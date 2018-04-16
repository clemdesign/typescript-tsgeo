/**
 * Calculation of bearing between two points using a
 * simple spherical model of the earth.
 *
 * @author    clemdesign <contact@clemdesign.fr>
 * @license   https://opensource.org/licenses/MIT
 * @link
  */
import { Coordinate } from "../Coordinate";
import { BearingInterface } from "./BearingInterface";
export declare class BearingSpherical implements BearingInterface {
    /**
     * Earth radius in meters.
     */
    static EARTH_RADIUS: number;
    /**
     * This method calculates the initial bearing between the
     * two points.
     *
     * @param {Coordinate} point1
     * @param {Coordinate} point2
     * @returns {number} Bearing Angle
     */
    calculateBearing(point1: Coordinate, point2: Coordinate): number;
    /**
     * Calculates the final bearing between the two points.
     *
     * @param {Coordinate} point1
     * @param {Coordinate} point2
     * @returns {number}
     */
    calculateFinalBearing(point1: Coordinate, point2: Coordinate): number;
    /**
     * Calculates a destination point for the given point, bearing angle,
     * and distance.
     *
     * @param {Coordinate} point
     * @param {number} bearing the bearing angle between 0 and 360 degrees
     * @param {number} distance the distance to the destination point in meters
     * @returns {Coordinate}
     */
    calculateDestination(point: Coordinate, bearing: number, distance: number): Coordinate;
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
    calculateDestinationFinalBearing(point: Coordinate, bearing: number, distance: number): number;
    private directVincenty(point, bearing, distance);
    private inverseVincenty(point1, point2);
}
