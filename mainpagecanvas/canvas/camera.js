class Camera {
  constructor(painter){
    this.painter = painter
    this.canvas = painter.canvas
    this.ctx = painter.ctx

    this.xOffset = 0;
    this.yOffset = 0;

    this.centerCamera(this.painter.boardSize);
  }

  centerCamera(size){
    this.xOffset = (size.x / 2) - (this.canvas.width  / 2) 
    this.yOffset = (size.y / 2) - (this.canvas.height / 2) 
  }

  drawPoint(point){
    if(point.x < this.xOffset || point.x > (this.xOffset + canvas.width )) return
    if(point.y < this.yOffset || point.y > (this.yOffset + canvas.height)) return

    this.ctx.beginPath()

    this.ctx.arc(point.x - this.xOffset, point.y - this.yOffset, 5, 0, 2*Math.PI)

    let tmpFillStyle = this.ctx.fillStyle
    this.ctx.fillStyle = colorSettings.dotColor

    this.ctx.fill()

    this.ctx.closePath()

    this.ctx.fillStyle = tmpFillStyle
  }

  drawLine(line){
    if( (line.p1.x < this.xOffset || line.p1.x > (this.xOffset + canvas.width))
     && (line.p1.y < this.xOffset || line.p1.y > (this.yOffset + canvas.height))
     && (line.p2.x < this.xOffset || line.p2.x > (this.xOffset + canvas.width)) 
     && (line.p2.y < this.xOffset || line.p2.y > (this.yOffset + canvas.height))
    ) return false;

    this.ctx.beginPath()

    this.ctx.moveTo(line.p1.x - this.xOffset, line.p1.y - this.yOffset)
    this.ctx.lineTo(line.p2.x - this.xOffset, line.p2.y - this.yOffset)

    let tmpStrokeStyle = this.ctx.strokeStyle
    this.ctx.strokeStyle = colorSettings.lineColor

    this.ctx.stroke()

    this.ctx.closePath()

    this.ctx.strokeStyle = tmpStrokeStyle
  }

  glowTriangle(triangle){
    if( (triangle.points[0].x < this.xOffset || triangle.points[0].x > (this.xOffset + canvas.width))
     && (triangle.points[0].y < this.yOffset || triangle.points[0].y > (this.yOffset + canvas.height))
     && (triangle.points[1].x < this.xOffset || triangle.points[1].x > (this.xOffset + canvas.width))
     && (triangle.points[1].y < this.yOffset || triangle.points[1].y > (this.yOffset + canvas.height))
     && (triangle.points[2].x < this.xOffset || triangle.points[2].x > (this.xOffset + canvas.width))
     && (triangle.points[2].y < this.yOffset || triangle.points[2].y > (this.yOffset + canvas.height))
    ) return false;

    this.ctx.beginPath()

    this.ctx.moveTo(triangle.points[2].x - this.xOffset, triangle.points[2].y - this.yOffset)

    this.ctx.lineTo(triangle.points[0].x - this.xOffset, triangle.points[0].y - this.yOffset)
    this.ctx.lineTo(triangle.points[1].x - this.xOffset, triangle.points[1].y - this.yOffset)
    this.ctx.lineTo(triangle.points[2].x - this.xOffset, triangle.points[2].y - this.yOffset)

    let tmpFillStyle = this.ctx.fillStyle
    this.ctx.fillStyle = this.addTransparency(colorSettings.glowColor, triangle.glow)

    this.ctx.fill()

    this.ctx.fillStyle = tmpFillStyle

    this.ctx.closePath()
  }

  addTransparency(color, transparency){
    let hex = (Math.floor(transparency * 255)).toString(16)

    if(hex.length == 1) hex = "0" + hex

    if(transparency == 0) hex = "00"

    return color + hex
  }
}