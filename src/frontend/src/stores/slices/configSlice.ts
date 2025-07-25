import { env } from "@/env.mjs";
import { StateCreator } from "zustand";
import { ChatModel } from "../../../generated";

type State = {
  model: ChatModel;
  localMode: boolean;
  proMode: boolean;
};

type Actions = {
  setModel: (model: ChatModel) => void;
  toggleLocalMode: () => void;
  toggleProMode: () => void;
};

export type ConfigStore = State & Actions;

export const createConfigSlice: StateCreator<
  ConfigStore,
  [],
  [],
  ConfigStore
> = (set) => ({
  model: ChatModel.Qwen3,
  localMode: true,
  proMode: false,
  setModel: (model: ChatModel) => set({ model }),
  toggleLocalMode: () =>
    set((state) => {
      const localModeEnabled = env.NEXT_PUBLIC_LOCAL_MODE_ENABLED;
      if (!localModeEnabled) {
        return { ...state, localMode: true };
      }

      const newLocalMode = !state.localMode;
      const newModel = newLocalMode
        ? ChatModel.Qwen3
        : ChatModel.Qwen3;
      return { localMode: newLocalMode, model: newModel };
    }),
  toggleProMode: () =>
    set((state) => {
      const proModeEnabled = env.NEXT_PUBLIC_PRO_MODE_ENABLED;
      if (!proModeEnabled) {
        return { ...state, proMode: false };
      }
      return { ...state, proMode: !state.proMode };
    }),
});
