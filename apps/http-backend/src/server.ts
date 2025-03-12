import app from "./app";
import { PORT } from "./config";

app.listen(PORT, () => {
  console.log(`HTTP server is running on http://localhost:${PORT}`);
});