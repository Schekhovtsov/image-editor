import { useRef } from 'react';
import { CreateWindow } from 'widgets/createWindow';

import { Canvas } from './ui/canvas';
import { Footer } from './ui/footer';
import { Layers } from './ui/layers';
import { Navbar } from './ui/navbar';
import { Tools } from './ui/tools';
import { Topbar } from './ui/topbar';

export const Editor = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const changeSizeCanvasRef = useRef<HTMLCanvasElement>(null);

    return (
        <>
            <Navbar canvasRef={canvasRef} />
            <Topbar
                canvasRef={canvasRef}
                changeSizeCanvasRef={changeSizeCanvasRef}
            />
            <Canvas
                canvasRef={canvasRef}
                changeSizeCanvasRef={changeSizeCanvasRef}
            />
            <CreateWindow />
            <Tools />
            <Layers />
            <Footer />
        </>
    );
};
