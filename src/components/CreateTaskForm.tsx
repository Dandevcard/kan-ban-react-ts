import { PlusIcon } from "@radix-ui/react-icons";
import {
  Badge,
  Box,
  Button,
  Dialog,
  Flex,
  RadioGroup,
  Text,
  TextArea,
  TextField,
} from "@radix-ui/themes";
import { FormEventHandler } from "react";
import { z } from "zod";

//o zod é uma biblioteca para validar dados, aqui eu defino o que é obrigatório e o que não é.
const CreateTaskSchema = z.object({
  title: z.string(),
  description: z.string(),
  status: z.enum(["todo", "doing", "done"]),
  priority: z.enum(["low", "medium", "high"]),
});

export const CreateTaskForm: React.FC = () => {
  // formEvent é um tipo nativo do react
  const handleSubimit: FormEventHandler<HTMLFormElement> = async (ev) => {
    ev.preventDefault();

    // pegando os dados do formulario
    const formData = new FormData(ev.currentTarget);
    // aq eu pego cada campo do formulario e uso o get para pegar o valor do campo.
    const title = formData.get("title");
    const description = formData.get("description");
    const status = formData.get("status");
    const priority = formData.get("priority");
    // aqui eu reseto os campos do formulario
    ev.currentTarget.reset();
    // aqui eu valido os dados do formulario com o zod
    const taskData = CreateTaskSchema.parse({
      title,
      description,
      status,
      priority,
    });

    alert(JSON.stringify(taskData));
  };
  return (
    <Dialog.Root>
      <Dialog.Trigger>
        <Button>
          <PlusIcon /> Nova tarefa
        </Button>
      </Dialog.Trigger>
      <Dialog.Content maxWidth="32rem">
        <Dialog.Title>Nova tarefa</Dialog.Title>
        <Dialog.Description size="2" mb="2">
          adicione nova tarefas ao quadro
        </Dialog.Description>
        <form onSubmit={handleSubimit}>
          <Flex direction="column" gap="4">
            <Box maxWidth="32rem">
              <Box mb="2">
                <Text as="label" htmlFor="title">
                  Titulo
                </Text>
              </Box>
              <TextField.Root
                placeholder="Defina um titulo"
                name="title"
                id="title"
                autoFocus
                required
              ></TextField.Root>
            </Box>
            <Box maxWidth="32rem">
              <Box mb="2">
                <Text as="label" htmlFor="description">
                  Descrição da tarefa
                </Text>
              </Box>
              <TextArea
                placeholder="Descreva a tarefa"
                name="description"
                id="description"
                required
              />
            </Box>
            <Flex gap="8">
              <Box>
                <Text as="div" mb="2">
                  Situação{" "}
                </Text>
                <RadioGroup.Root name="status" id="status" defaultValue="todo">
                  <RadioGroup.Item value="todo">
                    <Badge color="gray">Para fazer</Badge>
                  </RadioGroup.Item>
                  <RadioGroup.Item value="doing">
                    <Badge color="yellow">Em Progresso</Badge>
                  </RadioGroup.Item>
                  <RadioGroup.Item value="done">
                    <Badge color="green">Concluida</Badge>{" "}
                  </RadioGroup.Item>
                </RadioGroup.Root>
              </Box>
              <Box>
                <Text as="div" mb="2">
                  Prioridade
                </Text>
                <RadioGroup.Root
                  name="priority"
                  id="priority"
                  defaultValue="low"
                >
                  <RadioGroup.Item value="low">
                    <Badge color="sky">Baixa</Badge>
                  </RadioGroup.Item>
                  <RadioGroup.Item value="medium">
                    <Badge color="amber">Médio</Badge>
                  </RadioGroup.Item>
                  <RadioGroup.Item value="high">
                    <Badge color="tomato">Alta</Badge>
                  </RadioGroup.Item>
                </RadioGroup.Root>
              </Box>
            </Flex>
            <Flex gap="2" justify="end">
              <Dialog.Close>
                <Button color="gray" variant="soft">
                  Cancelar
                </Button>
              </Dialog.Close>
              <Button type="submit">Criar Tarefa</Button>
            </Flex>
          </Flex>
        </form>
      </Dialog.Content>
    </Dialog.Root>
  );
};
