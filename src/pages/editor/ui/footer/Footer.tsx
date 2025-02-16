import { getActiveToolText } from 'pages/editor/model/utils';

import { useEditorStore } from '../../model/editorStore';
import styles from './Footer.module.scss';

export const Footer = () => {
    const canvasState = useEditorStore((state) => state.canvas);
    const selectedArea = useEditorStore((state) => state.selection);
    const activeTool = useEditorStore((state) => state.activeTool);

    const activeToolName = getActiveToolText(activeTool);

    const selectedAreaSize = {
        width: selectedArea.endX - selectedArea.startX,
        height: selectedArea.endY - selectedArea.startY,
    };

    return (
        <div className={styles.container}>
            {canvasState && (
                <>
                    <span>
                        Размер холста: {canvasState.width} x{' '}
                        {canvasState.height}
                    </span>
                    {activeToolName && (
                        <span>Активный инструмент: {activeToolName}</span>
                    )}
                    {selectedArea.isSelected ||
                        (activeTool === 'selection' && (
                            <span>
                                Размер выделенной области:{' '}
                                {selectedAreaSize.width} x{' '}
                                {selectedAreaSize.height}
                            </span>
                        ))}
                </>
            )}
        </div>
    );
};
