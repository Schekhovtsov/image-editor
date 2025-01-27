import { useRef } from 'react';
import { useEditorStore } from '../../model/slice';
import styles from './Canvas.module.scss';

export const Canvas = () => {
    const canvas = useEditorStore((state) => state.canvas);

    const canvasRef = useRef<HTMLCanvasElement>(null);

    return (
        <div className={styles.container}>
            {canvas && <canvas ref={canvasRef}></canvas>}
        </div>
    );
};
