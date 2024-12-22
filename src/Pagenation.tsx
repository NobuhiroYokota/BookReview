import { useDispatch } from "react-redux";
import { decreamentOffset, increamentOffset } from "./features/bookSlice";

const Pagination = () => {
  const dispatch = useDispatch();

  const handleNext = () => {
    dispatch(increamentOffset());
  };

  const handlePrevious = () => {
    dispatch(decreamentOffset());
  };

  return (
    <div className="flex justify-center mt-4">
      <button
        className="px-4 py-2 mx-2 bg-blue-700 text-gray-100 rounded-md hover:bg-blue-800"
        onClick={handlePrevious}
      >
        前へ
      </button>
      <button
        className="px-4 py-2 mx-2 bg-blue-700 text-gray-100 rounded-md hover:bg-blue-800"
        onClick={handleNext}
      >
        次へ
      </button>
    </div>
  );
};

export default Pagination;
