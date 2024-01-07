const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const dbConnect = require('./config/dbConnect');
const usersRoute = require('./Routes/usersRoute');
const booksRoute = require('./Routes/booksRoute');
const adminusersRoute = require('./Routes/adminusersRoute');
const transactionsRoute = require('./Routes/transactionsRoute');
const error = require('./middlewares/errorMiddlewareHandler');

// App Config
dotenv.config();
const PORT = process.env.PORT || 5000;
const app = express();

/* MongoDB connection */
dbConnect();

/* Middlewares */
app.use(express.json());
app.use(cors());

/* API Routes */
app.use('/api/users', usersRoute);
app.use('/api/books', booksRoute);
app.use('/api/admins', adminusersRoute)
app.use('/api/library-transactions', transactionsRoute)

/* Error Middlewares */
app.use(error.errorMiddlewareHandler);

// Server
app.listen(PORT, () => {
  console.log(`Server is successfully runnig on port ${PORT}`);
})

// rahulkumar34251
// Co9Yx206ZlZRDFFo
// mongodb+srv://rahulkumar34251:<password>@cluster0.2uijdyy.mongodb.net/