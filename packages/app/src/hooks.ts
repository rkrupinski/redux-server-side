import {
  TypedUseSelectorHook,
  useDispatch as _useDispatch,
  useSelector as _useSelector,
} from 'react-redux';

import { State } from '@rss/state/src/types';
import { Action, AsyncAction } from '@rss/state/src/actions';

export const useDispatch = () =>
  _useDispatch<{
    <T extends Action>(action: T): T;
    <T extends AsyncAction>(action: T): ReturnType<T>;
  }>();

export const useSelector: TypedUseSelectorHook<State> = _useSelector;
