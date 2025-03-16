import clsx from 'clsx';
import { ButtonHTMLAttributes, DetailedHTMLProps, FC, ReactNode } from 'react';

import styles from './Button.module.scss';

type ButtonProps = {
    theme?: 'basic' | 'outline';
    children: ReactNode;
} & DetailedHTMLProps<
    ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
>;

export const Button: FC<ButtonProps> = ({
    theme = 'basic',
    children,
    ...buttonProps
}) => {
    return (
        <button
            {...buttonProps}
            className={clsx(theme === 'outline' && styles.outline)}
        >
            {children}
        </button>
    );
};
