import { Window } from '../../../../shared/ui/window/Window';
import { useEditorStore } from '../../model/slice';

import styles from './Tools.module.scss';

export const Tools = () => {
    const { tools } = useEditorStore((state) => state.windows);
    const setActiveTool = useEditorStore((state) => state.setActiveTool);

    const changeToolHandler = (tool: 'move') => () => {
        setActiveTool(tool);
    };

    return (
        <Window
            isOpen={tools}
            withoutButtons
            width={30}
            height={50}
            initialPosition={{ x: 200, y: 200 }}
        >
            <div className={styles.container}>
                <button onClick={changeToolHandler('move')}>#</button>
            </div>
        </Window>
    );
};
