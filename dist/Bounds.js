"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Coordinate Bounds Class
 *
 * @author    clemdesign <contact@clemdesign.fr>
 * @license   https://opensource.org/licenses/MIT
 * @link
  */
const Coordinate_1 = require("./Coordinate");
class Bounds {
    /**
     *
     * @param {Coordinate} northWest
     * @param {Coordinate} southEast
     */
    constructor(northWest, southEast) {
        this.northWest = northWest;
        this.southEast = southEast;
    }
    /**
     * Getter
     *
     * @returns {Coordinate}
     */
    getNorthWest() {
        return this.northWest;
    }
    /**
     * Getter
     *
     * @returns {Coordinate}
     */
    getSouthEast() {
        return this.southEast;
    }
    /**
     * @returns {number}
     */
    getNorth() {
        return this.northWest.getLat();
    }
    /**
     * @returns {number}
     */
    getSouth() {
        return this.southEast.getLat();
    }
    /**
     * @returns {number}
     */
    getWest() {
        return this.northWest.getLng();
    }
    /**
     * @returns {number}
     */
    getEast() {
        return this.southEast.getLng();
    }
    /**
     * Calculates the center of this bounds object and returns it as a
     * Coordinate instance.
     *
     * @returns {Coordinate}
     */
    getCenter() {
        let centerLat = (this.getNorth() + this.getSouth()) / 2;
        return new Coordinate_1.Coordinate(centerLat, this.getCenterLng());
    }
    /**
     *
     * @returns {number}
     */
    getCenterLng() {
        let centerLng = (this.getEast() + this.getWest()) / 2;
        let overlap = this.getWest() > 0 && this.getEast() < 0;
        if (overlap && centerLng > 0) {
            return -180.0 + centerLng;
        }
        if (overlap && centerLng < 0) {
            return 180.0 + centerLng;
        }
        if (overlap && centerLng == 0) {
            return 180.0;
        }
        return centerLng;
    }
}
exports.Bounds = Bounds;
