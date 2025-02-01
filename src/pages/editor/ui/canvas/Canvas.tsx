import { FC, RefObject, useEffect, useState, MouseEvent } from 'react';
import { useEditorStore } from '../../model/slice';
import styles from './Canvas.module.scss';
import { getCursor } from './utils';

type CanvasProps = {
    canvasRef: RefObject<HTMLCanvasElement>;
};

export const Canvas: FC<CanvasProps> = ({ canvasRef }) => {
    const canvasState = useEditorStore((state) => state.canvas);
    const activeTool = useEditorStore((state) => state.activeTool);

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
                context.fillStyle = '#ffffff';
                context.fillRect(
                    offset.x,
                    offset.y,
                    context.canvas.width,
                    context.canvas.height
                );
            }
        };

        drawImage();
    }, [canvasRef, canvasState, offset]);

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
                    className={styles.canvas}
                    style={{
                        transform: `translate(${offset.x}px, ${offset.y}px)`,
                    }}
                ></canvas>
            )}
        </div>
    );
};
