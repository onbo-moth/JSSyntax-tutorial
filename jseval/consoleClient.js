class ConsoleClient {
  constructor(consoleServer, content = undefined){
    this.consoleServer = consoleServer

    this.consoleDiv = document.createElement("div")
    this.consoleDiv.classList.add("consolecontainer")

    this.codeDiv = document.createElement("div")
    this.codeDiv.classList.add("codediv")

    this.consoleDiv.appendChild(this.codeDiv)

    this.codeArea = document.createElement("textarea")
    this.codeArea.classList.add("codearea")
    
    if(content) this.codeArea.value = content

    this.codeDiv.appendChild(this.codeArea)

    this.changeTabBehavior()

    this.console = document.createElement("div")
    this.console.classList.add("console")
    this.consoleDiv.appendChild(this.console)

    this.run = document.createElement("button")
    this.run.innerText = "Run >>"

    this.consoleDiv.appendChild(this.run)

    this.consoleId = btoa(Math.floor(Math.random() * 2**32))

    this.consoleServer.createConsole(this.consoleId)

    this.consoleServer.addConsoleListener(this.consoleId, this.addLine.bind(this))

    this.run.addEventListener("click", function(){
      this.consoleServer.executeCode(this.consoleId, this.codeArea.value)
    }.bind(this))

    return this.consoleDiv
  }

  addLine(type, data){
    let messageDiv = document.createElement("div")
    messageDiv.classList.add("messageDiv")

    let message = document.createElement("pre")
    message.classList.add("message")

    message.classList.add(`message-${type}`)

    let messageContent = document.createTextNode(data)

    messageDiv.appendChild(message)
    message.appendChild(messageContent)

    this.console.appendChild(messageDiv)

    this.console.scrollTop = this.console.scrollHeight
  }

  changeTabBehavior(){
    this.codeArea.addEventListener("keydown", function(event){
      if(event.key != "Tab") return

      event.preventDefault()

      const start = this.codeArea.selectionStart;
      const end = this.codeArea.selectionEnd;
      const value = this.codeArea.value;

      // Replace tab with 2 spaces
      this.codeArea.value = value.substring(0, start) + '  ' + value.substring(end);

      // Move cursor
      this.codeArea.selectionStart = this.codeArea.selectionEnd = start + 2;

    }.bind(this))
  }
}