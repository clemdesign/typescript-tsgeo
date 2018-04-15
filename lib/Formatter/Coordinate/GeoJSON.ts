/**
 * GeoJSON Coordinate Formatter
 *
 * @author    clemdesign <contact@clemdesign.fr>
 * @license   https://opensource.org/licenses/MIT
 * @link
  */

import {Coordinate} from "../../Coordinate";
import {FormatterInterface} from "./FormatterInterface";

export class GeoJSON implements FormatterInterface {

  /**
   * @param {Coordinate} coordinate
   * @returns {string}
   */
  format(coordinate: Coordinate): string {
    return JSON.stringify({
      'type': 'Point',
      'coordinates': [coordinate.getLng(), coordinate.getLat()]
    });
  }

}