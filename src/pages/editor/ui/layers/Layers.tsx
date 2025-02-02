import { Window } from '../../../../shared/ui/window/Window';
import { useEditorStore } from '../../model/slice';
import { LAYERS_HEIGHT, LAYERS_WIDTH, RIGHT_OFFSET } from './config';

import styles from './Layers.module.scss';

export const Layers = () => {
    const windows = useEditorStore((state) => state.windows);

    const x =
        document.documentElement.clientWidth - LAYERS_WIDTH - RIGHT_OFFSET;

    return (
        <Window
            isOpen={windows['layers']}
            withoutButtons
            width={LAYERS_WIDTH}
            height={LAYERS_HEIGHT}
            inCenterOfScreen={false}
            initialPosition={{ x, y: 50 }}
            title="Слои"
        >
            <div className={styles.container}></div>
        </Window>
    );
};
