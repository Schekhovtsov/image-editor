import { Y_OFFSET } from './config';

export const getInitialPosition = ({
    width,
    height,
}: {
    width: number;
    height: number;
}) => ({
    x: document.documentElement.clientWidth / 2 - width / 2,
    y: document.documentElement.clientHeight / 2 - height / 2 + Y_OFFSET,
});
