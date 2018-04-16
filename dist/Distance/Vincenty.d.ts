/**
 * Implementation of distance calculation with Vincenty Method
 *
 * @author    clemdesign <contact@clemdesign.fr>
 * @license   https://opensource.org/licenses/MIT
 * @link
  */
import { DistanceInterface } from "./DistanceInterface";
import { Coordinate } from "../Coordinate";
export declare class Vincenty implements DistanceInterface {
    /**
     * @param {Coordinate} point1
     * @param {Coordinate} point2
     *
     * @return number|null
     */
    getDistance(point1: Coordinate, point2: Coordinate): number;
}
