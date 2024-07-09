import {createRoot} from 'react-dom/client';

import './index.css';
import App from './App';

//ReactDOM.render(<App />, document.getElementById('root')); Deprecated in v18

const rootElement = document.getElementById('root');
const root = createRoot(rootElement);

root.render(<App />);