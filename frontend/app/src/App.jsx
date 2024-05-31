import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// import { useState } from "react";
// import "./App.css";
// import './styles.css';
// import Login from "@/containers/Login";
// import LoggedIn from "@/containers/LoggedIn";
// import { getTokenFromUrl } from "./urls/Spotify";
import { Header } from "@/components/ui/Header/Header";
import { WordFooter } from "@/components/ui/WordFooter/WordFooter";
import { TuneFooter } from "@/components/ui/TuneFooter/TuneFooter";
import Top from "./containers/Top";
import Signup from "./containers/Signup";
import Community from "./containers/Community";
import CommunityEdit from "./containers/CommunityEdit";
import Login from "./containers/Login";
import User from "./containers/User";
import UserEdit from "./containers/UserEdit";

function App() {
  // const [token, setToken] = useState(null);

  // useEffect(() => {
  //   const hash = getTokenFromUrl();
  //   console.log(hash);
  //   window.location.hash = ""; // URLからアクセストークンの表示を削除
  //   const token = hash.access_token;

  //   if (token) {
  //     setToken(token);
  //   }
  // }, []);

  //

  const tune = {
    name: "Song Name",
    artist: "Artist Name",
    album: "Album Name",
    images: {
      small: "https://picsum.photos/200",
      large: "https://picsum.photos/500",
    },
    time: "00:00",
  };

  // const user = {
  //   name: "User Name",
  // };

  return (
    <div className="flex flex-col min-h-screen w-screen min-w-screen bg-black relative overflow-hidden">
      <div className="fixed z-10 w-full">
        <Header />
      </div>
      <main className="flex flex-col flex-grow mb-[72px] mt-16 w-full">
        <Router>
          <Routes>
            {/* コミュニティ一覧 */}
            <Route path="/" element={<Top />} />
            {/* サインアップ */}
            <Route path="/signup" element={<Signup />} />
            {/* ログイン */}
            <Route path="/login" element={<Login />} />
            {/* コミュニティ情報 */}
            <Route path="/communities/:communitiesId" element={<Community />} />
            {/* コミュニティ編集 */}
            <Route
              path="/communities/:communitiesId/edit"
              element={<CommunityEdit />}
            />
            {/* ユーザー情報 */}
            <Route path="/users/:usersId" element={<User />} />
            {/* ユーザー編集 */}
            <Route path="/users/:usersId/edit" element={<UserEdit />} />
          </Routes>
        </Router>
        <div className="px-16">
          <WordFooter />
        </div>
      </main>
      <div className="fixed bottom-0 z-10 w-full">
        {tune && <TuneFooter tune={tune} />}
      </div>
    </div>
  );
}

export default App;
