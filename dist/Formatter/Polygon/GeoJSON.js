"use strict";
/**
 * GeoJSON Polygon Formatter
 *
 * @author    clemdesign <contact@clemdesign.fr>
 * @license   https://opensource.org/licenses/MIT
 * @link
  */
Object.defineProperty(exports, "__esModule", { value: true });
class GeoJSON {
    /**
     * @param {Polygon} polygon
     * @returns {string}
     */
    format(polygon) {
        if (polygon.getNumberOfPoints() < 3) {
            return "";
        }
        let points = [];
        for (let point of polygon.getPoints()) {
            points.push([point.getLng(), point.getLat()]);
        }
        return JSON.stringify({
            'type': 'Polygon',
            'coordinates': [points]
        });
    }
}
exports.GeoJSON = GeoJSON;
