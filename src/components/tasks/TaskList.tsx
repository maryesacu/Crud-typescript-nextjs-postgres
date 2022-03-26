import { useRouter } from "next/router";
import { FC, useEffect } from "react";
import { Card } from "semantic-ui-react";
import { Task } from "src/interfaces/Tasks";

interface Props {
  tasks: Task[];
}

export const TaskList:FC<Props> = ({ tasks }) => {
  const router = useRouter();
  useEffect(()=> console.log("aa"))

  return (
    <Card.Group itemsPerRow={4}>
      {tasks.map((task) => (
        <Card
          onClick={() => router.push(`/tasks/edit/${task.id}`)}
          key={task.id}
        >
          <Card.Content>
            <Card.Header>{task.title}</Card.Header>
            {task.created_on && (
              <Card.Meta>
                {new Date(task.created_on).toLocaleDateString()}
              </Card.Meta>
            )}
            <Card.Description>{task.description}</Card.Description>
            <Card.Description>{task.price}</Card.Description>
            <Card.Description>{task.description}</Card.Description>
          </Card.Content>
        </Card>
      ))}
    </Card.Group>
  );
};
