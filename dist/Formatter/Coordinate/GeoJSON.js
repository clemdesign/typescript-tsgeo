"use strict";
/**
 * GeoJSON Coordinate Formatter
 *
 * @author    clemdesign <contact@clemdesign.fr>
 * @license   https://opensource.org/licenses/MIT
 * @link
  */
Object.defineProperty(exports, "__esModule", { value: true });
class GeoJSON {
    /**
     * @param {Coordinate} coordinate
     * @returns {string}
     */
    format(coordinate) {
        return JSON.stringify({
            'type': 'Point',
            'coordinates': [coordinate.getLng(), coordinate.getLat()]
        });
    }
}
exports.GeoJSON = GeoJSON;
