"use strict";
/**
 * Coordinate Formatter "DecimalMinutes"
 *
 * @author    clemdesign <contact@clemdesign.fr>
 * @license   https://opensource.org/licenses/MIT
 * @link
  */
Object.defineProperty(exports, "__esModule", { value: true });
const StringMore_1 = require("../../Functions/StringMore");
class DecimalMinutes {
    /**
     * @param {string} separator
     */
    constructor(separator = ' ') {
        /**
         * @var string Separator string between latitude and longitude
         */
        this.separator = ' ';
        /**
         * Use cardinal letters for N/S and W/E instead of minus sign
         *
         * @var boolean
         */
        this.cardinalLetters = false;
        /**
         * @var string
         */
        this.unitType = DecimalMinutes.UNITS_UTF8;
        /**
         * @type {number}
         */
        this.digits = 3;
        /**
         * @var string
         */
        this.decimalPoint = '.';
        /**
         * @var array
         */
        this.units = {
            'UTF-8': {
                'deg': '°',
                'min': '′',
            },
            'ASCII': {
                'deg': '°',
                'min': '\'',
            }
        };
        this.setSeparator(separator);
        this.useCardinalLetters(false);
        this.setUnits(DecimalMinutes.UNITS_UTF8);
    }
    /**
     * @param {Coordinate} coordinate
     * @returns {string}
     */
    format(coordinate) {
        let lat = coordinate.getLat();
        let lng = coordinate.getLng();
        let latValue = Math.abs(lat);
        let latDegrees = Math.trunc(latValue);
        let latMinutesDecimal = latValue - latDegrees;
        let latMinutes = 60 * latMinutesDecimal;
        let lngValue = Math.abs(lng);
        let lngDegrees = Math.trunc(lngValue);
        let lngMinutesDecimal = lngValue - lngDegrees;
        let lngMinutes = 60 * lngMinutesDecimal;
        const units = this.units[this.unitType];
        return this.getLatPrefix(lat) +
            StringMore_1.StringMore.pad(Math.abs(latDegrees), 2) +
            units['deg'] + " " +
            StringMore_1.StringMore.number_format(latMinutes, this.digits, this.decimalPoint, this.decimalPoint) +
            units['min'] +
            this.getLatSuffix(lat) +
            this.separator +
            this.getLngPrefix(lng) +
            StringMore_1.StringMore.pad(Math.abs(lngDegrees), 3) +
            units['deg'] + " " +
            StringMore_1.StringMore.number_format(lngMinutes, this.digits, this.decimalPoint, this.decimalPoint) +
            units['min'] +
            this.getLngSuffix(lng);
    }
    /**
     * @param {string} separator
     * @returns {DecimalDegrees}
     */
    setSeparator(separator) {
        this.separator = separator;
        return this;
    }
    /**
     * @param {boolean} value
     * @returns {DecimalMinutes}
     */
    useCardinalLetters(value) {
        this.cardinalLetters = value;
        return this;
    }
    /**
     * @param {string} type
     * @returns {DecimalMinutes}
     */
    setUnits(type) {
        if (!(type in this.units)) {
            return null;
        }
        this.unitType = type;
        return this;
    }
    /**
     * @param {number} digits
     * @returns {DecimalMinutes}
     */
    setDigits(digits) {
        this.digits = digits;
        return this;
    }
    /**
     * @param {string} decimalPoint
     * @returns {DecimalMinutes}
     */
    setDecimalPoint(decimalPoint) {
        this.decimalPoint = decimalPoint;
        return this;
    }
    /**
     * @param {number} lat
     * @returns {string}
     */
    getLatPrefix(lat) {
        if (this.cardinalLetters || lat >= 0) {
            return '';
        }
        return '-';
    }
    /**
     * @param {number} lng
     * @returns {string}
     */
    getLngPrefix(lng) {
        if (this.cardinalLetters || lng >= 0) {
            return '';
        }
        return '-';
    }
    /**
     * @param {number} lat
     * @returns {string}
     */
    getLatSuffix(lat) {
        if (!this.cardinalLetters) {
            return '';
        }
        if (lat >= 0) {
            return ' N';
        }
        return ' S';
    }
    /**
     * @param {number} lng
     * @returns {string}
     */
    getLngSuffix(lng) {
        if (!this.cardinalLetters) {
            return '';
        }
        if (lng >= 0) {
            return ' E';
        }
        return ' W';
    }
}
DecimalMinutes.UNITS_UTF8 = 'UTF-8';
DecimalMinutes.UNITS_ASCII = 'ASCII';
exports.DecimalMinutes = DecimalMinutes;
