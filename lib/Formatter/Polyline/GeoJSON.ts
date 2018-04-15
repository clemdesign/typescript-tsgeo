/**
 * GeoJSON Polyline Formatter
 *
 * @author    clemdesign <contact@clemdesign.fr>
 * @license   https://opensource.org/licenses/MIT
 * @link
  */

import {Polyline} from "../../Polyline";
import {FormatterInterface} from "./FormatterInterface";

export class GeoJSON implements FormatterInterface {

  /**
   * @param {Polyline} polyline
   * @returns {string}
   */
  format(polyline: Polyline): string {

    let points = [];

    for(let point of polyline.getPoints()){
      points.push([point.getLng(), point.getLat()]);
    }

    return JSON.stringify({
      'type': 'LineString',
      'coordinates': [points]
    });
  }


}