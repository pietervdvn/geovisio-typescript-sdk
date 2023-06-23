/* eslint-disable */
/* tslint:disable */
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
export var ContentType;
(function (ContentType) {
    ContentType["Json"] = "application/json";
    ContentType["FormData"] = "multipart/form-data";
    ContentType["UrlEncoded"] = "application/x-www-form-urlencoded";
    ContentType["Text"] = "text/plain";
})(ContentType || (ContentType = {}));
var HttpClient = /** @class */ (function () {
    function HttpClient(apiConfig) {
        var _a;
        if (apiConfig === void 0) { apiConfig = {}; }
        var _this = this;
        this.baseUrl = "";
        this.securityData = null;
        this.abortControllers = new Map();
        this.customFetch = function () {
            var fetchParams = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                fetchParams[_i] = arguments[_i];
            }
            return fetch.apply(void 0, fetchParams);
        };
        this.baseApiParams = {
            credentials: "same-origin",
            headers: {},
            redirect: "follow",
            referrerPolicy: "no-referrer",
        };
        this.setSecurityData = function (data) {
            _this.securityData = data;
        };
        this.contentFormatters = (_a = {},
            _a[ContentType.Json] = function (input) {
                return input !== null && (typeof input === "object" || typeof input === "string") ? JSON.stringify(input) : input;
            },
            _a[ContentType.Text] = function (input) { return (input !== null && typeof input !== "string" ? JSON.stringify(input) : input); },
            _a[ContentType.FormData] = function (input) {
                return Object.keys(input || {}).reduce(function (formData, key) {
                    var property = input[key];
                    formData.append(key, property instanceof Blob
                        ? property
                        : typeof property === "object" && property !== null
                            ? JSON.stringify(property)
                            : "".concat(property));
                    return formData;
                }, new FormData());
            },
            _a[ContentType.UrlEncoded] = function (input) { return _this.toQueryString(input); },
            _a);
        this.createAbortSignal = function (cancelToken) {
            if (_this.abortControllers.has(cancelToken)) {
                var abortController_1 = _this.abortControllers.get(cancelToken);
                if (abortController_1) {
                    return abortController_1.signal;
                }
                return void 0;
            }
            var abortController = new AbortController();
            _this.abortControllers.set(cancelToken, abortController);
            return abortController.signal;
        };
        this.abortRequest = function (cancelToken) {
            var abortController = _this.abortControllers.get(cancelToken);
            if (abortController) {
                abortController.abort();
                _this.abortControllers.delete(cancelToken);
            }
        };
        this.request = function (_a) { return __awaiter(_this, void 0, void 0, function () {
            var secureParams, _b, requestParams, queryString, payloadFormatter, responseFormat;
            var _this = this;
            var body = _a.body, secure = _a.secure, path = _a.path, type = _a.type, query = _a.query, format = _a.format, baseUrl = _a.baseUrl, cancelToken = _a.cancelToken, params = __rest(_a, ["body", "secure", "path", "type", "query", "format", "baseUrl", "cancelToken"]);
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _b = (typeof secure === "boolean" ? secure : this.baseApiParams.secure) &&
                            this.securityWorker;
                        if (!_b) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.securityWorker(this.securityData)];
                    case 1:
                        _b = (_c.sent());
                        _c.label = 2;
                    case 2:
                        secureParams = (_b) ||
                            {};
                        requestParams = this.mergeRequestParams(params, secureParams);
                        queryString = query && this.toQueryString(query);
                        payloadFormatter = this.contentFormatters[type || ContentType.Json];
                        responseFormat = format || requestParams.format;
                        return [2 /*return*/, this.customFetch("".concat(baseUrl || this.baseUrl || "").concat(path).concat(queryString ? "?".concat(queryString) : ""), __assign(__assign({}, requestParams), { headers: __assign(__assign({}, (requestParams.headers || {})), (type && type !== ContentType.FormData ? { "Content-Type": type } : {})), signal: cancelToken ? this.createAbortSignal(cancelToken) : requestParams.signal, body: typeof body === "undefined" || body === null ? null : payloadFormatter(body) })).then(function (response) { return __awaiter(_this, void 0, void 0, function () {
                                var r, data, _a;
                                return __generator(this, function (_b) {
                                    switch (_b.label) {
                                        case 0:
                                            r = response;
                                            r.data = null;
                                            r.error = null;
                                            if (!!responseFormat) return [3 /*break*/, 1];
                                            _a = r;
                                            return [3 /*break*/, 3];
                                        case 1: return [4 /*yield*/, response[responseFormat]()
                                                .then(function (data) {
                                                if (r.ok) {
                                                    r.data = data;
                                                }
                                                else {
                                                    r.error = data;
                                                }
                                                return r;
                                            })
                                                .catch(function (e) {
                                                r.error = e;
                                                return r;
                                            })];
                                        case 2:
                                            _a = _b.sent();
                                            _b.label = 3;
                                        case 3:
                                            data = _a;
                                            if (cancelToken) {
                                                this.abortControllers.delete(cancelToken);
                                            }
                                            if (!response.ok)
                                                throw data;
                                            return [2 /*return*/, data];
                                    }
                                });
                            }); })];
                }
            });
        }); };
        Object.assign(this, apiConfig);
    }
    HttpClient.prototype.encodeQueryParam = function (key, value) {
        var encodedKey = encodeURIComponent(key);
        return "".concat(encodedKey, "=").concat(encodeURIComponent(typeof value === "number" ? value : "".concat(value)));
    };
    HttpClient.prototype.addQueryParam = function (query, key) {
        return this.encodeQueryParam(key, query[key]);
    };
    HttpClient.prototype.addArrayQueryParam = function (query, key) {
        var _this = this;
        var value = query[key];
        return value.map(function (v) { return _this.encodeQueryParam(key, v); }).join("&");
    };
    HttpClient.prototype.toQueryString = function (rawQuery) {
        var _this = this;
        var query = rawQuery || {};
        var keys = Object.keys(query).filter(function (key) { return "undefined" !== typeof query[key]; });
        return keys
            .map(function (key) { return (Array.isArray(query[key]) ? _this.addArrayQueryParam(query, key) : _this.addQueryParam(query, key)); })
            .join("&");
    };
    HttpClient.prototype.addQueryParams = function (rawQuery) {
        var queryString = this.toQueryString(rawQuery);
        return queryString ? "?".concat(queryString) : "";
    };
    HttpClient.prototype.mergeRequestParams = function (params1, params2) {
        return __assign(__assign(__assign(__assign({}, this.baseApiParams), params1), (params2 || {})), { headers: __assign(__assign(__assign({}, (this.baseApiParams.headers || {})), (params1.headers || {})), ((params2 && params2.headers) || {})) });
    };
    return HttpClient;
}());
export { HttpClient };
/**
 * @title geovisio
 * @version 1.5.0
 * @contact Adrien Pavie <panieravide@riseup.net> (https://gitlab.com/geovisio/api)
 *
 * Hosting and display of 360° geolocated pictures
 */
var Geovisio = /** @class */ (function (_super) {
    __extends(Geovisio, _super);
    function Geovisio() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.api = {
            /**
             * No description
             *
             * @name GetApi
             * @summary Retrieves API resources list
             * @request GET:/api/
             */
            getApi: function (params) {
                if (params === void 0) { params = {}; }
                return _this.request(__assign({ path: "/api/", method: "GET" }, params));
            },
            /**
             * No description
             *
             * @name CollectionsList
             * @summary List available collections
             * @request GET:/api/collections
             */
            collectionsList: function (params) {
                if (params === void 0) { params = {}; }
                return _this.request(__assign({ path: "/api/collections", method: "GET" }, params));
            },
            /**
             * No description
             *
             * @name CollectionsCreate
             * @summary Create a new sequence
             * @request POST:/api/collections
             */
            collectionsCreate: function (title, params) {
                if (params === void 0) { params = {}; }
                return _this.request(__assign({ path: "/api/collections", method: "POST", body: title, type: ContentType.Json }, params));
            },
            /**
             * No description
             *
             * @name CollectionsDetail
             * @summary Retrieve metadata of a single collection
             * @request GET:/api/collections/{collectionId}
             */
            collectionsDetail: function (collectionId, params) {
                if (params === void 0) { params = {}; }
                return _this.request(__assign({ path: "/api/collections/".concat(collectionId), method: "GET" }, params));
            },
            /**
             * No description
             *
             * @name CollectionsGeovisioStatusDetail
             * @summary Retrieve import status of all pictures in sequence
             * @request GET:/api/collections/{collectionId}/geovisio_status
             */
            collectionsGeovisioStatusDetail: function (collectionId, params) {
                if (params === void 0) { params = {}; }
                return _this.request(__assign({ path: "/api/collections/".concat(collectionId, "/geovisio_status"), method: "GET" }, params));
            },
            /**
             * No description
             *
             * @name CollectionsItemsDetail
             * @summary List items of a single collection
             * @request GET:/api/collections/{collectionId}/items
             */
            collectionsItemsDetail: function (collectionId, params) {
                if (params === void 0) { params = {}; }
                return _this.request(__assign({ path: "/api/collections/".concat(collectionId, "/items"), method: "GET" }, params));
            },
            /**
             * No description
             *
             * @name CollectionsItemsCreate
             * @summary Add a new picture in a given sequence
             * @request POST:/api/collections/{collectionId}/items
             */
            collectionsItemsCreate: function (data, collectionId, params) {
                if (params === void 0) { params = {}; }
                return _this.request(__assign({ path: "/api/collections/".concat(collectionId, "/items"), method: "POST", body: data, type: ContentType.FormData }, params));
            },
            /**
             * No description
             *
             * @name CollectionsItemsDetail2
             * @summary Get a single item from a collection
             * @request GET:/api/collections/{collectionId}/items/{itemId}
             * @originalName collectionsItemsDetail
             * @duplicate
             */
            collectionsItemsDetail2: function (collectionId, itemId, params) {
                if (params === void 0) { params = {}; }
                return _this.request(__assign({ path: "/api/collections/".concat(collectionId, "/items/").concat(itemId), method: "GET" }, params));
            },
            /**
             * No description
             *
             * @name ConformanceList
             * @summary List definitions this API conforms to
             * @request GET:/api/conformance
             */
            conformanceList: function (params) {
                if (params === void 0) { params = {}; }
                return _this.request(__assign({ path: "/api/conformance", method: "GET" }, params));
            },
            /**
             * @description <br/>Vector tiles contains possibly two layers : sequences and pictures.<br/><br/>Layer "sequences":<br/>  - Available on all zoom levels<br/>  - Available properties: id (sequence ID)<br/><br/>Layer "pictures":<br/>  - Available on zoom levels >= 13<br/>  - Available properties: id (picture ID), ts (picture date/time), heading (picture heading in degrees)<br/>
             *
             * @name MapDetail
             * @summary Get pictures and sequences as vector tiles
             * @request GET:/api/map/{z}/{x}/{y}.{format}
             */
            mapDetail: function (z, x, y, format, params) {
                if (params === void 0) { params = {}; }
                return _this.request(__assign({ path: "/api/map/".concat(z, "/").concat(x, "/").concat(y, ".").concat(format), method: "GET" }, params));
            },
            /**
             * No description
             *
             * @name PicturesHdDetail
             * @summary Get picture image (high-definition)
             * @request GET:/api/pictures/{pictureId}/hd.{format}
             */
            picturesHdDetail: function (pictureId, format, params) {
                if (params === void 0) { params = {}; }
                return _this.request(__assign({ path: "/api/pictures/".concat(pictureId, "/hd.").concat(format), method: "GET" }, params));
            },
            /**
             * No description
             *
             * @name PicturesSdDetail
             * @summary Get picture image (standard definition)
             * @request GET:/api/pictures/{pictureId}/sd.{format}
             */
            picturesSdDetail: function (pictureId, format, params) {
                if (params === void 0) { params = {}; }
                return _this.request(__assign({ path: "/api/pictures/".concat(pictureId, "/sd.").concat(format), method: "GET" }, params));
            },
            /**
             * No description
             *
             * @name PicturesThumbDetail
             * @summary Get picture thumbnail
             * @request GET:/api/pictures/{pictureId}/thumb.{format}
             */
            picturesThumbDetail: function (pictureId, format, params) {
                if (params === void 0) { params = {}; }
                return _this.request(__assign({ path: "/api/pictures/".concat(pictureId, "/thumb.").concat(format), method: "GET" }, params));
            },
            /**
             * No description
             *
             * @name PicturesTiledDetail
             * @summary Get picture tile
             * @request GET:/api/pictures/{pictureId}/tiled/{col}_{row}.{format}
             */
            picturesTiledDetail: function (pictureId, col, row, format, params) {
                if (params === void 0) { params = {}; }
                return _this.request(__assign({ path: "/api/pictures/".concat(pictureId, "/tiled/").concat(col, "_").concat(row, ".").concat(format), method: "GET" }, params));
            },
            /**
             * No description
             *
             * @name SearchList
             * @summary Search through all available items
             * @request GET:/api/search
             */
            searchList: function (params) {
                if (params === void 0) { params = {}; }
                return _this.request(__assign({ path: "/api/search", method: "GET" }, params));
            },
            /**
             * No description
             *
             * @name SearchCreate
             * @summary Search through all available items
             * @request POST:/api/search
             */
            searchCreate: function (params) {
                if (params === void 0) { params = {}; }
                return _this.request(__assign({ path: "/api/search", method: "POST" }, params));
            },
            /**
             * No description
             *
             * @name UsersMeList
             * @summary Get current logged user informations
             * @request GET:/api/users/me
             */
            usersMeList: function (params) {
                if (params === void 0) { params = {}; }
                return _this.request(__assign({ path: "/api/users/me", method: "GET" }, params));
            },
            /**
             * No description
             *
             * @name UsersMeCatalogList
             * @summary Get current logged user catalog
             * @request GET:/api/users/me/catalog/
             */
            usersMeCatalogList: function (params) {
                if (params === void 0) { params = {}; }
                return _this.request(__assign({ path: "/api/users/me/catalog/", method: "GET" }, params));
            },
            /**
             * No description
             *
             * @name UsersCatalogDetail
             * @summary Retrieves an user list of sequences (catalog)
             * @request GET:/api/users/{userId}/catalog/
             */
            usersCatalogDetail: function (userId, params) {
                if (params === void 0) { params = {}; }
                return _this.request(__assign({ path: "/api/users/".concat(userId, "/catalog/"), method: "GET" }, params));
            },
        };
        return _this;
    }
    return Geovisio;
}(HttpClient));
export { Geovisio };
