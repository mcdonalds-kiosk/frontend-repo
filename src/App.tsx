import { BrowserRouter } from 'react-router-dom';
import { Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Join from './pages/Join';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/login' element={<Login />} />
        <Route path='/join' element={<Join />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

