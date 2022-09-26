import Layout from './components/Layout';
import "./styles/style.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import MainPage from "./pages/MainPage";
import DetailPage from './pages/DetailPage';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route exact path="/" element={<MainPage />} />
          <Route path="/frontend-mentor-countries" element={<MainPage />} />
          <Route path="/:name" element={<DetailPage />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
