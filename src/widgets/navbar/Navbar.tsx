import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react';
import styles from './Navbar.module.scss';

export const Navbar = () => {
    return (
        <div className={styles.container}>
            <Menu>
                <MenuButton className={styles.topButton}>Файл</MenuButton>
                <MenuItems anchor="bottom" className={styles.dropdownItems}>
                    <MenuItem>
                        <a href="#">Создать</a>
                    </MenuItem>
                    <MenuItem>
                        <a href="#">Открыть...</a>
                    </MenuItem>
                    <MenuItem disabled>
                        <a href="#">Сохранить</a>
                    </MenuItem>
                    <MenuItem disabled>
                        <a href="#">Сохранить как</a>
                    </MenuItem>
                </MenuItems>
            </Menu>
        </div>
    );
};
