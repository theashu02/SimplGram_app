import { StateCreator } from "zustand";

interface UserInfo {
  id: string;
  firstName: string;
  lastName: string;
  color: number;
  email: string;
  image: string;
  profileSetup: boolean;
}

interface AuthSlice {
  userInfo: UserInfo | undefined;
  setUserInfo: (userInfo: UserInfo | undefined) => void;
}

export const createAuthSlice: StateCreator<AuthSlice> = (set) => ({
  userInfo: undefined,
  setUserInfo: (userInfo) => set({ userInfo }),
});


// js code for this section
// export const createAuthSlice = (set) => (
//     userInfo: undefined,
//     setUserInfo: (userInfo) => set({ userInfo }),
// );
