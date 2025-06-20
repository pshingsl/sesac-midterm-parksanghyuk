// 미들웨어 종류
const jwt = require('jsonwebtoken');
const SECRET_KEY = "ssac";

module.exports = function (req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  req.password = '1234';

  // 임시값으로 쓴거

  if (req.password !== '1234') {
    return next(new Error("password"))
  }
  // jwt.verify(token, secretOrPublicKey, [options])
  // 토근 유효성 검사 및 복호화
  // 토큰이 만료되었거나 변조되엇으면 에러를 나타낼때 사용
  
  const verifiedToken= verifyToken(token);
  if (!verifiedToken) {
    return next(new Error("Need login"));
  }
  req.user = verifiedToken;
  console.log(req.user)

  next();

  function verifyToken(token) {
    try {
      return jwt.verify(token, SECRET_KEY);
    } catch (error) {
      return false;
    }
  }

    console.log(req.password);

  // 미들웨어에서 함수를 만나게 되면 다음 함수로 이동

}