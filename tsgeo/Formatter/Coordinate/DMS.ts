/**
 * Coordinate Formatter "DMS"
 *
 * @author    clemdesign <contact@clemdesign.fr>
 * @license   https://opensource.org/licenses/MIT
 * @link
  */

import {Coordinate} from "../../Coordinate";
import {FormatterInterface} from "./FormatterInterface";
import {StringMore} from "../../Functions/StringMore";

export class DMS implements FormatterInterface {
  static UNITS_UTF8 = 'UTF-8';
  static UNITS_ASCII = 'ASCII';

  /**
   * @var string Separator string between latitude and longitude
   */
  protected separator;

  /**
   * Use cardinal letters for N/S and W/E instead of minus sign
   *
   * @var boolean
   */
  protected cardinalLetters;

  /**
   * @var string
   */
  protected unitType;

  /**
   * @var array
   */
  protected units = {
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

  /**
   * @param {string} separator
   */
  constructor(separator: string = ' ') {
    this.setSeparator(separator);
    this.useCardinalLetters(false);
    this.setUnits(DMS.UNITS_UTF8);
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
    let latMinutes        = Math.trunc(60 * latMinutesDecimal);
    let latSeconds        = 60 * (60 * latMinutesDecimal - latMinutes);

    let lngValue   = Math.abs(lng);
    let lngDegrees = Math.trunc(lngValue);

    let lngMinutesDecimal = lngValue - lngDegrees;
    let lngMinutes        = Math.trunc(60 * lngMinutesDecimal);
    let lngSeconds        = 60 * (60 * lngMinutesDecimal - lngMinutes);

    return this.getLatPrefix(lat) +
      StringMore.pad(Math.abs(latDegrees),2) +
      this.units[this.unitType]['deg'] + " " +
      StringMore.pad(latMinutes, 2) +
      this.units[this.unitType]['min'] + " " +
      StringMore.pad(Math.round(latSeconds), 2) +
      this.units[this.unitType]['sec'] +
      this.getLatSuffix(lat) +
      this.separator +
      this.getLngPrefix(lng) +
      StringMore.pad(Math.abs(lngDegrees), 3) +
      this.units[this.unitType]['deg'] + " " +
      StringMore.pad(lngMinutes, 2) +
      this.units[this.unitType]['min'] + " " +
      StringMore.pad(Math.round(lngSeconds), 2) +
      this.units[this.unitType]['sec'] +
      this.getLngSuffix(lng);
  }

  /**
   * @param {string} separator
   * @returns {DecimalDegrees}
   */
  setSeparator(separator: string): DMS {
    this.separator = separator;

    return this;
  }

  /**
   * @param {boolean} value
   * @returns {DecimalMinutes}
   */
  useCardinalLetters(value: boolean): DMS {
    this.cardinalLetters = value;

    return this;
  }

  /**
   * @param {string} type
   * @returns {DecimalMinutes}
   */
  setUnits(type: string): DMS | null {
    if (!(type in this.units)) {
      return null
    }

    this.unitType = type;

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