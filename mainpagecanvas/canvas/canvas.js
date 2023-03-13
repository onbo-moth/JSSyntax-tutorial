class Painter {
  constructor(canvas, pointSet, triangles, cursor){
    this.canvas = canvas
    this.ctx = canvas.getContext("2d")

    this.boardSize = pointSet.size
    this.points    = pointSet.points;
    this.triangles = triangles;
    this.cursor    = cursor;

    this.camera = new Camera(this);

    this.resize()

    window.addEventListener("resize", function(){
      this.resize()
    }.bind(this))
  }

  resize(){
    let rect = this.canvas.parentElement.parentElement.getBoundingClientRect()

    this.canvas.width  = rect.width
    this.canvas.height = rect.height

    this.camera.centerCamera(this.boardSize)
  }

  animation(){
    this.updatePointPos()

    let cursorPosCamera = {
      x: this.cursor.x + this.camera.xOffset,
      y: this.cursor.y + this.camera.yOffset
    }

    for(let i=0; i<this.triangles.triangles.length; i++){
      if(this.cursor.hover){
        if(this.triangles.triangles[i].pointInside(cursorPosCamera)){
          this.triangles.triangles[i].glow = 1
          continue;
        }
      }

      this.triangles.triangles[i].glow -= 0.015
      this.triangles.triangles[i].glow = Math.max(0, this.triangles.triangles[i].glow)
    }

    this.clear()

    for(let i=0; i<this.triangles.triangles.length; i++){
      if(this.triangles.triangles[i].glow > 0) this.camera.glowTriangle(this.triangles.triangles[i])
    }

    for(let i=0; i<this.points.length; i++){
      this.camera.drawPoint(this.points[i])
    }

    for(let i=0; i<this.triangles.uniqueLines.length; i++){
      this.camera.drawLine(this.triangles.uniqueLines[i])
    }


    requestAnimationFrame(this.animation.bind(this))
  }

  updatePointPos(){
    for(let i=0; i<this.points.length; i++){
      let dir = -Math.atan2(
         (this.camera.yOffset + this.cursor.y) - this.points[i].hy,
         (this.camera.xOffset + this.cursor.x) - this.points[i].hx
      ) - Math.PI/2

      let mag = Math.min(20, Math.sqrt(
        (this.points[i].hy - (this.camera.yOffset + this.cursor.y)) ** 2
        + (this.points[i].hx - (this.camera.xOffset + this.cursor.x)) ** 2
      ))


      this.points[i].x = this.points[i].hx + mag * Math.sin(dir)
      this.points[i].y = this.points[i].hy + mag * Math.cos(dir)
    }
  }

  clear(){
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
  }
}
