/**
 * Ellipsoid
 *
 * @author    clemdesign <contact@clemdesign.fr>
 * @license   https://opensource.org/licenses/MIT
 * @link
  */
export declare class Ellipsoid {
    name: string;
    /**
     * The semi-major axis
     */
    a: number;
    /**
     * The Inverse Flattening (1/f)
     */
    f: number;
    /**
     * Some often used ellipsoids
     */
    static configs: {
        'WGS-84': {
            'name': string;
            'a': number;
            'f': number;
        };
        'GRS-80': {
            'name': string;
            'a': number;
            'f': number;
        };
    };
    /**
     * @param {string} name
     * @param {number} a
     * @param {number} f
     */
    constructor(name: string, a: number, f: number);
    /**
     * @param config
     * @returns {Ellipsoid}
     */
    static createFromArray(config: any): Ellipsoid;
    /**
     * @param {string} name
     * @returns {Ellipsoid}
     */
    static createDefault(name?: string): Ellipsoid;
    /**
     * @returns {string}
     */
    getName(): string;
    /**
     * @returns {number}
     */
    getA(): number;
    /**
     * Calculation of the semi-minor axis
     *
     * @returns {number}
     */
    getB(): number;
    /**
     * @returns {number}
     */
    getF(): number;
    /**
     * Calculates the arithmetic mean radius
     *
     * @see http://home.online.no/~sigurdhu/WGS84_Eng.html
     *
     * @returns {number}
     */
    getArithmeticMeanRadius(): number;
}
