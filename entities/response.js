"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResponseObject = void 0;
var ResponseObject = /** @class */ (function () {
    // eslint-disable-next-line n/handle-callback-err
    function ResponseObject(error, ok, response) {
        this.error = error;
        this.ok = ok;
        this.response = response;
    }
    return ResponseObject;
}());
exports.ResponseObject = ResponseObject;
