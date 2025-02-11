import { Badge, Button, Card, Flex, Heading, Text } from "@radix-ui/themes";
import { Task, TaskPriority, TaskStatus } from "../entities/Tasks";
import { useTasks } from "../hooks/UseTasks";

interface TaskCardProps {
  task: Task;
}
export const TaskCard: React.FC<TaskCardProps> = ({ task }) => {
  const { deleteTask, updateTask } = useTasks()
  //função que altera a cor dependendo do momento tbem
  const getActionColor = (status: TaskStatus) => {
    const actionColor: { [key: string]: "indigo" | "green" | "bronze" } = {
      todo: "indigo",
      doing: "green",
      done: "bronze",
    };
    return actionColor[status];
  };
  // função que pega o texto, dependendo do momento em que a task estiver
  const getActionText = (status: TaskStatus) => {
    const actiontext = {
      todo: "Iniciar",
      doing: "Concluir",
      done: "Arquivar",
    };
    return actiontext[status];
  };
  // Função para pegar a cor da prioridade
  const getPriorityColor = (priority: TaskPriority) => {
    const priorityColor: { [key: string]: "sky" | "amber" | "tomato" } = {
      low: "sky",
      medium: "amber",
      high: "tomato",
    };
    return priorityColor[priority];
  };

  const handleDelete = (id: number) => {
    const confirmatin = confirm("tem certeza que quer excluir a tarefa ?")
    if(confirmatin) {
      deleteTask(id)
    }
  }
  const handleUpdate = () => {
    if(task.status === "todo") {
      updateTask(task.id, {status: "doing"})
    }else if(task.status === "doing") {
      updateTask(task.id, {status: "done"}   )
    }
  }
  return (
    <Card>
      <Flex align="center" gap="4">
        <Heading as="h3" weight="bold">
          {task.title}
        </Heading>
        <Badge color={getPriorityColor(task.priority)}>{task.priority}</Badge>
      </Flex>
      <Text as="p">{task.description}</Text>

      <Flex gap={"2"}>
        {task.status !== "done" && (
          <Button color={getActionColor(task.status)} onClick={handleUpdate}>
            {getActionText(task.status)}
          </Button>
        )}
        <Button color="red" onClick={()=> handleDelete(task.id)}>Excluir</Button>
      </Flex>
    </Card>
  );
};
