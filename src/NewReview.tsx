import axios from "axios";
import { useCookies } from "react-cookie";
import { SubmitHandler, useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";

export function NewReview () {

  interface ReviewData{
    title:string;
    url: string,
    detail: string,
    review: string,
  }

  const [cookies,setCookie] = useCookies(['token']);
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm<ReviewData>();

  const onSubmit:SubmitHandler<ReviewData> = (data) =>{
    const postUrl = "https://railway.bookreview.techtrain.dev/books";

  axios
    .post(postUrl,data,{
      headers: {
        Authorization: `Bearer ${cookies.token}`,
        'Content-Type': 'application/json',
      }
    }).then(() => {
      console.log('Register success');
      navigate('/Home')
    }).catch((err) => {
      console.log('Register failed:', err.message);
    });
  }
  return (
    <>
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <Link to="/home" className="absolute top-4 left-4 px-4 py-2 bg-gray-600 text-white font-semibold rounded hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500">
        戻る
      </Link>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 max-w-lg w-full p-6 bg-white shadow-lg rounded-md">
        <div>
          <label className="block text-sm font-medium text-gray-700">タイトル</label>
          <input
            className="border border-gray-300 rounded w-full p-2 mt-1 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
            {...register('title', { required: true })}
          />
          {errors.title && <div className="text-red-500 text-sm mt-1">タイトルを入力してください</div>}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">URL</label>
          <input
            className="border border-gray-300 rounded w-full p-2 mt-1 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
            {...register('url', { required: true })}
          />
          {errors.url && <div className="text-red-500 text-sm mt-1">URLを入力してください</div>}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">レビュー</label>
          <input
            className="border border-gray-300 rounded w-full p-2 mt-1 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
            {...register("review", { required: true })}
          />
          {errors.review && <div className="text-red-500 text-sm mt-1">レビューを入力してください</div>}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">詳細</label>
          <textarea
            className="border border-gray-300 rounded w-full p-2 mt-1 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 h-[100px]"
            {...register("detail", { required: true })}
          />
          {errors.detail && <div className="text-red-500 text-sm mt-1">詳細を入力してください</div>}
        </div>
        <button type="submit" className="w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500">
          登録
        </button>
      </form>
    </div>
    </>
  )
}

export default NewReview;