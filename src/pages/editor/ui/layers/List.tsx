import { useDroppable } from '@dnd-kit/core';
import { useLayersStore } from 'pages/editor/model/layersStore';
import { Layer } from 'pages/editor/model/types';
import { FC } from 'react';
import PlusIcon from 'shared/assets/icons/plus.svg?react';

import { Item } from './Item';
import styles from './styles.module.scss';

type ListProps = {
    layers: Layer[];
};

export const List: FC<ListProps> = ({ layers }) => {
    const addLayer = useLayersStore((state) => state.addLayer);

    const { over, setNodeRef: droppableRef } = useDroppable({
        id: 'droppable',
    });
    const onAddLayerHandler = () => {
        addLayer();
    };

    return (
        <>
            <div className={styles.container} ref={droppableRef}>
                {layers.toReversed().map((props) => (
                    <Item key={props.id} over={over} {...props} />
                ))}
            </div>
            <div className={styles.footer}>
                <button onClick={onAddLayerHandler} title="Добавить слой">
                    <PlusIcon className={styles.icon} />
                </button>
            </div>
        </>
    );
};
