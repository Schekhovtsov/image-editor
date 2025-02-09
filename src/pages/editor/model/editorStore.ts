import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

import { DEFAULT_SELECTION } from './config';
import { Selection, Tool, Window } from './types';

type State = {
    windows: Record<Window, boolean>;
    canvas: {
        width: number;
        height: number;
    } | null;
    activeTool: Tool | null;
    selection: Selection;
};

type Actions = {
    toggleWindow: (window: Window) => void;
    setCanvas: ({ width, height }: { width: number; height: number }) => void;
    deleteCanvas: () => void;
    createNewImage: ({
        width,
        height,
    }: {
        width: number;
        height: number;
    }) => void;
    setActiveTool: (tool: Tool | null) => void;
    setSelection: (selection: Partial<Selection>) => void;
    clearSelection: () => void;
};

export const useEditorStore = create<State & Actions>()((set) => ({
    windows: {
        create: false,
        tools: false,
        layers: false,
    },
    canvas: null,
    activeTool: null,
    setActiveTool: (tool: Tool | null) => set({ activeTool: tool }),
    toggleWindow: (window: Window) =>
        set((state) => ({
            windows: { ...state.windows, [window]: !state.windows[window] },
        })),
    setCanvas: ({ width, height }: { width: number; height: number }) =>
        set({ canvas: { width, height } }),
    deleteCanvas: () => set({ canvas: null }),
    createNewImage: ({ width, height }: { width: number; height: number }) =>
        set((state) => {
            return {
                canvas: { width, height },
                windows: {
                    ...state.windows,
                    create: false,
                    tools: true,
                    layers: true,
                },
            };
        }),
    selection: DEFAULT_SELECTION,
    setSelection: (update: Partial<Selection>) =>
        set((state) => ({ selection: { ...state.selection, ...update } })),
    clearSelection: () => set({ selection: DEFAULT_SELECTION }),
}));
