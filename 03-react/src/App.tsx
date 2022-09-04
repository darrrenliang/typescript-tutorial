import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import TodoPage from './pages/TodoPage';
import HeaderBar from './components/HeaderBar'
import { ConfirmDialog } from 'primereact/confirmdialog';


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <HeaderBar />
        <Routes>
          <Route path='/home' element={<HomePage />} />
          <Route path='/todo' element={<TodoPage />} />
        </Routes>
      </BrowserRouter>
      <div>
        <ConfirmDialog />
      </div>
    </div >
  );
}

export default App;
