import clsx from 'clsx';
import { FC, useCallback, useEffect, useRef, useState } from 'react';

import { FOOTER_HEIGHT, HEADER_HEIGHT } from './config';
import { getInitialPosition } from './utils';
import styles from './Window.module.scss';

type WithoutButtonsProps = {
    withoutButtons: true;
    onSave?: never;
    onClose?: never;
};

type WithButtonsProps = {
    withoutButtons?: false;
    onSave: () => void;
    onClose: () => void;
};

type InCenterOfScreen = {
    inCenterOfScreen?: true;
    initialPosition?: never;
};

type InInitialPosition = {
    inCenterOfScreen?: false;
    initialPosition: { x: number; y: number };
};

type WindowProps = {
    title?: string;
    isOpen: boolean;
    width?: number;
    height?: number;
    showCloseButton?: boolean;
    showDragPoint?: boolean;
    children: JSX.Element;
    bodyClassName?: string;
} & (WithoutButtonsProps | WithButtonsProps) &
    (InCenterOfScreen | InInitialPosition);

export const Window: FC<WindowProps> = ({
    isOpen,
    onClose,
    title,
    width = 400,
    height = 400,
    showCloseButton = true,
    onSave,
    children,
    withoutButtons = false,
    inCenterOfScreen = true,
    initialPosition = { x: 0, y: 0 },
    showDragPoint = false,
    bodyClassName,
}) => {
    const onSaveButtonRef = useRef<HTMLButtonElement | null>(null);

    const [isDragging, setIsDragging] = useState(false);

    const _position = inCenterOfScreen
        ? getInitialPosition({ width, height })
        : initialPosition;

    const [position, setPosition] = useState<{ x: number; y: number }>(
        _position
    );

    const startPos = useRef<{ x: number; y: number }>(_position);
    const popupRef = useRef<HTMLDivElement | null>(null);

    const onMouseMove = useCallback(
        (e: MouseEvent) => {
            if (!isDragging) return;

            const x = e.clientX - startPos.current.x;
            const y = e.clientY - startPos.current.y;

            if (x <= 0) return;
            if (y <= 0 + HEADER_HEIGHT) return;
            if (x >= document.documentElement.clientWidth - width) return;
            if (
                y >=
                document.documentElement.clientHeight - height - FOOTER_HEIGHT
            )
                return;

            setPosition({
                x,
                y,
            });
        },
        [isDragging]
    );

    const onMouseUp = () => {
        setIsDragging(false);
    };

    const onMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
        e.stopPropagation();
        setIsDragging(true);
        startPos.current = {
            x: e.clientX - position.x,
            y: e.clientY - position.y,
        };
    };

    useEffect(() => {
        window.addEventListener('mousemove', onMouseMove);
        window.addEventListener('mouseup', onMouseUp);

        return () => {
            window.removeEventListener('mousemove', onMouseMove);
            window.removeEventListener('mouseup', onMouseUp);
        };
    }, [onMouseMove]);

    useEffect(() => {
        return () => {
            setPosition(_position);
        };
    }, []);

    useEffect(() => {
        onSaveButtonRef.current?.focus();
    }, [isOpen]);

    if (!isOpen) {
        return null;
    }

    return (
        <div
            className={styles.container}
            style={{
                width,
                height,
                transform: `translate(${position.x}px, ${position.y}px)`,
            }}
            ref={popupRef}
        >
            <div
                className={styles.header}
                onMouseDown={onMouseDown}
                style={{
                    cursor: isDragging ? 'grabbing' : 'grab',
                }}
            >
                {showDragPoint && <div className={styles.dragPoint} />}
                {title}
                {!withoutButtons && showCloseButton && (
                    <button onClick={onClose}>X</button>
                )}
            </div>
            <div className={clsx(styles.body, bodyClassName)}>{children}</div>
            {!withoutButtons && (
                <div className={styles.footer}>
                    <button onClick={onClose}>Отмена</button>
                    <button onClick={onSave} ref={onSaveButtonRef}>
                        Принять
                    </button>
                </div>
            )}
        </div>
    );
};
