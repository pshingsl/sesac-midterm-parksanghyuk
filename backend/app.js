

const express = require('express');
const userRouter = require('./routers/users.router.js')
const todoRouter = require('./routers/todo.router')
const errorHandingMiddleware = require('./middleware/error-handling-middleware')
const authenticateToken = require('./middleware/authentication-middleware')

const app = express();
const PORT = process.env.PORT || 3000;


app.use(express.json());


app.use('/', [userRouter, todoRouter]); // 배열로 여러 라우터 연결

app.use(errorHandingMiddleware);
//오류 처리 미들웨어
app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).send('Something broke!')
})

app.listen(PORT, () => {
  console.log(`${PORT}, 포트로 서버가 열렸어요!`);
});