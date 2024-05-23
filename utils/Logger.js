let isLogging = false

/**
 *
 * @param {boolean} shouldLog
 */
function setLogging(shouldLog) {
  isLogging = shouldLog
}

function log(data) {
  if (!isLogging) return
  console.log(`[LocationAPI] ${data}`)
}

export const Logger = {
  setLogging,
  log,
}
