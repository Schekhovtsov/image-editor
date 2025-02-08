import clsx from 'clsx';
import { type MouseEvent } from 'react';

import CrossIcon from '../../../../shared/assets/icons/cross.svg?react';
import EyeIcon from '../../../../shared/assets/icons/eye.svg?react';
import PlusIcon from '../../../../shared/assets/icons/plus.svg?react';
import { Window } from '../../../../shared/ui/window/Window';
import { useEditorStore } from '../../model/editorStore';
import { useLayersStore } from '../../model/layersStore';
import { LAYERS_HEIGHT, LAYERS_WIDTH, RIGHT_OFFSET } from './config';
import styles from './Layers.module.scss';

export const Layers = () => {
    const windows = useEditorStore((state) => state.windows);
    const layers = useLayersStore((state) => state.layers);
    const activeLayer = useLayersStore((state) => state.activeLayer);

    const changeActiveLayer = useLayersStore((state) => state.setActiveLayer);
    const changeLayerVisibility = useLayersStore(
        (state) => state.changeLayerVisibility
    );
    const addLayer = useLayersStore((state) => state.addLayer);
    const deleteLayer = useLayersStore((state) => state.deleteLayer);

    const x =
        document.documentElement.clientWidth - LAYERS_WIDTH - RIGHT_OFFSET;

    const toggleActiveLayerHandler = (layerId: number) => () => {
        changeActiveLayer(activeLayer === layerId ? null : layerId);
    };

    const onAddLayerHandler = () => {
        addLayer();
    };

    const toggleLayerVisibilityHandler =
        (layerId: number) => (event: MouseEvent<HTMLButtonElement>) => {
            event?.stopPropagation();
            changeLayerVisibility(layerId);
        };

    const onDeleteLayerHandler =
        (layerId: number) => (event: MouseEvent<HTMLButtonElement>) => {
            event?.stopPropagation();
            deleteLayer(layerId);
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
            bodyClassName={styles.windowContainer}
        >
            <>
                <div className={styles.container}>
                    {layers.toReversed().map(({ id, name, visible }) => (
                        <button
                            key={id}
                            className={clsx(
                                styles.item,
                                activeLayer === id && styles.active
                            )}
                            onClick={toggleActiveLayerHandler(id)}
                        >
                            <div>
                                <button
                                    className={styles.eyeIconButton}
                                    onClick={toggleLayerVisibilityHandler(id)}
                                >
                                    <EyeIcon
                                        width={20}
                                        height={20}
                                        className={clsx(
                                            !visible && styles.hidden
                                        )}
                                    />
                                </button>
                                {name}
                            </div>
                            <button
                                onClick={onDeleteLayerHandler(id)}
                                title="Удалить слой"
                            >
                                <CrossIcon className={styles.crossIcon} />
                            </button>
                        </button>
                    ))}
                </div>
                <div className={styles.footer}>
                    <button onClick={onAddLayerHandler} title="Добавить слой">
                        <PlusIcon className={styles.icon} />
                    </button>
                </div>
            </>
        </Window>
    );
};
