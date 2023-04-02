function createNavigator(node){
  let container = document.createElement("div")
  container.classList.add("navContainer")

  let table = document.createElement("table")
  table.classList.add("navTable")

  container.appendChild(table)
  
  let row = document.createElement("tr")
  row.classList.add("navRow")

  table.appendChild(row)

  let children = node.childNodes
  
  for(let i=0; i<children.length; i++){
    if(children[i].nodeType != Node.ELEMENT_NODE) continue;

    let cell = document.createElement("td")

    console.log(children[i])

    let ref = children[i].getAttribute("ref")

    console.log(ref)

    if(ref){
      cell.classList.add("navLink")
      cell.addEventListener("click", function(){
        loadPage(ref)
      })
    }

    cell.classList.add("navCell")

    let text = document.createTextNode(children[i].textContent)

    cell.appendChild(text)

    row.appendChild(cell)
  }

  return container
}