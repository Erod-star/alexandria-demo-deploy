import { combineReducers, configureStore } from '@reduxjs/toolkit';
import reducers from './reducers';

export const store = configureStore({
  reducer: {
    ...reducers,
  },
});

const rootReducer = combineReducers({
  ...reducers,
});

export function setupStore(preloadedState?: Partial<RootState>) {
  return configureStore({
    reducer: rootReducer,
    preloadedState,
  });
}

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
