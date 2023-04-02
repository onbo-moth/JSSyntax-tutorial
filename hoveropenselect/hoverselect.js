class HoverSelect {
  constructor(domParent, content, buttons){
    this.selectDiv = document.createElement("div")
    this.selectDiv.classList.add("hoverselect")

    this.selectDiv.appendChild(document.createTextNode(content))

    domParent.appendChild(this.selectDiv)

    this.hoverDiv = document.createElement("div")
    this.hoverDiv.classList.add("hovercontainer")

    this.hoverDiv.style.opacity = "0"

    this.hoverDiv.style.width = this.selectDiv.style.width
    this.hoverDiv.style.height = "auto"

    this.buttons = []

    for(const button of buttons){
      let htmlButton = document.createElement("button")
      htmlButton.innerText = button[0]
      htmlButton.classList.add("hoverbutton")

      htmlButton.addEventListener('click', loadPage.bind(loadPage,
        button[1].toLowerCase()
      ))

      this.hoverDiv.appendChild(htmlButton)
    }

    this.selectDiv.appendChild(this.hoverDiv)

    this.isHovered = false

    this.targetHeight = this.hoverDiv.scrollHeight
    this.animationPeriod = 0.25
    this.animation = 0 // 0 to 1

    this.lastAnimationTimestamp = Date.now();
    this.lastAnimationValue = 0;
    
    this.createListeners()

    this.startAnimation()
  }

  animate(){
    let time = Date.now()
    let timeFrame = time - this.lastAnimationTimestamp

    this.animation += (this.isHovered ? 1 : -1) 
                    * (timeFrame / (1000 * this.animationPeriod))

    if(this.animation < 0) this.animation = 0 
    if(this.animation > 1) this.animation = 1

    let newHeight = Math.round(this.targetHeight * this.easeInOutQuad(this.animation))

    this.hoverDiv.style.height = `${newHeight}px`


    if(this.animation == 0 && this.lastAnimationValue >  0) this.hoverDiv.style.opacity = "0"
    if(this.animation >  0 && this.lastAnimationValue == 0) this.hoverDiv.style.opacity = "1"

    this.lastAnimationTimestamp = time
    this.lastAnimationValue = this.animation

    requestAnimationFrame(this.animate.bind(this))
  }

  startAnimation(){
    requestAnimationFrame(this.animate.bind(this))
  }

  onHover(mouseEvent){
    if(this.isHovered == true) return
    this.isHovered = true
  }

  onExit(mouseEvent){
    if(this.isHovered == false) return
    this.isHovered = false
  }

  createListeners(){
    this.selectDiv.addEventListener("mouseenter", this.onHover.bind(this))
    this.hoverDiv.addEventListener("mouseleave", this.onExit.bind(this))
  }

  easeInOutQuad(x){
    return x < 0.5 ? 2 * x * x : 1 - Math.pow(-2 * x + 2, 2) / 2
  }
}