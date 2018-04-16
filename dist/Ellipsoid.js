"use strict";
/**
 * Ellipsoid
 *
 * @author    clemdesign <contact@clemdesign.fr>
 * @license   https://opensource.org/licenses/MIT
 * @link
  */
Object.defineProperty(exports, "__esModule", { value: true });
class Ellipsoid {
    /**
     * @param {string} name
     * @param {number} a
     * @param {number} f
     */
    constructor(name, a, f) {
        this.name = name;
        this.a = a;
        this.f = f;
    }
    /**
     * @param config
     * @returns {Ellipsoid}
     */
    static createFromArray(config) {
        return new this(config['name'], config['a'], config['f']);
    }
    /**
     * @param {string} name
     * @returns {Ellipsoid}
     */
    static createDefault(name = 'WGS-84') {
        const config = Ellipsoid.configs[name];
        return Ellipsoid.createFromArray(config);
    }
    /**
     * @returns {string}
     */
    getName() {
        return this.name;
    }
    /**
     * @returns {number}
     */
    getA() {
        return this.a;
    }
    /**
     * Calculation of the semi-minor axis
     *
     * @returns {number}
     */
    getB() {
        return (this.a * (1 - 1 / this.f));
    }
    /**
     * @returns {number}
     */
    getF() {
        return this.f;
    }
    /**
     * Calculates the arithmetic mean radius
     *
     * @see http://home.online.no/~sigurdhu/WGS84_Eng.html
     *
     * @returns {number}
     */
    getArithmeticMeanRadius() {
        return this.a * (1 - 1 / this.f / 3);
    }
}
/**
 * Some often used ellipsoids
 */
Ellipsoid.configs = {
    'WGS-84': {
        'name': 'World Geodetic System  1984',
        'a': 6378137.0,
        'f': 298.257223563,
    },
    'GRS-80': {
        'name': 'Geodetic Reference System 1980',
        'a': 6378137.0,
        'f': 298.257222100,
    }
};
exports.Ellipsoid = Ellipsoid;
