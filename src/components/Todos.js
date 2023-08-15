import { ResourceList, Page, Card, EmptyState } from "@shopify/polaris";
import { useState } from "react";
import Todo from "./Todo";
import fetchData from "../helpers/fetchData";
import useFetchTodos from "../hooks/useFetchTodos";
import TodoModal from "./TodoModal";

function Todos() {
  const [selectedItems, setSelectedItems] = useState([]);
  const { todos, loading, fetched, setTodos } = useFetchTodos();
  const [modalActive, setModalActive] = useState(false);

  const toggleModal = () => {
    setModalActive((active) => !active);
  };

  const addHandler = async (title) => {
    const newTodo = { title };
    const requestConfig = {
      url: "/todos",
      method: "post",
      data: newTodo,
    };
    const { success, todo } = await fetchData(requestConfig);
    if (!success) throw new Error("Fail to add todo");
    setTodos((curTodos) => [...curTodos, todo]);
    toggleModal();
  };

  const deleteHandler = async (ids) => {
    try {
      console.log(ids);
      const requestConfig = {
        url: `/todos`,
        method: "delete",
        data: {
          ids,
        },
      };
      const { success } = await fetchData(requestConfig);
      if (!success) throw new Error("Can not delete todos");
      setTodos((curTodos) => curTodos.filter((todo) => !ids.includes(todo.id)));
    } catch (error) {
      alert(error.message);
    } finally {
      setSelectedItems([]);
    }
  };

  const toggleStatusHandler = async (ids) => {
    try {
      const requestConfig = {
        url: `/todos`,
        method: "put",
        data: {
          todos: todos
            .filter((todo) => ids.includes(todo.id))
            .map((todo) => ({ id: todo.id, isCompleted: !todo.isCompleted })),
        },
      };

      const { success } = await fetchData(requestConfig);
      if (!success) throw new Error("Fail to change state of todos");
      setTodos((curTodos) =>
        curTodos.map((todo) => {
          if (!ids.includes(todo.id)) return todo;
          return { ...todo, isCompleted: !todo.isCompleted };
        })
      );
    } catch (error) {
      alert(error.message);
    } finally {
      setSelectedItems([]);
    }
  };

  const emptyStateMarkUp = (
    <EmptyState
      heading="No todo yet!"
      action={{ content: "Add the work to be done", onAction: toggleModal }}
      image="https://cdn.shopify.com/s/files/1/0262/4071/2726/files/emptystate-files.png"
    />
  );

  const resourseListMarkUp = (
    <Card>
      <ResourceList
        resourceName={{ singular: "Todo", plural: "Todos" }}
        selectedItems={selectedItems}
        onSelectionChange={setSelectedItems}
        selectable
        items={todos}
        emptyState={fetched && emptyStateMarkUp}
        loading={loading}
        renderItem={(item) => (
          <Todo
            todo={item}
            onToggleComplete={toggleStatusHandler}
            onDelete={deleteHandler}
          />
        )}
        promotedBulkActions={[
          {
            content: "Delete",
            onAction: () => deleteHandler(selectedItems),
          },
          {
            content: "Change status",
            onAction: () => toggleStatusHandler(selectedItems),
          },
        ]}
      />
    </Card>
  );
  const primaryAction = {
    content: "Create todo",
    onAction: () => {
      toggleModal();
    },
  };
  return (
    <Page title="Todos" primaryAction={primaryAction}>
      {resourseListMarkUp}

      <TodoModal
        onAddTodo={addHandler}
        active={modalActive}
        toggleModal={toggleModal}
      />
    </Page>
  );
}

export default Todos;
