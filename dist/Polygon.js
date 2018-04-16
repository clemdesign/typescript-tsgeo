"use strict";
/**
 * Polygon Implementation
 *
 * @author    clemdesign <contact@clemdesign.fr>
 * @license   https://opensource.org/licenses/MIT
 * @link
  */
Object.defineProperty(exports, "__esModule", { value: true });
const Line_1 = require("./Line");
const MathMore_1 = require("./Functions/MathMore");
class Polygon {
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
        // to close the polygon we have to add the final segment between
        // the last point and the first point
        segments.push(new Line_1.Line(this.points[this.points.length - 1], this.points[0]));
        return segments;
    }
    /**
     * Determine if given geometry is contained inside the polygon. This is
     * assumed to be true, if each point of the geometry is inside the polygon.
     *
     * Edge cases:
     *
     * - it's not detected when a line between two points is outside the polygon
     * - @see contains() for more restrictions
     *
     * @param {GeometryInterface} geometry
     * @returns {boolean}
     */
    containsGeometry(geometry) {
        let geometryInPolygon = true;
        /** @var Coordinate point */
        for (let point of geometry.getPoints()) {
            geometryInPolygon = geometryInPolygon && this.contains(point);
        }
        return geometryInPolygon;
    }
    /**
     * Determine if given point is contained inside the polygon. Uses the PNPOLY
     * algorithm by W. Randolph Franklin. Therfore some edge cases may not give the
     * expected results, e. g. if the point resides on the polygon boundary.
     *
     * @see http://www.ecse.rpi.edu/Homepages/wrf/Research/Short_Notes/pnpoly.html
     *
     * For special cases this calculation leads to wrong results:
     *
     * - if the polygons spans over the longitude boundaries at 180/-180 degrees
     *
     * @param {Coordinate} point
     * @returns {boolean}
     */
    contains(point) {
        let numberOfPoints = this.getNumberOfPoints();
        let polygonLats = this.getLats();
        let polygonLngs = this.getLngs();
        let polygonContainsPoint = false;
        for (let node = 0, altNode = (numberOfPoints - 1); node < numberOfPoints; altNode = node++) {
            if ((polygonLngs[node] > point.getLng() != (polygonLngs[altNode] > point.getLng()))
                && (point.getLat() < (polygonLats[altNode] - polygonLats[node])
                    * (point.getLng() - polygonLngs[node])
                    / (polygonLngs[altNode] - polygonLngs[node])
                    + polygonLats[node])) {
                polygonContainsPoint = !polygonContainsPoint;
            }
        }
        return polygonContainsPoint;
    }
    /**
     * Calculates the polygon perimeter.
     *
     /**
     *
     * @param {DistanceInterface} calculator instance of distance calculation class
     * @returns {number}
     */
    getPerimeter(calculator) {
        let perimeter = 0.0;
        if (this.points.length < 2) {
            return perimeter;
        }
        for (let segment of this.getSegments()) {
            perimeter += segment.getLength(calculator);
        }
        return perimeter;
    }
    /**
     * Calculates the polygon area.
     *
     * This algorithm gives inaccurate results as it ignores
     * ellipsoid parameters other than to arithmetic mean radius.
     * The error should be < 1 % for small areas.
     *
     * @return number
     */
    getArea() {
        let area = 0;
        if (this.getNumberOfPoints() <= 2) {
            return area;
        }
        let referencePoint = this.points[0];
        let radius = referencePoint.getEllipsoid().getArithmeticMeanRadius();
        let segments = this.getSegments();
        for (let segment of segments) {
            /** @var {Coordinate} point1 */
            let point1 = segment.getPoint1();
            /** @var {Coordinate} point2 */
            let point2 = segment.getPoint2();
            let x1 = MathMore_1.MathMore.deg2rad(point1.getLng() - referencePoint.getLng()) * Math.cos(MathMore_1.MathMore.deg2rad(point1.getLat()));
            let y1 = MathMore_1.MathMore.deg2rad(point1.getLat() - referencePoint.getLat());
            let x2 = MathMore_1.MathMore.deg2rad(point2.getLng() - referencePoint.getLng()) * Math.cos(MathMore_1.MathMore.deg2rad(point2.getLat()));
            let y2 = MathMore_1.MathMore.deg2rad(point2.getLat() - referencePoint.getLat());
            area += (x2 * y1 - x1 * y2);
        }
        area *= 0.5 * Math.pow(radius, 2);
        return Math.abs(area);
    }
    /**
     * Create a new polygon with reversed order of points, i. e. reversed
     * polygon direction.
     *
     * @return Polygon
     */
    getReverse() {
        let reversed = new Polygon();
        let points_reversed = this.points.reverse();
        for (let point of points_reversed) {
            reversed.addPoint(point);
        }
        return reversed;
    }
}
exports.Polygon = Polygon;
