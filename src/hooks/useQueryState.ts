import { useSearchParams } from "react-router";

type QueryValue = string | number | boolean | null | undefined;

type QueryParams = Record<string, QueryValue>;

interface NavigationOptions {
  replace?: boolean;
}

interface GetQueryOptions {
  key: string;
  defaultValue?: string;
}

interface UseQueryParamsReturn {
  searchParams: URLSearchParams;
  urlSearchParams: URLSearchParams;
  setQuery: (params: QueryParams, options?: NavigationOptions) => void;
  updateQuery: (newParams: QueryParams, options?: NavigationOptions) => void;
  deleteQuery: (paramKey: string, options?: NavigationOptions) => void;
  deleteQueries: (paramKeys?: string[], options?: NavigationOptions) => void;
  getQuery: (options: GetQueryOptions) => string;
  hasQuery: (key: string) => boolean;
  getAllQueries: () => Record<string, string>;
}

const useQueryState = (): UseQueryParamsReturn => {
  const [searchParams, setSearchParams] = useSearchParams();

  const urlSearchParams = new URLSearchParams(searchParams);

  /**
   * @param params => setQuery({ [key]: value })
   * Replaces all existing params with new ones
   */

  const setQuery = (params: QueryParams, options: NavigationOptions = {}) => {
    const { replace = false } = options;
    const newParams = new URLSearchParams();

    Object.entries(params).forEach(([key, value]) => {
      if (value !== null && value !== undefined) {
        newParams.set(key, String(value));
      }
    });

    setSearchParams(newParams, { replace });
  };

  /**
   * @param newParams => updateQuery({ [key]: value })
   * Merges new params with existing ones
   */
  const updateQuery = (
    newParams: QueryParams,
    options: NavigationOptions = {}
  ) => {
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

  /**
   * Delete a specific query parameter
   */
  const deleteQuery = (paramKey: string, options: NavigationOptions = {}) => {
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

  /**
   * Delete multiple query parameters
   */
  const deleteQueries = (
    paramKeys: string[] = [],
    options: NavigationOptions = {}
  ) => {
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

  /**
   * Get a specific query parameter value with default fallback
   */
  const getQuery = ({ key, defaultValue = "" }: GetQueryOptions): string => {
    const value = searchParams.get(key) ?? defaultValue;
    return value;
  };

  /**
   * Check if a query parameter exists
   */
  const hasQuery = (key: string): boolean => {
    return searchParams.has(key);
  };

  /**
   * Get all query parameters as an object
   */
  const getAllQueries = (): Record<string, string> => {
    const queries: Record<string, string> = {};
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
