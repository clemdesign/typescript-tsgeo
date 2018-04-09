/**
 * Polyline Formatter Interface
 *
 * @author    clemdesign <contact@clemdesign.fr>
 * @license   https://opensource.org/licenses/MIT
 * @link
  */

import {Polyline} from "../../Polyline";

export interface  FormatterInterface
{
  /**
   * @param {Polyline} polyline
   * @returns {string}
   */
  format(polyline: Polyline): string;
}