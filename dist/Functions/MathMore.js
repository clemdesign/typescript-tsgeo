"use strict";
/**
 * Math function
 *
 * @author    clemdesign <contact@clemdesign.fr>
 * @license   https://opensource.org/licenses/MIT
 * @link
  */
Object.defineProperty(exports, "__esModule", { value: true });
class MathMore {
    /**
     * @param {number} angle
     * @returns {number}
     */
    static deg2rad(angle) {
        //  discuss at: http://locutus.io/php/deg2rad/
        // original by: Enrique Gonzalez
        // improved by: Thomas Grainger (http://graingert.co.uk)
        //   example 1: deg2rad(45)
        //   returns 1: 0.7853981633974483
        return ((angle / 180) * Math.PI); // (angle / 180) * Math.PI;
    }
    /**
     * @param {number} angle
     * @returns {number}
     */
    static rad2deg(angle) {
        //  discuss at: http://locutus.io/php/rad2deg/
        // original by: Enrique Gonzalez
        // improved by: Brett Zamir (http://brett-zamir.me)
        //   example 1: rad2deg(3.141592653589793)
        //   returns 1: 180
        return ((angle / Math.PI) * 180); // (angle / 180) * Math.PI;
    }
    /**
     * Decimal adjustment of a number.
     * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/round
     *
     * @param {number}  value The number.
     * @param {number} exp   The exponent (the 10 logarithm of the adjustment base).
     * @return {Number} The adjusted value.
     */
    static round10(value, exp) {
        // If the exp is undefined or zero...
        if (typeof exp === 'undefined' || +exp === 0) {
            return Math.round(value);
        }
        value = +value;
        exp = +exp;
        // If the value is not a number or the exp is not an integer...
        if (value === null || isNaN(value) || !(typeof exp === 'number' && exp % 1 === 0)) {
            return NaN;
        }
        // If the value is negative...
        if (value < 0) {
            return -MathMore.round10(-value, exp);
        }
        // Shift
        let value_str = value.toString().split('e');
        value = Math.round(+(value_str[0] + 'e' + (value_str[1] ? (+value_str[1] - exp) : -exp)));
        // Shift back
        value_str = value.toString().split('e');
        return +(value_str[0] + 'e' + (value_str[1] ? (+value_str[1] + exp) : exp));
    }
    /**
     * Returns the floating point remainder (modulo) of the division of the arguments
     *
     * @param {number} x
     * @param {number} y
     * @returns {number}
     */
    static fmod(x, y) {
        //  discuss at: http://locutus.io/php/fmod/
        // original by: Onno Marsman (https://twitter.com/onnomarsman)
        //    input by: Brett Zamir (http://brett-zamir.me)
        // bugfixed by: Kevin van Zonneveld (http://kvz.io)
        //   example 1: fmod(5.7, 1.3)
        //   returns 1: 0.5
        let tmp;
        let tmp2;
        let p = 0;
        let pY = 0;
        let l = 0.0;
        let l2 = 0.0;
        tmp = x.toExponential().match(/^.\.?(.*)e(.+)$/);
        if (tmp === null) {
            return 0;
        }
        p = parseInt(tmp[2], 10) - (tmp[1] + '').length;
        tmp = y.toExponential().match(/^.\.?(.*)e(.+)$/);
        if (tmp === null) {
            return 0;
        }
        pY = parseInt(tmp[2], 10) - (tmp[1] + '').length;
        if (pY > p) {
            p = pY;
        }
        tmp2 = (x % y);
        if (p < -100 || p > 20) {
            // toFixed will give an out of bound error so we fix it like this:
            l = Math.round(Math.log(tmp2) / Math.log(10));
            l2 = Math.pow(10, l);
            return parseFloat((tmp2 / l2).toFixed(l - p)) * l2;
        }
        else {
            return parseFloat(tmp2.toFixed(-p));
        }
    }
}
exports.MathMore = MathMore;
