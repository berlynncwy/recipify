import createError from 'http-errors';
import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';

import dotenv from "dotenv";
dotenv.config();
import connectDB from './config/db.js';

import UserRoutes from './routes/UserRoutes.js';
import RecipeRoutes from "./routes/RecipeRoutes.js";
import ProductRoutes from "./routes/ProductRoutes.js";
import AdminRoutes from "./routes/AdminRoutes.js";
import { errorHandler, notFound } from "./middleware/errorMiddleware.js";

connectDB(); // connect to database
const app = express();
const port = process.env.PORT;


app.use(express.json());

app.get("/", (req, res) => {
  res.send("API is running");
});

app.use("/api/recipes", RecipeRoutes);
app.use("/api/user", UserRoutes);
app.use("/api/products", ProductRoutes);
app.use("/api/admin", AdminRoutes);

app.use(notFound);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server has started running on port ${port}`);
});


// // view engine setup
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'pug');

// app.use(logger('dev'));
// app.use(express.json());
// app.use(express.urlencoded({ extended: false }));
// app.use(cookieParser());
// app.use(express.static(path.join(__dirname, 'public')));

// app.use('/', indexRouter);
// app.use('/users', usersRouter);

// // catch 404 and forward to error handler
// app.use(function (req, res, next) {
//   next(createError(404));
// });

// // error handler
// app.use(function (err, req, res, next) {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get('env') === 'development' ? err : {};

//   // render the error page
//   res.status(err.status || 500);
//   res.render('error');
// });

// module.exports = app;
