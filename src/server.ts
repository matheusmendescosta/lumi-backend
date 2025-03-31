import app from "./app";
import { env } from "./env";

const PORT = env.API_PORT;

app.listen(PORT, () => {
  console.log(`Server is running`);
});
