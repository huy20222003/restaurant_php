import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'; 
//Page
import Login from './Pages/Login';

function App() {
 
  return (
    <Router>
      <div className='App'>
        <Routes>
          <Route index path='/auth/login' element = {<Login/>} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
