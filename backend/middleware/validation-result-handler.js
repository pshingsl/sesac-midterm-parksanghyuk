// users.routers의 중복된 내용이 있어 핸들러로 관리
const { body, validationResult } = require('express-validator');

exports.signUpValidator = [
  // 이메일 검증
  body('email')
    .isEmail().withMessage('이메일 형식이 아닙니다.')
    .notEmpty().withMessage('이메일 없습니다.'),
  //패스워드 검증
  body('password')
    .isLength({ min: 6 }).withMessage('비밀번호가 6자 이하.')
    .notEmpty().withMessage('비밀번호가 없습니다.'),
  body('username')
    .notEmpty().withMessage('이름이 없습니다.')
];


// 로그인 입력 검사지
exports.loginValidator = [body('email')
  .isEmail().withMessage('이메일 형식이 아닙니다.')
  .notEmpty().withMessage('이메일 없습니다.'),
//패스워드 검증
body('password')
  .isLength({ min: 6 }).withMessage('비밀번호가 6자 이하.')
  .notEmpty().withMessage('비밀번호가 없습니다.')];

    console.log('11') // 빈 배열로 나옴
// user routr 71~77부분이 중복돼서 이렇게 사용
exports.handleValidationResult = (req, res, next) => {
  const result = validationResult(req).errors;
  // result 비어있다면
  if (result.length !== 0) {
    // 입력 오류가 있는경우
    const extracteError = result.array.map(err => err.msg);
    return next(new Error("InputValidation"))
  }
  next(); // 
}
