import z from 'zod';
import { QUERY_KEYS, useCustomQuery } from './index';

export const exampleSchema = z.object({
  foo: z.string(),
});
export const useExample = (enabled = true) =>
  useCustomQuery(
    [QUERY_KEYS.EXAMPLE],
    {
      url: '/example',
      method: 'GET',
    },
    exampleSchema,
    {
      placeholderData: {
        foo: 'bar'
      },
      enabled,
    }
  )
