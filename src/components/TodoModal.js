import { Modal, TextField } from "@shopify/polaris";
import { useState } from "react";

function TodoModal({ active, toggleModal, onAddTodo }) {
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const addTodo = async (title) => {
    try {
      setLoading(true);
      if (!title.trim()) {
        throw new Error("Please enter something meaningful");
      }

      await onAddTodo(title);
    } catch (error) {
      setErrorMessage(error.message);
      setTimeout(() => setErrorMessage(""), 3000);
    } finally {
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
    <Modal
      loading={loading}
      open={active}
      onClose={() => {
        setTitle("");
        setErrorMessage("");
        toggleModal();
      }}
      title="Create a new todo"
      primaryAction={{
        content: "Create",
        onAction: handleSubmit,
        disabled: !title,
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
          error={errorMessage}
          onFocus={() => setErrorMessage("")}
        />
      </Modal.Section>
    </Modal>
  );
}

export default TodoModal;
