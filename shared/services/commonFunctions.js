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

/**
 * 
 * @returns Get current app path http://host/app
 */
export function getAppPath() {
  // let appName = '';
  var path = location.pathname.split('/');
  const found = path.indexOf('views');
  if (found === 2)
    return window.location.protocol + "//" + window.location.hostname + '/' + path[1];
  else
    return window.location.protocol + "//" + window.location.hostname;
}

/**
 * 
 * @returns Get current app path http://host/app
 * @deprecated
 */
export function getAppPathRemote() {
  let appName = '';
  var path = location.pathname.split('/');
  if (path[0] == "")
    appName = path[1]
  else
    appName = path[0]

  return window.location.protocol + "//" + window.location.hostname + '/';

}
/**
 * Add an event listened  to  a list of HTML document (by class name)
 * @param {*} elementClass  : the .XXXX class identifier of the element list 
 * @param {*} functionOfEvent  = the function used when the event is fired
 */
export function addMultipleEnventListener(elementClass, functionOfEvent) {
  const cbox = document.querySelectorAll(elementClass);
  for (let i = 0; i < cbox.length; i++) {
    cbox[i].addEventListener("click", functionOfEvent);


  }
}


/**
 * Re route the page demending on
 * @param {} link 
 * @param {*} withctrl 
 */
export function getLinkWithctrl(link, withctrl) {
  if (withctrl)
    window.open(link, '_blank');
  else
    window.location.href = link;
}

/**
 * Retunrs a link to a class of entity
 * @param {*} buttonType 
 * @param {*} entityName 
 * @param {*} searId 
 * @param {*} withUnderline allow to display an underline
 * @returns 
 */
export function getEntityLinkClass(buttonType, entityName, searId, withUnderline = true) {
  if (!withUnderline === false)
    return `<span style="cursor:pointer; border-bottom: 0.1em solid #dddbdbff" class="${buttonType}" searid="${searId}" 
  onpointerenter="this.setAttribute('style', 'cursor:pointer;color: #8B2331;border-bottom: 0.1em solid #8B2331;cursor:pointer')" 
  onpointerleave="this.setAttribute('style', 'color: bs-body-color')">
        ${entityName === null ? '' : entityName}
    </span>`;
  else
    return `<span style="cursor:pointer" class="${buttonType}" searid="${searId}" 
  onpointerenter="this.setAttribute('style', 'cursor:pointer;color: #8B2331;border-bottom: 0.1em solid #8B2331;cursor:pointer')" 
  onpointerleave="this.setAttribute('style', 'color: bs-body-color')">
        ${entityName === null ? '' : entityName}
    </span>`;
}

/**
 * Retunrs a link to an entity
 * @param { } buttonType 
 * @param {*} entityName 
 * @param {*} withUnderline  allow to display an underline
 * @returns 
 */
export function getEntityLink(buttonType, entityName, withUnderline = true) {
  if (!withUnderline === false)
    return `<span style="cursor: pointer; border-bottom: 0.1em solid #dddbdbff" 
    id="${buttonType}" onpointerenter="this.setAttribute('style', 'color: #8B2331;border-bottom: 0.1em solid #8B2331;cursor:pointer')" onpointerleave="this.setAttribute('style', 'color: bs-body-color;border-bottom: 0.1em solid #dddbdbff')">
        ${entityName === null ? '' : entityName}
    </span>`;
  else
    return `<span style="cursor: pointer" 
    id="${buttonType}" onpointerenter="this.setAttribute('style', 'color: #8B2331;cursor:pointer')" onpointerleave="this.setAttribute('style', 'color: bs-body-color')">
        ${entityName === null ? '' : entityName}
    </span>`;
}


export function encodeHTML(str) {
  const map = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;'
  };
  return str.replace(/[&<>"']/g, function (m) { return map[m]; });
}

export function getTibetanPart() {

  function isTibetanChar(charToAnalyse) {
    if (charToAnalyse.charCodeAt(0) >= 3840 && charToAnalyse.charCodeAt(0) <= 4095)
      return true;
    else
      return false;
  }



  return function (item) {
    // console.log('test makeUppercase');
    var startAt = -1;
    var endsAt = -1;
    var outString = "";
    if (typeof item !== 'undefined' && item !== null) {

      // *** go through the string
      for (var i = 0; i < item.length; ++i) {

        if (isTibetanChar(item[i])) {
          // *** Start of the tibetan sentence
          if (startAt === -1) {
            startAt = i;
            while (i < item.length && (isTibetanChar(item[i]) || item.charCodeAt(i) == 32)) {
              // var charat2 = item.charCodeAt(i);
              // var charat3 = item[i];
              ++i;

            }
          }
          // *** End of the tibetan sentence
          endsAt = i;
          outString += "<span class='tibetanchar'>" + item.substring(startAt, endsAt) + "</span>"
          startAt = -1;
          --i;
        } else {
          // *** Add current character to the output string
          outString += item[i];
        }
      }
      // console.log('Caractère tibetain starts at :' + startAt.toString() + ' - ' + endsAt.toString());
      //  console.log('outstring = :' + outString);
      // var endString = item.substring(0, startAt - 1) + "<span class='tibetanchar'>" + item.substring(startAt, endsAt) + "</span>" + item.substring(endsAt, item.length);
      return outString;
    }
  }
}

export function initBootstrapTooltips() {
  var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
  var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
    return new bootstrap.Tooltip(tooltipTriggerEl)
  })
}

