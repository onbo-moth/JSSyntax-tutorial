const buttonsParent = document.getElementsByClassName("menu-buttons")[0]

new HoverSelect(buttonsParent, "Syntax", [
  ["Introduction", "introduction"],
  ["Variables", "jsvariables"],
  ["Operators", "jsoperators"],
  ["Data types", "jstypes"],
  ["Functions", "jsfunctions"],
  ["Objects", "jsobjects"]
])

new HoverSelect(buttonsParent, "Lorem", [
  ["ipsum", "ipsum"],
  ["dolor", "dolor"],
  ["sit", "sit"],
  ["amet", "amet"]
])

// Main page initialization

let pointSet = new PointSetGenerator()
let triangles = new MainPageTriangles(pointSet.points)

const canvas = document.getElementsByTagName("canvas")[0]

let cursor = new CanvasCursor(canvas)

let painter = new Painter(canvas, pointSet, triangles, cursor)

addEventListener("load", function(){
  requestAnimationFrame(painter.animation.bind(painter))
})