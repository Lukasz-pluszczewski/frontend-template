import z, { ZodError } from 'zod';
import axios, { AxiosError } from 'axios';

const configSchema = z.object({
  apiUrl: z.string().min(1, 'VITE_API_URL env is required'),
});

export const config: z.infer<typeof configSchema> = {
  // @ts-ignore
  apiUrl: import.meta.env.VITE_API_URL,
};

const loadConfigFromViteEnvs = async () => {
  return configSchema.safeParse(config);
};

const loadConfigFromConfigJson = async () => {
  try {
    const { data: loadedConfig } = await axios.get('/config.json');
    const parsedConfig = configSchema.safeParse(loadedConfig);
    if (!parsedConfig.success) {
      return parsedConfig;
    }

    (Object.keys(parsedConfig.data) as (keyof z.infer<typeof configSchema>)[]).forEach((key) => {
      config[key] = parsedConfig.data[key];
    });

    return parsedConfig;
  } catch (error: any) {
    return { success: false, error };
  }
};

export const loadConfig = async () => {
  const viteEnvsResult = await loadConfigFromViteEnvs();

  if (viteEnvsResult.success) {
    console.log('Loaded config from VITE envs', config);
    return;
  }

  const configJsonResult = await loadConfigFromConfigJson();

  if (configJsonResult.success) {
    console.log('Loaded config from config.json', config);
    return;
  }

  // suggestions regarding the error
  if (configJsonResult.error instanceof ZodError) {
    console.error('Config loaded from config.json failed validation');
    throw configJsonResult.error;
  }
  if (configJsonResult.error instanceof AxiosError) {
    console.error('Config from VITE envs failed validation and config.json could not be loaded for the following reason:', configJsonResult.error);
    throw viteEnvsResult.error;
  }
};
