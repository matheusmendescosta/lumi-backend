import { env } from "./env";
import app from "./app";

const PORT = env.API_PORT || 3333;

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
