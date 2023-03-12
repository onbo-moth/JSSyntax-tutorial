class ConsoleServer {
  constructor(){
    this.originalConsole = console

    this.consoles = new Map();
  }

  addConsoleListener(consoleName, listener){
    if(this.consoles.get(consoleName) == undefined) return console.warn(`Console \"${consoleName}\ doesn't exist.`)

    this.consoles.get(consoleName).addListener(listener)
  }

  createConsole(consoleName){
    this.consoles.set(consoleName, new Console())
  }

  executeCode(consoleName, code){
    if(this.consoles.get(consoleName) == undefined) return console.warn(`Console \"${consoleName}\ doesn't exist.`)

    console = this.consoles.get(consoleName)

    try {
      (()=>{
        eval(code)
      })()
    } catch (exception) {
      console.error(exception)
    }

    console = this.originalConsole
  }
}
