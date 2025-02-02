import { type MouseEvent } from 'react';
import clsx from 'clsx';
import { Window } from '../../../../shared/ui/window/Window';
import { useEditorStore } from '../../model/slice';
import { LAYERS_HEIGHT, LAYERS_WIDTH, RIGHT_OFFSET } from './config';
import EyeIcon from '../../../../shared/assets/icons/eye.svg?react';

import styles from './Layers.module.scss';

export const Layers = () => {
    const windows = useEditorStore((state) => state.windows);
    const layers = useEditorStore((state) => state.layers);
    const activeLayer = useEditorStore((state) => state.activeLayer);

    const changeActiveLayer = useEditorStore((state) => state.setActiveLayer);
    const changeLayerVisibility = useEditorStore(
        (state) => state.changeLayerVisibility
    );

    const x =
        document.documentElement.clientWidth - LAYERS_WIDTH - RIGHT_OFFSET;

    const toggleActiveLayerHandler = (layerId: number) => () => {
        changeActiveLayer(activeLayer === layerId ? null : layerId);
    };

    const toggleLayerVisibilityHandler =
        (layerId: number) => (event: MouseEvent<HTMLButtonElement>) => {
            event?.stopPropagation();
            changeLayerVisibility(layerId);
        };

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
            <div className={styles.container}>
                {layers.map(({ id, name, visible }) => (
                    <button
                        key={id}
                        className={clsx(
                            styles.item,
                            activeLayer === id && styles.active
                        )}
                        onClick={toggleActiveLayerHandler(id)}
                    >
                        <button
                            className={styles.eyeIconButton}
                            onClick={toggleLayerVisibilityHandler(id)}
                        >
                            <EyeIcon
                                width={20}
                                height={20}
                                className={clsx(!visible && styles.hidden)}
                            />
                        </button>
                        {name}
                    </button>
                ))}
            </div>
        </Window>
    );
};
