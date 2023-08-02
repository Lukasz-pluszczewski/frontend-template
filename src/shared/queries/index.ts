import axios, { AxiosRequestConfig } from 'axios';
import { QueryKey, useQuery, UseQueryOptions } from '@tanstack/react-query';
import { ZodType } from 'zod';

import { config } from '../../config';

const defaultOptions = {
  refetchOnWindowFocus: false,
  staleTime: 2 * 60 * 1000, // 2 minutes
}
export const useCustomQuery = <TQueryFnData = unknown, TError = unknown, TData = TQueryFnData, TQueryKey extends QueryKey = QueryKey>(
  key: TQueryKey,
  axiosParams: AxiosRequestConfig,
  schema?: ZodType<TQueryFnData> | null,
  options: Omit<UseQueryOptions<TQueryFnData, TError, TData, TQueryKey>, 'queryKey' | 'queryFn'> = {}
) => {
  return useQuery(
    key,
    async () => {
      const { data } = await axios({
        baseURL: config.apiUrl,
        ...axiosParams,
      });
      if (!schema) {
        return data;
      }
      return schema.parseAsync(data);
    },
    {
      ...defaultOptions,
      ...options,
    }
  );
}

export const QUERY_KEYS = {
  EXAMPLE: 'example',
};

