import HomePage from "./pages/home/HomePage.tsx";
import {Route, Routes} from "react-router-dom";
import Header from "./components/header/Header.tsx";
import SearchResultsPage from "./pages/searchResults/SearchResultsPage.tsx";


function App() {

  return (
    <>
        <Header />
        <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/search-results" element={<SearchResultsPage />} />
            <Route path="/review" element={<h2>Здесь будет страница</h2>} />
            <Route path="/mobile-app" element={<h1>Здесь должно быть мобильное приложение</h1>} />
            <Route path="/faq's" element={<h1>Здесь должны быть часто задаваемые вопросы</h1>} />
            <Route path="/contact" element={<h1>Здесь должны быть контакты</h1>} />
        </Routes>

    </>
  )
}

export default App
