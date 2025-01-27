import { FC } from 'react';
import styles from './Window.module.scss';

type WindowProps = {
    title: string;
    width?: number;
    height?: number;
    children: JSX.Element;
};

export const Window: FC<WindowProps> = ({
    title,
    width = 300,
    height = 400,
    children,
}) => {
    return (
        <div className={styles.container} style={{ width, height }}>
            <div className={styles.header}>{title}</div>
            <div className={styles.body}>{children}</div>
        </div>
    );
};
