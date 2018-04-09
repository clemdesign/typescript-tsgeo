/**
 * Coordinate Formatter "Decimal Degrees"
 *
 * @author    clemdesign <contact@clemdesign.fr>
 * @license   https://opensource.org/licenses/MIT
 * @link
  */

import {Coordinate} from "../../Coordinate";
import {FormatterInterface} from "./FormatterInterface";
import {MathMore} from "../../Functions/MathMore";

export class DecimalDegrees implements FormatterInterface {
  /**
   * @var string Separator string between latitude and longitude
   */
  protected separator;

  /**
   * @type {number}
   */
  protected digits = 5;

  /**
   * @param {string} separator
   * @param {number} digits
   */
  constructor(separator: string = ' ', digits: number = 5) {
    this.setSeparator(separator);
    this.digits = digits;
  }

  /**
   * @param {Coordinate} coordinate
   * @returns {string}
   */
  format(coordinate: Coordinate): string {
    return MathMore.round10(coordinate.getLat(), -(this.digits)).toString() +
      this.separator +
      MathMore.round10(coordinate.getLng(), -(this.digits)).toString();
  }

  /**
   * @param {string} separator
   * @returns {DecimalDegrees}
   */
  setSeparator(separator: string): DecimalDegrees {
    this.separator = separator;

    return this;
  }
}