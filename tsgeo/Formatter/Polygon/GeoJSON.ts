/**
 * GeoJSON Polygon Formatter
 *
 * @author    clemdesign <contact@clemdesign.fr>
 * @license   https://opensource.org/licenses/MIT
 * @link
  */

import {Polygon} from "../../Polygon";
import {FormatterInterface} from "./FormatterInterface";

export class GeoJSON implements FormatterInterface {

  /**
   * @param {Polygon} polygon
   * @returns {string}
   */
  format(polygon: Polygon): string {

    if(polygon.getNumberOfPoints() < 3){
      return null;
    }

    let points = [];

    for(let point of polygon.getPoints()){
      points.push([point.getLng(), point.getLat()]);
    }

    return JSON.stringify({
      'type': 'Polygon',
      'coordinates': [points]
    });
  }


}