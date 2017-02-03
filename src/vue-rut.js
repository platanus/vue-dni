import * as rutHelpers from 'rut-helpers';

function createEvent(eventName, bubbles) {
  let event;
  if ('CustomEvent' in window && typeof window.CustomEvent === 'function') {
    event = new CustomEvent(eventName, {
      bubbles,
    });
  } else {
    event = document.createEvent('Events');
    event.initEvent(eventName, bubbles);
  }

  return event;
}

export function rutValidator(value) {
  return rutHelpers.rutValidate(value);
}

export function rutFilter(value) {
  return rutHelpers.rutFormat(value);
}

export const rutInputDirective = {
  bind(el, binding) {
    const inputEvent = (binding.arg === 'live') ? ['blur', 'keyup'] : ['blur'];

    function formatInput(e) {
      const oldValue = e.target.value;
      const newValue = rutHelpers.rutFormat(e.target.value) || '';
      if (oldValue !== newValue) {
        const forceUpdate = createEvent('input', true);
        e.target.value = rutHelpers.rutFormat(e.target.value) || '';
        el.dispatchEvent(forceUpdate);
      }
    }

    inputEvent.forEach(event => {
      el.addEventListener(event, formatInput);
    });

    el.addEventListener('focus', (e) => {
      e.target.value = rutHelpers.rutClean(e.target.value) || '';
    });
  },
};
