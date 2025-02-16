import { Over } from '@dnd-kit/core';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import clsx from 'clsx';
import { useLayersStore } from 'pages/editor/model/layersStore';
import { FC, type MouseEvent } from 'react';
import CrossIcon from 'shared/assets/icons/cross.svg?react';
import EyeIcon from 'shared/assets/icons/eye.svg?react';

import styles from './styles.module.scss';

type ItemProps = {
    id: number;
    name: string;
    visible: boolean;
    over: Over | null;
};

export const Item: FC<ItemProps> = ({ id, name, visible, over }) => {
    const activeLayer = useLayersStore((state) => state.activeLayer);

    const changeActiveLayer = useLayersStore((state) => state.setActiveLayer);
    const changeLayerVisibility = useLayersStore(
        (state) => state.changeLayerVisibility
    );
    const deleteLayer = useLayersStore((state) => state.deleteLayer);

    const {
        attributes,
        listeners,
        setNodeRef: draggableRef,
        transform,
        transition,
        isDragging,
    } = useSortable({ id });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        opacity: isDragging ? 0.5 : 1,
        cursor: isDragging ? 'grabbing' : 'grab',
    };

    const toggleActiveLayerHandler = (layerId: number) => () => {
        changeActiveLayer(activeLayer === layerId ? null : layerId);
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
        <div
            className={clsx(
                styles.item,
                activeLayer === id && styles.active,
                isDragging && styles.dragging
            )}
            ref={draggableRef}
            style={style}
            {...listeners}
            {...attributes}
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
                        className={clsx(!visible && styles.hidden)}
                    />
                </button>
                {name}
            </div>
            <button onClick={onDeleteLayerHandler(id)} title="Удалить слой">
                <CrossIcon className={styles.crossIcon} />
            </button>
        </div>
    );
};
