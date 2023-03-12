const fs = require("fs")
const path = require("path")

const XML_PATH = "./xml/"

function bundleXML(){
  let xmlMap = {};

  let files = fs.readdirSync(XML_PATH)

  files.forEach(file => {
    xmlMap[file.split(".")[0]] = fs.readFileSync(path.join(XML_PATH, file), "utf8")
  })

  let fileContent = "let xmlJSON = "

  fileContent += Buffer.from(JSON.stringify(xmlMap))

  fs.writeFileSync("output.js", fileContent)
}

bundleXML()