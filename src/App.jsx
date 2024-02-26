import { BrowserRouter as Router } from 'react-router-dom'; // Importa BrowserRouter si estás utilizando React Router
import Header from './components/Header/Header'; 
import Body  from './components/Body/Body';
import Footer from './components/Footer/Footer';
import AgregarProducto from './components/FormAgregarProducto/AgregarProducto';


const App = () => {
  return (
    <Router>
      <div className="App">
        <Header />
        <Body/>
        <AgregarProducto/>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
