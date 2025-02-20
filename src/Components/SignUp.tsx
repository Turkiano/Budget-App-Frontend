import { ChangeEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export function SignUP() {
    const navigate = useNavigate();
  const [emailPass, setEmailpass] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    password: '',
  });

  const handelChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setEmailpass((prevState) => ({
      ...prevState,
      [name]: value, // Dynamically updates the correct field
    }));
    console.log(' state: ', emailPass);
  };

  const SignUP = async () => {
    //onSubmit function
    const rawResponse = await fetch(
      'http://localhost:5125/api/v1/users/signup', //backend ( login endpoint)
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          firstName: emailPass.firstName,
          lastName: emailPass.lastName,
          phone: emailPass.phone,

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
      <h1>SIgnUP</h1>
      <div>
        <input
          name="firstName"
          onChange={handelChange}
          placeholder="FirstName"
          type="text"
        />
      </div>
      <div>
        <input
          name="lastName"
          onChange={handelChange}
          placeholder="LastName"
          type="text"
        />
      </div>
      <div>
        <input
          name="phone"
          onChange={handelChange}
          placeholder="Phone"
          type="text"
        />
      </div>
      <div>
        <input
          name="email"
          onChange={handelChange}
          placeholder="Email"
          type="email"
        />
      </div>
      <div>
        <input
          name="password"
          onChange={handelChange}
          placeholder="Password"
          type="password"
        />
      </div>
      <button onClick={SignUP}>Sign Up</button>
    </>
  );
}
