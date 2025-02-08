import { FC, MouseEvent,RefObject, useEffect, useState } from 'react';

import { useEditorStore } from '../../model/editorStore';
import { useLayersStore } from '../../model/layersStore';
import styles from './Canvas.module.scss';
import { getCursor } from './utils';

type CanvasProps = {
    canvasRef: RefObject<HTMLCanvasElement>;
};

export const Canvas: FC<CanvasProps> = ({ canvasRef }) => {
    const canvasState = useEditorStore((state) => state.canvas);
    const activeTool = useEditorStore((state) => state.activeTool);

    const layers = useLayersStore((state) => state.layers);
    // const activeLayerId = useLayersStore((state) => state.activeLayer);
    // const activeLayer = useLayersStore((state) =>
    //     state.layers.find((layer) => layer.id === state.activeLayer)
    // );

    const [offset, setOffset] = useState({ x: 0, y: 0 });
    const [isDragging, setIsDragging] = useState(false);
    const [startPos, setStartPos] = useState({ x: 0, y: 0 });

    const onMouseDownHandler = (e: MouseEvent<HTMLDivElement>) => {
        if (activeTool === 'move') {
            setIsDragging(true);
            setStartPos({
                x: e.clientX - offset.x,
                y: e.clientY - offset.y,
            });
        }
    };

    const onMouseMoveHandler = (e: MouseEvent<HTMLDivElement>) => {
        if (isDragging) {
            setOffset({
                x: e.clientX - startPos.x,
                y: e.clientY - startPos.y,
            });
        }
    };

    const onMouseUpHandler = () => {
        if (activeTool === 'move') {
            setIsDragging(false);
        }
    };

    const onMouseLeaveHandler = () => {
        if (activeTool === 'move') {
            setIsDragging(false);
        }
    };

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
                <canvas
                    width={canvasState.width}
                    height={canvasState.height}
                    ref={canvasRef}
                    //   className={styles.canvas}
                    style={{
                        transform: `translate(${offset.x}px, ${offset.y}px)`,
                    }}
                ></canvas>
            )}
        </div>
    );
};
