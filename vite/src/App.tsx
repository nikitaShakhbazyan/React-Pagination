import { Route, Routes } from 'react-router-dom';
import './App.css';
import Main from './Main/Main';
import Details from './Details/Details';


function App() {
  return (
    <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/:id" element={<Details />} />

    </Routes>
  );
}

export default App;
