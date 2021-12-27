import './App.css';
import FormBuilder from './components/form/FormBuilder';
import { FormContextProvider } from './context/FormContext';
import GlobalStyle from './styles/globalStyle';

import { uploadConfiguration } from './configuration/configuration';
import MultiRangeSlider from './components/form/inputTypes/MultiRangeSlider/MultiRangeSliderInput';
import { Test } from './context/NestedContext';
import { WrappedForm } from './context/FromContextv2';
import { formConfig } from './configuration/configurationv2';

function App() {
  return (
    <div className='App'>
      <GlobalStyle />
      {/* <FormBuilder content={uploadConfiguration} mainFormKey='root' />
      <div>slider</div>
      <MultiRangeSlider
        min={0}
        max={1000}
        onChange={({ min, max }: { min: number; max: number }) =>
          console.log(`min = ${min}, max = ${max}`)
        }
      /> */}
      {/* <Test /> */}
      <WrappedForm content={formConfig} />
    </div>
  );
}

export default App;
