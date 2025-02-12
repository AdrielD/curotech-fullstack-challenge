class Unauthorized extends Error {
  name = 'Unauthorized';

  constructor() {
    super('Hmm, nope! You are not authorized to do that!');
  }
};

class InvalidParamError extends Error {
  name = 'InvalidParamError';

  constructor(paramName: string | null) {
    super(`This ${paramName} param looks totally wrong!`);
  }
};

class RecordNotFound extends Error {
  name = 'RecordNotFound';

  constructor() {
    super('We could not find that, try again never...');
  }
};

class GenericError extends Error {
  constructor() {
    super('Oooohh! the weary error draws close to the end of the app...');
  }
};

export {
  GenericError,
  InvalidParamError,
  RecordNotFound,
  Unauthorized
};
