/**
 * Math function
 *
 * @author    clemdesign <contact@clemdesign.fr>
 * @license   https://opensource.org/licenses/MIT
 * @link
  */
export declare class MathMore {
    /**
     * @param {number} angle
     * @returns {number}
     */
    static deg2rad(angle: number): number;
    /**
     * @param {number} angle
     * @returns {number}
     */
    static rad2deg(angle: number): number;
    /**
     * Decimal adjustment of a number.
     * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/round
     *
     * @param {number}  value The number.
     * @param {number} exp   The exponent (the 10 logarithm of the adjustment base).
     * @return {Number} The adjusted value.
     */
    static round10(value: number, exp: number): number;
    /**
     * Returns the floating point remainder (modulo) of the division of the arguments
     *
     * @param {number} x
     * @param {number} y
     * @returns {number}
     */
    static fmod(x: number, y: number): number;
}
