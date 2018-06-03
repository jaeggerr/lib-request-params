"use strict";
exports.__esModule = true;
var util_1 = require("util");
var jsonschema_1 = require("jsonschema");
/**
 * Checks if the URL body parameters match the schema and handle the request if there is an error.
 * @param options The options
 */
function validate(options) {
    var result = jsonschema_1.validate(options.body, options.schema);
    var bodyName = options.bodyName || 'body';
    var canBeNull = options.canBeNull || false;
    var errorMessages = [];
    if (util_1.isNullOrUndefined(options.body) && !canBeNull) {
        errorMessages.push(bodyName + " must be set");
    }
    else {
        for (var _i = 0, _a = result.errors; _i < _a.length; _i++) {
            var error = _a[_i];
            // TODO: Find if there is a better way to replace 'instance' in the message string
            var message = error.property.replace(new RegExp('^instance'), bodyName);
            message += " " + error.message;
            errorMessages.push(message);
        }
    }
    if (errorMessages.length > 0) {
        if (options.response) {
            options.response.send(options.errorCode || 400, { errors: errorMessages });
        }
        if (options.next) {
            options.next();
        }
    }
    return {
        hasErrors: errorMessages.length > 0,
        errorMessages: errorMessages
    };
}
exports.validate = validate;
