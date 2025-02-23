import { closestCenter, DndContext, DragEndEvent } from '@dnd-kit/core';
import { restrictToVerticalAxis } from '@dnd-kit/modifiers';
import {
    SortableContext,
    verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { useLayersStore } from 'pages/editor/model/layersStore';
import { Window } from 'shared/ui/window/Window';

import { useEditorStore } from '../../model/editorStore';
import { LAYERS_HEIGHT, LAYERS_WIDTH, RIGHT_OFFSET } from './config';
import { List } from './List';
import styles from './styles.module.scss';

export const Layers = () => {
    const windows = useEditorStore((state) => state.windows);
    const layers = useLayersStore((state) => state.layers);
    
    const reorderLayers = useLayersStore((state) => state.reorderLayers);

    const x =
        document.documentElement.clientWidth - LAYERS_WIDTH - RIGHT_OFFSET;

    const handleDragEnd = (event: DragEndEvent) => {
        const { active, over } = event;

        if (over?.id && active.id !== over?.id) {
            const fromIndex = layers.findIndex(
                (layer) => layer.id === active.id
            );
            const toIndex = layers.findIndex((layer) => layer.id === over?.id);

            reorderLayers({ fromIndex, toIndex });
        }
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
            <DndContext
                modifiers={[restrictToVerticalAxis]}
                collisionDetection={closestCenter}
                onDragEnd={handleDragEnd}
            >
                <SortableContext
                    items={layers}
                    strategy={verticalListSortingStrategy}
                >
                    <List layers={layers} />
                </SortableContext>
            </DndContext>
        </Window>
    );
};
