import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Container } from "./components/Container";
import { Functions } from "./components/Functions";
import { Head } from "./components/Head";
import { Hint } from "./components/Hint";
import { Info } from "./components/Info";
import MoveProvider from "./components/Providers/MoveProvider";
import { initial } from "./redux/slices/squaresSlice";

function App() {

  const dispatch = useDispatch()
  useEffect(() => {

    dispatch(initial())

  }, [])

  return (
    <div className="flex flex-col gap-y-4 p-5 h-screen bg-gray-200 lg:w-1/3 md:w-1/3 sm:mx-auto overflow-hidden">
      <Head />
      <Hint />
      <MoveProvider>
        <Container />
      </MoveProvider>
      <Info />
      <MoveProvider>
        <Functions />
      </MoveProvider>
    </div>
  );
}

export default App;
