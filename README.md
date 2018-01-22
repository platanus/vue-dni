# Vue DNI Validator

This library is a collection of utilities that allows you to check if a DNI is valid or not and to transform a string to the expected format.

Supported DNIs:
- Chilean (RUT)


## Installation

```bash
npm install vue-dni --save
# or
yarn add vue-dni
```


```javascript
import { rutValidator, rutFilter, rutInputDirective } from 'vue-dni';
```

## Usage

This library has three base features: a validator, a filter and a directive.

### Validator
The validator checks the passed string and returns a boolean depending on the string's validity as a RUT. We have tested it with [vue-validator](https://github.com/kazupon/vue-validator) and [vee-validate](http://vee-validate.logaretm.com/rules#custom-rules) but it should be usable by any library that uses booleans for validation.

#### vue-validator Example
[⚠️ ⚠️  Vue validator is deprecated and no longer being maintained ⚠️ ⚠️ ](https://github.com/kazupon/vue-validator#warning-please-note-this-project-is-deprecated-and-no-longer-being-maintained)
```javascript
import Vue from 'vue';
import { rutValidator } from 'vue-dni';

Vue.validator('rutValidator', rutValidator);

```

And then in your template you can use an `<input>` to bind the validator

```HTML
<input type="text" name="user[rut]" v-validate:rut="['rutValidator']">
```

You can bind this validator to show an error message too

```HTML
<div class="error" v-if="!$validator.rut.pristine && $validator.rut.rutValidator">This RUT is not valid</div>
```

#### vee-validate Example
_component.vue_
```javascript
<script>
  import { Validator } from 'vee-validate'
  import { rutValidator } from 'vue-dni'

  export default {
    name: 'App',
    created () {
      Validator.extend('rut', rutValidator)
    }
  }
</script>
```
```HTML
<template>
  <input type="text" name="user[rut]" v-validate="'rut'">
  <span v-show="errors.has('user[rut]')">Invalid Rut</span>
</template>
```

### Filter

With the RUT filter you can format any string to appear as a RUT.

```javascript
import Vue from 'vue';
import { rutFilter } from 'vue-dni';

Vue.filter('rutFilter', rutFilter);
```

and then do the render and filtering

```HTML
{{ user.rut }}
<!--  123124124 -->

{{ user.rut | rutFilter }}
<!--  12.312.412-4 -->
```

### Directive

If you want to format the user input in a text field use the included directive.
By default it'll format the string on blur but it can be configured to format while
the text is being written.

![Rut directive](http://i.imgur.com/s6eRYSF.gif)

![Rut live directive](http://i.imgur.com/dCkXiXc.gif)

```javascript
import Vue from 'vue';
import { rutInputDirective } from 'vue-dni';

Vue.directive('rut', rutInputDirective);
```

And then in your template you can use it like this

```HTML
<!-- Format on blur -->
<input type="text" name="user[rut]" v-rut>

<!-- Format live (while text is being written) -->
<input type="text" name="user[rut]" v-rut:live>
```
