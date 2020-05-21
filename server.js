const app = require('./app');
const CONFIG = require('./config');

// Start server
app.listen(CONFIG.PORT, () => {
  console.log('Started...');
  console.log(`Server start on port: ${CONFIG.PORT}`);
});
