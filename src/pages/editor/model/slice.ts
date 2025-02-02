import { create } from 'zustand';
import { Layers, Tool, Window } from './types';

type State = {
    windows: Record<Window, boolean>;
    canvas: {
        width: number;
        height: number;
    } | null;
    activeTool: Tool | null;
    layers: Layers[];
};

type Actions = {
    toggleWindow: (window: Window) => void;
    setCanvas: ({ width, height }: { width: number; height: number }) => void;
    deleteCanvas: () => void;
    setActiveTool: (tool: Tool | null) => void;
    createNewImage: ({
        width,
        height,
    }: {
        width: number;
        height: number;
    }) => void;
};

export const useEditorStore = create<State & Actions>((set) => ({
    windows: {
        create: false,
        tools: false,
        layers: false,
    },
    canvas: null,
    activeTool: null,
    layers: [],
    toggleWindow: (window: Window) =>
        set((state) => ({
            windows: { ...state.windows, [window]: !state.windows[window] },
        })),
    setCanvas: ({ width, height }: { width: number; height: number }) =>
        set({ canvas: { width, height } }),
    deleteCanvas: () => set({ canvas: null }),
    setActiveTool: (tool: Tool | null) => set({ activeTool: tool }),
    createNewImage: ({ width, height }: { width: number; height: number }) =>
        set((state) => {
            return {
                ...state,
                canvas: { width, height },
                windows: {
                    ...state.windows,
                    create: false,
                    tools: true,
                    layers: true,
                },
                layers: [
                    { id: 1, name: 'Layer 1', visible: true, effects: { opacity: 1 } }
                ]
            };
        }),
}));
