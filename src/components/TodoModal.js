import { Modal, TextField, Toast } from "@shopify/polaris";
import { useState } from "react";

function TodoModal({ active, toggleModal, onAddTodo }) {
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(false);
  const [toastShowed, setToastShowed] = useState(false);
  const [message, setMessage] = useState("");

  const toastMarkup = toastShowed ? (
    <Toast
      content={message}
      duration={2000}
      onDismiss={() => setToastShowed(false)}
    />
  ) : null;

  const addTodo = async (title) => {
    try {
      setLoading(true);
      if (!title.trim()) {
        throw new Error("Please enter something meaningful");
      }

      await onAddTodo(title);
    } catch (error) {
      setMessage(error.message);
      setToastShowed(true);
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
    <div style={{ height: "500px" }}>
      <Modal
        loading={loading}
        open={active}
        onClose={() => {
          setToastShowed(false);
          setTitle("");
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
            error={toastShowed}
            onFocus={() => setToastShowed(false)}
          />
          {toastMarkup}
        </Modal.Section>
      </Modal>
    </div>
  );
}

export default TodoModal;
