import { Editor } from '../pages/editor/index.tsx';
import styles from './App.module.scss';

function App() {
    return (
        <div className={styles.container}>
            <Editor />
        </div>
    );
}

export default App;
