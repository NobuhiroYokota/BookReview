import Header from "./Header"
import BookList from "./BookList";
import Pagenation from "./Pagenation";
import { Link } from "react-router-dom";

function Home() {
  return (
    <>
      <Header/>
      <BookList/>
      <Pagenation/>
    </>
  )
}


export default Home;
