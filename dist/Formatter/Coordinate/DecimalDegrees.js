"use strict";
/**
 * Coordinate Formatter "Decimal Degrees"
 *
 * @author    clemdesign <contact@clemdesign.fr>
 * @license   https://opensource.org/licenses/MIT
 * @link
  */
Object.defineProperty(exports, "__esModule", { value: true });
const MathMore_1 = require("../../Functions/MathMore");
class DecimalDegrees {
    /**
     * @param {string} separator
     * @param {number} digits
     */
    constructor(separator = ' ', digits = 5) {
        /**
         * @var string Separator string between latitude and longitude
         */
        this.separator = ' ';
        /**
         * @type {number}
         */
        this.digits = 5;
        this.setSeparator(separator);
        this.digits = digits;
    }
    /**
     * @param {Coordinate} coordinate
     * @returns {string}
     */
    format(coordinate) {
        return MathMore_1.MathMore.round10(coordinate.getLat(), -(this.digits)).toString() +
            this.separator +
            MathMore_1.MathMore.round10(coordinate.getLng(), -(this.digits)).toString();
    }
    /**
     * @param {string} separator
     * @returns {DecimalDegrees}
     */
    setSeparator(separator) {
        this.separator = separator;
        return this;
    }
}
exports.DecimalDegrees = DecimalDegrees;
