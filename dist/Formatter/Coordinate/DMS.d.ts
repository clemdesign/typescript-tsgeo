/**
 * Coordinate Formatter "DMS"
 *
 * @author    clemdesign <contact@clemdesign.fr>
 * @license   https://opensource.org/licenses/MIT
 * @link
  */
import { Coordinate } from "../../Coordinate";
import { FormatterInterface } from "./FormatterInterface";
export declare class DMS implements FormatterInterface {
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
     * @var array
     */
    protected units: {
        'UTF-8': {
            'deg': string;
            'min': string;
            'sec': string;
        };
        'ASCII': {
            'deg': string;
            'min': string;
            'sec': string;
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
    setSeparator(separator: string): DMS;
    /**
     * @param {boolean} value
     * @returns {DecimalMinutes}
     */
    useCardinalLetters(value: boolean): DMS;
    /**
     * @param {string} type
     * @returns {DecimalMinutes}
     */
    setUnits(type: string): DMS | null;
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
