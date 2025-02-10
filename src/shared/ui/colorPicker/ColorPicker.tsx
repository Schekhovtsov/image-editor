import { Popover, PopoverButton, PopoverPanel } from '@headlessui/react';
import { HexColorPicker } from 'react-colorful';

import { useEditorStore } from '../../../pages/editor/model/editorStore';
import useOpen from '../../lib/useOpen';
import styles from './ColorPicker.module.scss';

export const ColorPicker = () => {
    const color = useEditorStore((state) => state.color);
    const setColor = useEditorStore((state) => state.setColor);

    const { open, isOpen, close } = useOpen();

    const onChangeColorHandler = (color: string) => {
        setColor(color);
    };

    return (
        <Popover>
            <PopoverButton
                className={styles.button}
                style={{ backgroundColor: color }}
            >
                <button onClick={open} />
            </PopoverButton>
            <PopoverPanel anchor="right start">
                <div className={styles.picker}>
                    <HexColorPicker
                        color={color}
                        onChange={onChangeColorHandler}
                    />
                </div>
            </PopoverPanel>
        </Popover>
    );
};
