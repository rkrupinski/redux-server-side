import { State } from '@rss/state/src/types';

declare global {
  interface Window {
    __PRELOADED_STATE__: State;
  }
}
