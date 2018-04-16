"use strict";
/**
 * Implementation of distance calculation with http://en.wikipedia.org/wiki/Law_of_haversines
 *
 * @author    clemdesign <contact@clemdesign.fr>
 * @license   https://opensource.org/licenses/MIT
 * @link
  */
Object.defineProperty(exports, "__esModule", { value: true });
const MathMore_1 = require("../Functions/MathMore");
class Haversine {
    /**
     * @param {Coordinate} point1
     * @param {Coordinate} point2
     *
     * @return number|null
     */
    getDistance(point1, point2) {
        if (point1.getEllipsoid().getName() !== point2.getEllipsoid().getName()) {
            return 0;
        }
        let lat1 = MathMore_1.MathMore.deg2rad(point1.getLat());
        let lat2 = MathMore_1.MathMore.deg2rad(point2.getLat());
        let lng1 = MathMore_1.MathMore.deg2rad(point1.getLng());
        let lng2 = MathMore_1.MathMore.deg2rad(point2.getLng());
        let dLat = lat2 - lat1;
        let dLng = lng2 - lng1;
        let radius = point1.getEllipsoid().getArithmeticMeanRadius();
        let distance = 2 * radius * Math.asin(Math.sqrt((Math.pow(Math.sin(dLat / 2), 2))
            + Math.cos(lat1) * Math.cos(lat2) * (Math.pow(Math.sin(dLng / 2), 2))));
        return MathMore_1.MathMore.round10(distance, -3);
    }
}
exports.Haversine = Haversine;
