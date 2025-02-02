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
    activeLayer: number | null;
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
    setActiveLayer: (id: number | null) => void;
    changeLayerVisibility: (id: number | null) => void;
    addLayer: () => void;
    deleteLayer: (id: number) => void;
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
    activeLayer: null,
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
                    {
                        id: 1,
                        name: 'Слой 1',
                        visible: true,
                        effects: { opacity: 1 },
                    },
                ],
                activeLayer: 1,
            };
        }),
    setActiveLayer: (activeLayer: number | null) => set({ activeLayer }),
    changeLayerVisibility: (layerId: number | null) =>
        set((state) => {
            const layers = state.layers.map((layer) => {
                if (layer.id === layerId) {
                    return { ...layer, visible: !layer.visible };
                }
                return layer;
            });
            return { ...state, layers };
        }),
    addLayer: () =>
        set((state) => ({
            ...state,
            layers: [
                {
                    id: state.layers.length + 1,
                    name: `Слой ${state.layers.length + 1}`,
                    visible: true,
                    effects: { opacity: 1 },
                },
                ...state.layers,
            ],
            activeLayer: state.layers.length + 1,
        })),
    deleteLayer: (layerId: number) =>
        set((state) => ({
            ...state,
            layers: state.layers.filter((layer) => layer.id !== layerId),
        })),
}));
