const development = {
  uri: process.env.MONGODB_URI,
};

const testing = {
  uri: process.env.MONGODB_URI,
};

const production = {
  uri: process.env.MONGODB_URI,
};

module.exports = {
  development,
  testing,
  production,
};
