// import styles from'./index.css'

import { useState, useEffect, useRef } from 'react'

import readWrite from './readWrite'
import makeCanvas from './makeCanvas'
import init from './init'


export default function InteractiveParallelism({ component }) {
  const [fromText, setFromText] = useState("If human is on laptop sit on the keyboard.")
  const [toText, setToText] = useState("My slave human didn't give me any food so i pooped on the floor.")

  const canvasContainer = useRef()
  const form = useRef()
  const startStop = useRef()

  useEffect(() => {
    startStop.current = init(canvasContainer.current, form.current)
  }, [canvasContainer, form])

  const handleSubmit = e => {
    e.preventDefault()
    
    startStop.current( {
      fromText,
      toText
    }
  )
  }

  return (
    <div ref={canvasContainer} data-component-type={component} className="sam_i_p_component-container sam_i_p_serial-container">
      <div className="sam_i_p_component-wrapper">
        <div className="sam_i_p_input-form-container">

          <form ref={form} onSubmit={handleSubmit} className="sam_i_p_input-form">
            <div className="sam_i_p_form-group sam_i_p_form-group__initial-value">
              <label>Initial Value</label>
              <input value={fromText} onChange={e => setFromText(e.target.value)} className="sam_i_p_input-form__initial-value" type="text" />
            </div>
            <div className="sam_i_p_form-group sam_i_p_form-group__final-value">
              <label>Final Value</label>
              <input value={toText} onChange={e => setToText(e.target.value)} className="sam_i_p_input-form__final-value" type="text" />
            </div>
            <button className="sam_i_p_input-form__submit-button" type="submit">Run</button>
          </form>

        </div>

        <div className="sam_i_p_data">
          <div className="sam_i_p_write-data">
            <h4 className="sam_i_p_data__heading">Data:</h4>
            <p><span className="sam_i_p_pre-data"></span><span className="sam_i_p_text-data">If human is on laptop sit on the keyboard.</span></p>
            <p><span className="sam_i_p_pre-data"></span><span className="sam_i_p_text-data"></span></p>
          </div>
        </div>
        <div className="sam_i_p_canvas-container">
          <canvas className="sam_i_p_canvas" width="700" height="300"></canvas>
          <div className="sam_i_p_processor-contianer"><p>Processor</p></div>
        </div>
        <div className="sam_i_p_data">
          <div className="sam_i_p_read-data">
            <h4 className="sam_i_p_data__heading">Read:</h4>
            <ol className="sam_i_p_read-data-text-container"></ol>
          </div>
        </div>
      </div>
    </div>
  )
}