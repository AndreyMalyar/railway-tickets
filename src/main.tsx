import { createRoot } from 'react-dom/client'
import './scss/style.scss'
import App from './App.tsx'
import {BrowserRouter} from "react-router-dom";
import {Provider} from "react-redux";
import {store} from "./store/store.ts";

createRoot(document.getElementById('root')!).render(
    <Provider store={store}>
        <BrowserRouter basename="/railway-tickets">
            <App />
        </BrowserRouter>
    </Provider>

)
