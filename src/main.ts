import { app } from "./app";
import "./todos";

app.get("/health-check").handle(() => ({ message: "OK!" }));

const server = await app.build();
await server.listen();
