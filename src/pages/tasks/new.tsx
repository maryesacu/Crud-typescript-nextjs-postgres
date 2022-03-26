import { Layout } from "src/components/Layout";
import { Card, Form, Grid, Button, Icon, Confirm } from "semantic-ui-react";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Task } from "src/interfaces/Tasks";

type ChangeInputHandler = ChangeEvent<HTMLInputElement | HTMLTextAreaElement>;

const inititalState = {
  title: "",
  description: "",
  price: "",
  ingredients:""
};

const NewPage = (): JSX.Element => {
  const [task, setTask] = useState<Task>(inititalState);
  const [loading, setLoading] = useState(false);
  const [openConfirm, setOpenConfirm] = useState(false);
  const router = useRouter();

  const createTask = async (task: Task) =>
    await fetch("http://localhost:3000/api/tasks", {
      method: "POST",
      body: JSON.stringify(task),
      headers: {
        "Content-Type": "application/json",
      },
    });

  const updateTask = async (id: string, task: Task) =>
    await fetch("http://localhost:3000/api/tasks/" + id, {
      method: "PUT",
      body: JSON.stringify(task),
      headers: {
        "Content-Type": "application/json",
      },
    });

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setLoading(true);
    try {
      if (typeof router.query.id === "string") {
        updateTask(router.query.id, task);
      } else {
        createTask(task);
      }
      setTask(inititalState);
      router.push("/");
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  const handleChange = ({ target: { name, value } }: ChangeInputHandler) =>
    setTask({ ...task, [name]: value });

  const loadTask = async (id: string) => {
    const res = await fetch("http://localhost:3000/api/tasks/" + id);
    const task = await res.json();
    setTask({ title: task.title, description: task.description, price: task.price, ingredients: task.ingredients });
  };

  const handleDelete = async (id: string) => {
    try {
      const res = await fetch("http://localhost:3000/api/tasks/" + id, {
        method: "DELETE",
      });
      router.push("/");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (typeof router.query.id === "string") loadTask(router.query.id);
  }, [router.query]);

  return (
    <Layout>
      <Grid
        centered
        columns={3}
        verticalAlign="middle"
        style={{ height: "70%" }}
      >
        <Grid.Column>
          <Card>
            <Card.Content>
              <Form onSubmit={handleSubmit}>
                <Form.Field>
                  <label htmlFor="title">Nombre</label>
                  <input
                    type="text"
                    placeholder="escribe un titulo"
                    name="title"
                    onChange={handleChange}
                    value={task.title}
                    autoFocus
                  />
                </Form.Field>
                <Form.Field>
                  <label htmlFor="description">Descripción:</label>
                  <textarea
                    name="description"
                    id="description"
                    rows={2}
                    placeholder="Escriba una descripción"
                    onChange={handleChange}
                    value={task.description}
                  ></textarea>
                </Form.Field>
                <Form.Field>
                  <label htmlFor="price">Precio</label>
                  <input
                    type="number"
                    placeholder="escribe su precio"
                    name="price"
                    onChange={handleChange}
                    value={task.price}
                    autoFocus
                  />
                </Form.Field>
                <Form.Field>
                  <label htmlFor="description">Ingredientes:</label>
                  <textarea
                    name="ingredients"
                    id="ingredients"
                    rows={2}
                    placeholder="Escriba los ingredientes"
                    onChange={handleChange}
                    value={task.ingredients}
                  ></textarea>
                </Form.Field>
                {router.query.id ? (
                  <Button color="teal" loading={loading}>
                    <Icon name="save" />
                    Actualizar
                  </Button>
                ) : (
                  <Button primary loading={loading}>
                    <Icon name="save" />
                    Guardar
                  </Button>
                )}
              </Form>
            </Card.Content>
          </Card>

          {router.query.id && (
            <Button inverted color="red" onClick={() => setOpenConfirm(true)}>
              <Icon name="trash" />
              Eliminar
            </Button>
          )}
        </Grid.Column>
      </Grid>

      <Confirm
        header="Delete a Task"
        content={`Are you sure you want to delete task ${router.query.id}`}
        open={openConfirm}
        onCancel={() => setOpenConfirm(false)}
        onConfirm={() =>
          typeof router.query.id === "string" && handleDelete(router.query.id)
        }
      />
    </Layout>
  );
};

export default NewPage;
