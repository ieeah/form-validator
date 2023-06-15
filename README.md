# Form Validator Class

This library is just a wrapper for the [validatinator](https://www.npmjs.com/package/validatinator) package and doesn't add any new functionality, it just change a little bit the way you use it and the returned values.

> _The validatinator package is a simple and lightweight form validation library for JavaScript. It's easy to use and has no dependencies._

I created this library just to make it easier for me to use the validatinator package in my projects and probably won't be a better option than using the package directly for most of the people.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Strings Syntaxes](#syntaxes)
  - [Rules](#rules)
  - [Rules Strings](#rules-string)
- [License](#license)

## Installation

Just run the npm install command:

```javascript
npm install form-validator-class
```

## Usage

You can import the package in your project like this:

```javascript
import { FormValidator } from "form-validator-class";
```

The config file has to be structured this way:

- `formQuerySelector`: a valid querySelector string which identifies the wrapper that contains the inputs to be validated (it doesn't have to be a form element).

- `inputQuerySelector`: a valid querySelector string which identifies the inputs to be validated.

- `inputRulesString`: a string containing the rules to be applied to the input, separated by a pipe (|) character.

The overrideMessages object has to be structured this way:

- `ruleName`: the name of the rule you want to override the message for

- `message`: the message you want to override the default one with

**_More on the inputRulesString and ruleName syntax in a next chapter._**

```javascript
const config = {
  formQuerySelector: {
    inputQuerySelector: "inputRulesString",
    inputQuerySelector: "inputRulesString",
  },
};

const messages = {
  ruleName: "messages",
  ruleName: "messages",
};

const validator = new FormValidator(config, overrideMessages);
```
Once created, you can call the validate method on the validator object everytime you need to validate the inputs.

> _Unlike the Validatinator package, the validate method doesn't need the `formQuerySelector` as a parameter, it will automatically get it from the config object._

The validate method returns a promise which resolves to an object containing few properties which the most important are:

- `valid`: a boolean value which indicates if the validation was successful or not

- `errors`: an object containing the errors messages resulted from the validation for each input

- `results`: an object containing the results of the validation for each rule on each input

I suggest using a wrapper function to handle the validation, like this:

```javascript
async function validateForm() {
  const state = await validator.validate();

  if (state.valid) {
    // do something if the validation is successful
  } else {
    // do something if the validation fails
  }
}
```
## Syntaxes
All the rules and the rules strings are the same as the ones used in the [validatinator](https://www.npmjs.com/package/validatinator) package, so you can refer to the package documentation for more details.

### Rules

All the rules that are available and validated by the validator.

- `accepted`

  matches any checked checkbox or radio input
- `alpha` 

  matches any string that contains only alphabetic characters
- `alphaDash` 

  matches any string that contains only alphabetic characters, hyphens, and underscores
- `alphaNum` 

  matches any string that contains only alphanumeric characters
- `alphaDashNum`

  matches any string that contains only alphanumeric characters, hyphens, and underscores
- `between:2,10`

  matches any string or string representing a number that is between the two values included
- `betweenLength:2,10`

  matches any string that has a length between the two values included
- `contains:2,4,6,8,10,12`

  given a list of values, will successfully match if the input value is equal to one of the values
- `dateBefore:2022-02-04`

  matches any date that is before the given date
- `dateAfter:2022-02-10`

  matches any date that is after the given date
- `difference:.my-other-field-selector,false`

  matches any input that has a different value than the one of the given selector
- `digitsLength:3

  matches any string that has the given length
- `digitsLengthBetween:3,10`

  matches any string that has a length between the two values included
- `email`

  matches any string that is a valid email address
- `ipvFour`

  matches any string that is a valid IPv4 address
- `max:500`

  matches any string or string representing a number that is less than or equal to the given value
- `maxLength:2`

  matches any string that has a length less than or equal to the given value
- `min:200`

  matches any string or string representing a number that is greater than or equal to the given value
- `minLength:2`

  matches any string that has a length greater than or equal to the given value
- `notIn:2,4,6,8,10,12`

  given a list of values, will successfully match if the input value is not equal to one of the values
- `number`

  matches any valid number (also strings representing valid numbers)
- `pattern:valid_regex_string`

  matches any string that matches the given regex string
- `required`

  matches any value that is not empty (not valid for checkboxes/radio inputs)
- `requiredIf:.another-field-selector,value-to-check`

  matches any value that is not empty if the value of the given selector is equal to the given value
- `requiredIfNot:.another-field-selector,value-to-check`

  matches any value that is not empty if the value of the given selector is not equal to the given value
- `same:.another-field-selector,false`

  matches any input that has the same value as the one of the given selector
- `url`

  matches any string that is a valid URL

#### Validation Method Notes

- `difference` | `same` - The second argument stands for the `strict` evaluation, when `true` will perform case sensitive validation.

- `pattern` - The valid regex string will be compared against the field value and if any part of the value matches the string, it will be valid.
  
  To strictly match the field value one must include the "starts with" (^) and "ends with" ($) assertion characters. A backslash inside the regex string must be escaped to be processed as a literal backslash (ex: "pattern:\\d" to match any numeric digit).


### Rules String

The rules string is a string containing the rules to be applied to the input, separated by a pipe (|) character.

```javascript
const nameInputRules = "required|alphaDashNum|betweenLength:2,10";
const emailInputRules = "required|email";
```

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.
