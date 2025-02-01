import { useEditorStore } from '../../model/slice';
import styles from './Footer.module.scss';

export const Footer = () => {
    const canvasState = useEditorStore((state) => state.canvas);

    return (
        <div className={styles.container}>
            {canvasState && (
                <span>
                    Размер холста: {canvasState.width} x {canvasState.height}
                </span>
            )}
        </div>
    );
};
