import z from 'zod';
import axios from 'axios';

const configSchema = z.object({
  apiUrl: z.string().min(1, 'VITE_API_URL env is required'),
});

export const config: z.infer<typeof configSchema> = {
  // @ts-ignore
  apiUrl: import.meta.env.VITE_API_URL,
};

export const loadConfig = async () => {
  if (config.apiUrl) {
    configSchema.parse(config);
    return;
  }
  const { data: loadedConfig } = await axios.get('/config.json');
  const parsedConfig = configSchema.parse(loadedConfig);
  (Object.keys(parsedConfig) as (keyof z.infer<typeof configSchema>)[]).forEach((key) => {
    config[key] = parsedConfig[key];
  });
};
