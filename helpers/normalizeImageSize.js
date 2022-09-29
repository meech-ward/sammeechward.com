export default function normalizeImageSize({width, height, maxWidth = Infinity, maxHeight = Infinity}) {
  const ratio = Math.min(maxWidth / width, maxHeight / height)
  return {
    width: Math.round(width * ratio),
    height: Math.round(height * ratio)
  }
}