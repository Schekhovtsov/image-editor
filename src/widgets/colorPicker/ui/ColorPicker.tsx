import { Input, Popover, PopoverButton, PopoverPanel } from '@headlessui/react';
import { useEditorStore } from 'pages/editor/model/editorStore';
import { type ChangeEvent } from 'react';
import { HexColorPicker } from 'react-colorful';

import styles from './ColorPicker.module.scss';

export const ColorPicker = () => {
    const color = useEditorStore((state) => state.color);
    const setColor = useEditorStore((state) => state.setColor);

    const onChangeColorHandler = (color: string) => {
        setColor(color);
    };

    const onInputChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setColor(event.target.value);
    };

    return (
        <Popover>
            <PopoverButton
                className={styles.button}
                style={{ backgroundColor: color }}
            />
            <PopoverPanel anchor="right start">
                <div className={styles.picker}>
                    <HexColorPicker
                        color={color}
                        onChange={onChangeColorHandler}
                    />
                    <Input value={color} onChange={onInputChangeHandler} />
                </div>
            </PopoverPanel>
        </Popover>
    );
};
