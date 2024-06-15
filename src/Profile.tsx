import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { RootState } from "../store"
import { useEffect, useState } from "react";
import { fetchUser } from "./features/userSlice";
import axios from "axios";
import { useCookies } from "react-cookie";


function Profile () {

  const auth = useSelector((state: RootState) => state.auth.isSignIn);
  const user = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [cookies] = useCookies();
  const [newName , setNewName] = useState(user.name);
  const handleSetName = (e) => setNewName(e.target.value);

  useEffect(() => {
    if (auth) {
      dispatch(fetchUser());
    }
  }, [auth, dispatch]);

  const UpdateName = () =>{
    const data ={
      name:newName,
    }
    axios
    .put("https://railway.bookreview.techtrain.dev/users",data,{
      headers: {
        authorization : `Bearer ${cookies.token}`
      }
    })
    .then((res)=>{
      navigate('/Home');
      console.log(res);
    })
    .catch((err)=>{
      console.log(err);
    })
  }

return(
  <>
  <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
    <Link to="/home" className="absolute top-4 left-4 px-4 py-2 bg-gray-600 text-white font-semibold rounded hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500">
        戻る
    </Link>
    <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md mb-6">
      <div className="text-lg font-semibold mb-2">変更前</div>
      <div className="text-gray-700 mb-4">{user.name}</div>
    </div>
    <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
      <div className="text-lg font-semibold mb-2">変更後</div>
      <input
        type="text"
        value={newName}
        onChange={handleSetName}
        className="w-full p-2 border border-gray-300 rounded-lg mb-4"
        placeholder="新しい名前を入力"
      />
      <button
        type="button"
        onClick={UpdateName}
        className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg"
      >
        更新
      </button>
    </div>
  </div>
  </>
  )
}

export default Profile;