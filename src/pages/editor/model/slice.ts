import { create } from 'zustand';
import { Window } from './types';

type State = {
    windows: Record<Window, boolean>;
    canvas: {
        width: number;
        height: number;
    } | null;
    activeTool: 'move' | null,
};

type Actions = {
    toggleWindow: (window: Window) => void;
    setCanvas: ({ width, height }: { width: number; height: number }) => void;
    deleteCanvas: () => void;
    setActiveTool: (tool: 'move' | null) => void
};

export const useEditorStore = create<State & Actions>((set) => ({
    windows: {
        create: false,
        tools: false,
    },
    canvas: null,
    activeTool: null,
    toggleWindow: (window: Window) =>
        set((state) => ({
            windows: { ...state.windows, [window]: !state.windows[window] },
        })),
    setCanvas: ({ width, height }: { width: number; height: number }) =>
        set({ canvas: { width, height } }),
    deleteCanvas: () => set({ canvas: null }),
    setActiveTool: (tool: 'move' | null) => set({ activeTool: tool }),
}));
