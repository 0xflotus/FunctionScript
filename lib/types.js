const _validations = {
  string: v => typeof v === 'string',
  number: v => typeof v === 'number' && v === v,
  float: v => parseFloat(v) === v,
  integer: v => parseInt(v) === v && v >= Number.MIN_SAFE_INTEGER && v <= Number.MAX_SAFE_INTEGER,
  boolean: v => typeof v === 'boolean',
  object: v => !!v && typeof v === 'object' && !Array.isArray(v) && !Buffer.isBuffer(v),
  array: v => Array.isArray(v),
  buffer: v => Buffer.isBuffer(v),
  any: v => true
};

const _check = (v) => {
  if (v === undefined || v === null || typeof v === 'function') {
    return 'any';
  } else if (typeof v !== 'object') {
    return typeof v;
  } else {
    return Array.isArray(v) ? 'array' : (Buffer.isBuffer(v) ? 'buffer' : 'object');
  }
};

const _convert = {
  string: s => s,
  number: s => {
    let v = Number(s);
    return isNaN(v) ? s : v;
  },
  float: s => {
    let v = Number(s);
    return isNaN(v) ? s : v;
  },
  integer: s => {
    let v = Number(s);
    return isNaN(v) ? s : v;
  },
  boolean: s => {
    let convert = {'t': 1, 'true': 1, 'f': 0, 'false': 0};
    s = s.trim().toLowerCase();
    return s in convert ? !!convert[s] : s;
  },
  object: s => JSON.parse(s),
  array: s => JSON.parse(s),
  buffer: s => new Buffer(s),
  any: s => s
};

module.exports = {
  defaultType: 'any',
  list: Object.keys(_validations),
  validate: (type, v, nullable) => (nullable && v === null) || _validations[type](v),
  convert: (type, s) => typeof s === 'string' ? _convert[type](s) : s,
  check: (v) => _check(v)
};
