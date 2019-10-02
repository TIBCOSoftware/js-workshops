/**
 * Created by huanli<huali@tibco-support.com> on 3/9/17.
 *
 * Variable prefixes' meanings:
 * -------------------------------------------------------------------------
 * --- The prefix of a variable's name reveals the type of data it holds ---
 * -------------------------------------------------------------------------
 *
 * a: Array
 * b: Boolean
 * d: DOM
 * f: Function
 * jq: jQuery object
 * l: List(an array-like object)
 * n: Number
 * o: Object
 * r: Regular expression
 * s: String
 * x: More than one type
 *  : Special case or NOT my code
 *
 * *** These prefixes can be concatenated to indicate that the variable can
 *         hold the specified types of data ***
 */

'use strict';

var oLogLevels = {
  LOG_ERROR: 'ERROR',
  LOG_WARN: 'WARN',
  LOG_INFO: 'INFO',
  LOG_DEBUG: 'DEBUG'
};

module.exports = Object.assign({
  log: log
}, oLogLevels);

/**
 * Print out the message in a specific format with the provided arguments.
 *
 * @param {string} sLogLevel Should be one of "INFO", "WARN", "ERROR", and 
 * "DEBUG". Otherwise, nothing will be printed out.
 * @param {string} sMessage A meaningful message for then user.
 * @param {object} oError Optional. The error object which contains more 
 *   specific information about the error.
 */
function log(sLogLevel, sMessage, oError) {
  if (Object.keys(oLogLevels).some(function (sKey) {
      return oLogLevels[sKey] === sLogLevel;
    })) {
    sMessage = sMessage || '';
    oError = oError || '';
    console.log(formatTime(new Date()), sLogLevel, sMessage, oError);
  }
}

function formatTime(oDate) {
  return pad2Digits(oDate.getUTCHours()) + ':' +
    pad2Digits(oDate.getUTCMinutes()) + ':' +
    pad2Digits(oDate.getUTCSeconds()) + '.' +
    pad3Digits(oDate.getUTCMilliseconds()) + '';
}

function pad2Digits(nNumber) {
  return nNumber < 10 ? '0' + nNumber : nNumber
}

function pad3Digits(nMilliseconds) {
  if (nMilliseconds < 10) {
    return '00' + nMilliseconds;
  } else if (nMilliseconds < 100) {
    return '0' + nMilliseconds;
  } else {
    return nMilliseconds;
  }
}
