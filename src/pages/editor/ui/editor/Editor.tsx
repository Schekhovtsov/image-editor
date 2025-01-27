import { Canvas } from '../canvas/Canvas';
import { Navbar } from '../navbar/Navbar';

import styles from './Editor.module.scss';

export const Editor = () => {
    return (
        <div className={styles.container}>
            <Navbar />
            <Canvas />
        </div>
    );
};
