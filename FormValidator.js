import { Validatinator } from "validatinator";

export class FormValidator {
  #config;
  #messages;
  #formSelector;
  #fields;
  #errors = {};
  #valid = false;
  #results = {};
  #validator;

  constructor(config, msgs) {
    
    const hasNewMessages = msgs && Object.keys(msgs).length > 0;

    if (hasNewMessages) {
      this.#validator = new Validatinator(config, msgs);
      this.#messages = msgs;
    } else {
      this.#validator = new Validatinator(config);
    }

    this.#config = config;
    this.#messages = msgs;
    this.#formSelector = Object.keys(this.#config)[0];
    this.#fields = Object.keys(this.config[this.formSelector]);
  }

  get config() {
    return this.#config;
  }

  set config(config) {
    this.#config = config;
  }

  get errors() {
    return this.#errors;
  }

  set errors(errors) {
    this.#errors = errors;
  }

  get valid() {
    return this.#valid;
  }

  set valid(valid) {
    this.#valid = valid;
  }

  get results() {
    return this.#results;
  }

  set results(results) {
    this.#results = results;
  }

  get validator() {
    return this.#validator;
  }

  set validator(validator) {
    this.#validator = validator;
  }

  get formSelector() {
    return this.#formSelector;
  }

  set formSelector(formSelector) {
    this.#formSelector = formSelector;
  }

  get fields() {
    return this.#fields;
  }

  set fields(fields) {
    this.#fields = fields;
  }

  get messages() {
    return this.#messages;
  }

  set messages(messages) {
    this.#messages = messages;
  }

  getErrors(state) {
    const errors = {};
    this.#fields.forEach((field) => {
      errors[field] = state.getFieldErrors(field);
    });
    return errors;
  }

  getCampoError(campo) {
    return this.validator.getFieldErrors(campo);
  }

  async validate() {
    const state = await this.validator.validate(this.#formSelector);
    const ERRORS = this.getErrors(state);
    const VALID = Object.values(ERRORS).every((error) => error.length === 0);

    const NEW_STATE = {
      fieldsConfiguration: state.formFieldConfigs,
      results: state.results,
      errors: ERRORS,
      valid: VALID,
      invalid: !VALID,
      originalState: state,
    };

    this.#errors = NEW_STATE.errors;
    this.#results = NEW_STATE.results;
    this.#valid = NEW_STATE.valid;
    return NEW_STATE;
  }
}
