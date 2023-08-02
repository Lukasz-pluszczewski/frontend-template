import z from 'zod';

import { QUERY_KEYS } from '../queries';
import { useCustomMutation } from './index';

export const exampleSchema = z.object({
  foo: z.string().min(1, 'Foo is required'),
});
export const useExampleMutation = () =>
  useCustomMutation(
    (example) => ({ url: '/example', method: 'POST', data: example }),
    exampleSchema,
    {
      invalidateKeys: [QUERY_KEYS.EXAMPLE],
    }
  );
