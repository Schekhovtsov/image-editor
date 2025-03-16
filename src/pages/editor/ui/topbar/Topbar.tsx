import { FC, RefObject } from 'react';
import { Button } from 'shared/ui/button';

import { useChangeSizesStore } from '../../model/changeSizesStore';
import { useEditorStore } from '../../model/editorStore';
import { drawCropArea } from '../canvas/changeSizeCanvas/utils';
import styles from './Topbar.module.scss';

type TopbarProps = {
    canvasRef: RefObject<HTMLCanvasElement>;
    changeSizeCanvasRef: RefObject<HTMLCanvasElement>;
};

export const Topbar: FC<TopbarProps> = ({ canvasRef, changeSizeCanvasRef }) => {
    const isTopBarEnabled = useEditorStore((state) => state.windows.topbar);
    const scale = useEditorStore((state) => state.scale);
    const canvasState = useEditorStore((state) => state.canvas);
    const setCanvas = useEditorStore((state) => state.setCanvas);
    const toggleWindow = useEditorStore((state) => state.toggleWindow);
    const toggleCanvasSizeMode = useEditorStore(
        (state) => state.toggleCanvasSizeMode
    );

    const crop = useChangeSizesStore((state) => state.crop);

    if (!isTopBarEnabled) {
        return null;
    }

    const onCropHandler = () => {
        const canvas = canvasRef.current;
        const context = canvas?.getContext('2d');
        const tempCanvas = document.createElement('canvas');

        const cropPromise = new Promise((resolve) => {
            if (canvas && context) {
                tempCanvas.width = crop.width;
                tempCanvas.height = crop.height;
                const tempCtx = tempCanvas.getContext('2d');

                tempCtx?.drawImage(
                    canvas,
                    crop.x,
                    crop.y,
                    crop.width,
                    crop.height,
                    0,
                    0,
                    crop.width,
                    crop.height
                );

                setCanvas({ width: crop.width, height: crop.height });
                resolve(tempCanvas);
            }
        });

        cropPromise.then(() => {
            // TODO: Перенести согласно правилам FSD
            drawCropArea({
                canvasRef: changeSizeCanvasRef,
                crop: { width: crop.width, height: crop.height, x: 0, y: 0 },
            });

            if (context && tempCanvas) {
                context.drawImage(tempCanvas, 0, 0);
            }
        });
    };

    const onCloseCropHandler = () => {
        toggleWindow('topbar');
        toggleCanvasSizeMode();
    };

    return (
        <div className={styles.container}>
            <div className={styles.crop}>
                <span>
                    <b>Изменение размера изображения</b>
                </span>
                <span>
                    Новый размер: {crop.width}x{crop.height}
                </span>
                <div className={styles.buttonsContainer}>
                    <Button theme="outline" onClick={onCloseCropHandler}>
                        Закрыть
                    </Button>
                    <Button theme="outline" onClick={onCropHandler}>
                        Применить
                    </Button>
                </div>
            </div>
        </div>
    );
};
