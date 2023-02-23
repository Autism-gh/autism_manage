/**
 * This is just a simple version of deep copy
 * Has a lot of edge cases bug
 * If you want to use a perfect deep copy, use lodash's _.cloneDeep
 * @param {Object} source
 * @returns {Object}
 */

const hasOwnProperty = Object.prototype.hasOwnProperty;


export function deepClone(source) {
    if (!source && typeof source !== 'object') {
        throw new Error('error arguments', 'deepClone')
    }
    const targetObj = source.constructor === Array ? [] : {}
    Object.keys(source).forEach(keys => {
        if (source[keys] && typeof source[keys] === 'object') {
            targetObj[keys] = deepClone(source[keys])
        } else {
            targetObj[keys] = source[keys]
        }
    })
    return targetObj
}


/**
 * 
 * @param {*} to 
 * @param {*} _from 
 * @returns 
 */
function extend(to, _from) {
    for (let key in _from) {
        to[key] = _from[key];
    }
    return to;
}

export function toObject(arr) {
    var res = {};
    for (let i = 0; i < arr.length; i++) {
        if (arr[i]) {
            extend(res, arr[i]);
        }
    }
    return res;
}

/**
 * 
 * @param {*} obj 
 * @param {*} key 
 * @returns 
 */
export function hasOwn(obj, key) {
    return hasOwnProperty.call(obj, key);
}


/**
 * 
 * @param {*} val 
 * @returns 
 */
export const isEmpty = function (val) {
    // null or undefined
    if (val == null) return true;

    if (typeof val === 'boolean') return false;

    if (typeof val === 'number') return !val;

    if (val instanceof Error) return val.message === '';

    switch (Object.prototype.toString.call(val)) {
        case '[object String]':
        case '[object Array]':
            return !val.length;
        case '[object File]':
        case '[object Map]':
        case '[object Set]': {
            return !val.size;
        }
        case '[object Object]': {
            return !Object.keys(val).length;
        }
    }

    return false;
};

/**
 * 
 * @param {*} ms 
 * @returns 
 */
export async function timeSleep(ms) {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve()
        }, ms);
    })
}

/**
 * 
 * @returns 
 */
export const generateId = function () {
    return Math.floor(Math.random() * 10000);
};


export const listToObj = (list, key) => {
    if(!list || !list.length) return {}
    const result = {}
    list.forEach(item => {
        result[item[key]] = item
    })
    return result
}


export const getArrayDifference = (list, whole) => {
    return list.concat(whole).filter((v, i, arr) => {
        return arr.indexOf(v) === arr.lastIndexOf(v)
    })
}
