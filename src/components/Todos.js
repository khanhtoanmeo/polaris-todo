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

  const deleteByIdHandler = async (id) => {
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
  };

  const deleteManyHandler = async () => {
    try {
      const ids = selectedItems;
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

  //todo : cái này với cái dưới gộp lại thành 1 được không ?
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
  const completeHandler = async (id) => {
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
