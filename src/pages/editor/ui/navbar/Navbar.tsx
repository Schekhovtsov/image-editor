import { MouseEvent } from 'react';
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react';
import styles from './Navbar.module.scss';
import { useEditorStore } from '../../model/slice';
import { Window } from '../../model/types';

export const Navbar = () => {
    const canvasState = useEditorStore((state) => state.canvas);
    const toggleWindow = useEditorStore((state) => state.toggleWindow);

    const deleteCanvas = useEditorStore((state) => state.deleteCanvas);

    const toggleWindowHandler = (event: MouseEvent<HTMLButtonElement>) => {
        const window = event.currentTarget.name as Window;
        toggleWindow(window);
    };

    const onCloseHandler = () => {
        deleteCanvas();
    };

    return (
        <div className={styles.container}>
            <Menu>
                <MenuButton className={styles.topButton}>Файл</MenuButton>
                <MenuItems anchor="bottom" className={styles.dropdownItems}>
                    <MenuItem>
                        <button name="create" onClick={toggleWindowHandler}>
                            Создать
                        </button>
                    </MenuItem>
                    <MenuItem>
                        <button>Открыть...</button>
                    </MenuItem>
                    <MenuItem disabled>
                        <button>Сохранить</button>
                    </MenuItem>
                    <MenuItem disabled>
                        <button>Сохранить как</button>
                    </MenuItem>
                    <MenuItem disabled={!canvasState}>
                        <button onClick={onCloseHandler}>
                            Закрыть изображение
                        </button>
                    </MenuItem>
                </MenuItems>
            </Menu>
        </div>
    );
};
