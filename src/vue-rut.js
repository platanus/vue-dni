/* eslint-disable no-magic-numbers, max-statements */

function cleanRut(value) {
  return typeof value === 'string' ? value.replace(/[^0-9kK]+/g, '').toUpperCase() : '';
}

export function rutValidator(value) {
  if (typeof value !== 'string') {
    return false;
  }

  const cleanValue = cleanRut(value);
  let t = parseInt(cleanValue.slice(0, -1), 10);
  let m = 0;
  let s = 1;

  while (t > 0) {
    s = (s + t % 10 * (9 - m++ % 6)) % 11;
    t = Math.floor(t / 10);
  }

  const v = (s > 0) ? `${s - 1}` : 'K';

  return (v === cleanValue.slice(-1));
}

export function rutFilter(value) {
  const cleanValue = cleanRut(value);
  let result;

  if (cleanValue.length <= 1) {
    result = cleanValue;
  } else {
    result = `${cleanValue.slice(-4, -1)}-${cleanValue.substr(cleanValue.length - 1)}`;
    for (let i = 4; i < cleanValue.length; i += 3) {
      result = `${cleanValue.slice(-3 - i, -i)}.${result}`;
    }
  }

  return result;
}

export const rutInputDirective = {
  bind() {
    const event = (this.arg === 'live') ? 'input' : 'blur';

    this.el.addEventListener(event, (e) => {
      e.target.value = rutFilter(e.target.value) || '';
    });

    this.el.addEventListener('focus', (e) => {
      e.target.value = cleanRut(e.target.value) || '';
    });
  },
};
