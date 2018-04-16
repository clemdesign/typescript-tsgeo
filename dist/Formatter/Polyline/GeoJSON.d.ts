/**
 * GeoJSON Polyline Formatter
 *
 * @author    clemdesign <contact@clemdesign.fr>
 * @license   https://opensource.org/licenses/MIT
 * @link
  */
import { Polyline } from "../../Polyline";
import { FormatterInterface } from "./FormatterInterface";
export declare class GeoJSON implements FormatterInterface {
    /**
     * @param {Polyline} polyline
     * @returns {string}
     */
    format(polyline: Polyline): string;
}
