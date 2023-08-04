import { ResourceList, Page } from "@shopify/polaris";
import { useContext, useEffect, useState } from "react";
import TodosContext from "../store/todosContext";
import Todo from "./Todo";
import fetchData from "../helpers/fetchData";
import useFetchTodos from "../hooks/useFetchTodos";

function Todos({ toggleModal }) {
  const { todos, setTodos } = useContext(TodosContext);
  const [selectedItems, setSelectedItems] = useState([]);
  const { result, loading, fetched } = useFetchTodos();

  useEffect(() => {
    if (fetched) setTodos(result);
  }, [fetched]);

  const deleteHandler = async (ids) => {
    try {
      const requestConfig = {
        url: `/delete-todos`,
        method: "post",
        data: {
          ids,
        },
      };
      const { success } = await fetchData(requestConfig);
      if (!success) throw new Error("Can not delete todos");
      setTodos((todos) => todos.filter((todo) => !ids.includes(todo.id)));
    } catch (error) {
      alert(error.message);
    } finally {
      setSelectedItems([]);
    }
  };

  const completeHandler = async (ids) => {
    try {
      const requestConfig = {
        url: `/complete-todos`,
        method: "put",
        data: {
          isCompleted: true,
          ids,
        },
      };
      const { success } = await fetchData(requestConfig);
      if (!success) throw new Error("Fail to mark todos as completed");
      setTodos((todos) =>
        todos.map((todo) => {
          if (ids.includes(todo.id)) return { ...todo, isCompleted: true };
          return todo;
        })
      );
    } catch (error) {
      alert(error.message);
    } finally {
      setSelectedItems([]);
    }
  };
  const resourseListMarkUp = (
    <ResourceList
      resourceName={{ singular: "Todo", plural: "Todos" }}
      selectedItems={selectedItems}
      onSelectionChange={setSelectedItems}
      selectable
      items={todos}
      loading={loading}
      renderItem={(item) => (
        <Todo
          todo={item}
          onComplete={completeHandler}
          onDelete={deleteHandler}
        />
      )}
      promotedBulkActions={[
        {
          content: "Delete",
          onAction: () => deleteHandler(selectedItems),
        },
        { content: "Complete", onAction: () => completeHandler(selectedItems) },
      ]}
    />
  );
  const primaryAction = {
    content: "Create todo",
    onAction: () => {
      toggleModal();
    },
  };
  return (
    <Page
      title="Todos"
      primaryAction={primaryAction}
      children={resourseListMarkUp}
    />
  );
}

export default Todos;
