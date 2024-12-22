import React, { useState } from "react";
import { useForm } from "react-hook-form";
import Compressor from "compressorjs";
import { useCookies } from "react-cookie";
import axios from "axios";
import { signIn } from './features/authSlice';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from "react-router-dom";

function Signup() {
  const userUrl = 'https://railway.bookreview.techtrain.dev/users';
  const uploadUrl = 'https://railway.bookreview.techtrain.dev/uploads';

  interface LoginForm {
    name: string;
    email: string;
    password: string;
  }

  const { register, handleSubmit, formState: { errors } } = useForm<LoginForm>();
  const [errorMessage, setErrorMessage] = useState("");
  const [cookies, setCookie] = useCookies(['token']);
  const [picture, setPicture] = useState<File>();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSubmit = async (data: LoginForm) => {
    try {
      const res = await axios.post(userUrl, data);
      const token = res.data.token;
      console.log(token);
      dispatch(signIn());
      setCookie('token', token);
      navigate('/')

      if (!picture) return;

      new Compressor(picture, {
        quality: 0.1,
        success(result) {
          const formData = new FormData();
          formData.append('icon', result,);

          axios.post(uploadUrl, formData, {
            headers: {
              Authorization: `Bearer ${cookies.token}`,
              'Content-Type': 'multipart/form-data',
            },
          }).then(() => {
            console.log('Upload success');
          }).catch((err) => {
            console.log('Upload failed:', err.message);
          });
        },
        error(err) {
          console.log('Compression failed:', err.message);
        },
      });
    } catch (err) {
      setErrorMessage(err.message);
    }
  };

  const onFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const fileObject = e.target.files[0];
    console.log(fileObject);
    setPicture(fileObject);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <Link to="/" className="absolute top-4 left-4 px-4 py-2 bg-gray-600 text-white font-semibold rounded hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500">
        戻る
      </Link>
      <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6">Signup</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">Name</label>
            <input
              className="border border-gray-300 rounded w-full p-2 mt-1"
              {...register('name', { required: true })}
            />
            {errors.name && <div className="text-red-500 text-sm">名前を入力してください</div>}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              className="border border-gray-300 rounded w-full p-2 mt-1"
              {...register('email', { required: true })}
            />
            {errors.email && <div className="text-red-500 text-sm">emailを入力してください</div>}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <input
              className="border border-gray-300 rounded w-full p-2 mt-1"
              {...register("password", { required: true })} type="password"
            />
            {errors.password && <div className="text-red-500 text-sm">passwordを入力してください</div>}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Profile Picture</label>
            <input
              accept="image/*"
              type="file"
              onChange={onFileInputChange}
              className="block w-full text-sm text-gray-900 border border-gray-300 rounded cursor-pointer bg-gray-50 focus:outline-none"
            />
          </div>
          <button type="submit" className="w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500">
            Signup
          </button>
        </form>
        {errorMessage && <div className="mt-4 text-red-500">{errorMessage}</div>}
      </div>
    </div>
  );
}

export default Signup;
