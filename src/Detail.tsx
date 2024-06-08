import axios from "axios";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { Link, useParams } from "react-router-dom";

function Detail() {
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
  const [cookies] = useCookies(['token']);
  const [data, setData] = useState<DataForm | null>(null);

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
        setData(response.data);
      })
      .catch((err) => {
        console.log('Get failed:', err.message);
      });
  }, [id, cookies.token]);

  useEffect(() => {
    axios
      .post(postUrl, {selectBookId:id}, {
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
  }, [cookies.token]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      {data ? (
        <div className="m-10 p-8 border rounded-lg shadow-lg bg-white max-w-2xl w-full">
          <h1 className="text-2xl font-bold mb-4">{data.title}</h1>
          <p className="text-gray-700 mb-2">
            <span className="font-semibold">URL: </span>
            <a href={data.url} className="underline text-blue-500" target="_blank" rel="noopener noreferrer">
              {data.url}
            </a>
          </p>
          <p className="text-gray-700 mb-2">
            <span className="font-semibold">詳細: </span>{data.detail}
          </p>
          <p className="text-gray-700 mb-2">
            <span className="font-semibold">レビュー: </span>{data.review}
          </p>
          <p className="text-gray-700">
            <span className="font-semibold">レビュアー: </span>{data.reviewer}
          </p>
          {data.isMine &&
            <Link to={`/edit/${id}`} className="inline-block mt-4 px-4 py-2 bg-blue-600 text-white font-semibold rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500">
            編集
            </Link>
          }
        </div>
      ) : (
        <p>データを読み込み中...</p>
      )}
    </div>
  );
}

export default Detail;
