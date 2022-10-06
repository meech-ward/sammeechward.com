
export default function makeBox({ width, height, fill, text, textColor }) {

  const coordinates = {x: -width, y: 0}
  const size = {width, height}
  
  function draw({x, y, ctx}) {
    coordinates.x = x
    coordinates.y = y

    ctx.beginPath();
    ctx.rect(x, y, width, height)
    ctx.fillStyle = fill
    ctx.fill()
    ctx.closePath()
    
    if (text) {
      ctx.font = "30px Arial";
      ctx.fillStyle = textColor
      ctx.fillText(text, x, y+height/2.0+30/2.0);
    }
  }

  return {
    draw,
    coordinates,
    size
  }
}
