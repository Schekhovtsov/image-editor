import { arrayMove } from '@dnd-kit/sortable';
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
    saveAction: ({
        layerId,
        canvas,
    }: {
        layerId: number;
        canvas: HTMLCanvasElement;
    }) => void;
    initializeLayer: ({ layerId }: { layerId: number }) => void;
    reorderLayers: ({
        fromIndex,
        toIndex,
    }: {
        fromIndex: number;
        toIndex: number;
    }) => void;
    openImageFromPC: ({ file }: { file: Blob }) => void;
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
                              fill: 'transparent',
                              canvas: document.createElement('canvas'),
                              initialized: false,
                          },
                      ],
            activeLayer: state.layers.length + 1,
        })),
    deleteLayer: (layerId: number) =>
        set((state) => ({
            ...state,
            layers: state.layers.filter((layer) => layer.id !== layerId),
        })),
    saveAction: ({ layerId, canvas }) =>
        set((state) => ({
            layers: state.layers.map((layer) => {
                if (layer.id === layerId) {
                    return { ...layer, canvas: canvas };
                }
                return layer;
            }),
        })),
    initializeLayer: ({ layerId }) =>
        set((state) => ({
            layers: state.layers.map((layer) => {
                if (layer.id === layerId) {
                    return { ...layer, initialized: true };
                }
                return layer;
            }),
        })),
    reorderLayers: ({
        fromIndex,
        toIndex,
    }: {
        fromIndex: number;
        toIndex: number;
    }) => {
        set((state) => ({
            layers: arrayMove(state.layers, fromIndex, toIndex),
        }));
    },
    openImageFromPC: ({ file }) => {
        set((state) => {
            const canvas = document.createElement('canvas');
            const context = canvas.getContext('2d');

            const reader = new FileReader();

            reader.onload = (e) => {
                const img = new Image();
                img.onload = () => {
                    context?.drawImage(img, 0, 0);
                };

                img.src = e.target?.result as string;
            };

            reader.readAsDataURL(file);

            return {
                ...state,
                layers: [
                    {
                        ...INITIAL_LAYER,
                        sourceFromPC: true,
                        canvas,
                    },
                ],
                activeLayer: 1,
            };
        });
    },
}));
