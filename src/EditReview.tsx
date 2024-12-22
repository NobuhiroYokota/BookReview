import axios from "axios";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { Link, useNavigate, useParams } from "react-router-dom";

function EditReview() {
  interface DataForm {
    detail: string;
    id: string;
    isMine: boolean;
    review: string;
    reviewer: string;
    title: string;
    url: string;
  }

  const { id } = useParams<{ id: string }>();
  const [newTitle, setNewTitle] = useState("");
  const [newUrl, setNewUrl] = useState("");
  const [newDetail, setNewDetail] = useState("");
  const [newReview, setNewReview] = useState("");
  const [beforeData, setBeforeData] = useState<DataForm | null>(null);
  const [cookies] = useCookies(['token']);
  const navigate = useNavigate()
  const getUrl = `https://railway.bookreview.techtrain.dev/books/${id}`;
  const postUrl = `https://railway.bookreview.techtrain.dev/log`;

  useEffect(() => {
    axios
      .get(getUrl, {
        headers: {
          Authorization: `Bearer ${cookies.token}`,
          'Content-Type': 'application/json',
        },
      })
      .then((response) => {
        console.log(response.data);
        setBeforeData(response.data);
        setNewTitle(response.data.title);
        setNewUrl(response.data.url);
        setNewDetail(response.data.detail);
        setNewReview(response.data.review);
      })
      .catch((err) => {
        console.log('Get failed:', err.message);
      });
  }, [id, cookies.token]);

  useEffect(() => {
    axios
      .post(postUrl, { selectBookId: id }, {
        headers: {
          Authorization: `Bearer ${cookies.token}`,
          'Content-Type': 'application/json',
        },
      })
      .then((response) => {
        console.log('Log posted:', response.data);
      })
      .catch((err) => {
        console.log('Post failed:', err.message);
      });
  }, [id, cookies.token]);

  const handleEdit = () => {
    const data = {
      title: newTitle,
      url: newUrl,
      detail: newDetail,
      review: newReview,
    };

    axios
      .put(getUrl, data, {
        headers: {
          Authorization: `Bearer ${cookies.token}`,
          'Content-Type': 'application/json',
        },
      })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleDelete = () => {
    axios
      .delete(getUrl, {
        headers: {
          Authorization: `Bearer ${cookies.token}`,
          'Content-Type': 'application/json',
        },
      })
      .then((res) => {
        console.log(res);
        navigate('/Home');
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4 relative">
      <Link to="/home" className="absolute top-4 left-4 px-4 py-2 bg-gray-600 text-white font-semibold rounded hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500">
        戻る
      </Link>
      {beforeData ? (
        <div className="w-full max-w-md p-8 border rounded-lg shadow-lg bg-white">
          <h1 className="text-2xl font-bold mb-4">レビューの編集</h1>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">タイトル</label>
            <input
              type="text"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-lg"
              placeholder="タイトル"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">URL</label>
            <input
              type="text"
              value={newUrl}
              onChange={(e) => setNewUrl(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-lg"
              placeholder="URL"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">詳細</label>
            <input
              type="text"
              value={newDetail}
              onChange={(e) => setNewDetail(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-lg"
              placeholder="詳細"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">レビュー</label>
            <input
              type="text"
              value={newReview}
              onChange={(e) => setNewReview(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-lg"
              placeholder="レビュー"
            />
          </div>
          <button
            type="button"
            onClick={handleEdit}
            className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg mb-4"
          >
            更新
          </button>
          <button
            type="button"
            onClick={handleDelete}
            className="w-full bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg"
          >
            削除
          </button>
        </div>
      ) : (
        <p>データを読み込み中...</p>
      )}
    </div>
  );
}

export default EditReview;
