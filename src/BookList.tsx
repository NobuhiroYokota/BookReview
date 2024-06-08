import { useDispatch, useSelector } from "react-redux"
import { fetchBooks } from './features/bookSlice'
import { useEffect } from "react";
import { RootState } from '../store'
import { Link } from "react-router-dom";

const BookList = () => {
  const dispatch = useDispatch();
  const { reviews, status, error, offset } = useSelector((state:RootState) => state.books);

  useEffect(() => {
    dispatch(fetchBooks(offset));
    console.log(reviews)
  }, [dispatch, offset]);

  if (status === 'failed') {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <ul>
        {reviews.map((review)=>{
          return (
            <div key={review.id} className="m-10 p-8 border rounded-lg shadow-lg bg-white">
              <Link to={review.id}>
                <h2 className="text-2xl font-bold mb-4">{review.title}</h2>
                <p className="text-gray-700 mb-2">
                  <span className="font-semibold">URL: </span>
                  <a className="underline text-blue-500" href={review.url} target="_blank" rel="noopener noreferrer">
                    {review.url}
                  </a>
                </p>
                <p className="text-gray-700 mb-2">
                  <span className="font-semibold">レビュー: </span>{review.review}
                </p>
                <p className="text-gray-700">
                  <span className="font-semibold">レビュワー: </span>{review.reviewer}
                </p>
              {review.isMine &&
              <Link to={`/edit/${review.id}`} className="inline-block mt-4 px-4 py-2 bg-blue-600 text-white font-semibold rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500">
              編集
              </Link>
              }
            </Link>
          </div>
          )
        })}
      </ul>
    </div>
  );
};

export default BookList;