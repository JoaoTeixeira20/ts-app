import './App.css';
import Tabs from './components/tabs/Tabs';
import FormContextProvider from './context/FormContext';
import GlobalStyle from './styles/globalStyle';


function App() {

  return (
    <div className="App">
      <GlobalStyle/>
      <FormContextProvider>
        <Tabs/>
      </FormContextProvider>
    </div>
  );
}

export default App;
