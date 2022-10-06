import _ from 'lodash'

function readBox({makeBox}) {
  const box = makeBox({width: 100, height: 40, fill: "#0095DD", text: "Read", textColor: "#ffffff"})
  box.type = 'read'
  box.processSpeed = 0.5
  return box
}

function writeBox({toText, makeBox}) {
  const box = makeBox({width: 100, height: 40, fill: "#800000", text: "Write", textColor: "#ffffff"})
  box.type = 'write'
  box.processSpeed = 0.2
  box.text = toText
  return box
}


export function serial({canvas, makeBox, toText, writeIndex = null}) {

  function read() {
    const box = readBox({makeBox})
    canvas.addSprite({sprite: box, row: 0})
  }

  function write() {
    const box = writeBox({makeBox, toText})
    canvas.addSprite({sprite: box, row: 0})
  }

  const functions = []
  for (let i = 0; i < 8; i++) {
    if (writeIndex === i) {
      functions.push(write)
    } else {
      functions.push(read)
    }
  }

  functions.forEach(func => func())
}

export function concurrent({canvas, makeBox, toText, writeIndex = null, totalRows = 5}) {

  function row() {
    return _.random(0, totalRows-1)
  }

  function read() {
    const box = readBox({makeBox})
    canvas.addSprite({sprite: box, row: row()})
  }

  function write() {
    const box = writeBox({makeBox, toText})
    canvas.addSprite({sprite: box, row: row()})
  }
  
  const functions = []
  for (let i = 0; i < 20; i++) {
    if (writeIndex === i) {
      functions.push(write)
    } else {
      functions.push(read)
    }
  }
  function next(i) {
    if (i+1 > functions.length) {
      return
    }
    functions[i]()
    setTimeout(() => {
      next(i+1)
    }, 100)
  }

  next(0)
}

export function writeLocked({canvas, makeBox, toText, totalRows = 5}) {

  function row() {
    return _.random(0, totalRows-1)
  }

  function read() {
    const box = readBox({makeBox})
    canvas.addSprite({sprite: box, row: row()})
  }

  function write() {
    const box = writeBox({makeBox, toText})
    box.locked = 'all'
    canvas.addSprite({sprite: box, row: row()})
  }
  
  const functions = [read, read, read, read, read, read, read, read, write, read, read, read, read, read, read, read, read, read, read, read, read, read, read, read, read]
  function next(i) {
    if (i+1 >= functions.length) {
      return
    }
    functions[i]()
    setTimeout(() => {
      next(i+1)
    }, 100)
  }

  next(0)
}

export function multiVersion({canvas, makeBox, toText, totalRows = 5}) {

  if (!Array.isArray(toText)) {
    toText = [toText]
  }

  function row() {
    return _.random(0, totalRows-1)
  }

  function read() {
    const box = readBox({makeBox})
    canvas.addSprite({sprite: box, row: row()})
  }

  function write(toText) {
    return function() {
      const box = writeBox({makeBox, toText})
      box.locked = 'write'
      canvas.addSprite({sprite: box, row: row()})
    }
  }

  const writes = toText.map(write)
  
  const functions = [read, read, read, read, ...writes, read, read, read, read, read, read, read, read, read, read, read, read, read, read]
  function next(i) {
    if (i+1 > functions.length) {
      return
    }
    functions[i]()
    setTimeout(() => {
      next(i+1)
    }, 100)
  }

  next(0)
}

