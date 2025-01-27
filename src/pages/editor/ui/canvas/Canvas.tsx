import { Window } from '../../../../shared/ui/window/Window';
import { useEditorStore } from '../../model/slice';
import styles from './Canvas.module.scss';

export const Canvas = () => {
    const windows = useEditorStore((state) => state.windows);
    console.log(windows);
    return (
        <div className={styles.container}>
            {windows['create'] && (
                <Window title="Создать">
                    <div>Тело</div>
                </Window>
            )}
        </div>
    );
};
