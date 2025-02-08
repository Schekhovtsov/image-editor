export const TOOL_ICON_COLOR = 'white';

export const INITIAL_LAYER = {
    id: 1,
    name: 'Слой 1',
    visible: true,
    effects: { opacity: 1 },
    fill: '#ffffff',
};

export const getRandomColor = () => {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
};
