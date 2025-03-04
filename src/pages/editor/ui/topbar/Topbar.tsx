import { useEditorStore } from 'pages/editor/model/editorStore';

import styles from './Topbar.module.scss';

export const Topbar = () => {
    const isTopBarEnabled = useEditorStore((state) => state.windows.topbar);

    const crop = useEditorStore((state) => state.crop)

    if (!isTopBarEnabled) {
        return null;
    }

    return <div className={styles.container}>
        <div className={styles.crop}>
            <span><b>Изменение размера изображения</b></span>
            <span>Новый размер: {crop.width}x{crop.height}</span>
        </div>
    </div>;
};
