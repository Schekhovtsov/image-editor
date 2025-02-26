import { getActiveToolText } from 'pages/editor/model/utils';
import { ChangeEvent, useRef } from 'react';
import { NumericFormat } from 'react-number-format';

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

    const scale = useEditorStore((state) => state.scale);
    const setScale = useEditorStore((state) => state.setScale);

    const inputRef = useRef<HTMLInputElement>(null);

    const focusHandler = () => {
        if (inputRef.current) {
            inputRef.current.select();
        }
    };

    const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        const newScale = parseInt(event.target.value) / 100;
        setScale(+newScale);
    };

    return (
        <div className={styles.container}>
            {canvasState && (
                <>
                    <div>
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
                    </div>
                    <div className={styles.scale}>
                        Масштаб:
                        <NumericFormat
                            value={scale * 100}
                            suffix="%"
                            onChange={onChangeHandler}
                            decimalScale={0}
                            getInputRef={inputRef}
                            onClick={focusHandler}
                        />
                    </div>
                </>
            )}
        </div>
    );
};
