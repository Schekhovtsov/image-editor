import { Canvas } from './ui/canvas';
import { Navbar } from './ui/navbar';
import { CreateWindow } from '../../widgets/createWindow';
import { useRef } from 'react';
import { Tools } from './ui/tools/Tools';
import { Footer } from './ui/footer/Footer';

export const Editor = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    return (
        <>
            <Navbar canvasRef={canvasRef} />
            <Canvas canvasRef={canvasRef} />
            <CreateWindow />
            <Tools />
            <Footer />
        </>
    );
};
