import Vue from 'vue/dist/vue.common';
import { rutInputDirective, rutFilter } from './vue-dni';

describe('Rut Input Directive', () => {
  let vm;
  beforeEach(() => {
    Vue.directive('rut', rutInputDirective);
  });

  it('should format RUT on blur by default', () => {
    vm = new Vue({
      template: '<div><input v-rut name="rut" type="text"></div>',
    }).$mount();

    const nativeInput = vm.$el.querySelector('input');
    nativeInput.value = '7618285K';
    nativeInput.dispatchEvent(new Event('blur'));
    expect(nativeInput.value).toBe('7.618.285-K');
  });

  it('shouldn\'t format RUT on keyup by default', () => {
    vm = new Vue({
      template: '<div><input v-rut name="rut" type="text"></div>',
    }).$mount();

    const nativeInput = vm.$el.querySelector('input');
    nativeInput.value = '7618285K';
    nativeInput.dispatchEvent(new Event('keyup'));
    expect(nativeInput.value).toBe('7618285K');
  });

  it('should format RUT on keyup if in live mode', () => {
    vm = new Vue({
      template: '<div><input v-rut:live name="rut" type="text"></div>',
    }).$mount();

    const nativeInput = vm.$el.querySelector('input');
    nativeInput.value = '7618285K';
    nativeInput.dispatchEvent(new Event('keyup'));
    expect(nativeInput.value).toBe('7.618.285-K');
  });

  it('should always format RUT on blur even if in live mode', () => {
    vm = new Vue({
      template: '<div><input v-rut:live name="rut" type="text"></div>',
    }).$mount();

    const nativeInput = vm.$el.querySelector('input');
    nativeInput.value = '7618285K';
    nativeInput.dispatchEvent(new Event('blur'));
    expect(nativeInput.value).toBe('7.618.285-K');
  });
});

describe('Rut Filter', () => {
  let vm;
  beforeEach(() => {
    Vue.filter('rut', rutFilter);
  });

  it('should format value to Rut', () => {
    vm = new Vue({
      template: '<div>{{superRut | rut}}</div>',
      data() {
        return {
          superRut: '7618285K',
        };
      },
    }).$mount();

    expect(vm.$el.textContent).toBe('7.618.285-K');
  });
});
