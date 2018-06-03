import { Schema } from 'jsonschema';
export interface Resolve {
    send(errorCode: any, response: any): any;
}
export interface CheckBodyResult {
    hasErrors: boolean;
    errorMessages: string[];
}
/**
 * Checks if the URL body parameters match the schema and handle the request if there is an error.
 * @param options The options
 */
export declare function validate(options: {
    body: any;
    /**
     * The schema that the body must match. Check this URL for more information: https://github.com/tdegrunt/jsonschema.
     */
    schema: Schema;
    /**
     * The resolve method of the request. If set and errors were found the method will be called.
     */
    resolve?: Resolve;
    /**
     * The next method of the request. If set and errors were fould, the method will be called.
     */
    next?: (() => any);
    /**
     * The error code to return in the resolve method. Default is 400.
     */
    errorCode?: number | string;
    /**
     * The name of the parameters object printed in the error messages. Default is 'body'.
     */
    bodyName?: string;
}): CheckBodyResult;
