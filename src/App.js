import { AnimatePresence } from "framer-motion";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Container } from "./components/Container";
import { Functions } from "./components/Functions";
import GameOver from "./components/GameOver";
import { Head } from "./components/Head";
import { Hint } from "./components/Hint";
import { Info } from "./components/Info";
import Win from "./components/Win";
import { initial } from "./redux/slices/squaresSlice";
import { motion } from 'framer-motion'
import UndoProvider from "./components/Providers/UndoProvider";


function App() {

  const { win, gameOver } = useSelector(state => state.rules)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initial())

  }, [])

  return (

    <motion.div
      initial={{ left: "100%" }}
      animate={{ left: "auto" }}
      exit={{ left: "100%" }}
      transition={{ bounce: "none" }}
      className="absolute top-0 w-full h-full flex flex-col gap-y-4 py-5 px-12 bg-stone-200 overflow-hidden">
      <Head />
      <Hint />
      <Container />
      <Info />
      <Functions />

      <AnimatePresence>
        {win && (
          <UndoProvider>
            <Win />
          </UndoProvider>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {gameOver && (
          <UndoProvider>
            <GameOver />
          </UndoProvider>
        )}
      </AnimatePresence>

    </motion.div>

  );
}

export default App;
