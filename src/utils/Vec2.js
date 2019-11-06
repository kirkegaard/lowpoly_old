export default class Vec2 {

  constructor (x, y) {
    this.x = x || 0;
    this.y = y || 0;
  }

  reset (x, y) {
    this.x = x;
    this.y = y;

    return this;
  }

  toString (dec) {
    dec = dec || 3;
    const scalar = Math.pow(10, dec);
    return "[" + Math.round (this.x * scalar) / scalar + ", " + Math.round (this.y * scalar) / scalar + "]";
  }

  clone () {
    return new Vec2(this.x, this.y);
  }

  copyTo (vec) {
    vec.x = this.x;
    vec.y = this.y;
  }

  copyFrom (vec) {
    this.x = vec.x;
    this.y = vec.y;
  }

  magnitude () {
    return Math.sqrt((this.x * this.x) + (this.y * this.y));
  }

  magnitudeSquared () {
    return (this.x * this.x) + (this.y * this.y);
  }

  normalize () {
    let mag = this.magnitude();

    this.x = this.x / mag;
    this.y = this.y / mag;

    return this;
  }

  reverse () {
    this.x = -this.x;
    this.y = -this.y;

    return this;
  }

  plusVec (vec) {
    this.x += vec.x;
    this.y += vec.y;

    return this;
  }

  minusVec (vec) {
    this.x -= vec.x;
    this.y -= vec.y;

    return this;
  }

  multiplyEq (scalar) {
    this.x *= scalar;
    this.y *= scalar;

    return this;
  }

  divideEq (scalar) {
    this.x /= scalar;
    this.y /= scalar;

    return this;
  }

  dot (vec) {
    return (this.x * vec.x) + (this.y * vec.y);
  }

  angle (useRadians) {
    return Math.atan2(this.y, this.x) * (useRadians ? 1 : 180 / Math.PI);
  }

  rotate (angle, useRadians) {
    const temp = this.clone();
    const cosRX = Math.cos(angle * (useRadians ? 1 : Math.PI / 180));
    const sinRY = Math.sin(angle * (useRadians ? 1 : Math.PI / 180));

    this.x = (temp.x * cosRX) - (temp.y * sinRY);
    this.y = (temp.y * sinRY) + (temp.y * cosRX);

    return this;
  }

  equals (vec) {
    return ((this.x === vec.x) && (this.y === vec.y));
  }

  isCloseTo (vec, tolerance) {
    if (this.equals(vec)) return true;

    const temp = this.clone();
    temp.minusVec(vec);

    return (temp.magnitudeSquared() < tolerance * tolerance);

  }

  rotateAround (vec, angle, useRadians) {
    const temp = this.clone();

    temp.minusVec(vec);
    temp.rotate(angle, useRadians);
    temp.plusVec(vec);

    this.copyFrom(temp);
  }

  isMagLessThan (distance) {
    return (this.magnitudeSquared() < distance * distance);
  }

  isMagGreaterThan (distance) {
    return (this.magnitudeSquared() > distance * distance);
  }
}
