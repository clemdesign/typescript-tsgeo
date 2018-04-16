/**
 * String functions
 *
 * @author    clemdesign <contact@clemdesign.fr>
 * @license   https://opensource.org/licenses/MIT
 * @link
  */
export declare class StringMore {
    /**
     * Convert a number into specific format
     * http://locutus.io/php/strings/number_format/
     *
     * @param {number} number
     * @param {number} decimals
     * @param {string} decPoint
     * @param {string} thousandsSep
     * @returns {string}
     */
    static number_format(number: number, decimals: number, decPoint: string, thousandsSep: string): string;
    /**
     * Pad a string to number
     * Examples:
     * pad(10, 4);      // 0010
     * pad(9, 4);       // 0009
     * pad(123, 4);     // 0123
     * pad(10, 4, '-'); // --10
     *
     * @param {string} n
     * @param {number} width
     * @param {string} z
     * @returns {string}
     */
    static pad(n: number, width: number, z?: string): string;
}
