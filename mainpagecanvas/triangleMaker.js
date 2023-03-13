class MainPageTriangles{
  constructor(points){
    this.points = points;

    let flatPointCoords = []
    for(let i=0; i<points.length; i++){
      flatPointCoords.push(points[i].x)
      flatPointCoords.push(points[i].y)
    }

    let flatTriangles = new Delaunator(flatPointCoords).triangles

    this.uniqueLines = []
    this.triangles = []

    for(let i=0; i<flatTriangles.length; i+=3){
      addUniqueLine(this.uniqueLines, new Line(
        points[flatTriangles[i  ]],
        points[flatTriangles[i+1]]
      ))

      addUniqueLine(this.uniqueLines, new Line(
        points[flatTriangles[i+1]],
        points[flatTriangles[i+2]]
      ))

      addUniqueLine(this.uniqueLines, new Line(
        points[flatTriangles[i+2]],
        points[flatTriangles[i  ]]
      ))

      this.triangles.push(new Triangle(
        points[flatTriangles[i  ]],
        points[flatTriangles[i+1]],
        points[flatTriangles[i+2]]
      ))
    }
  }
}

function addUniqueLine(uniqueLines, line){
  for(let i=0; i<uniqueLines.length; i++){
    if(uniqueLines[i].equals(line)) return false
  }
  uniqueLines.push(line)
}
