/**
 * GeoJSON Polygon Formatter
 *
 * @author    clemdesign <contact@clemdesign.fr>
 * @license   https://opensource.org/licenses/MIT
 * @link
  */
import { Polygon } from "../../Polygon";
import { FormatterInterface } from "./FormatterInterface";
export declare class GeoJSON implements FormatterInterface {
    /**
     * @param {Polygon} polygon
     * @returns {string}
     */
    format(polygon: Polygon): string;
}
