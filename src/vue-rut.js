import * as rutHelpers from 'rut-helpers';

export function rutValidator(value) {
  return rutHelpers.rutValidate(value);
}

export function rutFilter(value) {
  return rutHelpers.rutFormat(value);
}

export const rutInputDirective = {
  bind(el, binding) {
    const event = (binding.arg === 'live') ? 'input' : 'blur';

    el.addEventListener(event, (e) => {
      e.target.value = rutHelpers.rutFormat(e.target.value) || '';
    });

    el.addEventListener('focus', (e) => {
      e.target.value = rutHelpers.rutClean(e.target.value) || '';
    });
  },
};
