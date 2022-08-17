import './App.css';
import 'bulma/css/bulma.min.css';
import 'react-rater/lib/react-rater.css';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import Home from './pages/Home';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
