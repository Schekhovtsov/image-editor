import { useRef } from 'react';
import { CreateWindow } from 'widgets/createWindow';

import { Canvas } from './ui/canvas';
import { Footer } from './ui/footer';
import { Layers } from './ui/layers';
import { Navbar } from './ui/navbar';
import { Tools } from './ui/tools';

export const Editor = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    return (
        <>
            <Navbar canvasRef={canvasRef} />
            <Canvas canvasRef={canvasRef} />
            <CreateWindow />
            <Tools />
            <Layers />
            <Footer />
        </>
    );
};
