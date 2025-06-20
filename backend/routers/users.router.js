const express = require('express');

// express의 Router 기능 사용 (미니 앱처럼 사용)
const router = express.Router();

// 사용자 인증(토큰 검증) 미들웨어 불러오기
const authenticateToken = require('../middleware/authentication-middleware');

// JWT 토큰 생성을 위한 jsonwebtoken 불러오기
const jwt = require('jsonwebtoken');

// JWT 토큰 서명에 사용할 비밀 키 설정
const SECRET_KEY = "ssac";

const prisma = require('../utils/prisma');

// // 입력값 검증을 위한 express-validator 라이브러리 불러오기
const { body, validationResult } = require('express-validator');

// // 입력값 검증 관련 커스텀 미들웨어 불러오기
const { handleValidationResult, signUpValidator, loginValidator } = require('../middleware/validation-result-handler');

// 비밀번호 암호화를 위한 bcrypt 라이브러리 불러오기
const bcrypt = require('bcrypt');



router.post('/auth/signup', async (req, res, next) => {
  try {
    const { email, password, username, } = req.body;

    const existingUser = await prisma.users.findFirst({
      where: { email },
    });
    if (existingUser) {
      return res.status(409).json({ message: '이미 존재하는 이메일입니다.' });
    }
    // 새 사용자 생성
    const newUser = await prisma.users.create({
      data: {
        email,
        password, // 실제 서비스에서는 비밀번호를 해싱해야 합니다.
        username,
      },
    });


    const {password: _, ...userData } = newUser;

    return res.status(201).json({ message: '회원가입이 완료되었습니다.', data: userData });
  } catch (error) {
    next(error); // 에러 미들웨어로 전달
  }
});


router.post('/auth/login', signUpValidator, handleValidationResult, async (req, res, next) => {
  const { email, password, username } = req.body;

  try {
    // 이메일 중복이 있는지 확인 -> findunique
    const user = await prisma.users.findFirst({
      where: { email }
    })

    if (user) {
      return next(new Error("ExistEmail"));

    }
    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds)
    console.log('salt:', salt);
    const bcryptPassword = await bcrypt.hash(
      password,
      salt
    )
    console.log(bcryptPassword)
    // 데이터 베이스 저장
    const newUser = await prisma.users.create({
      data: {
        email,
        password: bcryptPassword,
        username
      }
    })
    return res.status(201).json({ msg: "가입 되었습니다!" })
  } catch (error) {
    return next(new Error("DatabaseError"));
  }
})

// 모든 가입된 사람 
router.get('/users', async (req, res, next) => {
  try {
    const users = await prisma.users.findMany({
      select: {
        userId: true,
        email: true,
        nickname: true,
        createdAt: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
    return res.status(200).json({ data: users });
  } catch (error) {
    next(error);
  }
});


module.exports = router;