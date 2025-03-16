import { FC, MouseEvent, RefObject, useEffect } from 'react';

import { useChangeSizesStore } from '../../../model/changeSizesStore';
import { useEditorStore } from '../../../model/editorStore';
import styles from './ChangeSizeCanvas.module.scss';
import { ANCHOR_AREA } from './config';
import { drawCropArea, getAnchors } from './utils';

type ChangeSizeCanvasProps = {
    canvasRef: RefObject<HTMLCanvasElement>;
}

export const ChangeSizeCanvas: FC<ChangeSizeCanvasProps> = ({ canvasRef: changeSizeCanvasRef }) => {
    const canvasState = useEditorStore((state) => state.canvas);
    const scale = useEditorStore((state) => state.scale);

    const canvasWidth = canvasState?.width ? canvasState?.width * scale : 0;
    const canvasHeight = canvasState?.height ? canvasState?.height * scale : 0;

    const isDragging = useChangeSizesStore((state) => state.isDragging);
    const setIsDragging = useChangeSizesStore((state) => state.setIsDragging);

    const dragAnchor = useChangeSizesStore((state) => state.dragAnchor);
    const setDragAnchor = useChangeSizesStore((state) => state.setDragAnchor);

    const isMoving = useChangeSizesStore((state) => state.isMoving);
    const setIsMoving = useChangeSizesStore((state) => state.setIsMoving);

    const startMousePos = useChangeSizesStore((state) => state.startMousePos);
    const setStartMousePos = useChangeSizesStore(
        (state) => state.setStartMousePos
    );

    const crop = useChangeSizesStore((state) => state.crop);
    const setCrop = useChangeSizesStore((state) => state.setCrop);

    const changeCanvasSizeMode = useEditorStore(
        (state) => state.changeCanvasSizeMode
    );

    useEffect(() => {
        drawCropArea({ canvasRef: changeSizeCanvasRef, crop });
        setCrop({ width: canvasWidth, height: canvasHeight, x: 0, y: 0 });
    }, [canvasState, changeCanvasSizeMode, scale, canvasWidth, canvasHeight]);

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
                    drawCropArea({
                        canvasRef: changeSizeCanvasRef,
                        crop: newCrop,
                    });
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
                drawCropArea({ canvasRef: changeSizeCanvasRef, crop: newCrop });
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
