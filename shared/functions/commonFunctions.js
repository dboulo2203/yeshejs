
/**
 * Get a json string array (yeshe backend format) and convert to an array
 * @param {*} jsonString 
 * @returns 
 */
export function getArrayFromjson(jsonString) {
  let newArray = [];
  let index = 0;
  let endLoop = false;
  if (jsonString) {
    do {
      if (jsonString[index]) {
        newArray.push(jsonString[index]);
      } else {
        endLoop = true;
      }
      ++index;
    } while (!endLoop);
  }
  return newArray;
}

/**
 * NOt used
 * @param {*} n 
 * @returns 
 */
const secondsToMidnight = (n) => {
  return (
    ((24 - n.getHours() - 1) * 60 * 60) + ((60 - n.getMinutes() - 1) * 60) + (60 - n.getSeconds())
  )
}