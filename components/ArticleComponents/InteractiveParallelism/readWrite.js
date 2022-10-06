

export default function readWrite({writeTags, preWriteTags, readContainer, isMultiVersion}) {

  function processWrite({sprite, processed}) {
    const endIndex = Math.ceil(sprite.text.length*processed)
      // console.log(sprite.text.substring(0, endIndex))
      const writeTag = isMultiVersion ? writeTags[1] : writeTags[0]
      writeTag.innerHTML = sprite.text.substring(0, endIndex)+writeTag.innerText.substring(endIndex, writeTag.innerText.length)
      if (processed == 1) {
        if (isMultiVersion) {
          // writeTags[0].innerText = writeTags[1].innerText
          writeTags[1].innerText = ""
          // preWriteTags[1].innerText = ""
        }

        writeTags[0].innerHTML = sprite.text
      }
  }

  function processRead({sprite, processed}) {
    if (!sprite.tag) {
      sprite.tag = document.createElement("li")
      readContainer.append(sprite.tag)
      sprite.finalText = writeTags[0].innerText
      setTimeout(() => {
      }, 500)
    }
    // readContainer.scrollTop = readContainer.scrollTop > 30 ? readContainer.scrollTop : 0
    const endIndex = Math.ceil(sprite.finalText.length*processed)
    sprite.tag.innerText = sprite.finalText.substring(0, endIndex)+sprite.tag.innerText.substring(endIndex, sprite.tag.innerText.length)
  }

  function processSprite(data) {
    // console.log(sprite, processed)
    if (data.sprite.type === "write") {
      processWrite(data)
    }

    if (data.sprite.type === "read") {
      processRead(data)
    }
  }

  function resetValues({toText, fromText}) {
    writeTags[0].innerText = fromText
    writeTags[1].innerText = ""
    preWriteTags[1].innerText = ""
    preWriteTags[0].innerText = ""

    if (isMultiVersion) {
      preWriteTags[0].innerText = "Current Version: "
      preWriteTags[1].innerText = "New Version: "
    }
  }

  return {
    processSprite,
    resetValues
  }
}
  