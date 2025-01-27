import { Canvas } from '../canvas/Canvas';
import { Navbar } from '../navbar/Navbar';
import { CreateWindow } from '../../../../widgets/createWindow';

import styles from './Editor.module.scss';

export const Editor = () => {
    return (
        <div className={styles.container}>
            <Navbar />
            <Canvas />
            <CreateWindow />
        </div>
    );
};
