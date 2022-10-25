import { AnimatePresence } from "framer-motion";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Container } from "./components/Container";
import { Functions } from "./components/Functions";
import { Head } from "./components/Head";
import { Hint } from "./components/Hint";
import { Info } from "./components/Info";
import MoveProvider from "./components/Providers/MoveProvider";
import Win from "./components/Win";
import { initial } from "./redux/slices/squaresSlice";

function App() {

  const { win } = useSelector(state => state.rules)
  const dispatch = useDispatch()
  useEffect(() => {

    dispatch(initial())

  }, [])

  return (
    <div className="relative flex flex-col gap-y-4 py-5 px-12 h-screen bg-gray-200 md:w-3/5 lg:w-[45%] xl:w-1/3 sm:mx-auto overflow-hidden">
      <Head />
      <Hint />
      <MoveProvider>
        <Container />
      </MoveProvider>
      <Info />
      <MoveProvider>
        <Functions />
      </MoveProvider>
      {win && (
        <AnimatePresence>
          <Win />
        </AnimatePresence>
      )}
    </div>
  );
}

export default App;
