import logo from './logo.svg';
// import './App.css';
import Login from './auth/login';
import { BrowserRouter as Router } from 'react-router-dom';
import RoutesComponent from './routes';

function App() {
  return (
      <RoutesComponent />
    // <div className="App">
    //  <Login/>
    // </div>
  );
}

export default App;
