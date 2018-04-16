"use strict";
/**
 * GeoJSON Polyline Formatter
 *
 * @author    clemdesign <contact@clemdesign.fr>
 * @license   https://opensource.org/licenses/MIT
 * @link
  */
Object.defineProperty(exports, "__esModule", { value: true });
class GeoJSON {
    /**
     * @param {Polyline} polyline
     * @returns {string}
     */
    format(polyline) {
        let points = [];
        for (let point of polyline.getPoints()) {
            points.push([point.getLng(), point.getLat()]);
        }
        return JSON.stringify({
            'type': 'LineString',
            'coordinates': [points]
        });
    }
}
exports.GeoJSON = GeoJSON;
