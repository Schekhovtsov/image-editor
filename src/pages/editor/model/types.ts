export type Window = 'create' | 'tools' | 'layers';

export type Tool = 'move';

export type Effect = {
    opacity: number;
};

export type Layer = {
    id: number;
    name: string;
    visible: boolean;
    effects: Effect;
    fill: string;
};
