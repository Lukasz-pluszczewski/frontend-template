import { ZodType } from 'zod';
import axios, { AxiosRequestConfig } from 'axios';
import { useMutation, useQueryClient, UseMutationOptions } from '@tanstack/react-query';

import { config } from '../../config';

export const useCustomMutation = <TVariables, TData = unknown, TError = unknown, TContext = unknown>(
  getConfig: (data: TVariables) => AxiosRequestConfig,
  schema?: ZodType<TVariables> | null,
  options?: Omit<
    UseMutationOptions<TData, TError, TVariables, TContext>,
    'mutationFn'
  > & { invalidateKeys?: string[],  },
) => {
  const queryClient = useQueryClient();
  const { invalidateKeys, ...useMutationOptions } = options || {};

  return useMutation<TData, TError, TVariables, TContext>(
    async (rawData: TVariables) => {
      const data = schema ? await schema.parseAsync(rawData) : rawData;
      const axiosParams = getConfig(data);

      const { data: responseData } = await axios({
        baseURL: config.apiUrl,
        ...axiosParams,
      });

      return responseData;
    },
    {
      ...useMutationOptions,
      onSuccess: (...args) => {
        if (options?.onSuccess) {
          options.onSuccess(...args);
        }
        options?.invalidateKeys?.forEach((key) => {
          queryClient.invalidateQueries({ queryKey: [key] });
        });
      },
    }
  )
};
