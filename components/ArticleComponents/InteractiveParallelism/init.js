import readWrite from "./readWrite"
import { run, stop } from './runner.js'
import makeCanvas from "./makeCanvas.js"

export default function init(canvasContainer, form, totalRows = 5) {
  const componentType = canvasContainer.dataset.componentType
  const isMultiVersion = componentType.includes('multiversion')
  const canvasElement = canvasContainer.querySelector('.sam_i_p_canvas')
  const writeTags = canvasContainer.querySelectorAll(".sam_i_p_write-data .sam_i_p_text-data")
  const preWriteTags = canvasContainer.querySelectorAll(".sam_i_p_write-data .sam_i_p_pre-data")
  const readContainer = canvasContainer.querySelector(".sam_i_p_read-data-text-container")

  const { processSprite, resetValues } = readWrite({ writeTags, preWriteTags, readContainer, isMultiVersion })

  const canvas = makeCanvas({ canvas: canvasElement, processing: processSprite, boxWidth: 200, rows: totalRows })

  if (componentType.includes('no_write')) {
    form.querySelector('.sam_i_p_form-group__final-value').classList.add('hidden')
  }

  let running = false

  function start(texts) {
    run({ canvas, componentType, form, resetValues, texts })
  }

  return (texts) => {
    running ? stop({ canvas, form }) : start(texts)
    running = !running
  }
}