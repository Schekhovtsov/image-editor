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
    const isImageWasOpened = useEditorStore((state) => state.isImageWasOpened);
    const scale = useEditorStore((state) => state.scale);

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
    } = useMouse({ selectionCanvasRef });

    useEffect(() => {
        if (canvasState) {
            layers.forEach(({ id, initialized, canvas, fill }) => {
                if (!initialized) {
                    canvas.width = canvasState.width;
                    canvas.height = canvasState.height;
                    const layerContext = canvas.getContext('2d');

                    if (layerContext) {
                        layerContext.fillStyle = fill;
                        layerContext.fillRect(
                            0,
                            0,
                            canvasState.width,
                            canvasState.height
                        );
                    }

                    initializeLayer({ layerId: id });
                }
            });
        }

        if (layers.length) {
            renderLayers();
        }
    }, [canvasState, layers, isImageWasOpened, scale]);

    const renderLayers = () => {
        const canvas = canvasRef.current;
        const context = canvas?.getContext('2d');

        const selectionCanvas = selectionCanvasRef.current;

        if (context && canvas && canvasState && selectionCanvas) {
            selectionCanvas.width = canvasState?.width * scale;
            selectionCanvas.height = canvasState?.height * scale;

            canvas.width = canvasState.width * scale;
            canvas.height = canvasState.height * scale;

            context.clearRect(
                0,
                0,
                context.canvas.width,
                context.canvas.height
            );

            layers.forEach((layer) => {
                if (layer.visible) {
                    context.drawImage(
                        layer.canvas,
                        0,
                        0,
                        layer.canvas.width,
                        layer.canvas.height,
                        0,
                        0,
                        layer.canvas.width * scale,
                        layer.canvas.height * scale
                    );
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
