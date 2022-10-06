import { serial, concurrent, writeLocked, multiVersion } from "./functions.js"
import makeBox from "./box.js"

export function run({canvas, componentType, form, resetValues, texts}) {
  canvas.reset()
  canvas.start()
  
  // form.button.innerText = "Stop"
  
  switch (componentType) {
    case 'serial':
      resetValues({...texts, isMultiVersion: false})
      serial({canvas, makeBox, ...texts, writeIndex: 2})
      break;
    case 'serial_no_write':
      resetValues({...texts, isMultiVersion: false})
      serial({canvas, makeBox, ...texts})
      break;
    case 'concurrent':
      resetValues({...texts,isMultiVersion: false})
      concurrent({canvas, makeBox, ...texts, writeIndex: 2})
      break;
    case 'concurrent_no_write':
      resetValues({...texts,isMultiVersion: false})
      concurrent({canvas, makeBox, ...texts})
      break;
    case 'locked':
      resetValues({...texts,isMultiVersion: false})
      writeLocked({canvas, makeBox, ...texts})
      break;
    case 'multiversion':
      resetValues({...texts,isMultiVersion: true})
      multiVersion({canvas, makeBox, ...texts})
      break;
    case 'multiversion_multi_write':
      resetValues({...texts,isMultiVersion: true})
      multiVersion({canvas, makeBox, toText: ["First write: "+texts.toText, "Second write: "+texts.toText, "Third time writing: "+texts.toText]})
      break;
  
    default:
      break;
  }
}

export function stop({canvas, form}) {
  canvas.stop()
  // form.button.innerText = "Run"
}

