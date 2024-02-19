import './App.css'
import Login from './components/Login';
import PageNotFound from './components/PageNotFound';
import Registration from './components/Registration';
import { Routes, Route } from 'react-router-dom';


function App() {

  return (
    <>
      <Routes>

        <Route path='/' element={ <Login />} />
        <Route path='/registration' element={<Registration />} />
<Route path='/resetpassword'  element={<PageNotFound />}/>
      </Routes>
       
     
    </>
  )
}

export default App
