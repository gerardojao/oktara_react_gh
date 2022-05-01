
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import {BrowserRouter, Routes, Route} from "react-router-dom"
import ShowCats from './Components/ShowCats';
import InsertCat from './Components/InsertCat'
import EditCat from './Components/EditCat'

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <BrowserRouter>
            <Routes>
              <Route path = "/" element = {<ShowCats />} />
              <Route path = "/create" element = {<InsertCat />} />
              <Route path = "/edit/:id" element = {<EditCat />} />
            </Routes>     
      </BrowserRouter>
        
       
      </header>
    </div>
  );
}

export default App;
