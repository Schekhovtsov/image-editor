import { FC, MouseEvent, RefObject } from 'react';
import {
    Menu,
    MenuButton,
    MenuItem,
    MenuItems,
    MenuSeparator,
} from '@headlessui/react';
import styles from './Navbar.module.scss';
import { useEditorStore } from '../../model/slice';
import { Window } from '../../model/types';
import CheckIcon from '../../../../shared/assets/icons/check.svg?react';

type NavbarProps = {
    canvasRef: RefObject<HTMLCanvasElement>;
};

export const Navbar: FC<NavbarProps> = ({ canvasRef }) => {
    const canvasState = useEditorStore((state) => state.canvas);
    const toggleWindow = useEditorStore((state) => state.toggleWindow);
    const { tools } = useEditorStore((state) => state.windows);

    const deleteCanvas = useEditorStore((state) => state.deleteCanvas);

    const toggleWindowHandler =
        (preventDefault?: boolean) =>
        (event: MouseEvent<HTMLButtonElement>) => {
            if (preventDefault) event.preventDefault();
            const window = event.currentTarget.name as Window;
            toggleWindow(window);
        };

    const onCloseHandler = () => {
        deleteCanvas();
    };

    const onSaveAsHandler = () => {
        if (canvasRef.current) {
            const downloadLink = document.createElement('a');
            downloadLink.setAttribute('download', 'CanvasAsImage.png');

            const dataURL = canvasRef.current.toDataURL('image/png');
            const url = dataURL.replace(
                /^data:image\/png/,
                'data:application/octet-stream'
            );

            downloadLink.setAttribute('href', url);
            downloadLink.click();
        }
    };

    return (
        <div className={styles.container}>
            <span className={styles.title}>Image Editor</span>
            <Menu>
                <MenuButton className={styles.topButton}>Файл</MenuButton>
                <MenuItems
                    anchor="bottom start"
                    className={styles.dropdownItems}
                >
                    <MenuItem>
                        <button name="create" onClick={toggleWindowHandler()}>
                            Создать
                        </button>
                    </MenuItem>
                    <MenuItem>
                        <button>Открыть...</button>
                    </MenuItem>
                    <MenuItem disabled>
                        <button>Сохранить</button>
                    </MenuItem>
                    <MenuItem disabled={!canvasState}>
                        <button onClick={onSaveAsHandler}>Сохранить как</button>
                    </MenuItem>
                    <MenuItem disabled={!canvasState}>
                        <button onClick={onCloseHandler}>
                            Закрыть изображение
                        </button>
                    </MenuItem>
                </MenuItems>
            </Menu>
            <MenuSeparator />
            <Menu>
                <MenuButton className={styles.topButton}>Окна</MenuButton>
                <MenuItems
                    anchor="bottom start"
                    className={styles.dropdownItems}
                >
                    <MenuItem>
                        <button
                            name="tools"
                            onClick={toggleWindowHandler(true)}
                        >
                            Панель инструментов
                            {tools && <CheckIcon width={16} height={16} />}
                        </button>
                    </MenuItem>
                </MenuItems>
            </Menu>
        </div>
    );
};
