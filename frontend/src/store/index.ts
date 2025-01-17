// import {create} from 'zustand';

// import { createAuthSlice } from './slices/auth-slice';

// export const userStore = create()((...a)) => ({
//     ...createAuthSlice(...a),
// })

import { create } from "zustand";
import { StoreApi } from "zustand";
import { createAuthSlice } from "./slices/auth-slice";
import { createChatSlice } from "./slices/chat-slice";

// type StoreState = ReturnType<typeof createAuthSlice>;
// type ChatState = ReturnType<typeof createChatSlice>;
type AppState = ReturnType<typeof createAuthSlice> &
  ReturnType<typeof createChatSlice>;

export const useAppStore = create<AppState>(
  (set, get, store: StoreApi<AppState>) => ({
    ...createAuthSlice(set, get, store),
    ...createChatSlice(set, get, store),
  })
);

// export const useAppStore = create<StoreState>(
//   (set, get, store: StoreApi<StoreState>) => ({
//     ...createAuthSlice(set, get, store),
//   })
// );
// export const useChatStore = create<ChatState>(
//   (set, get, store: StoreApi<ChatState>) => ({
//     ...createChatSlice(set, get, store),
//   })
// );

