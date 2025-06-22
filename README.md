# use-query-state

## A simple React hook for managing and updating URL query parameters with React Router!

### Features

#### Set, update, delete, and read query parameters easily

#### Designed for use with React Router(useSearchParams)

#### Written in modern JavaScript,TS Supports

#### Installation

#### First, make sure you have react-router-dom v6+ installed in your project:

`npm install react-router-dom`

#### Then install this package:

` npm install use-query-state`

#### Usage

`import React from "react";`

`import useQueryState from "use-query-state";`

```js const MyComponent = () => {
const {
searchParams,
urlSearchParams,
setQuery,
updateQuery,
deleteQuery,
deleteQueries,
getQuery,
hasQuery,
getAllQueries,
} = useQueryState();

// Example: Set query param foo=bar
const handleSetQuery = () => {
setQuery({ foo: "bar" });
};

// Example: Update/add param baz=qux
const handleUpdateQuery = () => {
updateQuery({ baz: "qux" });
};

// Example: Get value of param foo
const fooValue = getQuery({ key: "foo", defaultValue: "not set" });

// Example: Check if param baz exists
const hasBaz = hasQuery("baz");

// Example: Remove param foo
const handleRemoveFoo = () => {
deleteQuery("foo");
};

// Example: Clear all query params
const handleClearAll = () => {
deleteQueries();
};

return (
<div>
<button onClick={handleSetQuery}>Set foo=bar</button>
<button onClick={handleUpdateQuery}>Update baz=qux</button>
<button onClick={handleRemoveFoo}>Remove foo</button>
<button onClick={handleClearAll}>Clear All</button>
<div>foo: {fooValue}</div>
<div>baz exists? {hasBaz ? "Yes" : "No"}</div>
<div>
All query params: <pre>{JSON.stringify(getAllQueries(), null, 2)}</pre>
</div>
</div>
);
};

export default MyComponent;
```

#### API

#### useQueryState() returns the following:

#### Function Description

- setQuery(params, options) Replace all query params with params (object).
- updateQuery(newParams, options) Merge new params into existing ones.
- deleteQuery(paramKey, options) Remove a specific query parameter.
- deleteQueries(paramKeys, options) Remove multiple query parameters; if paramKeys empty, remove all.
- getQuery({ key, defaultValue }) Retrieve a query param value with optional default.
- hasQuery(key) Returns true if the given parameter exists.
- getAllQueries() Returns all query params as an object.
- searchParams & urlSearchParams The raw URLSearchParams instance(s) for advanced use-cases.

##### All functions accept an optional options object with { replace: boolean }

##### Use replace: true to replace instead of push in browser history.

##### Requirements

##### React Router v6+ (uses useSearchParams hook)

##### React 17 or 18

License
MIT

#### Enjoy easy query parameter management in your React projects!

#### Let me know if you need adjustments or additional info!
