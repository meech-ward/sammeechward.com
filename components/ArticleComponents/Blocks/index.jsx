import {Children} from "react"

const h1 = (props) => <h1 {...props} className={props.className ?? "" + " sm:text-5xl text-4xl sm:pt-7 pt-5 sm:pb-5 pb-4 font-semibold"} />
const h2 = (props) => <h2 {...props} className={props.className ?? "" + " sm:text-4xl text-3xl sm:pt-6 pt-4 sm:pb-4 pb-3 font-semibold"} />
const h3 = (props) => <h3 {...props} className={props.className ?? "" + " sm:text-3xl text-lg  sm:pt-5 pt-3 sm:pb-3 pb-2 font-semibold"} />
const p = (props) => <p {...props} className={props.className ?? "" +   " sm:text-lg text-base sm:py-4 py-2 font-light"} />
const ul = (props) => <ul {...props} className={props.className ?? "" + " sm:text-lg text-base sm:p-4  p-2 list-disc font-light"} />
const ol = (props) => <ol {...props} className={props.className ?? "" + " sm:text-lg text-base sm:p-4  p-2 list-decimal font-light"} />
const li = (props) => <li {...props} className={props.className ?? "" + " sm:pb-2 pb-1"} />
const a = (props) => <a {...props} className={props.className ?? "" + " text-indigo-600 hover:text-indigo-500 font-light"} />

const comps = {h1, h2, h3, p, ul, ol, li, a}

function mapChildren({children}, _comps = comps) {
  return Children.map(children, (child) => {
    if (typeof child === "string") {
      return child
    }
    const {type, props} = child
    const Comp = _comps[type.name]
    if (Comp) {
      return <Comp {...props}>{mapChildren(props)}</Comp>
    }
    return child
  })
}

export function Note({children}) {
  return (
    <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 sm:my-8 my-4">
      <p className="font-bold m-0 p-0">Note</p>
      {mapChildren({children})}
    </div>
  )
}

export function Warning({children}) {
  return (
    <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 sm:my-8 my-4">
      <p className="font-bold m-0 p-0">Warning</p>
      {mapChildren({children})}
    </div>
  )
}

export function Error({children}) {
  return (
    <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 sm:my-8 my-4">
      {mapChildren({children})}
    </div>
  )
}

export function Instruction({children}) {

  // length of children
  const blockTags = ["p", "ul", "ol", "li", "h1", "h2", "h3"]
  const totalBlocks = Children.toArray(children).filter((child) => blockTags.includes(child.type?.name))
  const len = Children.count(totalBlocks)
  
  let _children 
  if (len > 1) {
    _children = mapChildren({children})
  } else {
    _children = Children.map(children, (child) => {
      if (typeof child === "string") {
        // return child
        return <span className={"inline sm:text-lg text-base sm:py-4 py-2 font-light"}>{child}</span>
      }
      const {type, props} = child
      if (type.name === "p") {
        return <span {...props} className={"inline sm:text-lg text-base sm:py-4 py-2 font-light"} />
      }
      return <span {...props} className={"inline sm:text-lg text-base sm:py-4 py-2 font-light"} />
    })
  }
  return (
    <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 sm:my-8 my-4">
      <span className="m-0 p-0 pr-5">👩🏻‍💻</span>
      {_children}
    </div>
  )
}