import { Link } from 'react-router-dom';
import { ChangeEvent, FormEvent, useState } from 'react';
import api from '@/api/api';
import { Dialog, DialogContent } from '@/shadcn/ui/dialog';
import { InputOTPForm } from '@/Components/InputOTPForm';
import { Label } from '@/shadcn/ui/label';
import { Input } from '@/shadcn/ui/input';
import { Button } from '@/shadcn/ui/button';

export function Login() {
  const [user, setUser] = useState({
    email: '',
    password: '',
  });

  const [openOTP, setOpenOTP] = useState(false);

  // const [error, setError] = useState<string | null>(null);

  const handleLogin = async () => {
    try {
      const res = await api.post('/users/login', user);
      return res.data;
    } catch (error) {
      console.error('Login error:', error);
      // setError("It's either wrong email or password, Please try again.");
      return Promise.reject(new Error('Something went wrong!!'));
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    // setError(null); // Reset error state
    await handleLogin();

    const token = await handleLogin();
    if (token) {
      localStorage.setItem('token', token);
      setOpenOTP(true);
    }
  };

  return (
    <div className="m-0 w-full">
      <Dialog open={openOTP} onOpenChange={setOpenOTP}>
        <DialogContent className="sm:max-w-[425px]">
          <InputOTPForm email={user.email} />
        </DialogContent>
      </Dialog>

      <div className=" ">
        <h1>Login Page</h1>
      </div>
      <div className="flex justify-center w-full m-auto mt-10">
        <form action="POST" onSubmit={handleSubmit}>
          <div>
            <div className="mb-4">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="Email"
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-4">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                name="password"
                type="password"
                placeholder="Password"
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <Button type="submit">Login</Button>
          <p>
            Create an Account{' '}
            <Link to="/signUp" className="text-blue-600">
              {' '}
              here
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
