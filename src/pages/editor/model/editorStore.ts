import { create } from 'zustand';

import { Tool, Window } from './types';

type State = {
    windows: Record<Window, boolean>;
    canvas: {
        width: number;
        height: number;
    } | null;
    activeTool: Tool | null;
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
};

export const useEditorStore = create<State & Actions>((set) => ({
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
}));
