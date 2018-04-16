/**
 * Coordinate Formatter "DecimalMinutes"
 *
 * @author    clemdesign <contact@clemdesign.fr>
 * @license   https://opensource.org/licenses/MIT
 * @link
  */
import { Coordinate } from "../../Coordinate";
import { FormatterInterface } from "./FormatterInterface";
export declare class DecimalMinutes implements FormatterInterface {
    static UNITS_UTF8: string;
    static UNITS_ASCII: string;
    /**
     * @var string Separator string between latitude and longitude
     */
    protected separator: string;
    /**
     * Use cardinal letters for N/S and W/E instead of minus sign
     *
     * @var boolean
     */
    protected cardinalLetters: boolean;
    /**
     * @var string
     */
    protected unitType: string;
    /**
     * @type {number}
     */
    protected digits: number;
    /**
     * @var string
     */
    protected decimalPoint: string;
    /**
     * @var array
     */
    protected units: {
        'UTF-8': {
            'deg': string;
            'min': string;
        };
        'ASCII': {
            'deg': string;
            'min': string;
        };
    };
    /**
     * @param {string} separator
     */
    constructor(separator?: string);
    /**
     * @param {Coordinate} coordinate
     * @returns {string}
     */
    format(coordinate: Coordinate): string;
    /**
     * @param {string} separator
     * @returns {DecimalDegrees}
     */
    setSeparator(separator: string): DecimalMinutes;
    /**
     * @param {boolean} value
     * @returns {DecimalMinutes}
     */
    useCardinalLetters(value: boolean): DecimalMinutes;
    /**
     * @param {string} type
     * @returns {DecimalMinutes}
     */
    setUnits(type: string): DecimalMinutes | null;
    /**
     * @param {number} digits
     * @returns {DecimalMinutes}
     */
    setDigits(digits: number): DecimalMinutes;
    /**
     * @param {string} decimalPoint
     * @returns {DecimalMinutes}
     */
    setDecimalPoint(decimalPoint: string): DecimalMinutes;
    /**
     * @param {number} lat
     * @returns {string}
     */
    getLatPrefix(lat: number): string;
    /**
     * @param {number} lng
     * @returns {string}
     */
    getLngPrefix(lng: number): string;
    /**
     * @param {number} lat
     * @returns {string}
     */
    getLatSuffix(lat: number): string;
    /**
     * @param {number} lng
     * @returns {string}
     */
    getLngSuffix(lng: number): string;
}
