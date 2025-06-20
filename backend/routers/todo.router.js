// routes/posts.router.js
const express = require('express');
const router = express.Router();
const prisma = require('../utils/prisma.js')
const authenticateToken = require('../middleware/authentication-middleware.js')

// 게시글 생성
router.post('/todos', authenticateToken, async (req, res, nex) => {

  const userId = req.user.userId
  console.log(userId)
  const { title, description } = req.body;
  const newTodos = await prisma.todo.create({
    data: { userId, title, description },
  })
  return res.status(201).json({ message: '게시글 등록되었습니다.', data: newTodos })
})


//  전체 게시글 조회
router.get('/todos', async (req, res, next) => {
  const todos = await prisma.todos.findMany({
    include: {
      User: {
        select: {
          user_Id: true,
          username: true,
        }
      }
    }, orderBy: {
      createdAt: "desc"
    }
  })
  res.send({
    data: todos
  })
})


module.exports = router;