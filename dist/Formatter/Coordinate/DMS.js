"use strict";
/**
 * Coordinate Formatter "DMS"
 *
 * @author    clemdesign <contact@clemdesign.fr>
 * @license   https://opensource.org/licenses/MIT
 * @link
  */
Object.defineProperty(exports, "__esModule", { value: true });
const StringMore_1 = require("../../Functions/StringMore");
class DMS {
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
        this.unitType = DMS.UNITS_UTF8;
        /**
         * @var array
         */
        this.units = {
            'UTF-8': {
                'deg': '°',
                'min': '′',
                'sec': '″',
            },
            'ASCII': {
                'deg': '°',
                'min': '\'',
                'sec': '"',
            }
        };
        this.setSeparator(separator);
        this.useCardinalLetters(false);
        this.setUnits(DMS.UNITS_UTF8);
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
        let latMinutes = Math.trunc(60 * latMinutesDecimal);
        let latSeconds = 60 * (60 * latMinutesDecimal - latMinutes);
        let lngValue = Math.abs(lng);
        let lngDegrees = Math.trunc(lngValue);
        let lngMinutesDecimal = lngValue - lngDegrees;
        let lngMinutes = Math.trunc(60 * lngMinutesDecimal);
        let lngSeconds = 60 * (60 * lngMinutesDecimal - lngMinutes);
        const units = this.units[this.unitType];
        return this.getLatPrefix(lat) +
            StringMore_1.StringMore.pad(Math.abs(latDegrees), 2) +
            units['deg'] + " " +
            StringMore_1.StringMore.pad(latMinutes, 2) +
            units['min'] + " " +
            StringMore_1.StringMore.pad(Math.round(latSeconds), 2) +
            units['sec'] +
            this.getLatSuffix(lat) +
            this.separator +
            this.getLngPrefix(lng) +
            StringMore_1.StringMore.pad(Math.abs(lngDegrees), 3) +
            units['deg'] + " " +
            StringMore_1.StringMore.pad(lngMinutes, 2) +
            units['min'] + " " +
            StringMore_1.StringMore.pad(Math.round(lngSeconds), 2) +
            units['sec'] +
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
DMS.UNITS_UTF8 = 'UTF-8';
DMS.UNITS_ASCII = 'ASCII';
exports.DMS = DMS;
