require('dotenv').config();
require('./lib/utils/connect');
const app = require('./lib/app');

app.listen(6789, () => {
  console.log('running on 6789');
});
