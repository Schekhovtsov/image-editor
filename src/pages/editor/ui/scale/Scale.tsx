import { useEditorStore } from 'pages/editor/model/editorStore';
import { ChangeEvent } from 'react';
import { Window } from 'shared/ui/window/Window';

import { SCALE_HEIGHT, SCALE_WIDTH } from './config';

export const Scale = () => {
    const windows = useEditorStore((state) => state.windows);
    const scale = useEditorStore((state) => state.scale);
    const setScale = useEditorStore((state) => state.setScale);

    const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        const newScale = parseFloat(event.target.value);
        setScale(newScale);
    };

    return (
        <Window
            isOpen={windows['scale']}
            withoutButtons
            width={SCALE_WIDTH}
            height={SCALE_HEIGHT}
            inCenterOfScreen={false}
            initialPosition={{ x: 100, y: 50 }}
            title="Масштаб"
        >
            <div>
                <input
                    type="range"
                    min="0.1"
                    max="3"
                    step="0.1"
                    value={scale}
                    onChange={onChangeHandler}
                />
                <span>Масштаб: {scale.toFixed(1)}x</span>
            </div>
        </Window>
    );
};
