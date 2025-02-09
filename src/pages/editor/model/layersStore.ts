import { create } from 'zustand';

import { INITIAL_LAYER } from './config';
import { Layer } from './types';

type State = {
    layers: Layer[];
    activeLayer: number | null;
};

type Actions = {
    setActiveLayer: (id: number | null) => void;
    changeLayerVisibility: (id: number | null) => void;
    addLayer: () => void;
    deleteLayer: (id: number) => void;
    saveAction: ({ layerId, code }: { layerId: number; code: string }) => void;
};

export const useLayersStore = create<State & Actions>((set) => ({
    layers: [],
    activeLayer: null,
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
            layers:
                state.layers.length === 0
                    ? [INITIAL_LAYER]
                    : [
                          ...state.layers,
                          {
                              id: state.layers.length + 1,
                              name: `Слой ${state.layers.length + 1}`,
                              visible: true,
                              effects: { opacity: 1 },
                              fill: '#ffffff',
                              code: null,
                          },
                      ],
            activeLayer: state.layers.length + 1,
        })),
    deleteLayer: (layerId: number) =>
        set((state) => ({
            ...state,
            layers: state.layers.filter((layer) => layer.id !== layerId),
        })),
    saveAction: ({ layerId, code }) =>
        set((state) => ({
            layers: state.layers.map((layer) => {
                if (layer.id === layerId) {
                    return { ...layer, code: code };
                }
                return layer;
            }),
        })),
}));
