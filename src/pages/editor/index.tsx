import { Canvas } from './ui/canvas';
import { Navbar } from './ui/navbar';
import { CreateWindow } from '../../widgets/createWindow';

export const Editor = () => {
    return (
        <>
            <Navbar />
            <Canvas />
            <CreateWindow />
        </>
    );
};
