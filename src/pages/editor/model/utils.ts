import { Layer, Tool } from './types';

export const getRandomColor = () => {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
};

export const getActiveToolText = (activeTool: Tool) => {
    switch (activeTool) {
        case 'selection':
            return 'Выделение';
        case 'fill':
            return 'Заливка';
        default:
            return null;
    }
};
