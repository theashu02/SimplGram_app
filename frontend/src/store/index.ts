// import {create} from 'zustand';

// import { createAuthSlice } from './slices/auth-slice';

// export const userStore = create()((...a)) => ({
//     ...createAuthSlice(...a),
// })

import { create } from "zustand";
import { StoreApi } from "zustand";
import { createAuthSlice } from "./slices/auth-slice";

// Define the type for the store state
type StoreState = ReturnType<typeof createAuthSlice>;

export const useAppStore = create<StoreState>(
  (set, get, store: StoreApi<StoreState>) => ({
    ...createAuthSlice(set, get, store),
  })
);

