import * as rutHelpers from 'rut-helpers';

export function rutValidator(value) {
  return rutHelpers.rutValidate(value);
}

export function rutFilter(value) {
  return rutHelpers.rutFormat(value);
}

export const rutInputDirective = {
  bind() {
    const event = (this.arg === 'live') ? 'input' : 'blur';

    this.el.addEventListener(event, (e) => {
      e.target.value = rutHelpers.rutFormat(e.target.value) || '';
    });

    this.el.addEventListener('focus', (e) => {
      e.target.value = rutHelpers.rutClean(e.target.value) || '';
    });
  },
};
