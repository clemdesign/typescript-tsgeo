"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Line {
    /**
     * @param {Coordinate} point1
     * @param {Coordinate} point2
     */
    constructor(point1, point2) {
        this.point1 = point1;
        this.point2 = point2;
    }
    /**
     * @param {Coordinate} point1
     */
    setPoint1(point1) {
        this
            .point1 = point1;
    }
    /**
     * @returns {Coordinate}
     */
    getPoint1() {
        return this.point1;
    }
    /**
     * @param {Coordinate} point2
     */
    setPoint2(point2) {
        this
            .point2 = point2;
    }
    /**
     * @returns {Coordinate}
     */
    getPoint2() {
        return this.point2;
    }
    /**
     * Returns an array containing the two points.
     *
     * @returns {Array<Coordinate>}
     */
    getPoints() {
        return [this.point1, this.point2];
    }
    /**
     * Calculates the length of the line (distance between the two
     * coordinates).
     *
     * @param {DistanceInterface} calculator instance of distance calculation class
     * @returns {number}
     */
    getLength(calculator) {
        return calculator.getDistance(this.point1, this.point2);
    }
    //TODO: Implement BearingInterface
    /**
     * Create a new instance with reversed point order, i. e. reversed direction.
     *
     * @return Line
     */
    getReverse() {
        return new Line(this.point2, this.point1);
    }
}
exports.Line = Line;
