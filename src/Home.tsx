import axios from "axios";
import { useEffect, useState } from "react";


function Home() {

  interface Info {
    id: string;
    title: string;
    url: string;
    detail: string;
    review: string;
    reviewer: string;
  }


  const [data,setData] = useState<Info[]>([]);

  useEffect(() =>{
    fetch('https://railway.bookreview.techtrain.dev/public/books?offset=0')
    .then(response => {
      return response.json();
    }).then((data)=>{
      console.log(data);
      setData(data);
    })
  },[]);

  return (
    <>
    <Header/>
    <div className="p-4 bg-gray-100 min-h-screen">
  {data.map((obj, i) => (
    <div key={i} className="m-10 p-8 border rounded-lg shadow-lg bg-white">
      <h2 className="text-2xl font-bold mb-4">{obj.title}</h2>
      <p className="text-gray-700 mb-2">
        <span className="font-semibold">URL: </span>
        <a className="underline text-blue-500" href={obj.url} target="_blank" rel="noopener noreferrer">
          {obj.url}
        </a>
      </p>
      <p className="text-gray-700 mb-2">
        <span className="font-semibold">Detail: </span>{obj.detail}
      </p>
      <p className="text-gray-700 mb-2">
        <span className="font-semibold">Review: </span>{obj.review}
      </p>
      <p className="text-gray-700">
        <span className="font-semibold">Reviewer: </span>{obj.reviewer}
      </p>
    </div>
  ))}
</div>

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