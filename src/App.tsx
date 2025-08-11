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
import NotFoundPage from "./pages/404-Page/NotFoundPage.tsx";
import ReviewBookingPage from "./pages/reviewBooking/ReviewBookingPage.tsx";
import PaymentPage from "./pages/payment/PaymentPage.tsx";


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



    const getPageConfig = (currentTheme: 'light' | 'dark', pathname: string): PageConfig => {
        const validRoutes = ["/", "/search-results", "/review-booking", "mobile-app", "/faq\'s", "/contact", "/mobile-app", "/payment"];
        const isValidRoute = validRoutes.includes(pathname)
        if(currentTheme === 'dark' || !isValidRoute) {
            return {
                hasFooter: false,
                backgroundClass: currentTheme === 'dark' ? "page--dark": "page--light",
            }
        }
        return {
            hasFooter: true,
            backgroundClass: 'page--light'
        }
    }

    const pageConfig = getPageConfig(theme, location.pathname);
  return (
    <div className={pageConfig.backgroundClass}>
        <Header />
        <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/search-results" element={<SearchResultsPage />} />
            <Route path="/review-booking" element={<ReviewBookingPage />} />
            <Route path="/payment" element={<PaymentPage />} />
            <Route path="/mobile-app" element={<h1>Здесь должно быть мобильное приложение</h1>} />
            <Route path="/faq's" element={<h1>Здесь должны быть часто задаваемые вопросы</h1>} />
            <Route path="/contact" element={<h1>Здесь должны быть контакты</h1>} />
            <Route path="*" element={<NotFoundPage />} />
        </Routes>
        {pageConfig.hasFooter && <Footer />}
    </div>
  )
}

export default App
