class CanvasCursor {
  constructor(canvas){
    this.x = 0
    this.y = 0

    this.px = 0
    this.py = 0

    this.hover = false

    let entireContainer = document.getElementsByClassName("content")[0]

    entireContainer.addEventListener("mousemove", function(e){
      this.px = this.x
      this.py = this.y

      let rect = canvas.getBoundingClientRect();

      this.x = e.clientX - rect.left
      this.y = e.clientY - rect.top

      this.hover = true
    }.bind(this))

    entireContainer.addEventListener("mouseleave", function(e){
      this.hover = false
    }.bind(this))
  }
}
