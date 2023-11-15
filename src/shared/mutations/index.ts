import { ZodType } from 'zod';
import axios, { AxiosRequestConfig } from 'axios';
import { useMutation, useQueryClient, UseMutationOptions } from '@tanstack/react-query';

import { config } from '../../config';

export const useCustomMutation = <TVariables, TData = unknown, TError = unknown, TContext = unknown>(
  getConfig: (data: TVariables) => AxiosRequestConfig,
  mutationParamsSchema?: ZodType<TVariables> | null,
  options?: Omit<
    UseMutationOptions<TData, TError, TVariables, TContext>,
    'mutationFn'
  > & { invalidateKeys?: string[], responseSchema?: ZodType<TData> },
) => {
  const queryClient = useQueryClient();
  const { invalidateKeys, ...useMutationOptions } = options || {};

  return useMutation<TData, TError, TVariables, TContext>(
    async (rawData: TVariables) => {
      const data = mutationParamsSchema ? await mutationParamsSchema.parseAsync(rawData) : rawData;
      const axiosParams = getConfig(data);

      const { data: responseData } = await axios({
        baseURL: config.apiUrl,
        ...axiosParams,
      });

      return options?.responseSchema
        ? options.responseSchema.parseAsync(responseData)
        : responseData;
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
