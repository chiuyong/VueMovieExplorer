/// <reference types="vite/client" />

/** Vue */
declare module '*.vue' {
  import { type defineComponent } from 'vue';
  const Component: ReturnType<typeof defineComponent>;
  export default Component;
}

/** Vuetify */
declare module 'vuetify/lib/framework' {
  import Vuetify from 'vuetify';
  export default Vuetify;
}

interface ImportMetaEnv {
  // see https://vitejs.dev/guide/env-and-mode.html#env-files
  // add .env variables.
  readonly VITE_OMDB_API_KEY: string;
  readonly VITE_BASE_URL: string;
}

// eslint-disable-next-line no-unused-vars
interface ImportMeta {
  readonly env: ImportMetaEnv;
}
