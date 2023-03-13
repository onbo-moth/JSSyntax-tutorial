class PointSetGenerator {
  constructor(){
    this.MAX_ATTEMPTS = 15

    this.points = []

    this.size = {
      x: 2000,
      y: 2000,
    }
    this.interval = {
      min: 75,
      max: 125
    }

    this.points.push(new Point(this.size.x / 2, this.size.y / 2))

    // setInterval(function(){
    //   let result = this.generatePoint()
    //   if(result === false) console.log("FALSE VALUE WARNING")
    // }.bind(this), 10)

    while(true){
      let result = this.generatePoint()
      if(result === false) break
    }
  }

  generatePoint(){
    let point = this.getActivePoint();

    if(point == null) return false

    let ringRangeIndexes = this.getRingRangePoints(point);


    for(let attempt = 0; attempt < this.MAX_ATTEMPTS; attempt++){
      let newPoint = this.generateRing(point)

      let lock = false;

      if(newPoint[0] < 0 || newPoint[0] > this.size.x) {
        lock = true;
        continue;
      };

      if(newPoint[1] < 0 || newPoint[1] > this.size.y) {
        lock = true;
        continue;
      };

      for(let rPi = 0; rPi < ringRangeIndexes.length; rPi++){
        let dx = this.points[ringRangeIndexes[rPi]].x - newPoint[0]
        let dy = this.points[ringRangeIndexes[rPi]].y - newPoint[1]


        if(dx ** 2 + dy ** 2  <=  this.interval.min ** 2){
          lock = true;
          break;
        }
      }

      if(!lock){
        this.points.push(new Point(newPoint[0], newPoint[1]))

        return
      }
    }

    this.points[point].att = 1;

    return null;
  }

  generateRing(index){
    let num = this.interval.min + (Math.random() * (this.interval.max - this.interval.min))
    let rads = Math.random() * 2 * Math.PI

    let x = num * Math.sin(rads)
    let y = num * Math.cos(rads)

    return [
      this.points[index].x + x,
      this.points[index].y + y
    ]
  }

  randomIndex(){
    return Math.floor(Math.random() * this.pointsLength)
  }

  getActivePoint(){
    for(let i=0; i<this.points.length; i++){
      if(this.points[i].att == 0) return i
    }

    return null
  }

  getRingRangePoints(index){
    let indexes = []

    for(let i=0; i<this.points.length; i++){
      let dx = this.points[index].x - this.points[i].x
      let dy = this.points[index].y - this.points[i].y

      if(dx**2 + dy**2 <=(this.interval.min + this.interval.max)**2){
        indexes.push(i)
      }
    }
  
    return indexes
  }
}
