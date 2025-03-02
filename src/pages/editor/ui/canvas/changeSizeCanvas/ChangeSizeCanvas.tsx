import { useEditorStore } from 'pages/editor/model/editorStore';
import { MouseEvent, useEffect, useRef, useState } from 'react';

import styles from './ChangeSizeCanvas.module.scss';
import { ANCHOR_AREA } from './config';
import { getAnchors } from './utils';

export const ChangeSizeCanvas = () => {
    const changeSizeCanvasRef = useRef<HTMLCanvasElement>(null);

    const canvasState = useEditorStore((state) => state.canvas);
    const scale = useEditorStore((state) => state.scale);

    const canvasWidth = canvasState?.width ? canvasState?.width * scale : 0;
    const canvasHeight = canvasState?.height ? canvasState?.height * scale : 0;

    const [isDragging, setIsDragging] = useState(false);
    const [dragAnchor, setDragAnchor] = useState<string | null>(null);
    const [isMoving, setIsMoving] = useState(false);
    const [startMousePos, setStartMousePos] = useState({ x: 0, y: 0 });
    console.log(dragAnchor);
    const [crop, setCrop] = useState({
        x: 0,
        y: 0,
        width: canvasWidth,
        height: canvasHeight,
    });

    const changeCanvasSizeMode = useEditorStore(
        (state) => state.changeCanvasSizeMode
    );

    useEffect(() => {
        drawCropArea();
    }, [canvasState, changeCanvasSizeMode, scale]);

    const drawCropArea = () => {
        const canvas = changeSizeCanvasRef.current;
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

    const handleMouseDown = (e: MouseEvent<HTMLCanvasElement>) => {
        const rect = changeSizeCanvasRef.current?.getBoundingClientRect();

        if (rect) {
            const mouseX = e.clientX - rect.left;
            const mouseY = e.clientY - rect.top;

            for (const anchor of getAnchors(crop)) {
                if (
                    mouseX >= anchor.x - ANCHOR_AREA &&
                    mouseX <= anchor.x + ANCHOR_AREA &&
                    mouseY >= anchor.y - ANCHOR_AREA &&
                    mouseY <= anchor.y + ANCHOR_AREA
                ) {
                    setIsDragging(true);
                    console.log(anchor.type);
                    setDragAnchor(anchor.type);
                    return;
                }
            }

            if (
                mouseX >= crop.x &&
                mouseX <= crop.x + crop.width &&
                mouseY >= crop.y &&
                mouseY <= crop.y + crop.height
            ) {
                setIsMoving(true);
                setStartMousePos({ x: mouseX, y: mouseY });
            }
        }
    };

    const handleMouseMove = (e: MouseEvent<HTMLCanvasElement>) => {
        const rect = changeSizeCanvasRef.current?.getBoundingClientRect();

        if (rect) {
            const mouseX = e.clientX - rect.left;
            const mouseY = e.clientY - rect.top;

            const newCrop = { ...crop };

            if (isDragging) {
                switch (dragAnchor) {
                    case 'top-left':
                        newCrop.width += newCrop.x - mouseX;
                        newCrop.height += newCrop.y - mouseY;
                        newCrop.x = mouseX;
                        newCrop.y = mouseY;
                        break;
                    case 'top-center':
                        newCrop.height += newCrop.y - mouseY;
                        newCrop.y = mouseY;
                        break;
                    case 'top-right':
                        newCrop.width = mouseX - newCrop.x;
                        newCrop.height += newCrop.y - mouseY;
                        newCrop.y = mouseY;
                        break;
                    case 'middle-left':
                        newCrop.width += newCrop.x - mouseX;
                        newCrop.x = mouseX;
                        break;
                    case 'middle-right':
                        newCrop.width = mouseX - newCrop.x;
                        break;
                    case 'bottom-left':
                        newCrop.width += newCrop.x - mouseX;
                        newCrop.height = mouseY - newCrop.y;
                        newCrop.x = mouseX;
                        break;
                    case 'bottom-center':
                        newCrop.height = mouseY - newCrop.y;
                        break;
                    case 'bottom-right':
                        newCrop.width = mouseX - newCrop.x;
                        newCrop.height = mouseY - newCrop.y;
                        break;
                    default:
                        break;
                }

                if (newCrop.width > 10 && newCrop.height > 10) {
                    setCrop(newCrop);
                    drawCropArea();
                }
            } else if (isMoving) {
                const deltaX = mouseX - startMousePos.x;
                const deltaY = mouseY - startMousePos.y;

                const newCrop = {
                    ...crop,
                    x: crop.x + deltaX,
                    y: crop.y + deltaY,
                };

                setCrop(newCrop);
                setStartMousePos({ x: mouseX, y: mouseY });
                drawCropArea();
            }
        }
    };

    const handleMouseUp = () => {
        setIsDragging(false);
        setIsMoving(false);
        setDragAnchor(null);
    };

    return (
        changeCanvasSizeMode && (
            <canvas
                ref={changeSizeCanvasRef}
                width={canvasWidth}
                height={canvasHeight}
                className={styles.canvas}
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
            ></canvas>
        )
    );
};
