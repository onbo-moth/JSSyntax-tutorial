class Point {
  constructor(x, y){
    this.x = x
    this.y = y

    this.att = 0

    this.hx = x
    this.hy = y
  }

  equals(point){
    return ((this.x - point.x) == 0) && ((this.y - point.y) == 0)
  }
}

class Line {
  constructor(p1, p2){
    this.p1 = p1
    this.p2 = p2
  }

  equals(line){
    return (this.p1.equals(line.p1) && this.p2.equals(line.p2))
        || (this.p1.equals(line.p2) && this.p2.equals(line.p1))
  }

  collisionLine(line){
    // http://www.jeffreythompson.org/collision-detection/line-line.php

    let denominator = ((line.p2.y - line.p1.y) * (this.p2.x - this.p1.x))
                    - ((line.p2.x - line.p1.x) * (this.p2.y - this.p1.y))

    let nom2 = this.p1.y - line.p1.y
    let nom4 = this.p1.x - line.p1.x

    let uA = (((line.p2.x - line.p1.x) * nom2) 
           - ((line.p2.y - line.p1.y) * nom4))
           / denominator

    let uB = (((this.p2.x - this.p1.x) * nom2) 
           - ((this.p2.y - this.p1.y) * nom4))
           / denominator

    if( uA < 0 || uA > 1 || uB < 0 || uB > 1) return null

    let Ix = this.p1.x + (uA * (this.p2.x - this.p1.x))
    let Iy = this.p1.y + (uA * (this.p2.y - this.p1.y))

    return new Point(Ix, Iy)
  }
}

class Triangle {
  constructor(a, b, c){
    this.points = [a, b, c]

    this.lines = [
      new Line(a, b),
      new Line(b, c),
      new Line(c, a)
    ]

    this.glow = 0
  }

  calculateArea(){
    return (1/2) * Math.abs(
      this.points[0].x * (this.points[1].y - this.points[2].y)
    + this.points[1].x * (this.points[2].y - this.points[0].y)
    + this.points[2].x * (this.points[0].y - this.points[1].y)
    )
  }

  static area(p1, p2, p3){
    return (1/2) * Math.abs(
      p1.x * (p2.y - p3.y)
    + p2.x * (p3.y - p1.y)
    + p3.x * (p1.y - p2.y)
    )
  }

  pointInside(point){
    let fullArea = this.calculateArea()

    let area1 = this.constructor.area(this.points[0], this.points[1], point)
    let area2 = this.constructor.area(this.points[1], this.points[2], point)
    let area3 = this.constructor.area(this.points[2], this.points[0], point)

    return Math.abs(area1 + area2 + area3 - fullArea) < 0.001
  }

  collisionLine(line){
    if(this.pointInside(line.p1)) return true
    if(this.pointInside(line.p2)) return true

    for(let i=0; i<this.lines.length; i++){
      if(line.collisionLine(this.lines[i])) return true
    }

    return false
  }
}