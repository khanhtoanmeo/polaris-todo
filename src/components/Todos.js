import { ResourceList, Page } from "@shopify/polaris";
import { useContext, useState, useCallback } from "react";
import TodosContext from "../store/todosContext";
import useFetch from "../hooks/useFetch";
import Todo from "./Todo";
import fetchData from "../utils/fetchData";

function Todos({ toggleModal }) {
  const { todos, setTodos } = useContext(TodosContext);
  const [selectedItems, setSelectedItems] = useState([]);

  const dataLoadedHandler = useCallback((data) => {
    setTodos(data);
  }, []);

  const { loading } = useFetch("/todos", dataLoadedHandler);

  const deleteByIdHandler = useCallback(async (id) => {
    try {
      const requestConfig = {
        url: `/todo/${id}`,
        method: "delete",
      };
      const { success } = await fetchData(requestConfig);
      if (!success) throw new Error("Fail to delete todo");
      setTodos((todos) => todos.filter((todo) => todo.id !== id));
    } catch (error) {
      alert(error.message);
    }
  }, []);

  const deleteManyHandler = async () => {
    try {
      const idList = selectedItems;
      const requestConfig = {
        url: `/delete-todos`,
        method: "post",
        data: {
          idList,
        },
      };
      const { success } = await fetchData(requestConfig);
      if (!success) throw new Error("Can not delete todos");
      setTodos((todos) => todos.filter((todo) => !idList.includes(todo.id)));
    } catch (error) {
      alert(error.message);
    } finally {
      setSelectedItems([]);
    }
  };
  const completeManyHandler = async () => {
    try {
      const idList = selectedItems;
      const requestConfig = {
        url: `/complete-todos`,
        method: "put",
        data: {
          idList,
          isCompleted: true,
        },
      };
      const { success } = await fetchData(requestConfig);
      if (!success) throw new Error("Can not complete todos");
      setTodos((todos) =>
        todos.map((todo) => {
          if (idList.includes(todo.id)) return { ...todo, isCompleted: true };
          return todo;
        })
      );
    } catch (error) {
      alert(error.message);
    } finally {
      setSelectedItems([]);
    }
  };
  const completeHandler = useCallback(async (id) => {
    try {
      const requestConfig = {
        url: `/todo/${id}`,
        method: "put",
        data: {
          isCompleted: true,
        },
      };
      const { success } = await fetchData(requestConfig);

      if (!success) throw new Error("Fail to mark to do as completed");
      setTodos((todos) =>
        todos.map((todo) => {
          if (todo.id === id) todo.isCompleted = true;
          return todo;
        })
      );
    } catch (error) {
      alert(error.message);
    }
  }, []);
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
          onDelete={deleteByIdHandler}
        />
      )}
      promotedBulkActions={[
        {
          content: "Delete",
          onAction: deleteManyHandler,
        },
        { content: "Complete", onAction: completeManyHandler },
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
