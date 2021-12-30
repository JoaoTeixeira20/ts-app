import './App.css';
import GlobalStyle from './styles/globalStyle';
import FormComponent from './components/form/FormComponent';
import { formConfig } from './configuration/configuration';
import { FormValuesContextProvider } from './context/FormValuesContext';
import CheckFormStateTest from './components/testComponents/CheckFormStateTest';
import MultiRangeSlider from './components/form/inputTypes/MultiRangeSlider/MultiRangeSliderInput';

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
      <FormValuesContextProvider formConfig={formConfig}>
        <FormComponent content={formConfig} />
        <CheckFormStateTest />
      </FormValuesContextProvider>
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
