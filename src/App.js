import "./App.css"
import Bio from "./components/Bio/Bio";
import Button from "./components/Button/Button";
import Greetings from "./components/Greetings/Greetings";
import { GlobalStyles } from "./GlobalStyles";
function App() {
  

  return (
    <>
      <Greetings />
      <Bio />
      <Button />
      <GlobalStyles />
    </>
  );
}

export default App;
