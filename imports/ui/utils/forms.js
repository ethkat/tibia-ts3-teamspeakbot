const getCorrectGrammar = {
  required: 'is',
};

const getSecondWordByType = ({ type } = {}) => (
  `${getCorrectGrammar[type]} ${type}`
);

const buildError = ({ errors } = {}) => {
  const response = {};
  errors.forEach(({ name, type }) => {
    response[name] = `${name} ${getSecondWordByType({ type })}`;
  });
  return response;
};

export const buildValidation = ({
  validator,
  isSimpleSchema = true,
}) => (
  (values) => {
    if (!validator) {
      // eslint-disable-next-line no-console
      console.error('You are not passing a validator, this could lead to misslead data');
    }
    let errors = {};
    const validationContext = validator.newContext();
    if (isSimpleSchema) {
      validationContext.validate(values);
      const errorsContext = validationContext.validationErrors();
      errors = buildError({ errors: errorsContext });
    }
    return errors;
  }
);
