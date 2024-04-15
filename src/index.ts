import { Server } from "./server";

let server = new Server().app;
const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
