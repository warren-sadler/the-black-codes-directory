/**
 * @module core.http.status-codes
 *
 * This module exposes a set of common HTTP status-codes for
 * consistency, convenience, and a nominal approach to HTTP statuses.
 */

/**
 * The request has succeeded.
 */
export const OK = 200;
/**
 * The request has been fulfilled and resulted in a new resource being created.
 */
export const CREATED = 201;
/**
 * If the client has performed a conditional GET request and access is allowed, but the document has not been modified, the server SHOULD respond with this status code.
 */
export const NOT_MODIFIED = 304;
/**
 * The request could not be understood by the server due to malformed syntax.
 */
export const BAD_REQUEST = 400;
/**
 * The request requires user authentication.
 */
export const UNAUTHORIZED = 401;
/**
 * The server understood the request, but is refusing to fulfill it.
 */
export const FORBIDDEN = 403;
/**
 * The server has not found anything matching the Request-URI.
 */
export const NOT_FOUND = 404;
/**
 * The server encountered an unexpected condition which prevented it from fulfilling the request.
 */
export const INTERNAL_SERVER_ERROR = 500;
/**
 * The server does not support the functionality required to fulfill the request.
 */
export const NOT_IMPLEMENTED = 501;
