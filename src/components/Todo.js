import { Badge, Button, ButtonGroup, ResourceItem } from "@shopify/polaris";
import { useState } from "react";
import "../styles/styles.css";

function Todo({ todo, onDelete, onComplete }) {
  const [completeLoading, setCompleteLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);

  const { id, title, isCompleted } = todo;
  const status = isCompleted ? "success" : "";
  const badgeTitle = isCompleted ? "Done" : "Pending";

  const completeHandler = async () => {
    setCompleteLoading(true);
    await onComplete(id);
    setCompleteLoading(false);
  };
  const deleteHandler = async () => {
    setDeleteLoading(true);
    await onDelete(id);
    setDeleteLoading(false);
  };

  return (
    <ResourceItem id={id} accessibilityLabel={`View details for ${title}`}>
      {/*todo sao đoạn này mình không dùng một vài component có sẵn của polaris mà lại dùng thẻ div hay thẻ p nhỉ ? */}
      <div className="flex-2-child">
        <p>{title}</p>
        <ButtonGroup>
          <Badge status={status}>{badgeTitle}</Badge>
          <Button onClick={completeHandler} loading={completeLoading}>
            Complete
          </Button>
          <Button destructive onClick={deleteHandler} loading={deleteLoading}>
            Delete
          </Button>
        </ButtonGroup>
      </div>
    </ResourceItem>
  );
}

export default Todo;
