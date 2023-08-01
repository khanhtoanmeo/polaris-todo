import "@shopify/polaris/dist/styles.css";
import { AppProvider } from "@shopify/polaris";
import MyTopBar from "./components/TopBar";
import Todos from "./components/Todos";
import TodosContext from "./store/todosContext";
import { useState } from "react";
import TodoModal from "./components/TodoModal";

function App() {
  const [todos, setTodos] = useState([]);
  const [active, setActive] = useState(false);

  const toggleModal = () => {
    setActive((active) => !active);
  };

  //todo : em chia thư mục thế này có vẻ chưa ổn, chỗ chia thư mục anh sẽ hướng dẫn lại .

  return (
    <AppProvider>
      <TodosContext.Provider value={{ todos, setTodos }}>
        <MyTopBar />
        <Todos toggleModal={toggleModal} />
        <TodoModal active={active} toggleModal={toggleModal} />
      </TodosContext.Provider>
    </AppProvider>
  );
}

export default App;
