import {
  Badge,
  Button,
  ButtonGroup,
  ResourceItem,
  Stack,
  TextContainer,
} from "@shopify/polaris";
import { useState } from "react";

function Todo({ todo, onDelete, onComplete }) {
  const [completeLoading, setCompleteLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);

  const { id, title, isCompleted } = todo;
  const status = isCompleted ? "success" : "";
  const badgeTitle = isCompleted ? "Done" : "Pending";

  const completeHandler = async () => {
    setCompleteLoading(true);
    await onComplete([id]);
    setCompleteLoading(false);
  };
  const deleteHandler = async () => {
    setDeleteLoading(true);
    await onDelete([id]);
    setDeleteLoading(false);
  };

  return (
    <ResourceItem id={id} accessibilityLabel={`View details for ${title}`}>
      <Stack distribution="equalSpacing">
        <TextContainer>{title}</TextContainer>
        <ButtonGroup>
          <Badge status={status}>{badgeTitle}</Badge>
          <Button onClick={completeHandler} loading={completeLoading}>
            Complete
          </Button>
          <Button destructive onClick={deleteHandler} loading={deleteLoading}>
            Delete
          </Button>
        </ButtonGroup>
      </Stack>
    </ResourceItem>
  );
}

export default Todo;
