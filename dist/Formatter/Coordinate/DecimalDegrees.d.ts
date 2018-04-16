/**
 * Coordinate Formatter "Decimal Degrees"
 *
 * @author    clemdesign <contact@clemdesign.fr>
 * @license   https://opensource.org/licenses/MIT
 * @link
  */
import { Coordinate } from "../../Coordinate";
import { FormatterInterface } from "./FormatterInterface";
export declare class DecimalDegrees implements FormatterInterface {
    /**
     * @var string Separator string between latitude and longitude
     */
    protected separator: string;
    /**
     * @type {number}
     */
    protected digits: number;
    /**
     * @param {string} separator
     * @param {number} digits
     */
    constructor(separator?: string, digits?: number);
    /**
     * @param {Coordinate} coordinate
     * @returns {string}
     */
    format(coordinate: Coordinate): string;
    /**
     * @param {string} separator
     * @returns {DecimalDegrees}
     */
    setSeparator(separator: string): DecimalDegrees;
}
