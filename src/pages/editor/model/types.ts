export type Window = 'create' | 'tools' | 'layers';

export type Tool = 'move' | 'fill' | 'selection';

export type Effect = {
    opacity: number;
};

export type Layer = {
    id: number;
    name: string;
    visible: boolean;
    effects: Effect;
    fill: string;
    code: string | null;
};

export type Selection = {
    startX: number;
    startY: number;
    endX: number;
    endY: number;
    isSelected: boolean;
};
