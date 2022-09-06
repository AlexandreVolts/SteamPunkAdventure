import { Route, Routes } from 'react-router-dom';
import Layout from './components/Layout';
import Game from './routes/Game';
import Home from './routes/Home';
import SelectLevel from './routes/SelectLevel';

export default function App() {
  document.title = "Steam Punk Adventure";

  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/select-level" element={<SelectLevel />} />
        <Route path="/game" element={<Game />} />
      </Routes>
    </Layout>
  );
}
