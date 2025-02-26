import {
    Menu,
    MenuButton,
    MenuItem,
    MenuItems,
    MenuSeparator,
} from '@headlessui/react';
import { ChangeEvent, FC, MouseEvent, RefObject, useRef } from 'react';
import CheckIcon from 'shared/assets/icons/check.svg?react';

import { useEditorStore } from '../../model/editorStore';
import { useLayersStore } from '../../model/layersStore';
import { Window } from '../../model/types';
import styles from './Navbar.module.scss';

type NavbarProps = {
    canvasRef: RefObject<HTMLCanvasElement>;
};

export const Navbar: FC<NavbarProps> = ({ canvasRef }) => {
    const canvasState = useEditorStore((state) => state.canvas);
    const toggleWindow = useEditorStore((state) => state.toggleWindow);
    const setCanvas = useEditorStore((state) => state.setCanvas);
    const deleteCanvas = useEditorStore((state) => state.deleteCanvas);
    const openImageFromPC = useLayersStore((state) => state.openImageFromPC);
    const setImageWasOpened = useEditorStore(
        (state) => state.setImageWasOpened
    );

    const { tools, layers } = useEditorStore((state) => state.windows);

    const fileInputRef = useRef<HTMLInputElement>(null);

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

    const inputHandler = (event: ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];

        if (file) {
            const reader = new FileReader();

            reader.onload = (e) => {
                const img = new Image();
                img.onload = () => {
                    setCanvas({ width: img.width, height: img.height });
                    openImageFromPC({
                        file,
                        onImageLoad: () => {
                            setImageWasOpened(true);
                        },
                    });
                };

                img.src = e.target?.result as string;
            };

            reader.readAsDataURL(file);

            if (!(layers && tools)) {
                toggleWindow('layers');
                toggleWindow('tools');
                toggleWindow('scale');
            }
        }
    };

    const openImageHandler = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
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
                        <>
                            <button onClick={openImageHandler}>
                                Открыть...
                            </button>
                            <input
                                type="file"
                                ref={fileInputRef}
                                style={{ display: 'none' }}
                                accept="image/*"
                                onChange={inputHandler}
                            />
                        </>
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
                <MenuButton className={styles.topButton}>
                    Редактировать
                </MenuButton>
                <MenuItems
                    anchor="bottom start"
                    className={styles.dropdownItems}
                >
                    <MenuItem>
                        <button name="create" onClick={() => {}}>
                            Изменить размер изображения
                        </button>
                    </MenuItem>
                </MenuItems>
            </Menu>
            <MenuSeparator />
            <Menu>
                <MenuButton
                    className={styles.topButton}
                    disabled={!canvasState}
                >
                    Окна
                </MenuButton>
                <MenuItems
                    anchor="bottom start"
                    className={styles.dropdownItems}
                >
                    <MenuItem>
                        <button
                            name="tools"
                            onClick={toggleWindowHandler(true)}
                            disabled={!canvasState}
                        >
                            Панель инструментов
                            {tools && <CheckIcon width={16} height={16} />}
                        </button>
                    </MenuItem>
                    <MenuItem>
                        <button
                            name="layers"
                            onClick={toggleWindowHandler(true)}
                            disabled={!canvasState}
                        >
                            Слои
                            {layers && <CheckIcon width={16} height={16} />}
                        </button>
                    </MenuItem>
                </MenuItems>
            </Menu>
        </div>
    );
};
