/**
 * Interface for Distance Calculator Classes
 *
 * @author    clemdesign <contact@clemdesign.fr>
 * @license   https://opensource.org/licenses/MIT
 * @link
 */
import { Coordinate } from "../Coordinate";
export interface DistanceInterface {
    /**
     * @param {Coordinate} point1
     * @param {Coordinate} point2
     *
     * @return float distance between the two coordinates in meters
     */
    getDistance(point1: Coordinate, point2: Coordinate): number;
}
