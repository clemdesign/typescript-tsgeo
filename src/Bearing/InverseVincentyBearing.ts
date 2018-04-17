/**
 * Value object for a "Inverse Vincenty" bearing calculation result.
 *
 * @author    clemdesign <contact@clemdesign.fr>
 * @license   https://opensource.org/licenses/MIT
 * @link
  */

export class InverseVincentyBearing
{
  /**
   * @var {number}
   */
  private distance: number;

  /**
   * @var {number}
   */
  private bearingInitial: number;

  /**
   * @var {number}
   */
  private bearingFinal: number;

  /**
   * Bearing constructor.
   *
   * @param {Coordinate} distance
   * @param {number} bearingInitial
   * @param {number} bearingFinal
   */
  constructor(distance: number, bearingInitial: number, bearingFinal: number) {
    this.distance       = distance;
    this.bearingInitial = bearingInitial;
    this.bearingFinal   = bearingFinal;
  }

  /**
   * @return number
   */
  getDistance(): number {
    return this.distance;
  }

  /**
   * @return number
   */
  getBearingInitial(): number {
    return this.bearingInitial;
  }

  /**
   * @return number
   */
  getBearingFinal(): number {
    return this.bearingFinal;
  }
}