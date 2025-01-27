import { create } from 'zustand';
import { Window } from './types';

type State = {
    windows: Record<Window, boolean>;
    canvas: {
        width: number;
        height: number;
    } | null;
};

type Actions = {
    toggleWindow: (window: Window) => void;
    setCanvas: ({ width, height }: { width: number; height: number }) => void;
};

export const useEditorStore = create<State & Actions>((set, get) => ({
    windows: {
        create: false,
    },
    canvas: null,
    toggleWindow: (window: Window) =>
        set((state) => ({
            windows: { [window]: !state.windows[window] },
        })),
    setCanvas: ({ width, height }: { width: number; height: number }) =>
        set({ canvas: { width, height } }),
}));
