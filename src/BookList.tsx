import { useDispatch, useSelector } from "react-redux"
import { fetchBooks } from './features/bookSlice'
import { useEffect } from "react";
import {RootState} from '../store'

const BookList = () => {
  const dispatch = useDispatch();
  const { reviews, status, error, offset } = useSelector((state:RootState) => state.books);

  useEffect(() => {
    dispatch(fetchBooks(offset));
  }, [dispatch, offset]);

  if (status === 'failed') {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <ul>
        {reviews.map((review)=>{
          console.log(review.id);
          return (
            <div className="m-10 p-8 border rounded-lg shadow-lg bg-white">
            <h2 className="text-2xl font-bold mb-4">{review.title}</h2>
            <p className="text-gray-700 mb-2">
              <span className="font-semibold">URL: </span>
              <a className="underline text-blue-500" href={review.url} target="_blank" rel="noopener noreferrer">
                {review.url}
              </a>
            </p>
            <p className="text-gray-700 mb-2">
              <span className="font-semibold">Detail: </span>{review.detail}
            </p>
            <p className="text-gray-700 mb-2">
              <span className="font-semibold">Review: </span>{review.review}
            </p>
            <p className="text-gray-700">
              <span className="font-semibold">Reviewer: </span>{review.reviewer}
            </p>
          </div>
          )
        })}
      </ul>
    </div>
  );
};

export default BookList;