import './App.css';
import FormBuilder from './components/form/FormBuilder';
import FormContextProvider from './context/FormContext';
import GlobalStyle from './styles/globalStyle';

import { uploadConfiguration } from './configuration/configuration';
import MultiRangeSlider from './components/form/inputTypes/MultiRangeSlider/MultiRangeSliderInput';

function App() {
  return (
    <div className='App'>
      <GlobalStyle />
      <FormContextProvider>
        <FormBuilder content={uploadConfiguration} />
      </FormContextProvider>
      <div>slider</div>
      <MultiRangeSlider
        min={0}
        max={1000}
        onChange={({ min, max }: { min: number; max: number }) =>
          console.log(`min = ${min}, max = ${max}`)
        }
      />
    </div>
  );
}

export default App;
