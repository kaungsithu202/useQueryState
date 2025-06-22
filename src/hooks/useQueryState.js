import { useSearchParams } from "react-router";

const useQueryState = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const urlSearchParams = new URLSearchParams(searchParams);

  // Replaces all existing params with new ones
  const setQuery = (params, options = {}) => {
    const { replace = false } = options;
    const newParams = new URLSearchParams();

    Object.entries(params).forEach(([key, value]) => {
      if (value !== null && value !== undefined) {
        newParams.set(key, String(value));
      }
    });

    setSearchParams(newParams, { replace });
  };

  // Merges new params with existing ones
  const updateQuery = (newParams, options = {}) => {
    const { replace = false } = options;

    setSearchParams(
      (prev) => {
        const updatedParams = new URLSearchParams(prev);

        Object.entries(newParams).forEach(([key, value]) => {
          if (value === null || value === undefined) {
            updatedParams.delete(key);
          } else {
            updatedParams.set(key, String(value));
          }
        });

        return updatedParams;
      },
      { replace }
    );
  };

  // Delete a specific query parameter
  const deleteQuery = (paramKey, options = {}) => {
    const { replace = false } = options;

    setSearchParams(
      (prev) => {
        const updatedParams = new URLSearchParams(prev);
        updatedParams.delete(paramKey);
        return updatedParams;
      },
      { replace }
    );
  };

  // Delete multiple query parameters
  const deleteQueries = (paramKeys = [], options = {}) => {
    const { replace = false } = options;

    setSearchParams(
      (prev) => {
        if (paramKeys.length === 0) {
          // Delete all queries
          return new URLSearchParams();
        } else {
          // Delete specific queries
          const updatedParams = new URLSearchParams(prev);
          paramKeys.forEach((key) => updatedParams.delete(key));
          return updatedParams;
        }
      },
      { replace }
    );
  };

  // Get a specific query parameter value with default fallback
  const getQuery = ({ key, defaultValue = "" }) => {
    const value = searchParams.get(key) ?? defaultValue;
    return value;
  };

  // Check if a query parameter exists
  const hasQuery = (key) => {
    return searchParams.has(key);
  };

  // Get all query parameters as an object
  const getAllQueries = () => {
    const queries = {};
    searchParams.forEach((value, key) => {
      queries[key] = value;
    });
    return queries;
  };

  return {
    searchParams,
    urlSearchParams,
    setQuery,
    updateQuery,
    deleteQuery,
    deleteQueries,
    getQuery,
    hasQuery,
    getAllQueries,
  };
};

export default useQueryState;
