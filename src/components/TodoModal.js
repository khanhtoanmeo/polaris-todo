import { Modal, TextField } from "@shopify/polaris";
import { useState, useContext } from "react";
import TodosContext from "../store/todosContext";
import fetchData from "../helpers/fetchData";

function TodoModal({ active, toggleModal }) {
  const { setTodos } = useContext(TodosContext);
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(false);

  const addTodo = async (title) => {
    try {
      setLoading(true);
      if (!title.trim()) throw new Error("Please enter something meaningful");

      const newTodo = { title, isCompleted: false };
      const requestConfig = {
        url: "/todos",
        method: "post",
        data: newTodo,
      };
      const { success, todo } = await fetchData(requestConfig);
      //todo cái này anh nghĩ nên trả error ở trong backend dể try catch nó bắt luôn đc error chứ không nên viết thế này
      //anh thấy mấy chỗ đều như thế , xem xét sửa lại nhé
      if (!success) throw new Error("Fail to add todo");
      setTodos((todos) => [...todos, todo]);
    } catch (error) {
      alert(error.message);
    } finally {
      toggleModal();
      setLoading(false);
      setTitle("");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addTodo(title);
  };

  const changeHandler = (newTitle) => {
    setTitle(newTitle);
  };

  return (
    <div style={{ height: "500px" }}>
      <Modal
        loading={loading}
        open={active}
        onClose={toggleModal}
        title="Create a new todo"
        primaryAction={{
          content: "Create",
          onAction: handleSubmit,
        }}
        secondaryActions={[
          {
            content: "Cancel",
            onAction: toggleModal,
          },
        ]}
      >
        <Modal.Section>
          <TextField
            value={title}
            placeholder="Add todo"
            onChange={changeHandler}
            label={""}
            labelHidden
          />
        </Modal.Section>
      </Modal>
    </div>
  );
}

export default TodoModal;
