import { Tool } from '../../model/types';

export const getCursor = ({
    activeTool,
    isDragging,
}: {
    activeTool: Tool | null;
    isDragging: boolean;
}) => {
    if (activeTool !== 'move') {
        return 'default';
    }

    if (isDragging) {
        return 'grabbing';
    } else {
        return 'grab';
    }
};
