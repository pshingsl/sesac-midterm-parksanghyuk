import { todos, users } from './data.js'

const login = document.getElementById('login')
const email = document.getElementById('email')
const password = document.getElementById('password')
login.addEventListener('click', function () {



  todos.forEach(todo => {
    const li = document.createElement('li')

  });

  users.forEach(user => {
    if (!user.email.value && !user.password.value) {
      return alert("로그인 성공.")
    } else {
      alert("모든 항목을 입력해주세요.")
    }
  });

  if (!email.value || !password.value) {
    alert("모든 항목을 입력해주세요.")
    return;
  } else {
    alert("로그인 성공.")
  }
})
