import CursorIcon from 'shared/assets/icons/cursor.svg?react';
import FillIcon from 'shared/assets/icons/fill.svg?react';
import MoveIcon from 'shared/assets/icons/move.svg?react';
import SelectionIcon from 'shared/assets/icons/selection.svg?react';
import { Window } from 'shared/ui/window/Window';
import { ColorPicker } from 'widgets/colorPicker';

import { TOOL_ICON_COLOR } from '../../model/config';
import { useEditorStore } from '../../model/editorStore';
import { Tool } from '../../model/types';
import styles from './Tools.module.scss';

export const Tools = () => {
    const { tools } = useEditorStore((state) => state.windows);
    const activeTool = useEditorStore((state) => state.activeTool);
    const setActiveTool = useEditorStore((state) => state.setActiveTool);

    const clearSelection = useEditorStore((state) => state.clearSelection);

    const changeToolHandler = (tool: Tool | null) => () => {
        setActiveTool(tool);

        if (!tool) {
            clearSelection();
        }
    };

    const iconProps = {
        width: 20,
        height: 20,
        color: TOOL_ICON_COLOR,
    };

    return (
        <Window
            isOpen={tools}
            withoutButtons
            width={40}
            height={190}
            inCenterOfScreen={false}
            initialPosition={{ x: 10, y: 150 }}
            showDragPoint
        >
            <div className={styles.container}>
                <button
                    onClick={changeToolHandler(null)}
                    className={styles.toolButton}
                    title="Указатель"
                    disabled={!activeTool}
                >
                    <CursorIcon {...iconProps} />
                </button>
                <button
                    onClick={changeToolHandler('selection')}
                    className={styles.toolButton}
                    title="Выделение"
                >
                    <SelectionIcon {...iconProps} />
                </button>
                <button
                    onClick={changeToolHandler('move')}
                    className={styles.toolButton}
                    title="Перемещение"
                >
                    <MoveIcon {...iconProps} />
                </button>
                <button
                    onClick={changeToolHandler('fill')}
                    className={styles.toolButton}
                    title="Заливка"
                >
                    <FillIcon {...iconProps} />
                </button>
                <ColorPicker />
            </div>
        </Window>
    );
};
