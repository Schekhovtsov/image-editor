import { useEffect, useRef } from 'react';
import { useEditorStore } from '../../model/slice';
import styles from './Canvas.module.scss';

export const Canvas = () => {
    const canvasState = useEditorStore((state) => state.canvas);

    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const context = canvas?.getContext('2d');

        if (context) {
            context.fillStyle = '#ffffff';
            context.fillRect(0, 0, context.canvas.width, context.canvas.height);
        }
    }, [canvasState]);

    return (
        <div className={styles.container}>
            {canvasState && (
                <canvas
                    width={canvasState.width}
                    height={canvasState.height}
                    ref={canvasRef}
                    className={styles.canvas}
                ></canvas>
            )}
        </div>
    );
};
