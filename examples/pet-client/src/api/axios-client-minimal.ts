import * as Types from './axios-client-minimal.types';
export * from './axios-client-minimal.types';

//----------------------
// <auto-generated>
//     Generated using the NSwag toolchain v13.20.0.0 (NJsonSchema v11.0.0.0 (Newtonsoft.Json v13.0.0.0)) (http://NSwag.org)
// </auto-generated>
//----------------------

/* tslint:disable */
/* eslint-disable */
// ReSharper disable InconsistentNaming

import type { AxiosError } from 'axios';
import type { AxiosInstance, AxiosRequestConfig, AxiosResponse, CancelToken } from 'axios';

export * as Client from './axios-client-minimal/Client';

export * as Query from './axios-client-minimal/Query';





import { addResultTypeFactory } from './axios-client-minimal/helpers';
export { setBaseUrl, getBaseUrl } from './axios-client-minimal/helpers';
export { setAxiosFactory, getAxios } from './axios-client-minimal/helpers';


//-----PersistorHydrator.File-----
import type { PersistedClient } from '@tanstack/react-query-persist-client';
import type { DehydratedState, QueryKey } from '@tanstack/react-query'
import { getResultTypeFactory } from './axios-client-minimal/helpers';

/*
 * If you have Dates in QueryKeys (i.e. in request parameters), you need to deserialize them to Dates correctly
 * (otherwise they are deserialized as strings by default, and your queries are broken).
 */
export function deserializeDate(str: unknown) {
  if (!str || typeof str !== 'string') return str;
  if (!/^\d\d\d\d\-\d\d\-\d\d/.test(str)) return str;
  
  const date = new Date(str);
  const isDate = date instanceof Date && !isNaN(date as any);
  
  return isDate ? date : str;
}

export function deserializeDatesInQueryKeys(queryKey: QueryKey) {
  return queryKey
    // We need to replace `null` with `undefined` in query key, because
    // `undefined` is serialized as `null`.
    // And most probably if we have `null` in QueryKey it actually means `undefined`.
    // We can't keep nulls, because they have a different meaning, and e.g. boolean parameters are not allowed to be null.
    .map(x => (x === null ? undefined : x))
    .map(x => deserializeDate(x));
}

export function deserializeClassesInQueryData(queryKey: QueryKey, data: any) {
  if (!data) {
    return data;
  } else if (typeof data !== 'object') {
    return data;
  } else if ('pages' in data && 'pageParams' in data && Array.isArray(data.pages) && Array.isArray(data.pageParams)) {
    // infinite query
    data.pages = data.pages.map((page:any) => deserializeClassesInQueryData(queryKey, page));
  } else if (Array.isArray(data)) {
    return data.map(elem => constructDtoClass(queryKey, elem));
  } else {
    return constructDtoClass(queryKey, data);
  }
}

/*
 * Pass this function as `deserialize` option to createSyncStoragePersister/createAsyncStoragePersister
 * to correctly deserialize your DTOs (including Dates)
 */
export function persisterDeserialize(cache: string): PersistedClient {
  const client: PersistedClient = JSON.parse(cache);
  client.clientState.queries.forEach((query) => {
    query.state.data = deserializeClassesInQueryData(query.queryKey, query.state.data);
    query.queryKey = deserializeDatesInQueryKeys(query.queryKey);
  });

  return client;
}

export function constructDtoClass(queryKey: QueryKey, data: any): unknown {
  const resultTypeKey = getResultTypeClassKey(queryKey);
  const constructorFunction = getResultTypeFactory(resultTypeKey);

  if (!data || !constructorFunction)
    return data;

  return constructorFunction(data);
}

export function getResultTypeClassKey(queryKey: QueryKey): string {
  if (!Array.isArray(queryKey)) {
    return queryKey as unknown as string;
  }
  if (queryKey.length >= 2) {
    // We concatenate first and second elements, because they uniquely identify the query.
    // All other QueryKey elements are query parameters
    return `${queryKey[0]}___${queryKey[1]}`;
  }

  // We actually should never reach this point :)
  return queryKey.join('___');
}

export function initPersister() {
  
  addResultTypeFactory('Client___findPetsByStatus', (data: any) => Types.initPet(data));
  addResultTypeFactory('Client___findPetsByTags', (data: any) => Types.initPet(data));
  addResultTypeFactory('Client___getPetById', (data: any) => Types.initPet(data));
  addResultTypeFactory('Client___getOrderById', (data: any) => Types.initOrder(data));
  addResultTypeFactory('Client___getUserByName', (data: any) => Types.initUser(data));


}
//-----/PersistorHydrator.File----