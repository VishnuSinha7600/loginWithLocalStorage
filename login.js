


// async function vdxcnfv(){
//   let url = 'https://json-with-auth.onrender.com/user/login'
//   let res = await fetch('url')
//   let data = await res.json();
//   console.log(data)
// }


// console.log(fetch('https://json-with-auth.onrender.com/user/login'))

document.getElementById('login-form').addEventListener('submit', async function(event) {
  event.preventDefault(); // Prevent form submission
  
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;
  
  const credentials = {
      username: username,
      password: password
  };
  
  try {
      const response = await fetch('https://json-with-auth.onrender.com/user/login', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify(credentials)
      });
      
      if (response.ok) {
          const data = await response.json();
          const userAuthtoken = data.token;
          const userid = data.user.id;
          
          localStorage.setItem('localaccesstoken', userAuthtoken);
          localStorage.setItem('userid', userid);
          
          displayWelcomeMessage(data.user.username);
          document.getElementById('todo-section').style.display = 'block'; // Show todo section
      } else {
          console.error('Login failed');
      }
  } catch (error) {
      console.error('Error:', error);
  }
});

function displayWelcomeMessage(username) {
  document.getElementById('welcome-message').textContent = `Hey ${username}, welcome back!`;
}
