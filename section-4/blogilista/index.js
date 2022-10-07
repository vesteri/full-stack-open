const app = require("./app");
const config = require("./utils/config");
const logger = require("./utils/logger");

//const Blog = mongoose.model("Blog", blogSchema);

app.listen(config.PORT, () => {
  logger.info(`Server running on port ${config.PORT}`);
});