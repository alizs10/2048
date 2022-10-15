import { Container } from "./components/Container";
import { Functions } from "./components/Functions";
import { Head } from "./components/Head";
import { Hint } from "./components/Hint";
import { Info } from "./components/Info";

function App() {
  return (
    <div className="flex flex-col gap-y-4 p-5 h-screen bg-gray-200">
      <Head />
      <Hint/>
      <Container />
      <Info />
      <Functions/>
    </div>
  );
}

export default App;
