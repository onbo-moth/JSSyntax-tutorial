const syntaxColors = {
  "c-K": "code-keyword",
  "c-L": "code-literal",
  "c-V": "code-variable",
  "c-O": "code-operator",
  "c-X": "code-comment",
  "c-F": "code-function",
  "c-C": "code-class",
}

let consoleServer = new ConsoleServer()

const contentMap = new Map(Object.entries(xmlJSON))

function removeHTMLChildren(htmlParent){
  while(htmlParent.firstChild){
    htmlParent.removeChild(htmlParent.lastChild)
  }
}

function loadPage(htmlParent, pageName){
  if(contentMap.get(pageName) === undefined) return alert(`Page ${pageName} doesn't exist.`)

  removeHTMLChildren(htmlParent)

  const parser = new DOMParser()

  const root = parser.parseFromString(
    contentMap.get(pageName.toLowerCase()),
    "application/xhtml+xml"
  ).firstChild

  Array.from(root.childNodes).forEach(node => {
    parseElement(node, htmlParent)
  })

  return root
}

function parseElement(node, parent){
  let htmlnode = null

  if(node.nodeType === Node.ELEMENT_NODE){
    if(node.tagName.startsWith("c-")){
      htmlnode = document.createElement("span")

      htmlnode.classList.add(node.tagName)
    } else if(node.tagName == "codeblock"){
      let text = node.textContent
      text = removeIndentation(text, minSpaces(text))

      htmlnode = new ConsoleClient(consoleServer, text)

      parent.appendChild(htmlnode)
      return
    } else {
      htmlnode = document.createElement(node.tagName)
    }

    for(const attribute of node.attributes){
      htmlnode.setAttribute(attribute.name, attribute.value)
    }
  } else if (node.nodeType === Node.TEXT_NODE){
    htmlnode = document.createTextNode(node.textContent)
  }

  if(htmlnode){
    parent.appendChild(htmlnode)
    for(const child of node.childNodes){
      parseElement(child, htmlnode)
    }
  }
}

function minSpaces(text){
  let split = text.split("\n")
  let minSpaceValue = 100

  for(const line of split){
    let spaces = 0

    if(line.trim() == "") continue;

    for(let i=0; i<line.length; i++){
      if(line.charAt(i) != " ") break
      spaces++
    }

    if(spaces < minSpaceValue) minSpaceValue = spaces
  }

  return minSpaceValue
}

function removeIndentation(text, spaces){
  let split = text.split("\n")

  for(let i=0; i<split.length; i++){
    split[i] = split[i].substr(spaces)
  }

  return split.join("\n")
}