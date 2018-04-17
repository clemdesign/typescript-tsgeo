/**
 * Value object for a "Direct Vincenty" bearing calculation result.
 *
 * @author    clemdesign <contact@clemdesign.fr>
 * @license   https://opensource.org/licenses/MIT
 * @link
  */

import {Coordinate} from "../Coordinate";

export class DirectVincentyBearing {
  /**
   * @var {Coordinate}
   */
  private destination: Coordinate;

  /**
   * @var {number}
   */
  private bearingFinal: number;

  /**
   * Bearing constructor.
   *
   * @param {Coordinate} destination
   * @param {number} bearingFinal
   */
  constructor(destination: Coordinate, bearingFinal: number) {
    this.destination = destination;
    this.bearingFinal = bearingFinal;
  }

  /**
   * @return Coordinate
   */
  getDestination(): Coordinate {
    return this.destination;
  }

  /**
   * @return number
   */
  getBearingFinal(): number {
    return this.bearingFinal;
  }
}