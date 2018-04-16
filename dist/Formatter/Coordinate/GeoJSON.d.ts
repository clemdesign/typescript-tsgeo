/**
 * GeoJSON Coordinate Formatter
 *
 * @author    clemdesign <contact@clemdesign.fr>
 * @license   https://opensource.org/licenses/MIT
 * @link
  */
import { Coordinate } from "../../Coordinate";
import { FormatterInterface } from "./FormatterInterface";
export declare class GeoJSON implements FormatterInterface {
    /**
     * @param {Coordinate} coordinate
     * @returns {string}
     */
    format(coordinate: Coordinate): string;
}
