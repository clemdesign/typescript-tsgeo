/**
 * Polygon Formatter Interface
 *
 * @author    clemdesign <contact@clemdesign.fr>
 * @license   https://opensource.org/licenses/MIT
 * @link
  */
import { Polygon } from "../../Polygon";
export interface FormatterInterface {
    /**
     * @param {Polygon} polygon
     * @returns {string}
     */
    format(polygon: Polygon): string;
}
