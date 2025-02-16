import clsx from 'clsx';
import { FC, RefObject, useEffect, useRef } from 'react';

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
    const initializeLayer = useLayersStore((state) => state.initializeLayer);

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
    } = useMouse({ canvasRef, selectionCanvasRef });

    useEffect(() => {
        if (canvasState) {
            layers.forEach((layer) => {
                if (!layer.initialized) {
                    layer.canvas.width = canvasState.width;
                    layer.canvas.height = canvasState.height;
                    const layerContext = layer.canvas.getContext('2d');
    
                    if (layerContext) {
                        layerContext.fillStyle = layer.fill;
                        layerContext.fillRect(
                            0,
                            0,
                            canvasState.width,
                            canvasState.height
                        );
                    }

                    initializeLayer({ layerId: layer.id })
                }
              
            });
        }

        renderLayers();
    }, [canvasState, layers]);

    const renderLayers = () => {
        const canvas = canvasRef.current;
        const context = canvas?.getContext('2d');

        if (context) {
            context.clearRect(
                0,
                0,
                context.canvas.width,
                context.canvas.height
            );

            layers.forEach((layer) => {
                if (layer.visible) {
                    context.drawImage(layer.canvas, 0, 0);
                }
            });
        }
    };

    return (
        <div
            className={clsx(
                styles.container,
                activeTool === 'fill' && styles.fillCursor
            )}
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
