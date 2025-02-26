export type Window = 'create' | 'tools' | 'layers';

export type Tool = 'move' | 'fill' | 'selection' | null;

export type Effect = {
    opacity: number;
};

export type Layer = {
    id: number;
    name: string;
    visible: boolean;
    effects: Effect;
    fill: string;
    canvas: HTMLCanvasElement;
    initialized: boolean;
};

export type Selection = {
    startX: number;
    startY: number;
    endX: number;
    endY: number;
    isSelected: boolean;
};

export type Color = string;
