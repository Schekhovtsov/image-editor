import { Over } from '@dnd-kit/core';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import clsx from 'clsx';
import { useLayersStore } from 'pages/editor/model/layersStore';
import { FC, type MouseEvent, useState } from 'react';
import CrossIcon from 'shared/assets/icons/cross.svg?react';
import DragIcon from 'shared/assets/icons/drag.svg?react';
import EyeIcon from 'shared/assets/icons/eye.svg?react';
import { useOpen } from 'shared/lib';
import { ContextMenu } from 'widgets/contextMenu';

import styles from './styles.module.scss';

type ItemProps = {
    id: number;
    name: string;
    visible: boolean;
    over: Over | null;
};

export const Item: FC<ItemProps> = ({ id, name, visible }) => {
    const activeLayer = useLayersStore((state) => state.activeLayer);

    const changeActiveLayer = useLayersStore((state) => state.setActiveLayer);
    const changeLayerVisibility = useLayersStore(
        (state) => state.changeLayerVisibility
    );
    const deleteLayer = useLayersStore((state) => state.deleteLayer);

    const { isOpen, close, open } = useOpen();

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

    const onContextMenuHandler = (event: MouseEvent<HTMLElement>) => {
        event.preventDefault();
        setClickEvent(event);
        open();
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

    const [clickEvent, setClickEvent] =
        useState<MouseEvent<HTMLElement> | null>(null);

    const onOpenFiltersHandler = (event: MouseEvent<HTMLButtonElement>) => {
        event.stopPropagation();
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
            onClick={toggleActiveLayerHandler(id)}
            onContextMenu={onContextMenuHandler}
        >
            <DragIcon
                {...listeners}
                {...attributes}
                width={16}
                height={16}
                className={styles.dragIcon}
            />
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
            </div>
            <span>{name}</span>
            <button onClick={onDeleteLayerHandler(id)} title="Удалить слой">
                <CrossIcon className={styles.crossIcon} />
            </button>
            <ContextMenu
                isOpen={isOpen}
                close={close}
                clickEvent={clickEvent}
                buttons={() => {
                    return (
                        <>
                            <button
                                name="create"
                                onClick={onOpenFiltersHandler}
                            >
                                Фильтры
                            </button>
                        </>
                    );
                }}
            />
        </div>
    );
};
