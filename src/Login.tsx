import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch} from 'react-redux';
import { signIn } from './features/authSlice'
import { useCookies } from 'react-cookie';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [cookies,setCookie] =useCookies();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const url = 'https://railway.bookreview.techtrain.dev/signin';

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (!email || !password) {
      setErrorMessage('Email、Passwordを入力してください。');
    } else {
      fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email: email, password: password })
      })
      .then(response => response.json())
      .then(data => {
        if (data.token) {
          console.log('Login successful:', data.token);
          setErrorMessage('');
          navigate('/Home');
          dispatch(signIn());
          setCookie('token', data.token)
        } else {
          setErrorMessage('ログインに失敗しました。');
        }
      })
      .catch(error => {
        console.error('Error:', error);
        setErrorMessage('サーバーエラーが発生しました。');
      });
    }
  };

  return (
    <>
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center">Login</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email:</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password:</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          {errorMessage && <p id="error" className="text-red-500 text-sm">{errorMessage}</p>}
          <div>
            <button
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Login
            </button>
            <Link
                to="./Signup"
                className="w-full flex justify-center mt-4 py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">SignUp
            </Link>
          </div>
        </form>
      </div>
    </div>
    </>
  );
}

export default Login;
