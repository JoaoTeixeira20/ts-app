import './App.css';
import GlobalStyle from './styles/globalStyle';
import { formConfig } from './configuration/configuration';
import MultiRangeSlider from './components/form/inputTypes/MultiRangeSlider/MultiRangeSliderInput';
import FormBuilder from './components/form/FormBuilder';

function App() {
  return (
    <div className='App'>
      <GlobalStyle />
      <FormBuilder config={formConfig} />
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
