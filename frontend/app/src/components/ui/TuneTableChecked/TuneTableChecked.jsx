import { useEffect, useState } from "react";
import { TuneColumnChecked } from "@/components/ui/TuneColumnChecked/TuneColumnChecked";
import { faClock } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PropTypes from "prop-types";
import { faList, faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { PlayIcon } from "../PlayIcon/PlayIcon";
import { useParams } from "react-router-dom";
import { useCheckTunes } from "@/hooks/ useCheckTunes";
import { useAtom } from "jotai";
import { playlistAtom } from "@/atoms/playlistAtom";
import useSearchPlaylist from "@/hooks/useSearchPlaylist";
import { tuneAtom } from "@/atoms/tuneAtom";
import usePreviewPlay from "@/hooks/usePreviewPlay";
import { isLoggedInAtom } from "@/atoms/userAtoms";
import { playerAtom } from "@/atoms/playerAtom";

export const TuneTableChecked = () => {
  const { userId } = useParams();
  const [currentPlaylist, setCurrentPlaylist] = useAtom(playlistAtom);
  const [player] = useAtom(playerAtom);
  const [isLoggedIn] = useAtom(isLoggedInAtom);

  // チェックした楽曲を取得
  const {
    data: checkTunesData,
    // status: checkTunesStatus,
    error: checkTunesError,
  } = useCheckTunes(userId);

  // console.log("checkTunesData:", checkTunesData);
  // console.log("checkTunesStatus:", checkTunesStatus);

  useEffect(() => {
    if (checkTunesError) {
      // エラーハンドリングのロジックをここに移動
      console.error("Error loading tunes:", checkTunesError);
    }
  }, [checkTunesError]);

  // チェックした楽曲データが取得できた場合、グローバルステートで管理する
  useEffect(() => {
    if (checkTunesData) {
      setCurrentPlaylist(checkTunesData);
    }
  }, [checkTunesData]);

  // 検索機能
  // ドロップダウンメニュー以外ををクリックすると閉じる
  const {
    searchText,
    setSearchText,
    isSearchVisible,
    setIsSearchVisible,
    filteredPlaylist,
    node,
  } = useSearchPlaylist(checkTunesData || []); // playlistDataがundefinedの場合に空の配列を渡す

  // 楽曲を選択してグローバルステートへ
  const [tune, setTune] = useAtom(tuneAtom);
  const [previewUrl, setPreviewUrl] = useState(null);

  // previewUrlが変更されたときにusePreviewPlayを呼び出す
  usePreviewPlay(previewUrl);

  // useEffect(() => {
  //   console.log("tuneAtom updated:", tune);
  // }, [tune]);

  const handleColumnClick = (index, tune) => {
    if (isLoggedIn) {
      setTune({ index, tune });
    } else {
      // tune.preview_url が存在するかチェック
      if (tune.preview_url) {
        setPreviewUrl(tune.preview_url);
      }
      setTune({ index, tune });
    }
  };

  // プレイリストの再生コントロール
  const handlePlay = () => {
    if (!tune) {
      setTune({ index: 0, tune: currentPlaylist[0] });
    }
    // playerが存在し、togglePlayメソッドがある場合にのみ実行
    if (tune && player && typeof player.togglePlay === "function") {
      player.togglePlay();
    }
  };

  // エラーがある場合はここで早期リターン
  if (checkTunesError) {
    return <div>Error</div>;
  }

  return (
    <div className="flex flex-col items-end max-w-[1200px]">
      {/* テーブル操作セクション */}
      <div
        className="flex justify-between pb-16 items-center h-10 w-full"
        ref={node}
      >
        <div className="pl-5 sm:pl-11">
          <PlayIcon color="text-theme-orange" size="10" onClick={handlePlay} />
        </div>
        <div className="flex">
          {isSearchVisible ? (
            <div className="relative">
              <input
                type="text"
                placeholder="Search..."
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                className="pl-10 bg-transparent text-theme-gray mr-5 focus:outline-none"
              />
              <FontAwesomeIcon
                icon={faMagnifyingGlass}
                className="absolute left-2 top-1/2 transform -translate-y-1/2 text-theme-gray"
              />
            </div>
          ) : (
            <FontAwesomeIcon
              icon={faMagnifyingGlass}
              className="text-theme-gray mr-5"
              onClick={() => setIsSearchVisible(!isSearchVisible)}
            />
          )}
          <FontAwesomeIcon icon={faList} className="text-theme-gray" />
        </div>
      </div>
      {/* データテーブルセクション */}
      <table className="table-fixed lg:w-[1200px]">
        <thead className="sm:text-theme-gray sm:table-header sm:table-row-group hidden">
          <tr>
            <th className="text-left w-[50px] border-b border-theme-gray pl-6 hidden sm:table-cell">
              #
            </th>
            <th className="text-left sm:w-[300px] border-b border-theme-gray">
              タイトル
            </th>
            <th className="text-left w-[300px] border-b border-theme-gray pl-5 hidden lg:table-cell">
              アルバム
            </th>
            <th className="text-left w-[400px] border-b border-theme-gray pl-5 hidden sm:table-cell">
              追加日
            </th>
            <th className="text-left w-[50px] border-b border-theme-gray pl-1 hidden lg:table-cell">
              <FontAwesomeIcon
                icon={faClock}
                className="hidden sm:inline-block"
              />
            </th>
            <th className="sm:hidden"></th>
          </tr>
        </thead>
        <tbody>
          {filteredPlaylist.map((tune, index) => (
            <TuneColumnChecked
              tune={{
                ...tune,
                id: tune.id.toString(),
                time: tune.time.toString(),
              }}
              index={index}
              key={index.toString()}
              onClick={() => handleColumnClick(index, tune)}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

TuneTableChecked.propTypes = {
  tunes: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      artist: PropTypes.string,
      album: PropTypes.string,
      images: PropTypes.string,
      added_at: PropTypes.string,
      time: PropTypes.string,
    }),
  ).isRequired,
};
