/**
 * Coordinate Formatter "DecimalMinutes"
 *
 * @author    clemdesign <contact@clemdesign.fr>
 * @license   https://opensource.org/licenses/MIT
 * @link
  */

import {Coordinate} from "../../Coordinate";
import {FormatterInterface} from "./FormatterInterface";
import {StringMore} from "../../Functions/StringMore";

export class DecimalMinutes implements FormatterInterface {
  static UNITS_UTF8 = 'UTF-8';
  static UNITS_ASCII = 'ASCII';

  /**
   * @var string Separator string between latitude and longitude
   */
  protected separator:string = ' ';

  /**
   * Use cardinal letters for N/S and W/E instead of minus sign
   *
   * @var boolean
   */
  protected cardinalLetters: boolean = false;

  /**
   * @var string
   */
  protected unitType: string = DecimalMinutes.UNITS_UTF8;

  /**
   * @type {number}
   */
  protected digits = 3;

  /**
   * @var string
   */
  protected decimalPoint = '.';

  /**
   * @var array
   */
  protected units = {
    'UTF-8': {
      'deg': '°',
      'min': '′',
    },
    'ASCII': {
      'deg': '°',
      'min': '\'',
    }
  };

  /**
   * @param {string} separator
   */
  constructor(separator: string = ' ') {
    this.setSeparator(separator);
    this.useCardinalLetters(false);
    this.setUnits(DecimalMinutes.UNITS_UTF8);
  }

  /**
   * @param {Coordinate} coordinate
   * @returns {string}
   */
  format(coordinate: Coordinate): string {
    let lat = coordinate.getLat();
    let lng = coordinate.getLng();

    let latValue = Math.abs(lat);
    let latDegrees = Math.trunc(latValue);

    let latMinutesDecimal = latValue - latDegrees;
    let latMinutes        = 60 * latMinutesDecimal;

    let lngValue   = Math.abs(lng);
    let lngDegrees = Math.trunc(lngValue);

    let lngMinutesDecimal = lngValue - lngDegrees;
    let lngMinutes        = 60 * lngMinutesDecimal;

    const units = (this.units as any)[this.unitType];

    return this.getLatPrefix(lat) +
      StringMore.pad(Math.abs(latDegrees),2) +
      units['deg'] + " " +
      StringMore.number_format(latMinutes, this.digits, this.decimalPoint, this.decimalPoint) +
      units['min'] +
      this.getLatSuffix(lat) +
      this.separator +
      this.getLngPrefix(lng) +
      StringMore.pad(Math.abs(lngDegrees), 3) +
      units['deg'] + " " +
      StringMore.number_format(lngMinutes, this.digits, this.decimalPoint, this.decimalPoint) +
      units['min'] +
      this.getLngSuffix(lng);
  }

  /**
   * @param {string} separator
   * @returns {DecimalDegrees}
   */
  setSeparator(separator: string): DecimalMinutes {
    this.separator = separator;

    return this;
  }

  /**
   * @param {boolean} value
   * @returns {DecimalMinutes}
   */
  useCardinalLetters(value: boolean): DecimalMinutes {
    this.cardinalLetters = value;

    return this;
  }

  /**
   * @param {string} type
   * @returns {DecimalMinutes}
   */
  setUnits(type: string): DecimalMinutes | null {
    if (!(type in this.units)) {
      return null
    }

    this.unitType = type;

    return this;
  }

  /**
   * @param {number} digits
   * @returns {DecimalMinutes}
   */
  setDigits(digits: number): DecimalMinutes {
    this.digits = digits;

    return this;
  }

  /**
   * @param {string} decimalPoint
   * @returns {DecimalMinutes}
   */
  setDecimalPoint(decimalPoint: string): DecimalMinutes {
    this.decimalPoint = decimalPoint;

    return this;
  }

  /**
   * @param {number} lat
   * @returns {string}
   */
  getLatPrefix(lat: number): string {
    if (this.cardinalLetters || lat >= 0) {
      return '';
    }

    return '-';
  }

  /**
   * @param {number} lng
   * @returns {string}
   */
  getLngPrefix(lng: number): string {
    if (this.cardinalLetters || lng >= 0) {
      return '';
    }

    return '-';
  }

  /**
   * @param {number} lat
   * @returns {string}
   */
  getLatSuffix(lat: number): string {
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
  getLngSuffix(lng: number): string {
    if (!this.cardinalLetters) {
      return '';
    }

    if (lng >= 0) {
      return ' E';
    }

    return ' W';
  }
}