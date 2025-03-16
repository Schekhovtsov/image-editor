import { RefObject } from 'react';
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

export const drawCropArea = ({
    canvasRef,
    crop,
}: {
    canvasRef: RefObject<HTMLCanvasElement>;
    crop: {
        x: number;
        y: number;
        width: number;
        height: number;
    };
}) => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext('2d');

    if (canvas && context) {
        context.clearRect(0, 0, canvas.width, canvas.height);

        context.globalCompositeOperation = 'source-over';
        context.fillStyle = 'rgba(0, 0, 0, 0.7)';
        context.fillRect(0, 0, canvas.width, canvas.height);

        context.clearRect(crop.x, crop.y, crop.width, crop.height);

        context.globalCompositeOperation = 'source-over';
        context.fillStyle = 'white';

        getAnchors(crop).forEach(({ x, y, width, height }) => {
            context.fillRect(x, y, width, height);
        });
    }
};
