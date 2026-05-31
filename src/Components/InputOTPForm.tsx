'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/shadcn/ui/input-otp';
import { useNavigate } from 'react-router-dom';
import api from '@/api/api';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/shadcn/ui/form';
import { Button } from '@/shadcn/ui/button';

const FormSchema = z.object({
  pin: z.string().min(6, {
    message: 'Your one-time password must be 6 characters.',
  }),
});

export function InputOTPForm({ email }: { email: string }) {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      pin: '',
    },
  });

  const navigator = useNavigate();

  const handleLogin = async (email: string, otp: string) => {
    try {
      // Backend expects a JSON body with Email and Otp fields
      const body = { Email: email, Otp: otp };
      const res = await api.post('/users/verifyOTP', body);
      return res.data; // should be token string on success
    } catch (error) {
      // Log axios error details for debugging
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const err: any = error;
      console.error('Login error:', err);
      if (err.response) {
        console.error('VerifyOTP error response data:', err.response.data);
        console.error('VerifyOTP error response status:', err.response.status);
      }
      // setError("It's either wrong email or password, Please try again.");
      return Promise.reject(new Error('Something went wrong!!'));
    }
  };

  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    try {
      const token = await handleLogin(email, data.pin);
      if (token) {
        localStorage.setItem('token', token);
        navigator('/');
      } else {
        console.error('VerifyOTP returned no token', token);
        alert('OTP verification failed — no token returned.');
      }
    } catch (err) {
      console.error('OTP submit error:', err);
      alert('OTP verification failed. Please check the code and try again.');
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-2/3 space-y-6">
        <FormField
          control={form.control}
          name="pin"
          render={({ field }) => (
            <FormItem>
              <FormLabel>One-Time Password</FormLabel>
              <FormControl>
                <InputOTP maxLength={6} {...field}>
                  <InputOTPGroup>
                    <InputOTPSlot index={0} />
                    <InputOTPSlot index={1} />
                    <InputOTPSlot index={2} />
                    <InputOTPSlot index={3} />
                    <InputOTPSlot index={4} />
                    <InputOTPSlot index={5} />
                  </InputOTPGroup>
                </InputOTP>
              </FormControl>
              <FormDescription>
                Please enter the one-time password sent to your email.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}
