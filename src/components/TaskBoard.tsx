import { Badge, Flex, Grid, ScrollArea } from "@radix-ui/themes";
import { Task } from "../entities/Tasks";
import { TaskCard } from "./TaskCard";
import { useTasks } from "../hooks/UseTasks";

export const TaskBoard: React.FC = () => {

  const { tasks} = useTasks()

  const tasksTodo: Task[] = tasks.filter(tasks => tasks.status === "todo") ?? [];
  const tasksInProgress: Task[] = tasks.filter(tasks => tasks.status === "doing") ?? [];
  const tasksDone: Task[] = tasks.filter(tasks => tasks.status === "done") ?? [];

  return (
    <ScrollArea scrollbars="horizontal">
      <Grid columns="3" gap="4" minWidth="64rem">
        <Flex direction="column" gap="4">
          <Badge size="3" color="gray">
            Para fazer ({tasksTodo.length})
          </Badge>
          {tasksTodo.map((task) => (
            <TaskCard key={task.id} task={task} />
          ))}
        </Flex>

        <Flex direction="column" gap="4">
          <Badge size="3" color="yellow">
            Em andamento ({tasksInProgress.length})
          </Badge>
          {tasksInProgress.map((task) => (
            <TaskCard key={task.id} task={task} />
          ))}
        </Flex>

        <Flex direction="column" gap="4">
          <Badge size="3" color="green">
            Concluído ({tasksDone.length})
          </Badge>
          {tasksDone.map((task) => (
            <TaskCard key={task.id} task={task} />
          ))}
        </Flex>
      </Grid>
    </ScrollArea>
  );
};
