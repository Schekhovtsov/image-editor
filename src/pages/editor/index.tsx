import { useRef } from 'react';
import { CreateWindow } from 'widgets/createWindow';

import { Canvas } from './ui/canvas';
import { Footer } from './ui/footer/Footer';
import { Layers } from './ui/layers/Layers';
import { Navbar } from './ui/navbar';
import { Scale } from './ui/scale/Scale';
import { Tools } from './ui/tools/Tools';

export const Editor = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    return (
        <>
            <Navbar canvasRef={canvasRef} />
            <Canvas canvasRef={canvasRef} />
            <Scale />
            <CreateWindow />
            <Tools />
            <Layers />
            <Footer />
        </>
    );
};
