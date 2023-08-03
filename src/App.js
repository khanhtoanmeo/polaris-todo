import "@shopify/polaris/dist/styles.css";
import { AppProvider } from "@shopify/polaris";
import MyTopBar from "./layout/TopBar";
import Todos from "./components/Todos";
import TodosContext from "./store/todosContext";
import { useState } from "react";
import TodoModal from "./components/TodoModal";
import AppLayout from "./layout/AppLayout";

function App() {
  const [todos, setTodos] = useState([]);
  const [active, setActive] = useState(false);

  const toggleModal = () => {
    setActive((active) => !active);
  };

  return (
    <AppProvider>
      <TodosContext.Provider value={{ todos, setTodos }}>
        <AppLayout>
          <Todos toggleModal={toggleModal} />
          <TodoModal active={active} toggleModal={toggleModal} />
        </AppLayout>
      </TodosContext.Provider>
    </AppProvider>
  );
}

export default App;
