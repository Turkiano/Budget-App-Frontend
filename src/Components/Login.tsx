import { ChangeEvent, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export function Login() {
    const navigate = useNavigate();

  const [emailPass, setEmailpass] = useState({
    email: '',
    password: '',
  });

  const handelChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    if (e.target.placeholder === 'Email') {
      setEmailpass({ ...emailPass, email: value });
    } else {
      setEmailpass({ ...emailPass, password: value });
    }
  };

  const login = async () => { //onSubmit function
    const rawResponse = await fetch(
      'http://localhost:5125/api/v1/users/login', //backend ( login endpoint)
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: emailPass.email,
          password: emailPass.password,
        }),
      },
    );

    const content = await rawResponse.text(); // Fallback to text if it's not JSON

    console.log('Response Data:', content);

    navigate('/')


  };

  return (
    <>
      <h1>login</h1>

      <div>
        <input onChange={handelChange} placeholder="Email" type="email" />
      </div>
      <div>
        <input onChange={handelChange} placeholder="Password" type="password" />
      </div>

      <button onClick={login}>Login</button>
      <p>If you dont have an accout <Link to="/SignUp">Click here</Link> </p>
    </>
  );
}
