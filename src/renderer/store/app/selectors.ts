import { RootState } from 'renderer/store';

export const selectAppInitialized = (state: RootState) =>
  state.appState.initialized;

export const selectAppSidebar = (state: RootState) => state.appState.sidebar;
