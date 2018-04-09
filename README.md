# TsGeo - A Simple Geo Library for [TypeScript](https://www.typescriptlang.org/)

TsGeo provides abstractions to geographical coordinates (including support for different ellipsoids) and allows you to calculate geographical distances between coordinates with high precision.

This library can be used in [TypeScript](https://www.typescriptlang.org/) project, for instance application under:
- [Angular](https://angular.io/)
- [Ionic](https://ionicframework.com)
- ...

This project is an adaptation of [phpgeo](https://github.com/mjaschen/phpgeo) of [mjaschen](https://github.com/mjaschen).

- [Documentation](#documentation)
- [Installation](#installation)
- [Features](#features)
- [Examples/Usage](#examplesusage)
  - [Distance between two coordinates \(Vincenty's Formula\)](#distance-between-two-coordinates-vincentys-formula)
  - [Simplifying a polyline](#simplifying-a-polyline)
  - [Polygon contains a point \(e.g. "GPS geofence"\)](#polygon-contains-a-point-eg-gps-geofence)
  - [Formatted output of coordinates](#formatted-output-of-coordinates)
    - [Decimal Degrees](#decimal-degrees)
    - [Degrees/Minutes/Seconds \(DMS\)](#degreesminutesseconds-dms)
    - [GeoJSON](#geojson)
- [Credits](#credits)
- [License](#license)


## Documentation

This project is based on [phpgeo](https://github.com/mjaschen/phpgeo) so to know the possibilities of this library, you can consult documentation of **phpgeo**:  https://phpgeo.marcusjaschen.de/


## Installation

To install this library, just download the zip version of this repository and unzip `tsgeo` sub-directory in your application project. 

## Features

**Info:** Transcription of documentation related to _TypeScript_ version is not done. So, please refer to the **[documentation site](https://phpgeo.marcusjaschen.de/)** of **phpgeo** for complete and up-to-date documentation!

TsGeo provides the following features (follow the links for examples):

- abstractions of several geometry objects ([coordinate/point](https://phpgeo.marcusjaschen.de/geometry/coordinate/),
  [line](https://phpgeo.marcusjaschen.de/geometry/line/),
  [polyline/GPS track](https://phpgeo.marcusjaschen.de/geometry/polyline/),
  [polygon](https://phpgeo.marcusjaschen.de/geometry/polygon/)
- support for different [ellipsoids](https://phpgeo.marcusjaschen.de/geometry/ellipsoid/), e. g. WGS-84
- [length/distance/perimeter calculations](https://phpgeo.marcusjaschen.de/calculations/distance/)
  with different implementations (Haversine, Vincenty)
- [Geofence](https://phpgeo.marcusjaschen.de/calculations/geofence/) calculation,
  i. e. answering the question "Is this point contained in that area/polygon?"
- [formatting and output](https://phpgeo.marcusjaschen.de/formatting/) of geometry objects
  (GeoJSON, nice strings, e. g. `18° 54′ 41″ -155° 40′ 42″`)
- calculation of [bearing angle between two points](https://phpgeo.marcusjaschen.de/calculations/bearing/#bearing-between-two-points)
  (spherical or with Vincenty's formula)
- calculation of a [destination point for a given starting point](https://phpgeo.marcusjaschen.de/calculations/bearing/#destination-point-for-given-bearing-and-distance),
  bearing angle, and distance (spherical or with Vincenty's formula)
- calculation of the [perpendicular distance between a point and a line](https://phpgeo.marcusjaschen.de/#_perpendicular_distance)
- getting segments of a [polyline](https://phpgeo.marcusjaschen.de/geometry/polyline/#segments)
  /[polygon](https://phpgeo.marcusjaschen.de/geometry/polygon/#segments),
- [reversing direction](https://phpgeo.marcusjaschen.de/geometry/polyline/#reverse-direction)
  of polyline/polygon

## Examples/Usage

This list is incomplete, please visit the [phpgeo documentation site](https://phpgeo.marcusjaschen.de/)
for the full monty of documentation and examples!

### Distance between two coordinates (Vincenty's Formula)

Use the calculator object directly:

```typescript

import {Coordinate} from "tsgeo/Coordinate";
import {Vincenty}   from "tsgeo/Distance/Vincenty";

/* Add the following in a method of TS class */

let coordinate1 = new Coordinate(19.820664, -155.468066); // Mauna Kea Summit
let coordinate2 = new Coordinate(20.709722, -156.253333); // Haleakala Summit

let calculator = new Vincenty();

console.log(calculator.getDistance(coordinate1, coordinate2)); // returns 128130.850 (meters; ≈128 kilometers)
```

or call the `getDistance()` method of a Coordinate object by injecting a calculator object:

```typescript
import {Coordinate} from "tsgeo/Coordinate";
import {Vincenty}   from "tsgeo/Distance/Vincenty";

/* Add the following in a method of TS class */

let coordinate1 = new Coordinate(19.820664, -155.468066); // Mauna Kea Summit
let coordinate2 = new Coordinate(20.709722, -156.253333); // Haleakala Summit

console.log(coordinate1.getDistance(coordinate2, new Vincenty())); // returns 128130.850 (meters; ≈128 kilometers)
```

### Simplifying a polyline

Polylines can be simplified to save storage space or bandwidth. Simplification is done with the [Ramer–Douglas–Peucker algorithm](https://en.wikipedia.org/wiki/Ramer–Douglas–Peucker_algorithm) (AKA Douglas-Peucker algorithm).

```typescript
import {Coordinate} from "tsgeo/Coordinate";
import {Polyline}   from "tsgeo/Polyline";
import {Vincenty}   from "tsgeo/Distance/Vincenty";

/* Add the following in a method of TS class */

let polyline = new Polyline();
polyline.addPoint(new Coordinate(10.0, 10.0));
polyline.addPoint(new Coordinate(20.0, 20.0));
polyline.addPoint(new Coordinate(30.0, 10.0));

let processor = new Simplify(polyline);

// remove all points which perpendicular distance is less
// than 1500 km from the surrounding points.
let simplified = processor.simplify(1500000);

// simplified is the polyline without the second point (which
// perpendicular distance is ~1046 km and therefore below
// the simplification threshold)
```

### Polygon contains a point (e.g. "GPS geofence")

phpgeo has a polygon implementation which can be used to determinate if a point is contained in it or not.
A polygon consists of at least three points. Points are instances of the `Coordinate` class.

**Warning:** The calculation gives wrong results if the polygons has points on both sides of the 180/-180 degrees meridian.

```typescript

import {Coordinate} from "tsgeo/Coordinate";
import {Polygon}   from "tsgeo/Polygon";

/* Add the following in a method of TS class */

let geofence = new Polygon();

geofence.addPoint(new Coordinate(-12.085870,-77.016261));
geofence.addPoint(new Coordinate(-12.086373,-77.033813));
geofence.addPoint(new Coordinate(-12.102823,-77.030938));
geofence.addPoint(new Coordinate(-12.098669,-77.006476));

let outsidePoint = new Coordinate(-12.075452, -76.985079);
let insidePoint = new Coordinate(-12.092542, -77.021540);

console.log(geofence.contains(outsidePoint)); // returns bool(false) the point is outside the polygon
console.log(geofence.contains(insidePoint)); // returns bool(true) the point is inside the polygon
```

### Formatted output of coordinates

You can format a coordinate in different styles.

#### Decimal Degrees

```typescript

import {Coordinate}     from "tsgeo/Coordinate";
import {DecimalDegrees} from "tsgeo/Formatter/Coordinate/DecimalDegrees";

/* Add the following in a method of TS class */

let coordinate = new Coordinate(19.820664, -155.468066); // Mauna Kea Summit

console.log(coordinate.format(new DecimalDegrees()));
```

#### Degrees/Minutes/Seconds (DMS)

```typescript

import {Coordinate} from "tsgeo/Coordinate";
import {DMS}        from "tsgeo/Formatter/Coordinate/DMS";

/* Add the following in a method of TS class */

let coordinate = new Coordinate(18.911306, -155.678268); // South Point, HI, USA

let formatter = new DMS();

console.log(coordinate.format(formatter)); // 18° 54′ 41″ -155° 40′ 42″

formatter.setSeparator(", ")
    .useCardinalLetters(true)
    .setUnits(DMS.UNITS_ASCII);

console.log(coordinate.format(formatter)); // 18° 54' 41" N, 155° 40' 42" W
```

#### GeoJSON

```typescript

import {Coordinate} from "tsgeo/Coordinate";
import {GeoJSON}    from "tsgeo/Formatter/Coordinate/GeoJSON";

/* Add the following in a method of TS class */

let coordinate = new Coordinate(18.911306, -155.678268); // South Point, HI, USA

console.log(coordinate.format(new GeoJSON())); // { "type" : "point" , "coordinates" : [ -155.678268, 18.911306 ] }
```

## Credits

* [phpgeo](https://github.com/mjaschen/phpgeo) of [Marcus Jaschen](https://github.com/mjaschen)

## License

Copyright (c) 2018 [clemdesign](https://github.com/clemdesign/).

For use under the terms of the [MIT](http://www.opensource.org/licenses/mit-license.php) license. 
