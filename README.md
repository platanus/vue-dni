# Vue Rut Validator

This library is a collection of utilities that allows you to check if a RUT (Chilean DNI) is valid or not based on the verification digit (14.242.422-<b>2</b>), to format any string as a RUT, and to format the user-entered data in an input field.

## Installation

```bash
npm install vue-rut --save
# or
yarn add vue-rut
```


```javascript
import { rutValidator, rutFilter, rutDirective } from 'vue-rut';
```

## Usage

This library has three base features: a validator, a filter and a directive.

### Validator
The validator checks the passed string and returns a boolean depending on the string's validity as a RUT. We have tested it with [vue-validator](https://github.com/kazupon/vue-validator) and the following example uses that library but it should be usable by any library that uses booleans for validation (like [vee-validate](http://vee-validate.logaretm.com/rules#custom-rules)).

```javascript
import Vue from 'vue';
import { rutValidator } from 'vue-rut';

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

### Filter

With the RUT filter you can format any string to appear as a RUT.

```javascript
import Vue from 'vue';
import { rutFilter } from 'vue-rut';

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

If you want to format the user input in a text field use the included directive, it'll format the string on blur.

![Rut directive](http://i.imgur.com/s6eRYSF.gif)

```javascript
import Vue from 'vue';
import { rutDirective } from 'vue-rut';

Vue.directive('rut', rutDirective);
```

And then in your template you can use it like this

```HTML
<input type="text" name="user[rut]" v-rut>
```
