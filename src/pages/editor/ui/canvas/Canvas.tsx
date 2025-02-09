import { FC, MouseEvent, RefObject, useEffect, useRef, useState } from 'react';

import { useMouse } from '../../lib/useMouse';
import { useEditorStore } from '../../model/editorStore';
import { useLayersStore } from '../../model/layersStore';
import styles from './Canvas.module.scss';
import { getCursor } from './utils';

type CanvasProps = {
    canvasRef: RefObject<HTMLCanvasElement>;
};

export const Canvas: FC<CanvasProps> = ({ canvasRef }) => {
    const selectionCanvasRef = useRef<HTMLCanvasElement>(null);
    const canvasState = useEditorStore((state) => state.canvas);

    const layers = useLayersStore((state) => state.layers);
    // const activeLayerId = useLayersStore((state) => state.activeLayer);
    // const activeLayer = useLayersStore((state) =>
    //     state.layers.find((layer) => layer.id === state.activeLayer)
    // );

    const {
        mouseEvents: {
            onMouseDownHandler,
            onMouseMoveHandler,
            onMouseUpHandler,
            onMouseLeaveHandler,
        },
        offset,
        activeTool,
        isDragging,
    } = useMouse({ selectionCanvasRef });

    useEffect(() => {
        const drawImage = () => {
            const canvas = canvasRef.current;
            const context = canvas?.getContext('2d');

            if (context) {
                layers.forEach((layer) => {
                    if (layer.visible) {
                        context.globalAlpha = layer.effects.opacity;
                        // Применяем эффекты (например, сепия)
                        //   const processedImageData = applySepia(layer.imageData);

                        context.fillStyle = layer.fill;
                        context.fillRect(
                            offset.x,
                            offset.y,
                            context.canvas.width,
                            context.canvas.height
                        );

                        context.globalAlpha = 1.0;
                    }
                });
            }
        };

        drawImage();
    }, [canvasRef, canvasState, offset, layers]);

    return (
        <div
            className={styles.container}
            onMouseDown={onMouseDownHandler}
            onMouseMove={onMouseMoveHandler}
            onMouseUp={onMouseUpHandler}
            onMouseLeave={onMouseLeaveHandler}
            style={{
                cursor: getCursor({ activeTool, isDragging }),
            }}
        >
            {canvasState && (
                <>
                    <canvas
                        width={canvasState.width}
                        height={canvasState.height}
                        ref={canvasRef}
                        onMouseDown={onMouseDownHandler}
                        onMouseMove={onMouseMoveHandler}
                        onMouseUp={onMouseUpHandler}
                        onMouseLeave={onMouseLeaveHandler}
                        style={{
                            transform: `translate(${offset.x}px, ${offset.y}px)`,
                        }}
                    ></canvas>
                    <canvas
                        ref={selectionCanvasRef}
                        width={canvasState.width}
                        height={canvasState.height}
                        className={styles.selectionCanvas}
                    ></canvas>
                </>
            )}
        </div>
    );
};
