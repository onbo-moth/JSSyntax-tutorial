class CanvasCursor {
  constructor(canvas){
    this.x = 0
    this.y = 0

    this.hover = false

    canvas.addEventListener("mousemove", function(e){
      let rect = e.target.getBoundingClientRect();

      this.x = e.clientX - rect.left
      this.y = e.clientY - rect.top

      this.hover = true
    }.bind(this))

    canvas.addEventListener("mouseleave", function(e){
      this.hover = false
    }.bind(this))
  }
}
