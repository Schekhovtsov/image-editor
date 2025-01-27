import { Canvas } from '../../../widgets/canvas/Canvas';
import { Navbar } from '../../../widgets/navbar/Navbar';

import styles from './Editor.module.scss';

export const Editor = () => {
    return (
        <div className={styles.container}>
            <Navbar />
            <Canvas />
        </div>
    );
};
