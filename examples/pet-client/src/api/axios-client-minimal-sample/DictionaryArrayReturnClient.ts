//----------------------
// <auto-generated>
//     Generated using the NSwag toolchain v13.18.2.0 (NJsonSchema v11.0.0.0 (Newtonsoft.Json v13.0.0.0)) (http://NSwag.org)
// </auto-generated>
//----------------------

/* tslint:disable */
/* eslint-disable */
// ReSharper disable InconsistentNaming
import * as Types from '../axios-client-minimal-sample.types';
import type { AxiosRequestConfig, AxiosResponse, CancelToken } from 'axios';

import { throwException, isAxiosError } from '../axios-client-minimal-sample.types';
import { getAxios, getBaseUrl } from './helpers';

export function string(config?: AxiosRequestConfig | undefined): Promise<{ [key: string]: string[]; }> {
    let url_ = getBaseUrl() + "/dictionary-array/String";
      url_ = url_.replace(/[?&]$/, "");

    let options_: AxiosRequestConfig = {
        ..._requestConfigString,
        ...config,
        method: "GET",
        url: url_,
        headers: {
            "Accept": "application/json"
        }
    };

    return getAxios().request(options_).catch((_error: any) => {
        if (isAxiosError(_error) && _error.response) {
            return _error.response;
        } else {
            throw _error;
        }
    }).then((_response: AxiosResponse) => {
        return processString(_response);
    });
}

function processString(response: AxiosResponse): Promise<{ [key: string]: string[]; }> {
    const status = response.status;
    let _headers: any = {};
    if (response.headers && typeof response.headers === "object") {
        for (let k in response.headers) {
            if (response.headers.hasOwnProperty(k)) {
                _headers[k] = response.headers[k];
            }
        }
    }
    if (status === 200) {
        const _responseText = response.data;
        let result200: any = null;
        let resultData200  = _responseText;
        result200 = resultData200;
        return Promise.resolve<{ [key: string]: string[]; }>(result200);

    } else if (status !== 200 && status !== 204) {
        const _responseText = response.data;
        return throwException("An unexpected server error occurred.", status, _responseText, _headers);
    }
    return Promise.resolve<{ [key: string]: string[]; }>(null as any);
}

export function number(config?: AxiosRequestConfig | undefined): Promise<{ [key: string]: number[]; }> {
    let url_ = getBaseUrl() + "/dictionary-array/Number";
      url_ = url_.replace(/[?&]$/, "");

    let options_: AxiosRequestConfig = {
        ..._requestConfigNumber,
        ...config,
        method: "GET",
        url: url_,
        headers: {
            "Accept": "application/json"
        }
    };

    return getAxios().request(options_).catch((_error: any) => {
        if (isAxiosError(_error) && _error.response) {
            return _error.response;
        } else {
            throw _error;
        }
    }).then((_response: AxiosResponse) => {
        return processNumber(_response);
    });
}

function processNumber(response: AxiosResponse): Promise<{ [key: string]: number[]; }> {
    const status = response.status;
    let _headers: any = {};
    if (response.headers && typeof response.headers === "object") {
        for (let k in response.headers) {
            if (response.headers.hasOwnProperty(k)) {
                _headers[k] = response.headers[k];
            }
        }
    }
    if (status === 200) {
        const _responseText = response.data;
        let result200: any = null;
        let resultData200  = _responseText;
        result200 = resultData200;
        return Promise.resolve<{ [key: string]: number[]; }>(result200);

    } else if (status !== 200 && status !== 204) {
        const _responseText = response.data;
        return throwException("An unexpected server error occurred.", status, _responseText, _headers);
    }
    return Promise.resolve<{ [key: string]: number[]; }>(null as any);
}

export function boolean_(config?: AxiosRequestConfig | undefined): Promise<{ [key: string]: boolean[]; }> {
    let url_ = getBaseUrl() + "/dictionary-array/Bool";
      url_ = url_.replace(/[?&]$/, "");

    let options_: AxiosRequestConfig = {
        ..._requestConfigBoolean,
        ...config,
        method: "GET",
        url: url_,
        headers: {
            "Accept": "application/json"
        }
    };

    return getAxios().request(options_).catch((_error: any) => {
        if (isAxiosError(_error) && _error.response) {
            return _error.response;
        } else {
            throw _error;
        }
    }).then((_response: AxiosResponse) => {
        return processBoolean(_response);
    });
}

function processBoolean(response: AxiosResponse): Promise<{ [key: string]: boolean[]; }> {
    const status = response.status;
    let _headers: any = {};
    if (response.headers && typeof response.headers === "object") {
        for (let k in response.headers) {
            if (response.headers.hasOwnProperty(k)) {
                _headers[k] = response.headers[k];
            }
        }
    }
    if (status === 200) {
        const _responseText = response.data;
        let result200: any = null;
        let resultData200  = _responseText;
        result200 = resultData200;
        return Promise.resolve<{ [key: string]: boolean[]; }>(result200);

    } else if (status !== 200 && status !== 204) {
        const _responseText = response.data;
        return throwException("An unexpected server error occurred.", status, _responseText, _headers);
    }
    return Promise.resolve<{ [key: string]: boolean[]; }>(null as any);
}

export function dateOnly(config?: AxiosRequestConfig | undefined): Promise<{ [key: string]: Date[]; }> {
    let url_ = getBaseUrl() + "/dictionary-array/DateOnly";
      url_ = url_.replace(/[?&]$/, "");

    let options_: AxiosRequestConfig = {
        ..._requestConfigDateOnly,
        ...config,
        method: "GET",
        url: url_,
        headers: {
            "Accept": "application/json"
        }
    };

    return getAxios().request(options_).catch((_error: any) => {
        if (isAxiosError(_error) && _error.response) {
            return _error.response;
        } else {
            throw _error;
        }
    }).then((_response: AxiosResponse) => {
        return processDateOnly(_response);
    });
}

function processDateOnly(response: AxiosResponse): Promise<{ [key: string]: Date[]; }> {
    const status = response.status;
    let _headers: any = {};
    if (response.headers && typeof response.headers === "object") {
        for (let k in response.headers) {
            if (response.headers.hasOwnProperty(k)) {
                _headers[k] = response.headers[k];
            }
        }
    }
    if (status === 200) {
        const _responseText = response.data;
        let result200: any = null;
        let resultData200  = _responseText;
        result200 = resultData200;
        return Promise.resolve<{ [key: string]: Date[]; }>(result200);

    } else if (status !== 200 && status !== 204) {
        const _responseText = response.data;
        return throwException("An unexpected server error occurred.", status, _responseText, _headers);
    }
    return Promise.resolve<{ [key: string]: Date[]; }>(null as any);
}

export function dateTime(config?: AxiosRequestConfig | undefined): Promise<{ [key: string]: Date[]; }> {
    let url_ = getBaseUrl() + "/dictionary-array/DateTime";
      url_ = url_.replace(/[?&]$/, "");

    let options_: AxiosRequestConfig = {
        ..._requestConfigDateTime,
        ...config,
        method: "GET",
        url: url_,
        headers: {
            "Accept": "application/json"
        }
    };

    return getAxios().request(options_).catch((_error: any) => {
        if (isAxiosError(_error) && _error.response) {
            return _error.response;
        } else {
            throw _error;
        }
    }).then((_response: AxiosResponse) => {
        return processDateTime(_response);
    });
}

function processDateTime(response: AxiosResponse): Promise<{ [key: string]: Date[]; }> {
    const status = response.status;
    let _headers: any = {};
    if (response.headers && typeof response.headers === "object") {
        for (let k in response.headers) {
            if (response.headers.hasOwnProperty(k)) {
                _headers[k] = response.headers[k];
            }
        }
    }
    if (status === 200) {
        const _responseText = response.data;
        let result200: any = null;
        let resultData200  = _responseText;
        result200 = resultData200;
        return Promise.resolve<{ [key: string]: Date[]; }>(result200);

    } else if (status !== 200 && status !== 204) {
        const _responseText = response.data;
        return throwException("An unexpected server error occurred.", status, _responseText, _headers);
    }
    return Promise.resolve<{ [key: string]: Date[]; }>(null as any);
}

export function dummyDto(config?: AxiosRequestConfig | undefined): Promise<{ [key: string]: Types.DummyDto[]; }> {
    let url_ = getBaseUrl() + "/dictionary-array/Dummy";
      url_ = url_.replace(/[?&]$/, "");

    let options_: AxiosRequestConfig = {
        ..._requestConfigDummyDto,
        ...config,
        method: "GET",
        url: url_,
        headers: {
            "Accept": "application/json"
        }
    };

    return getAxios().request(options_).catch((_error: any) => {
        if (isAxiosError(_error) && _error.response) {
            return _error.response;
        } else {
            throw _error;
        }
    }).then((_response: AxiosResponse) => {
        return processDummyDto(_response);
    });
}

function processDummyDto(response: AxiosResponse): Promise<{ [key: string]: Types.DummyDto[]; }> {
    const status = response.status;
    let _headers: any = {};
    if (response.headers && typeof response.headers === "object") {
        for (let k in response.headers) {
            if (response.headers.hasOwnProperty(k)) {
                _headers[k] = response.headers[k];
            }
        }
    }
    if (status === 200) {
        const _responseText = response.data;
        let result200: any = null;
        let resultData200  = _responseText;
        if (resultData200) {
            for (let key in resultData200) {
                    (<any>result200)![key] = resultData200[key] ? resultData200[key].map((i: any) => Types.deserializeDummyDto(i)) : null;
            }
        }
        return Promise.resolve<{ [key: string]: Types.DummyDto[]; }>(result200);

    } else if (status !== 200 && status !== 204) {
        const _responseText = response.data;
        return throwException("An unexpected server error occurred.", status, _responseText, _headers);
    }
    return Promise.resolve<{ [key: string]: Types.DummyDto[]; }>(null as any);
}
let _requestConfigString: Partial<AxiosRequestConfig> | null;
export function getStringRequestConfig() {
  return _requestConfigString;
}
export function setStringRequestConfig(value: Partial<AxiosRequestConfig>) {
  _requestConfigString = value;
}
export function patchStringRequestConfig(patch: (value: Partial<AxiosRequestConfig>) => Partial<AxiosRequestConfig>) {
  _requestConfigString = patch(_requestConfigString ?? {});
}

let _requestConfigNumber: Partial<AxiosRequestConfig> | null;
export function getNumberRequestConfig() {
  return _requestConfigNumber;
}
export function setNumberRequestConfig(value: Partial<AxiosRequestConfig>) {
  _requestConfigNumber = value;
}
export function patchNumberRequestConfig(patch: (value: Partial<AxiosRequestConfig>) => Partial<AxiosRequestConfig>) {
  _requestConfigNumber = patch(_requestConfigNumber ?? {});
}

let _requestConfigBoolean: Partial<AxiosRequestConfig> | null;
export function getBooleanRequestConfig() {
  return _requestConfigBoolean;
}
export function setBooleanRequestConfig(value: Partial<AxiosRequestConfig>) {
  _requestConfigBoolean = value;
}
export function patchBooleanRequestConfig(patch: (value: Partial<AxiosRequestConfig>) => Partial<AxiosRequestConfig>) {
  _requestConfigBoolean = patch(_requestConfigBoolean ?? {});
}

let _requestConfigDateOnly: Partial<AxiosRequestConfig> | null;
export function getDateOnlyRequestConfig() {
  return _requestConfigDateOnly;
}
export function setDateOnlyRequestConfig(value: Partial<AxiosRequestConfig>) {
  _requestConfigDateOnly = value;
}
export function patchDateOnlyRequestConfig(patch: (value: Partial<AxiosRequestConfig>) => Partial<AxiosRequestConfig>) {
  _requestConfigDateOnly = patch(_requestConfigDateOnly ?? {});
}

let _requestConfigDateTime: Partial<AxiosRequestConfig> | null;
export function getDateTimeRequestConfig() {
  return _requestConfigDateTime;
}
export function setDateTimeRequestConfig(value: Partial<AxiosRequestConfig>) {
  _requestConfigDateTime = value;
}
export function patchDateTimeRequestConfig(patch: (value: Partial<AxiosRequestConfig>) => Partial<AxiosRequestConfig>) {
  _requestConfigDateTime = patch(_requestConfigDateTime ?? {});
}

let _requestConfigDummyDto: Partial<AxiosRequestConfig> | null;
export function getDummyDtoRequestConfig() {
  return _requestConfigDummyDto;
}
export function setDummyDtoRequestConfig(value: Partial<AxiosRequestConfig>) {
  _requestConfigDummyDto = value;
}
export function patchDummyDtoRequestConfig(patch: (value: Partial<AxiosRequestConfig>) => Partial<AxiosRequestConfig>) {
  _requestConfigDummyDto = patch(_requestConfigDummyDto ?? {});
}