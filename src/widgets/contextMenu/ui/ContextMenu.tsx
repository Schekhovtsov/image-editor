import { FC, MouseEvent, ReactNode } from 'react';
import { Popover } from 'shared/ui/popover';
import { Portal } from 'shared/ui/portal';

import styles from './ContextMenu.module.scss';

type ContextMenuProps = {
    isOpen: boolean;
    close: () => void;
    buttons: () => ReactNode;
    clickEvent: MouseEvent<Element, globalThis.MouseEvent> | null;
};

export const ContextMenu: FC<ContextMenuProps> = ({
    isOpen,
    close,
    buttons,
    clickEvent,
}) => {
    if (!isOpen) {
        return null;
    }

    return (
        <Portal>
            <Popover isOpen={isOpen} close={close} clickEvent={clickEvent}>
                <div className={styles.container}>{buttons()}</div>
            </Popover>
        </Portal>
    );
};
