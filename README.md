# Vue Rut Validator

This library is a group of directives, filters and validators that allows you to check if rut (chilean DNI) is valid or not based on the verification digit 14.242.422-<b>2</b>. It also include some mask binding to format the input while the user is enterinig the data.

## Installation

```bash
npm install vue-rut
```

Include the `dist/vue-rut.min.js` file in your project.

## Usage

This library has three base features: a validator, a filter and a directive.

### Validator

To use the validator we integrate with [vue-validator](https://github.com/kazupon/vue-validator) component and it as simple as including this in your component. I can also be used with any other validator that validates receiving boolean results.

```javascript
import Vue form 'vue';
import { rutValidator } from 'vue-rut';

Vue.validator('rutValidator', RutValidator);

```

And then in your template you can use an `<input>` to bind the validator

```HTML
<input type="text" name="user[rut]" v-validate:rut="['rutValidator']">
```

You can bind this validator to show some error message too

```HTML
<div class="error" v-if="!$validator.rut.pristine && $validator.rut.rutValidator">This RUT is not valid</div>
```

### Filter

Once you have a `rut` field to render you can easely register the filter in your vue component 

```javascript 
import Vue from 'vue';
import { rutFilter } from 'vue-rut';

Vue.filter('rutFilter', RutFilter);
```

and then do the render and filtering

```
{{ user.rut | rutFilter }}
```

### Directive

If you want to format the user input in a text field use the included directive, it'll format the string on blur.

```javascript
import Vue from 'vue';
import { rutDirective } from 'vue-rut';

Vue.directive('rut', RutDirective);
```

And then in your template you can use it like this

```HTML
<input type="text" name="user[rut]" v-rut>
```
