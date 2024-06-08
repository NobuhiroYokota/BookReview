import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { signOut } from "./features/authSlice";
import { useEffect } from "react";
import { fetchUser } from "./features/userSlice";
import { RootState } from '../store';
import { useCookies } from "react-cookie";

export function Header() {
  const auth = useSelector((state: RootState) => state.auth.isSignIn);
  const user = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [cookies, setCookie, removeCookie] = useCookies();

  useEffect(() => {
    if (auth) {
      dispatch(fetchUser());
    }
  }, [auth, dispatch]);

  const handleLogout = () => {
    dispatch(signOut());
    removeCookie('token');
    navigate('/');
  };

  return (
    <header className="flex items-center justify-between w-full h-20 bg-gray-700 px-4 text-white">
      <div className="text-4xl">書籍レビュー</div>
      {auth ? (
        <div className="flex items-center">
          <Link to={'/Home/new'} className="mr-4">レビューを追加</Link>
          {user.iconUrl && <img src={user.iconUrl} alt="User Icon" className="w-10 h-10 rounded-full mr-4" />}
          <Link to="Profile" className="mr-4">{user.name}</Link>
          <button onClick={handleLogout} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
            Logout
          </button>
        </div>
      ) : (
        <Link to="/Signup" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Signup
        </Link>
      )}
    </header>
  );
}

export default Header;