/**
 * Coordinate Formatter Interface
 *
 * @author    clemdesign <contact@clemdesign.fr>
 * @license   https://opensource.org/licenses/MIT
 * @link
  */
import { Coordinate } from "../../Coordinate";
export interface FormatterInterface {
    /**
     * @param {Coordinate} coordinate
     * @returns {string}
     */
    format(coordinate: Coordinate): string;
}
