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

export function getAnswers(tags?: { [key: string]: string; } | undefined, config?: AxiosRequestConfig | undefined): Promise<any> {
    let url_ = getBaseUrl() + "/api/v1/Answers?";
    if (tags === null)
        throw new Error("The parameter 'tags' cannot be null.");
    else if (tags !== undefined)
    {
        const content_ = JSON.stringify(tags);
        url_ += "Tags=" + encodeURIComponent(content_) + "&";
    }
      url_ = url_.replace(/[?&]$/, "");

    let options_: AxiosRequestConfig = {
        ..._requestConfigGetAnswers,
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
        return processGetAnswers(_response);
    });
}

function processGetAnswers(response: AxiosResponse): Promise<any> {
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
    
        return Promise.resolve<any>(result200);

    } else if (status !== 200 && status !== 204) {
        const _responseText = response.data;
        return throwException("An unexpected server error occurred.", status, _responseText, _headers);
    }
    return Promise.resolve<any>(null as any);
}
let _requestConfigGetAnswers: Partial<AxiosRequestConfig> | null;
export function getGetAnswersRequestConfig() {
  return _requestConfigGetAnswers;
}
export function setGetAnswersRequestConfig(value: Partial<AxiosRequestConfig>) {
  _requestConfigGetAnswers = value;
}
export function patchGetAnswersRequestConfig(patch: (value: Partial<AxiosRequestConfig>) => Partial<AxiosRequestConfig>) {
  _requestConfigGetAnswers = patch(_requestConfigGetAnswers ?? {});
}