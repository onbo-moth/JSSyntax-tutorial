class Console {
  constructor(){
    this.lines = []

    this.timers = new Map()

    this.listeners = []
  }

  sendData(type, string){
    this.lines.push([type, string])
    for(const listener of this.listeners){
      listener(type, string)
    }
  }

  addListener(listener){
    this.listeners.push(listener)
  }

  log(data){
    if(typeof data != "string") data = data.toString()

    this.sendData("log", data)
  }

  warn(data){
    if(typeof data != "string") data = data.toString()

    this.sendData("warn", data)
  }

  error(data){
    if(typeof data != "string") data = data.toString()

    this.sendData("error", data)
  }

  time(name){
    if(this.timers.get(name) != undefined) return this.warn(`Timer \"${name}\" already exists.`)

    this.timers.set(name, Date.now())
  }

  timeEnd(name){
    if(this.timers.get(name) == undefined) return this.warn(`Timer \"${name}\" doesn't exist.`)

    let timeFrame = Date.now() - this.timers.get(name)

    this.timers.delete(name)

    this.log(`${name}: ${timeFrame}ms - timer ended`)
  }
}