
export default function makeCanvas({ canvas, processing, boxWidth, rows }) {
  const ctx = canvas.getContext("2d")

  const padding = 20

  const sprites = new Array(rows)
  let allSprites = []
  const lockedSprites = {
    all: new Set(),
    write: new Set(),
    read: new Set()
  }

  let dx = 2.0;

  function spriteIntersectsPrevious(sprite, previousSprite) {
    return previousSprite && (previousSprite.coordinates.x < sprite.coordinates.x+sprite.size.width+padding)
  }
  

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    const rowHeight = (canvas.height/rows)

    sprites.forEach(function(spriteRow, row) {

      let previousSprite
      spriteRow.forEach(function(sprite) {
        
        let _dx = dx

        if(sprite.coordinates.x >= canvas.width-sprite.size.width) {
          _dx = dx * sprite.processSpeed
        }

        if (spriteIntersectsPrevious(sprite, previousSprite)) {
          _dx = 0.0
        }

        function avoidLockedSprites({lockedSprites, sprite}) {
          lockedSprites.forEach(function(lockedSprite) {
            if ((allSprites.indexOf(sprite) > allSprites.indexOf(lockedSprite)) && (spriteIntersectsPrevious(sprite, lockedSprite))) {
              _dx = 0.0
            }
          })
        }
        
        if (!sprite.locked) {
          avoidLockedSprites({lockedSprites: lockedSprites.all, sprite})
          if (sprite.type === 'read') {
            avoidLockedSprites({lockedSprites: lockedSprites.read, sprite})
          }
          if (sprite.type === 'write') {
            avoidLockedSprites({lockedSprites: lockedSprites.write, sprite})
          }
        } else {
          let passed = false 
          allSprites.forEach(function(otherSprite) {
            if (passed || otherSprite === sprite) {
              passed = true
              return
            }
            if (sprite.locked !== 'all' && otherSprite.type !== sprite.locked) {
              return
            }
            if (spriteIntersectsPrevious(sprite, otherSprite)) {
              _dx = 0.0
              return
            }
          })
        }

        
        const y = row*rowHeight+rowHeight/2-sprite.size.height/2
        sprite.draw({x: sprite.coordinates.x + _dx, y, ctx})

        if(sprite.coordinates.x >= canvas.width-sprite.size.width && sprite.coordinates.x < canvas.width) {
          const processed = (sprite.coordinates.x-canvas.width+sprite.size.width)/sprite.size.width
          processing({sprite, processed})
        }

        if (sprite.coordinates.x > canvas.width) {
          processing({sprite, processed: 1})
          sprites[row] = spriteRow.filter(function(s) {
            return s !== sprite
          })
          allSprites = allSprites.filter(function(s) {
            return s !== sprite
          })
          if (sprite.locked === 'all') {
            lockedSprites.all.delete(sprite)
          }
          if (sprite.locked === 'write') {
            lockedSprites.write.delete(sprite)
          }
          if (sprite.locked === 'read') {
            lockedSprites.read.delete(sprite)
          }
        }
        previousSprite = sprite
      })
    })


  }

  function addSprite({sprite, row}) {
    if (!sprites[row]) {
      sprites[row] = []
    }
    if (sprite.locked === 'all') {
      lockedSprites.all.add(sprite)
    }
    if (sprite.locked === 'write') {
      lockedSprites.write.add(sprite)
    }
    if (sprite.locked === 'read') {
      lockedSprites.read.add(sprite)
    }

    sprites[row].push(sprite)
    allSprites.push(sprite)
  }
  
  let interval
  function start() {
    interval = setInterval(draw, 10)
  }
  function stop() {
    clearInterval(interval)
  }
  function reset() {
    lockedSprites.all = new Set()
    lockedSprites.write = new Set()
    lockedSprites.read = new Set()
    allSprites = []
    for (let i = 0; i < rows; i++) {
      sprites[i] = []
    }
    draw()
  }

  return {
    start,
    stop,
    addSprite,
    reset
  }
}
