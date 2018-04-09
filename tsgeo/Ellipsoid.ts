/**
 * Ellipsoid
 *
 * @author    clemdesign <contact@clemdesign.fr>
 * @license   https://opensource.org/licenses/MIT
 * @link
 */


export class Ellipsoid {

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
  static configs = {
    'WGS-84' : {
      'name' : 'World Geodetic System  1984',
      'a'    : 6378137.0,
      'f'    : 298.257223563,
    },
    'GRS-80' : {
      'name' : 'Geodetic Reference System 1980',
      'a'    : 6378137.0,
      'f'    : 298.257222100,
    }
  };

  /**
   * @param {string} name
   * @param {number} a
   * @param {number} f
   */
  constructor (name: string, a: number, f:number){
    this.name = name;
    this.a    = a;
    this.f    = f;
  }

  /**
   * @param config
   * @returns {Ellipsoid}
   */
  static createFromArray(config): Ellipsoid
  {
    return new this(config['name'], config['a'], config['f']);
  }

  /**
   * @param {string} $name
   * @returns {Ellipsoid}
   */
  static createDefault($name = 'WGS-84'): Ellipsoid
  {
    return Ellipsoid.createFromArray(Ellipsoid.configs[$name]);
  }

  /**
   * @returns {string}
   */
  getName(): string
  {
    return this.name;
  }

  /**
   * @returns {number}
   */
  getA(): number
  {
    return this.a;
  }

  /**
   * Calculation of the semi-minor axis
   *
   * @returns {number}
   */
  getB(): number
  {
    return (this.a * (1 - 1 / this.f));
  }

  /**
   * @returns {number}
   */
  getF(): number
  {
    return this.f;
  }

  /**
   * Calculates the arithmetic mean radius
   *
   * @see http://home.online.no/~sigurdhu/WGS84_Eng.html
   *
   * @returns {number}
   */
  getArithmeticMeanRadius(): number
  {
    return this.a * (1 - 1 / this.f / 3);
  }

}