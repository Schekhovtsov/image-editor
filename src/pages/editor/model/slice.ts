import { create } from 'zustand';
import { Window } from './types';

type State = {
    windows: Record<Window, boolean>;
};

type Actions = {
    toggleWindow: (window: Window) => void;
};

export const useEditorStore = create<State & Actions>((set, get) => ({
    windows: {
        create: false,
    },
    toggleWindow: (window: Window) =>
        set((state) => ({
            windows: { [window]: !state.windows[window] },
        })),
}));
