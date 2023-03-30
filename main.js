var colorSettings = {
  lineColor: "#ffffff",
  dotColor: "#ffffff",
  glowColor: "#6FD2DC"
}

const buttonsParent = document.getElementsByClassName("menu-buttons")[0]

new HoverSelect(buttonsParent, "Syntax", [
  ["Wstęp", "introduction"],
  ["Okna", "jswindows"],
  ["Komentarze", "jscomments"],
  ["Zmienne", "jsvariables"],
  ["Operatory", "jsoperators"],
  ["Pętle", "jsloops"],
  ["Typy danych", "jstypes"],
  ["Funkcje", "jsfunctions"],
  ["Debugging", "jsdebug"],
  ["Obiekty", "jsobjects"],
  ["Obiekty Dom", "jsdom"]
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