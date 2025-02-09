import { type MouseEvent, RefObject, useEffect, useState } from 'react';

import { useEditorStore } from '../model/editorStore';

type UseMouseParams = {
    selectionCanvasRef: RefObject<HTMLCanvasElement>;
};

export const useMouse = ({ selectionCanvasRef }: UseMouseParams) => {
    const [offset, setOffset] = useState({ x: 0, y: 0 });

    const { x: canvasX = 0, y: canvasY = 0 } =
        selectionCanvasRef.current?.getBoundingClientRect() ?? {};

    const [isDragging, setIsDragging] = useState(false);
    const [startPos, setStartPos] = useState({ x: 0, y: 0 });

    const [isSelecting, setIsSelecting] = useState(false);
    const selection = useEditorStore((state) => state.selection);
    const setSelection = useEditorStore((state) => state.setSelection);

    const activeTool = useEditorStore((state) => state.activeTool);

    const onMouseDownHandler = (
        e: MouseEvent<HTMLDivElement | HTMLCanvasElement>
    ) => {
        if (activeTool === 'move') {
            setIsDragging(true);
            setStartPos({
                x: e.clientX - offset.x,
                y: e.clientY - offset.y,
            });
        }

        if (activeTool === 'selection') {
            setIsSelecting(true);
            setSelection({
                isSelected: false,
                startX: e.clientX,
                startY: e.clientY,
                endX: e.clientX,
                endY: e.clientY,
            });
        }
    };

    const onMouseMoveHandler = (
        e: MouseEvent<HTMLDivElement | HTMLCanvasElement>
    ) => {
        if (activeTool === 'move') {
            if (isDragging) {
                setOffset({
                    x: e.clientX - startPos.x,
                    y: e.clientY - startPos.y,
                });
            }
        }

        if (activeTool === 'selection') {
            if (isSelecting) {
                setSelection({
                    endX: e.clientX,
                    endY: e.clientY,
                });
            }
        }
    };

    const onMouseUpHandler = () => {
        if (activeTool === 'move') {
            setIsDragging(false);
        }

        if (activeTool === 'selection') {
            setIsSelecting(false);
            setSelection({
                isSelected: true,
            });
        }
    };

    const onMouseLeaveHandler = () => {
        if (activeTool === 'move') {
            setIsDragging(false);
        }

        if (activeTool === 'selection') {
            setIsSelecting(false);
        }
    };

    useEffect(() => {
        const canvas = selectionCanvasRef.current;
        const context = canvas?.getContext('2d');

        if (canvas && context) {
            if (!activeTool) {
                context.clearRect(0, 0, canvas.width, canvas.height);
            }

            if (activeTool === 'selection') {
                console.log('SELECTION: ', selection);
                context.clearRect(0, 0, canvas.width, canvas.height);
                context.strokeStyle = '#6d6d6d';
                context.lineWidth = 1;
                context.setLineDash([5, 5]);
                context.strokeRect(
                    selection.startX - canvasX,
                    selection.startY - canvasY,
                    selection.endX - selection.startX,
                    selection.endY - selection.startY
                );
            }
        }
    }, [activeTool, selection]);

    return {
        mouseEvents: {
            onMouseDownHandler,
            onMouseMoveHandler,
            onMouseUpHandler,
            onMouseLeaveHandler,
        },
        offset,
        isDragging,
        activeTool,
    };
};
