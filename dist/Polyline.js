"use strict";
/**
 * Polyline Implementation
 *
 * @author    clemdesign <contact@clemdesign.fr>
 * @license   https://opensource.org/licenses/MIT
 * @link
  */
Object.defineProperty(exports, "__esModule", { value: true });
const Line_1 = require("./Line");
class Polyline {
    constructor() {
        this.points = [];
    }
    /**
     * @param {Coordinate} point
     */
    addPoint(point) {
        this.points.push(point);
    }
    /**
     * @return array
     */
    getPoints() {
        return this.points;
    }
    /**
     * Return all polygon point's latitudes.
     *
     * @return number[]
     */
    getLats() {
        let lats = [];
        for (let point of this.points) {
            lats.push(point.getLat());
        }
        return lats;
    }
    /**
     * Return all polygon point's longitudes.
     *
     * @returns {Array<number>}
     */
    getLngs() {
        let lngs = [];
        for (let point of this.points) {
            lngs.push(point.getLng());
        }
        return lngs;
    }
    /**
     * @returns {number}
     */
    getNumberOfPoints() {
        return this.points.length;
    }
    /**
     *
     * @param {FormatterInterface} formatter
     * @returns {string}
     */
    format(formatter) {
        return formatter.format(this);
    }
    /**
     * @return array
     */
    getSegments() {
        let segments = [];
        if (this.points.length < 2) {
            return segments;
        }
        let previousPoint = this.points[0];
        let passLoop = true;
        for (let point of this.points) {
            if (!passLoop) {
                segments.push(new Line_1.Line(previousPoint, point));
                previousPoint = point;
            }
            passLoop = false;
        }
        return segments;
    }
    /**
     * Calculates the length of the polyline.
     *
     * @param {DistanceInterface} calculator
     * @returns {number}
     */
    getLength(calculator) {
        let distance = 0.0;
        if (this.points.length <= 1) {
            return distance;
        }
        for (let segment of this.getSegments()) {
            distance += segment.getLength(calculator);
        }
        return distance;
    }
    /**
     * Create a new polygon with reversed order of points, i. e. reversed
     * polygon direction.
     *
     * @return Polygon
     */
    getReverse() {
        let reversed = new Polyline();
        let points_reversed = this.points.reverse();
        for (let point of points_reversed) {
            reversed.addPoint(point);
        }
        return reversed;
    }
}
exports.Polyline = Polyline;
