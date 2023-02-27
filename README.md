# react-query-swagger

[![npm version](https://badge.fury.io/js/react-query-swagger.svg)](https://www.npmjs.org/package/react-query-swagger) [![npm](https://img.shields.io/npm/dt/react-query-swagger.svg)](https://www.npmjs.org/package/react-query-swagger) [![MIT](https://img.shields.io/dub/l/vibe-d.svg)](https://opensource.org/licenses/MIT) ![Types - TypeScript](https://img.shields.io/npm/types/typescript?style=flat)

This projects autogenerates [@tanstack/query](https://tanstack.com/query) hooks or strongly-typed axios/fetch clients based on Swagger API definitions.

**Main features**

- Support for DateTime and Date (i.e. you get JS `Date` objects from HTTP client calls)
- Everything is treeshakable

So, given that you have a [petstore-like API definition](https://petstore.swagger.io/), you could autogenerate a list of [react-query hooks](https://github.com/Shaddix/nswag-react-query/blob/master/examples/pet-client/src/api/axios-client.ts#L1151), to call GET methods from the API (queries). or POST/PUT/PATCH/DELETE methods (mutations).

You could also use this library if you want to generate nice tree-shakable HTTP clients for your Swagger API definition (we use [NSwag](https://github.com/RicoSuter/NSwag) under the hood).

## How to add

Install the package into your project using yarn/npm (as a dev-dependency). You'll also need to add @tanstack/query (which you probably already have if you are interested in this library).

```
yarn add react-query-swagger
```

Then create/update your autogenerated hooks by calling (adjusting the URL and output path)

```
yarn react-query-swagger /tanstack /input:https://petstore.swagger.io/v2/swagger.json /output:src/api/axios-client.ts /template:Axios
```

### Other frameworks

- [react-query v3](https://www.npmjs.com/package/react-query): please REMOVE a `/tanstack` switch from all commands
- [Vue](https://www.npmjs.com/package/@tanstack/vue-query): please replace a `/tanstack` switch with `/vue`
- [Solid](https://www.npmjs.com/package/@tanstack/solid-query): COMING SOON. Please +1 in the [feature request](https://github.com/Shaddix/react-query-swagger/issues/13) if you want it to be available.

\***\*Note that this library requires [dotnet runtime](https://dotnet.microsoft.com/download/dotnet/6.0) installed on your machine! If you have runtime different from .NET Core 6, please add a [switch](https://github.com/RicoSuter/NSwag/tree/master/src/NSwag.Npm#change-runtime) (e.g. `/runtime:Net50`) to all commands.\*\***

This will generate API clients based on Axios. If you prefer `fetch`, just use it as a template (mind the last parameter)

```
yarn react-query-swagger /input:https://petstore.swagger.io/v2/swagger.json /output:src/api/axios-client.ts /template:Fetch
```

You will probably want to add this script to your package.json to call it every time your API changes.

All parameters are passed to NSwag, you could read about them [in NSwag documentation](https://github.com/RicoSuter/NJsonSchema/wiki/TypeScriptGeneratorSettings). Personally I tend to use it with [few additional parameters](#use-recommended-configuration), which are combined under `/use-recommended-configuration`:

```
yarn react-query-swagger /tanstack /input:https://petstore.swagger.io/v2/swagger.json /output:src/api/axios-client.ts /template:Axios /serviceHost:. /use-recommended-configuration
```

## How to use

You could check a [pet-client example](https://github.com/Shaddix/react-query-swagger/tree/master/examples/pet-client), which shows the list of pets. It's a standard react-query setup, to query some pet data you just need to write:

```ts
const petsQuery = ClientQuery.useFindPetsByStatusQuery([
  Status.Available,
  Status.Pending,
  Status.Sold,
]);
// then just use usual query properties
console.log('isLoading', petsQuery.petsQuery.data?.length);
```

to perform some mutation you could call

```ts
const addPetMutation = ClientQuery.useAddPetMutation();
// and later when submitting the form
addPetMutation.mutate(new Pet({ name: 'blablabla', photoUrls: [] }));
```

### Pass AxiosRequestConfig to a query (for axios users)

You could pass `AxiosRequestConfig` parameters for each request via the last parameter of `useQuery`. E.g.:

```ts
const petsQuery = ClientQuery.useFindPetsByStatusQuery(
  [Status.Available, Status.Pending, Status.Sold],
  queryParams,
  { timeout: 1000 } /** this param accepts AxiosRequestConfig **/,
);
```

## Configuration

##### setBaseUrl(baseUrl: string)

Sets base URL for all queries

##### setAxiosFactory(factory: () => AxiosInstance)

Sets the function which returns Axios instance to be used in http request. By default `axios.create()` is called for every http request (this method only exists if you generated client using Axios template).

##### setFetchFactory(factory: () => { fetch(url: RequestInfo, init?: RequestInit): Promise<Response> })

Sets the function to return the `fetch`function to be used in http request. By default `window` is returned, which contains the default `fetch` function. This method only exists if you used Fetch template.

### Configure query options

You could define additional `UseQueryOptions` for each query by calling `set*QueryName*DefaultOptions`

```
AxiosQuery.ClientQuery.setFindPetsByStatusDefaultOptions({
  cacheTime: 10000
});
```

### Configure global Axios options

If you use Axios, you could adjust AxiosRequestConfig per endpoint by using `set*QueryName*RequestConfig`

```
AxiosQuery.ClientQuery.setFindPetsByStatusRequestConfig({
  timeout: 10000
});
```

`get*QueryName*RequestConfig` and `patch*QueryName*RequestConfig` are also available.

### persistQueryClient support

React-query has an experimental support for persisting and restoring query cache (to preserve the cache between e.g. browser restarts). `react-query-swagger` requires additional configuration to correctly work with hydration (cache restoration) because of:

1. All internal DTOs are JS classes, which are not recreated by `JSON.parse` (which is used by persisters by default).
2. `react-query-swagger` has Date objects in DTOs, which are not restored by `JSON.parse` as well.

So to make them work together correctly, you have to provide a special hydration function (which is autogenerated along with API clients) and call `initPersister`:

```ts
initPersister();
const localStoragePersister = createSyncStoragePersister({
  storage: window.localStorage,

  // You need to import `persisterDeserialize` function from your `api-client.ts` and specify it as a deserialize function.
  deserialize: persisterDeserialize,
});
```

For `useInfiniteQuery` the queryKey parameter should start with 2 same items as the underlying 'normal' query ([see details](https://github.com/Shaddix/react-query-swagger/issues/11#issuecomment-1356787807)).

### QueryMetaProvider

Injects `meta` option to all queries in children components. Might be useful if e.g. you want to refetch all queries in certain part of your app.

First wrap your component in `QueryMetaProvider` and specify your meta tags (make sure they are constant):

```
<QueryMetaProvider meta={headerMeta}>
    { /* Your app components (e.g. AppHeader */ }
</QueryMetaProvider>

const headerMeta = { region: 'header' }
```

You could refetch based on meta via the following call:

```
queryClient.refetchQueries({ predicate: (query) => ((query as any).observers as QueryObserver[]).find((observer) => observer.options.meta?.region === 'header') })
```

## Additional flags

In addition to [NSwag parameters](https://github.com/RicoSuter/NJsonSchema/wiki/TypeScriptGeneratorSettings) we have 4 specific parameters:

### /minimal

It generates `Interfaces` instead of Classes, which minimizes the bundle size (since Interfaces are stripped off during bundling).

This mode is experimental and is being tested at the moment.

### /modules

This flag helps in tree-shaking and code-splitting NSwag Clients.

By default NSwag generates http clients as Classes and puts all Classes in a single file. This prevents treeshaking, so even if you use a single method from class, whole class gets included in your bundle. Also since they are all in a single file, you can't code-split clients into chunks (all Clients will be loaded in a single chunk).

Now it's possible to fix it and generate NSwag Clients as functions (without Classes) splitted per file.

This comes with drawbacks, since some NSwag flags rely on Classes being used, so these options do not work with `/modules` flag. So if you use any of these, you won't be able to use the flag:

- /baseClass (since there are no classes anymore)
- /useGetBaseUrlMethod (since there is no base class)
- /useTransformOptionsMethod (since there's no base class to define TransformOptions in), this might be implemented in future
- /useTransformResultMethod (since there's no base class to define TransformOptions in), this might be implemented in future

You could use `setBaseUrl` and `setAxiosFactory`/`setFetchFactory` methods to configure the baseUrl and Axios/Fetch instances being used (which you previously configured via class constructors).

### /no-hooks

Use this flag to disable generating react-query hooks.

You might want this flag if you want to use [/modules](#modules), but you are not using react-query and don't need the generated hooks.

### /fix-null-undefined-serialization

This flag executes few regex replaces over the generated code. This is an easy way to achieve the behavior we want without forking and maintaining NSwag & NJsonSchema templates ourselves.

Here are the regex rules and rationale behind them:

- **| undefined;** is replaced by **| null;**

  Replaces DTO type definitions:

  ```
  export interface IUser {
     id?: number | undefined;   ->  id?: number | null;
  }
  ```

  Replace is made because this is what server (at least .NET :)) actually returns (at least by default)

- **: <any>undefined** is replaced by **: <any>null**

  Changes `init()` function from:

  ```
  this.lastChangeDateTime = _data["lastChangeDateTime"] ? new Date(_data["lastChangeDateTime"].toString()) : <any>undefined;
  ```

  to

  ```
  this.lastChangeDateTime = _data["lastChangeDateTime"] ? new Date(_data["lastChangeDateTime"].toString()) : <any>null;
  ```

  Again, server actually returns `null`, we don't want to change that.

- **? this.(...).toISOString() : <any>null** is replaced by **&& this.$1.toISOString()**

  Performs the following change (in `toJSON()` method), from:

  ```
  data["shipDate"] = this.shipDate ? this.shipDate.toISOString() : <any>null;
  ```

  to

  ```
  data["shipDate"] = this.shipDate && this.shipDate.toISOString();
  ```

  This is to be able to send both `undefined` and `null` to the server (important for PATCH requests)

- **? formatDate(...) : <any>null** is replaced by **&& formatDate(...)**

  Performs the following change (in `toJSON()` method), from:

  ```
  data["shipDate"] = this.shipDate ? formatDate(this.shipDate) : <any>null;
  ```

  to

  ```
  data["shipDate"] = this.shipDate && formatDate(this.shipDate);
  ```

  This is to be able to send both `undefined` and `null` to the server (important for PATCH requests)

### /use-recommended-configuration

This option basically passes the following parameters to NSwag `/fix-null-undefined-serialization /generateOptionalParameters:true /typeStyle:Class /markOptionalProperties:true /nullValue:undefined /generateConstructorInterface:true`.

Here's a rationale behind each of them:

- _/generateOptionalParameters:true_

  Otherwise, optional parameters are generated as mandatory. E.g.:

  - true: `deletePet(petId: number, api_key?: string | null | undefined)`
  - false: `deletePet(petId: number, api_key: string | null | undefined)` `

- _/typeStyle:Class_

  Otherwise, if `typeStyle` is `Inteface`, there's no code to convert `Date` objects

- _/markOptionalProperties:true_

  Otherwise PATCH dtos have all their properties defined as mandatory:

  ```
  export interface PatchUserDto {
      userName!: string | null;
      // should be: userName?: string | null;
  }
  ```

- _/nullValue:undefined_

  If we use `null` as null value, unnecessary code gets added to `.toJSON()` and `.init()` functions:

  ```
  toJSON(data?: any) {
      data = typeof data === 'object' ? data : {};

      // nullValue:undefined
      data["enabled"] = this.enabled;

      // nullValue:null
      data["enabled"] = this.enabled !== undefined ? this.enabled : <any>null;
  }
  ```

  ```
  init(_data?: any) {
     if (_data) {
         // nullValue:undefined
         this.enabled = _data["enabled"];

         // nullValue:null
         this.enabled = _data["enabled"] !== undefined ? _data["enabled"] : <any>null;
     }
  }
  ```

- _/generateConstructorInterface:true_

  This gives a typed-possibility to create classes from interfaces (otherwise you have to use `init(_data?: any)` method)

- _/fix-null-undefined-serialization_

  We need this to be able to use both `undefined` and `null` as values in PATCH requests

## Upgrading instructions

### From v14 to v15

There are some of breaking changes introduced in v15, because in v15 queries/mutations for each Controller is extracted into a separate file (and Classes are not used anymore).

1. Getting/Setting default query properties is now done via functions (not via properties like it was before). So, instead of using `AxiosQuery.Query.findPetsByStatusDefaultOptions` property you'd need to use `AxiosQuery.Query.getFindPetsByStatusDefaultOptions()` and `AxiosQuery.Query.setFindPetsByStatusDefaultOptions({/* options here */})`.
1. If you used `Client` property from the Query class to access POST/PUT methods (e.g. `QueryFactory.Query.Client.addPet(...)`), you'd be better off using `QueryFactory.Client` (together with `/clients-as-modules` flag), or `QueryFactory.Query.Client()` if you want to continue using Classes instead of Modules.
1. If your API actions clash with [JS reserved keywords](https://www.w3schools.com/js/js_reserved.asp) your action would have underscore appended to the name (e.g. `delete` will be named `delete_`). Also in V15 it's possible to alter NSwag Clients to use [plain functions instead of Classes](#clients-as-modules). It makes treeshaking work for your Clients, thus significantly reducing the bundle size if you use only a few API methods. Use either `/clients-as-modules` flag directly, or `/use-recommended-configuration` which includes it.

## How does it work

Under the cover it's just a couple of template files for [NSwag](https://github.com/RicoSuter/NSwag) and a small script to easily use them.

## Contributions and support

Issues and Pull Requests are welcome.

For any kind of private consulting or support you could contact [Artur Drobinskiy](https://github.com/Shaddix) directly via email.
