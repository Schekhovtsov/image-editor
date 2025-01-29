import { useState } from 'react';
import { useEditorStore } from '../../../pages/editor/model/slice';
import { Window } from '../../../shared/ui/window/Window';

import styles from './CreateWindow.module.scss';

export const CreateWindow = () => {
    const toggleWindow = useEditorStore((state) => state.toggleWindow);
    const createCanvas = useEditorStore((state) => state.setCanvas);
    
    const windows = useEditorStore((state) => state.windows);

    const [canvasSize, setCanvasSize] = useState({ height: 500, width: 500 });

    const onChangeInputSize = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCanvasSize({
            ...canvasSize,
            [e.target.name]: Number(e.target.value),
        });
    };

    const onCreateCanvasHandler = () => {
        createCanvas(canvasSize);
        toggleWindow('create');
    };

    return (
        <Window
            title="Создать"
            isOpen={windows['create']}
            onClose={() => toggleWindow('create')}
            onSave={onCreateCanvasHandler}
        >
            <div className={styles.container}>
                <span>Введите размеры холста</span>
                <div>
                    Ширина:
                    <input
                        type="number"
                        name="width"
                        value={canvasSize.width}
                        onChange={onChangeInputSize}
                    />
                </div>
                <div>
                    Высота:
                    <input
                        type="number"
                        name="height"
                        value={canvasSize.height}
                        onChange={onChangeInputSize}
                    />
                </div>
            </div>
        </Window>
    );
};
