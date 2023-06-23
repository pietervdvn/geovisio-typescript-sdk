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

export interface Collections {
  collections: any[];
  links: Link[];
}

export interface Link {
  /** @example "http://data.example.com/buildings/123" */
  href: string;
  /** @example "alternate" */
  rel: string;
  /** @example "Trierer Strasse 70, 53115 Bonn" */
  title?: string;
  /** @example "application/geo+json" */
  type?: string;
}

/** Extents */
export interface Extent {
  /** Spatial extent object */
  spatial: {
    /**
     * Spatial extents
     * @minItems 1
     */
    bbox: any[];
  };
  /** Temporal extent object */
  temporal: {
    /**
     * Temporal extents
     * @minItems 1
     */
    interval: (string | null)[][];
  };
}

export type GetApiData = {
  extent?: Extent;
};

export type CollectionsListData = Collections;

export type CollectionsCreatePayload = string;

export type CollectionsCreateData = any;

export type CollectionsDetailData = any;

export interface CollectionsGeovisioStatusDetailData {
  items?: {
    id?: string;
    rank?: number;
    status?: "ready" | "broken" | "preparing" | "waiting-for-process" | "preparing-derivates" | "preparing-blur";
  }[];
  status?: "ready" | "broken" | "preparing" | "waiting-for-process";
}

export type CollectionsItemsDetailData = any;

export interface CollectionsItemsCreatePayload {
  /** Position of picture in sequence (starting from 1) */
  position?: number;
  /** Picture to upload */
  picture?: File;
  /**
   * Is picture blurred (true, false) ? Defaults to false
   * @default false
   */
  isBlurred?: "true" | "false" | null;
}

export type CollectionsItemsCreateData = any;

export type CollectionsItemsDetail2Data = any;

export type ConformanceListData = any;

/** @format binary */
export type MapDetailData = File;

/** @format binary */
export type PicturesHdDetailData = File;

/** @format binary */
export type PicturesSdDetailData = File;

/** @format binary */
export type PicturesThumbDetailData = File;

/** @format binary */
export type PicturesTiledDetailData = File;

export type SearchListData = any;

export type SearchCreateData = any;

export interface UsersMeListData {
  /** @format uuid */
  id?: string;
  links?: {
    href?: string;
    ref?: string;
    type?: string;
  }[];
  name?: string;
}

export type UsersMeCatalogListData = any;

export type UsersCatalogDetailData = any;

export type QueryParamsType = Record<string | number, any>;
export type ResponseFormat = keyof Omit<Body, "body" | "bodyUsed">;

export interface FullRequestParams extends Omit<RequestInit, "body"> {
  /** set parameter to `true` for call `securityWorker` for this request */
  secure?: boolean;
  /** request path */
  path: string;
  /** content type of request body */
  type?: ContentType;
  /** query params */
  query?: QueryParamsType;
  /** format of response (i.e. response.json() -> format: "json") */
  format?: ResponseFormat;
  /** request body */
  body?: unknown;
  /** base url */
  baseUrl?: string;
  /** request cancellation token */
  cancelToken?: CancelToken;
}

export type RequestParams = Omit<FullRequestParams, "body" | "method" | "query" | "path">;

export interface ApiConfig<SecurityDataType = unknown> {
  baseUrl?: string;
  baseApiParams?: Omit<RequestParams, "baseUrl" | "cancelToken" | "signal">;
  securityWorker?: (securityData: SecurityDataType | null) => Promise<RequestParams | void> | RequestParams | void;
  customFetch?: typeof fetch;
}

export interface HttpResponse<D extends unknown, E extends unknown = unknown> extends Response {
  data: D;
  error: E;
}

type CancelToken = Symbol | string | number;

export enum ContentType {
  Json = "application/json",
  FormData = "multipart/form-data",
  UrlEncoded = "application/x-www-form-urlencoded",
  Text = "text/plain",
}

export class HttpClient<SecurityDataType = unknown> {
  public baseUrl: string = "";
  private securityData: SecurityDataType | null = null;
  private securityWorker?: ApiConfig<SecurityDataType>["securityWorker"];
  private abortControllers = new Map<CancelToken, AbortController>();
  private customFetch = (...fetchParams: Parameters<typeof fetch>) => fetch(...fetchParams);

  private baseApiParams: RequestParams = {
    credentials: "same-origin",
    headers: {},
    redirect: "follow",
    referrerPolicy: "no-referrer",
  };

  constructor(apiConfig: ApiConfig<SecurityDataType> = {}) {
    Object.assign(this, apiConfig);
  }

  public setSecurityData = (data: SecurityDataType | null) => {
    this.securityData = data;
  };

  protected encodeQueryParam(key: string, value: any) {
    const encodedKey = encodeURIComponent(key);
    return `${encodedKey}=${encodeURIComponent(typeof value === "number" ? value : `${value}`)}`;
  }

  protected addQueryParam(query: QueryParamsType, key: string) {
    return this.encodeQueryParam(key, query[key]);
  }

  protected addArrayQueryParam(query: QueryParamsType, key: string) {
    const value = query[key];
    return value.map((v: any) => this.encodeQueryParam(key, v)).join("&");
  }

  protected toQueryString(rawQuery?: QueryParamsType): string {
    const query = rawQuery || {};
    const keys = Object.keys(query).filter((key) => "undefined" !== typeof query[key]);
    return keys
      .map((key) => (Array.isArray(query[key]) ? this.addArrayQueryParam(query, key) : this.addQueryParam(query, key)))
      .join("&");
  }

  protected addQueryParams(rawQuery?: QueryParamsType): string {
    const queryString = this.toQueryString(rawQuery);
    return queryString ? `?${queryString}` : "";
  }

  private contentFormatters: Record<ContentType, (input: any) => any> = {
    [ContentType.Json]: (input: any) =>
      input !== null && (typeof input === "object" || typeof input === "string") ? JSON.stringify(input) : input,
    [ContentType.Text]: (input: any) => (input !== null && typeof input !== "string" ? JSON.stringify(input) : input),
    [ContentType.FormData]: (input: any) =>
      Object.keys(input || {}).reduce((formData, key) => {
        const property = input[key];
        formData.append(
          key,
          property instanceof Blob
            ? property
            : typeof property === "object" && property !== null
            ? JSON.stringify(property)
            : `${property}`,
        );
        return formData;
      }, new FormData()),
    [ContentType.UrlEncoded]: (input: any) => this.toQueryString(input),
  };

  protected mergeRequestParams(params1: RequestParams, params2?: RequestParams): RequestParams {
    return {
      ...this.baseApiParams,
      ...params1,
      ...(params2 || {}),
      headers: {
        ...(this.baseApiParams.headers || {}),
        ...(params1.headers || {}),
        ...((params2 && params2.headers) || {}),
      },
    };
  }

  protected createAbortSignal = (cancelToken: CancelToken): AbortSignal | undefined => {
    if (this.abortControllers.has(cancelToken)) {
      const abortController = this.abortControllers.get(cancelToken);
      if (abortController) {
        return abortController.signal;
      }
      return void 0;
    }

    const abortController = new AbortController();
    this.abortControllers.set(cancelToken, abortController);
    return abortController.signal;
  };

  public abortRequest = (cancelToken: CancelToken) => {
    const abortController = this.abortControllers.get(cancelToken);

    if (abortController) {
      abortController.abort();
      this.abortControllers.delete(cancelToken);
    }
  };

  public request = async <T = any, E = any>({
    body,
    secure,
    path,
    type,
    query,
    format,
    baseUrl,
    cancelToken,
    ...params
  }: FullRequestParams): Promise<HttpResponse<T, E>> => {
    const secureParams =
      ((typeof secure === "boolean" ? secure : this.baseApiParams.secure) &&
        this.securityWorker &&
        (await this.securityWorker(this.securityData))) ||
      {};
    const requestParams = this.mergeRequestParams(params, secureParams);
    const queryString = query && this.toQueryString(query);
    const payloadFormatter = this.contentFormatters[type || ContentType.Json];
    const responseFormat = format || requestParams.format;

    return this.customFetch(`${baseUrl || this.baseUrl || ""}${path}${queryString ? `?${queryString}` : ""}`, {
      ...requestParams,
      headers: {
        ...(requestParams.headers || {}),
        ...(type && type !== ContentType.FormData ? { "Content-Type": type } : {}),
      },
      signal: cancelToken ? this.createAbortSignal(cancelToken) : requestParams.signal,
      body: typeof body === "undefined" || body === null ? null : payloadFormatter(body),
    }).then(async (response) => {
      const r = response as HttpResponse<T, E>;
      r.data = null as unknown as T;
      r.error = null as unknown as E;

      const data = !responseFormat
        ? r
        : await response[responseFormat]()
            .then((data) => {
              if (r.ok) {
                r.data = data;
              } else {
                r.error = data;
              }
              return r;
            })
            .catch((e) => {
              r.error = e;
              return r;
            });

      if (cancelToken) {
        this.abortControllers.delete(cancelToken);
      }

      if (!response.ok) throw data;
      return data;
    });
  };
}

/**
 * @title geovisio
 * @version 1.5.0
 * @contact Adrien Pavie <panieravide@riseup.net> (https://gitlab.com/geovisio/api)
 *
 * Hosting and display of 360° geolocated pictures
 */
export class Geovisio<SecurityDataType extends unknown> extends HttpClient<SecurityDataType> {
  api = {
    /**
     * No description
     *
     * @name GetApi
     * @summary Retrieves API resources list
     * @request GET:/api/
     */
    getApi: (params: RequestParams = {}) =>
      this.request<GetApiData, any>({
        path: `/api/`,
        method: "GET",
        ...params,
      }),

    /**
     * No description
     *
     * @name CollectionsList
     * @summary List available collections
     * @request GET:/api/collections
     */
    collectionsList: (params: RequestParams = {}) =>
      this.request<CollectionsListData, any>({
        path: `/api/collections`,
        method: "GET",
        ...params,
      }),

    /**
     * No description
     *
     * @name CollectionsCreate
     * @summary Create a new sequence
     * @request POST:/api/collections
     */
    collectionsCreate: (title: CollectionsCreatePayload, params: RequestParams = {}) =>
      this.request<CollectionsCreateData, any>({
        path: `/api/collections`,
        method: "POST",
        body: title,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @name CollectionsDetail
     * @summary Retrieve metadata of a single collection
     * @request GET:/api/collections/{collectionId}
     */
    collectionsDetail: (collectionId?: string, params: RequestParams = {}) =>
      this.request<CollectionsDetailData, any>({
        path: `/api/collections/${collectionId}`,
        method: "GET",
        ...params,
      }),

    /**
     * No description
     *
     * @name CollectionsGeovisioStatusDetail
     * @summary Retrieve import status of all pictures in sequence
     * @request GET:/api/collections/{collectionId}/geovisio_status
     */
    collectionsGeovisioStatusDetail: (collectionId?: string, params: RequestParams = {}) =>
      this.request<CollectionsGeovisioStatusDetailData, any>({
        path: `/api/collections/${collectionId}/geovisio_status`,
        method: "GET",
        ...params,
      }),

    /**
     * No description
     *
     * @name CollectionsItemsDetail
     * @summary List items of a single collection
     * @request GET:/api/collections/{collectionId}/items
     */
    collectionsItemsDetail: (collectionId?: string, params: RequestParams = {}) =>
      this.request<CollectionsItemsDetailData, any>({
        path: `/api/collections/${collectionId}/items`,
        method: "GET",
        ...params,
      }),

    /**
     * No description
     *
     * @name CollectionsItemsCreate
     * @summary Add a new picture in a given sequence
     * @request POST:/api/collections/{collectionId}/items
     */
    collectionsItemsCreate: (data: CollectionsItemsCreatePayload, collectionId?: string, params: RequestParams = {}) =>
      this.request<CollectionsItemsCreateData, any>({
        path: `/api/collections/${collectionId}/items`,
        method: "POST",
        body: data,
        type: ContentType.FormData,
        ...params,
      }),

    /**
     * No description
     *
     * @name CollectionsItemsDetail2
     * @summary Get a single item from a collection
     * @request GET:/api/collections/{collectionId}/items/{itemId}
     * @originalName collectionsItemsDetail
     * @duplicate
     */
    collectionsItemsDetail2: (collectionId?: string, itemId?: string, params: RequestParams = {}) =>
      this.request<CollectionsItemsDetail2Data, any>({
        path: `/api/collections/${collectionId}/items/${itemId}`,
        method: "GET",
        ...params,
      }),

    /**
     * No description
     *
     * @name ConformanceList
     * @summary List definitions this API conforms to
     * @request GET:/api/conformance
     */
    conformanceList: (params: RequestParams = {}) =>
      this.request<ConformanceListData, any>({
        path: `/api/conformance`,
        method: "GET",
        ...params,
      }),

    /**
     * @description <br/>Vector tiles contains possibly two layers : sequences and pictures.<br/><br/>Layer "sequences":<br/>  - Available on all zoom levels<br/>  - Available properties: id (sequence ID)<br/><br/>Layer "pictures":<br/>  - Available on zoom levels >= 13<br/>  - Available properties: id (picture ID), ts (picture date/time), heading (picture heading in degrees)<br/>
     *
     * @name MapDetail
     * @summary Get pictures and sequences as vector tiles
     * @request GET:/api/map/{z}/{x}/{y}.{format}
     */
    mapDetail: (z?: number, x?: number, y?: number, format?: string, params: RequestParams = {}) =>
      this.request<MapDetailData, any>({
        path: `/api/map/${z}/${x}/${y}.${format}`,
        method: "GET",
        ...params,
      }),

    /**
     * No description
     *
     * @name PicturesHdDetail
     * @summary Get picture image (high-definition)
     * @request GET:/api/pictures/{pictureId}/hd.{format}
     */
    picturesHdDetail: (pictureId?: string, format?: string, params: RequestParams = {}) =>
      this.request<PicturesHdDetailData, any>({
        path: `/api/pictures/${pictureId}/hd.${format}`,
        method: "GET",
        ...params,
      }),

    /**
     * No description
     *
     * @name PicturesSdDetail
     * @summary Get picture image (standard definition)
     * @request GET:/api/pictures/{pictureId}/sd.{format}
     */
    picturesSdDetail: (pictureId?: string, format?: string, params: RequestParams = {}) =>
      this.request<PicturesSdDetailData, any>({
        path: `/api/pictures/${pictureId}/sd.${format}`,
        method: "GET",
        ...params,
      }),

    /**
     * No description
     *
     * @name PicturesThumbDetail
     * @summary Get picture thumbnail
     * @request GET:/api/pictures/{pictureId}/thumb.{format}
     */
    picturesThumbDetail: (pictureId?: string, format?: string, params: RequestParams = {}) =>
      this.request<PicturesThumbDetailData, any>({
        path: `/api/pictures/${pictureId}/thumb.${format}`,
        method: "GET",
        ...params,
      }),

    /**
     * No description
     *
     * @name PicturesTiledDetail
     * @summary Get picture tile
     * @request GET:/api/pictures/{pictureId}/tiled/{col}_{row}.{format}
     */
    picturesTiledDetail: (
      pictureId?: string,
      col?: number,
      row?: number,
      format?: string,
      params: RequestParams = {},
    ) =>
      this.request<PicturesTiledDetailData, any>({
        path: `/api/pictures/${pictureId}/tiled/${col}_${row}.${format}`,
        method: "GET",
        ...params,
      }),

    /**
     * No description
     *
     * @name SearchList
     * @summary Search through all available items
     * @request GET:/api/search
     */
    searchList: (params: RequestParams = {}) =>
      this.request<SearchListData, any>({
        path: `/api/search`,
        method: "GET",
        ...params,
      }),

    /**
     * No description
     *
     * @name SearchCreate
     * @summary Search through all available items
     * @request POST:/api/search
     */
    searchCreate: (params: RequestParams = {}) =>
      this.request<SearchCreateData, any>({
        path: `/api/search`,
        method: "POST",
        ...params,
      }),

    /**
     * No description
     *
     * @name UsersMeList
     * @summary Get current logged user informations
     * @request GET:/api/users/me
     */
    usersMeList: (params: RequestParams = {}) =>
      this.request<UsersMeListData, any>({
        path: `/api/users/me`,
        method: "GET",
        ...params,
      }),

    /**
     * No description
     *
     * @name UsersMeCatalogList
     * @summary Get current logged user catalog
     * @request GET:/api/users/me/catalog/
     */
    usersMeCatalogList: (params: RequestParams = {}) =>
      this.request<UsersMeCatalogListData, any>({
        path: `/api/users/me/catalog/`,
        method: "GET",
        ...params,
      }),

    /**
     * No description
     *
     * @name UsersCatalogDetail
     * @summary Retrieves an user list of sequences (catalog)
     * @request GET:/api/users/{userId}/catalog/
     */
    usersCatalogDetail: (userId: string, params: RequestParams = {}) =>
      this.request<UsersCatalogDetailData, any>({
        path: `/api/users/${userId}/catalog/`,
        method: "GET",
        ...params,
      }),
  };
}
