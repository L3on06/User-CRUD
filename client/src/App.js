import './App.css';
import { Routes, Route} from "react-router-dom";
import Users from "./pages/Users";
import Add from './pages/Add';
import Update from './pages/Update';

function App() {
  return (
    <div className="App">
    <Routes>
          <Route path="/" element={<Users/>}></Route>
          <Route path="/add" element={<Add/>}></Route>
          <Route path="/update" element={<Update/>}></Route>
    </Routes>
    </div>
  );
}

export default App;
