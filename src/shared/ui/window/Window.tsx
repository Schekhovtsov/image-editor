import { FC, useCallback, useEffect, useRef, useState } from 'react';
import styles from './Window.module.scss';
import { getInitialPosition } from './utils';

type WindowProps = {
    title: string;
    isOpen: boolean;
    onClose: () => void;
    width?: number;
    height?: number;
    showCloseButton?: boolean;
    onSave: () => void;
    children: JSX.Element;
};

export const Window: FC<WindowProps> = ({
    isOpen,
    onClose,
    title,
    width = 400,
    height = 400,
    showCloseButton = true,
    onSave,
    children,
}) => {
    const [isDragging, setIsDragging] = useState(false);

    const [position, setPosition] = useState<{ x: number; y: number }>(
        getInitialPosition({ width, height })
    );

    const startPos = useRef<{ x: number; y: number }>(
        getInitialPosition({ width, height })
    );
    const popupRef = useRef<HTMLDivElement | null>(null);

    const onMouseMove = useCallback(
        (e: MouseEvent) => {
            if (!isDragging) return;
            setPosition({
                x: e.clientX - startPos.current.x,
                y: e.clientY - startPos.current.y,
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
        if (!isOpen) {
            setPosition(getInitialPosition({ width, height }));
        }
    }, [isOpen, width, height]);

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
            <div className={styles.header} onMouseDown={onMouseDown}>
                {title}
                {showCloseButton && <button onClick={onClose}>X</button>}
            </div>
            <div className={styles.body}>{children}</div>
            <div className={styles.footer}>
                <button onClick={onClose}>Отмена</button>
                <button onClick={onSave}>Принять</button>
            </div>
        </div>
    );
};
