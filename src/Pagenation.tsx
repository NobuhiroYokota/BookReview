import { useDispatch } from "react-redux"
import { decreamentOffset, increamentOffset } from "./features/bookSlice";

const Pagenation = () =>{
  const dispatch = useDispatch();

  const handleNext = () =>{
    dispatch(increamentOffset());
  };

  const handlePrevious = () =>{
    dispatch(decreamentOffset());
  };

  return (
    <div className="flex justify-center mt-4">
    <button
      className="px-4 py-2 mx-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
      onClick={handlePrevious}
    >
      前へ
    </button>
    <button
      className="px-4 py-2 mx-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
      onClick={handleNext}
    >
      次へ
    </button>
  </div>
  )
};

export default Pagenation;