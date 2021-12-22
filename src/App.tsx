import "./App.css";
import FormBuilder from "./components/form/FormBuilder";
import FormContextProvider from "./context/FormContext";
import GlobalStyle from "./styles/globalStyle";

import { uploadConfiguration } from "./configuration/configuration";

function App() {
  return (
    <div className="App">
      <GlobalStyle />
      <FormContextProvider>
        {/* <Tabs/> */}
        <FormBuilder fields={uploadConfiguration} />
      </FormContextProvider>
    </div>
  );
}

export default App;
