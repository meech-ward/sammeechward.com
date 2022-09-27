export default function limit(string, length, end = "...") {
  const replaceables = new Set([" ", "-", "_", ".", ","]);
  if (string.length < length) {
    return string 
  }

  let found = false
  for (let i = length - 1; i < string.length; i++) {
    if (replaceables.has(string[i])) {
      length = i
      found = true
      break
    }
  }
  if (!found) {
    for (let i = length - 1; i > 0; i--) {
      if (replaceables.has(string[i])) {
        length = i
        found = true
        break
      }
    }
  }
  return  string.substring(0, length) + end
}