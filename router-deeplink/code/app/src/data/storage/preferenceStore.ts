export type PreferenceStore = {
  get: () => boolean;
  set: (value: boolean) => void;
};

export function createPreferenceStore(adapter: PreferenceStore): PreferenceStore {
  return adapter;
}
