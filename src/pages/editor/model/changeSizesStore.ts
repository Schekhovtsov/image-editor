import { RefObject, useRef } from 'react';
import { create } from 'zustand';

type State = {
    isDragging: boolean;
    dragAnchor: string | null;
    isMoving: boolean;
    startMousePos: { x: number; y: number };
    crop: { width: number; height: number; x: number; y: number };
};

type Actions = {
    setIsDragging: (isDragging: boolean) => void;
    setDragAnchor: (dragAnchor: string | null) => void;
    setIsMoving: (isMoving: boolean) => void;
    setStartMousePos: (startMousePos: { x: number; y: number }) => void;
    setCrop: (crop: {
        width: number;
        height: number;
        x: number;
        y: number;
    }) => void;
};

export const useChangeSizesStore = create<State & Actions>()((set) => ({
    isDragging: false,
    setIsDragging: (isDragging) => set({ isDragging }),
    dragAnchor: null,
    setDragAnchor: (dragAnchor) => set({ dragAnchor }),
    isMoving: false,
    setIsMoving: (isMoving) => set({ isMoving }),
    startMousePos: { x: 0, y: 0 },
    setStartMousePos: (startMousePos) => set({ startMousePos }),
    crop: { width: 0, height: 0, x: 0, y: 0 },
    setCrop: (crop) => set({ crop }),
}));
