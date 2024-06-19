import { atom } from "jotai";
// import { useEffect } from 'react';
// import Cookies from 'js-cookie';

const userAtom = atom(null);

// ユーザーがログインしているかどうかを判定するためのatom
const isLoggedInAtom = atom((get) => get(userAtom) !== null);

// ログインユーザー情報をセットする関数
const loginUser = (setUser, user) => {
  setUser(user); // ユーザー情報でuserAtomを更新
};
// ログアウト処理を行う関数
const logoutUser = (setUser) => {
  setUser(null); // userAtomをnullに設定してログアウト状態にする
};

// セッションチェックを行うカスタムフック
// const useCheckSession = () => {
//   const [user, setUser] = useAtom(userAtom);

//   useEffect(() => {
//     const sessionCookie = Cookies.get('session_cookie_name');
//     if (sessionCookie) {
//       // セッションクッキーが存在する場合、ユーザー情報を設定
//       // 実際には、サーバーからユーザー情報を取得するなどの処理が必要
//       setUser(user);
//     } else {
//       // セッションクッキーが存在しない場合、ユーザー情報をクリア
//       setUser(null);
//     }
//   }, [setUser]);
// };

export { userAtom, isLoggedInAtom, loginUser, logoutUser };
