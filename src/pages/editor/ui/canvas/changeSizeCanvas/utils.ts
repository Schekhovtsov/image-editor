import { ANCHOR_SIZE } from './config.ts';

export const getAnchors = ({
    x,
    y,
    width,
    height,
}: {
    x: number;
    y: number;
    width: number;
    height: number;
}) => {
    const anchors = [
        { type: 'top-left', x: x - ANCHOR_SIZE / 2, y: y - ANCHOR_SIZE / 2 },
        {
            type: 'top-center',
            x: x + width / 2 - ANCHOR_SIZE / 2,
            y: y - ANCHOR_SIZE / 2,
        },
        {
            type: 'top-right',
            x: x + width - ANCHOR_SIZE / 2,
            y: y - ANCHOR_SIZE / 2,
        },
        {
            type: 'middle-left',
            x: x - ANCHOR_SIZE / 2,
            y: y + height / 2 - ANCHOR_SIZE / 2,
        },
        {
            type: 'middle-right',
            x: x + width - ANCHOR_SIZE / 2,
            y: y + height / 2 - ANCHOR_SIZE / 2,
        },
        {
            type: 'bottom-left',
            x: x - ANCHOR_SIZE / 2,
            y: y + height - ANCHOR_SIZE / 2,
        },
        {
            type: 'bottom-center',
            x: x + width / 2 - ANCHOR_SIZE / 2,
            y: y + height - ANCHOR_SIZE / 2,
        },
        {
            type: 'bottom-right',
            x: x + width - ANCHOR_SIZE / 2,
            y: y + height - ANCHOR_SIZE / 2,
        },
    ];

    return anchors.map(({ x, y, type }) => ({
        x,
        y,
        width: ANCHOR_SIZE,
        height: ANCHOR_SIZE,
        type,
    }));
};
