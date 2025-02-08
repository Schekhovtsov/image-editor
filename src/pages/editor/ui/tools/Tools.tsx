import CursorIcon from '../../../../shared/assets/icons/cursor.svg?react';
import FillIcon from '../../../../shared/assets/icons/fill.svg?react';
import MoveIcon from '../../../../shared/assets/icons/move.svg?react';
import { Window } from '../../../../shared/ui/window/Window';
import { TOOL_ICON_COLOR } from '../../model/config';
import { useEditorStore } from '../../model/editorStore';
import { Tool } from '../../model/types';
import styles from './Tools.module.scss';

export const Tools = () => {
    const { tools } = useEditorStore((state) => state.windows);
    const activeTool = useEditorStore((state) => state.activeTool);
    const setActiveTool = useEditorStore((state) => state.setActiveTool);

    const changeToolHandler = (tool: Tool | null) => () => {
        setActiveTool(tool);
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
            height={120}
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
            </div>
        </Window>
    );
};
