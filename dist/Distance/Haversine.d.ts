/**
 * Implementation of distance calculation with http://en.wikipedia.org/wiki/Law_of_haversines
 *
 * @author    clemdesign <contact@clemdesign.fr>
 * @license   https://opensource.org/licenses/MIT
 * @link
  */
import { DistanceInterface } from "./DistanceInterface";
import { Coordinate } from "../Coordinate";
export declare class Haversine implements DistanceInterface {
    /**
     * @param {Coordinate} point1
     * @param {Coordinate} point2
     *
     * @return number|null
     */
    getDistance(point1: Coordinate, point2: Coordinate): number;
}
