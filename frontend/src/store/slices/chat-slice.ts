import { StateCreator } from "zustand";

interface ChatState {
  selectedChatType: string | undefined;
  selectedChatData: any | undefined; 
  selectedChatMessages: any[]; 
  setSelectedChatType: (selectedChatType: string | undefined) => void;
  setSelectedChatData: (selectedChatData: any | undefined) => void; 
  setSelectedChatMessages: (selectedChatMessages: any[]) => void; 
  closeChat: () => void;
}

export const createChatSlice: StateCreator<ChatState> = (set) => ({
  selectedChatType: undefined,
  selectedChatData: undefined,
  selectedChatMessages: [],
  setSelectedChatType: (selectedChatType) => set({ selectedChatType }),
  setSelectedChatData: (selectedChatData) => set({ selectedChatData }),
  setSelectedChatMessages: (selectedChatMessages) =>
    set({ selectedChatMessages }),
  closeChat: () =>
    set({
      selectedChatData: undefined,
      selectedChatType: undefined,
      selectedChatMessages: [],
    }),
});

// export const createChatSlice = (set, get) => ({
//   selectedChatType: undefined,
//   selectedChatData: undefined,
//   selectedChatMessages: [],
//   setSelectedChatType: (selectedChatType) => set({ selectedChatType }),
//   setSelectedChatData: (selectedChatData) => set({ selectedChatData }),
//   setSelectedChatMessages: (selectedChatMessages) =>
//     set({ selectedChatMessages }),
//   closeChat: () =>
//     set({
//       selectedChatData: undefined,
//       selectedChatType: undefined,
//       selectedChatMessages: [],
//     }),
// });
