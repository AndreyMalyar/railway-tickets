import HomePage from "./pages/home/HomePage.tsx";
import {Route, Routes} from "react-router-dom";
import Header from "./components/header/Header.tsx";
import SearchResultsPage from "./pages/searchResults/SearchResultsPage.tsx";
import type { PageConfig } from "./types/pageTypes.ts";
import Footer from "./components/footer/Footer.tsx";

import { useLocation } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "./store/hooks.ts";
import { setTheme } from "./store/slices/uiSlice.ts";
import { useEffect } from "react";
import Calendar from "./components/forms/Calendar.tsx";


function App() {
    const location = useLocation();
    const dispatch = useAppDispatch();
    const theme = useAppSelector(state => state.ui.theme);

    // Устанавливаем тему в зависимости от роута
    useEffect(() => {
        if (location.pathname === '/') {
            dispatch(setTheme('dark'));
        } else {
            dispatch(setTheme('light'));
        }
    }, [location.pathname, dispatch]);


    const getPageConfig = (currentTheme: 'light' | 'dark'): PageConfig => {
        if(currentTheme === 'dark') {
            return {
                hasFooter: false,
                backgroundClass: 'page--dark'
            }
        }
        return {
            hasFooter: true,
            backgroundClass: 'page--light'
        }
    }

    const pageConfig = getPageConfig(theme);
  return (
    <div className={pageConfig.backgroundClass}>
        <Header />
        <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/search-results" element={<SearchResultsPage />} />
            <Route path="/review" element={<h2>Здесь будет страница</h2>} />
            <Route path="/mobile-app" element={<h1>Здесь должно быть мобильное приложение</h1>} />
            <Route path="/faq's" element={<h1>Здесь должны быть часто задаваемые вопросы</h1>} />
            <Route path="/contact" element={<h1>Здесь должны быть контакты</h1>} />
        </Routes>
        {pageConfig.hasFooter && <Footer />}
    </div>
  )
}

export default App
