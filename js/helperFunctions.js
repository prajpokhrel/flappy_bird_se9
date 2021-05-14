function randomIntFromRange(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}

/**
 * @param {String} selector
 * @returns {NodeList}
 *
 */

function _(selector) {
    return document.querySelectorAll(selector);
}

/**
 * @param {String} selector
 * @returns {HTMLElement}
 *
 */

function __(selector) {
    return document.querySelector(selector);
}