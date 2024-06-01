import BookList from "./BookList";
import Pagenation from "./Pagenation";

function Home() {

  return (
    <>
      <Header/>
      <BookList/>
      <Pagenation/>
    </>
  )
}

function Header ()  {
  return (
    <header className="w-[100%] h-[100px] bg-gray-500" >
      <div className="text-4xl p-[20px]">書籍レビュー</div>
    </header>
  )
}


export default Home;