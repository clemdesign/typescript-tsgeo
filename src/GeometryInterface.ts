/**
 * Interface for Geometry Classes
 *
 * @author    clemdesign <contact@clemdesign.fr>
 * @license   https://opensource.org/licenses/MIT
 * @link
 */

import {Coordinate} from "./Coordinate";

export interface GeometryInterface {

  /**
   * Returns an array containing all assigned points.
   *
   * @return array
   */
  getPoints(): Array<Coordinate>;
}