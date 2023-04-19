import { app } from "../app";
import { z } from "zod";
import { NotFoundError } from "typebeam";

const TodoDTO = z.object({
  title: z.string(),
  done: z.boolean().default(false),
});

type Todo = z.infer<typeof TodoDTO>;

const todos: Todo[] = [];

app.get("/todos").handle(() => todos);

app
  .post("/todos")
  .body(TodoDTO.parse)
  .handle(({ body }) => {
    todos.push(body);
    return todos;
  });

app
  .post("/todos/:id/done")
  .query(z.object({ status: z.coerce.boolean().default(true) }).parse)
  .handle(({ params, query: { status } }) => {
    const id = parseInt(params.id, 10);
    if (!todos[id]) {
      throw new NotFoundError();
    }
    todos[id]!.done = status;
    return todos;
  });
