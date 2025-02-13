"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Unauthorized = exports.RecordNotFound = exports.InvalidParamError = exports.GenericError = void 0;
class Unauthorized extends Error {
    constructor() {
        super('Hmm, nope! You are not authorized to do that!');
        this.name = 'Unauthorized';
    }
}
exports.Unauthorized = Unauthorized;
;
class InvalidParamError extends Error {
    constructor(paramName) {
        super(`This ${paramName} param looks totally wrong!`);
        this.name = 'InvalidParamError';
    }
}
exports.InvalidParamError = InvalidParamError;
;
class RecordNotFound extends Error {
    constructor() {
        super('We could not find that, try again never...');
        this.name = 'RecordNotFound';
    }
}
exports.RecordNotFound = RecordNotFound;
;
class GenericError extends Error {
    constructor() {
        super('Oooohh! the weary error draws close to the end of the app...');
    }
}
exports.GenericError = GenericError;
;
