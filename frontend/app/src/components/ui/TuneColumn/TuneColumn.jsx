import React, { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import { ColorIcon } from "../ColorIcon/ColorIcon";
import {
  faCircleCheck,
  faCommentDots,
  faPause,
  faPlay,
  faThumbsUp,
} from "@fortawesome/free-solid-svg-icons";
import { DotsMenu } from "../DotsMenu/DotsMenu";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { tuneAtom } from "@/atoms/tuneAtom";
import { useAtom } from "jotai";

export const TuneColumn = ({ tune, index, onClick }) => {
  if (!tune) {
    return null;
  }

  // 曲名・アーティストがスクロールする場合にスタイルを適用
  const tuneNameRef = useRef(null);
  const tuneArtistRef = useRef(null);
  const tuneAlbumRef = useRef(null);

  useEffect(() => {
    const checkScroll = (element) => {
      if (element.scrollWidth > element.clientWidth) {
        element.classList.add("scroll-slide");
      }
    };

    checkScroll(tuneNameRef.current);
    checkScroll(tuneArtistRef.current);
    checkScroll(tuneAlbumRef.current);
  }, []);

  // 現在選択されているtuneを取得
  const [currentTune, setCurrentTune] = useAtom(tuneAtom);

  // 再生中かどうかを判断
  const [isPlaying, setIsPlaying] = useState(false);

  // ホバー時にアイコンを変更
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  // tuneが現在選択されているかどうかを判断
  const isSelected = currentTune && currentTune.id === tune.id;

  const handleClick = () => {
    setCurrentTune(tune); // 現在のtuneを設定
    if (onClick) onClick(); // TuneTableから渡されたonClick(tuneAtomを更新する関数)

    // isSelectedの計算をhandleClick内で直接行う
    const isTuneSelected = currentTune && currentTune.id === tune.id;
    if (isTuneSelected) {
      setIsPlaying(!isPlaying); // ここでのisSelectedは古い状態を参照しているため、直接計算した値を使用
    } else {
      setIsPlaying(true); // 新しく選択された場合は再生を開始
    }
  };

  // useEffect(() => {
  //   console.log("isPlaying:", isPlaying);
  //   console.log("isSelected:", isSelected);
  // }, [isPlaying, isSelected]);

  // 追加日をフォーマット
  const date = new Date(tune.added_at);
  const formattedDate = `${date.getFullYear()}年${date.getMonth() + 1}月${date.getDate()}日`;

  // 再生時間をフォーマット
  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, "0")}:${remainingSeconds.toString().padStart(2, "0")}`;
  };

  // 画像データからURLを抽出する関数
  const extractImageUrls = (imagesString) => {
    try {
      // 文字列をJSON形式に変換する前に、Rubyスタイルのハッシュ記法をJSON形式に修正
      // ここでの変換処理を適宜修正する必要があるかもしれません
      const correctedString = imagesString
        .replace(/=>/g, ":")
        .replace(/:(\w+)/g, ':"$1"')
        .replace(/(\w+):/g, '"$1":');
      // JSON形式の文字列をオブジェクトに変換
      const imagesArray = JSON.parse(correctedString);
      // URLのみを抽出して返す
      return imagesArray.map((image) => image.url);
    } catch (error) {
      console.error("JSONのパースに失敗しました: ", error);
      return []; // エラーが発生した場合は空の配列を返す
    }
  };

  // imagesStringは、画像データの文字列
  const imagesString = tune.images;
  const imageUrls = extractImageUrls(imagesString);
  console.log(imageUrls);

  return (
    <tr
      className={`cursor-pointer bg-black ${isSelected ? "bg-theme-black" : "hover:bg-theme-black"} text-theme-gray ${isSelected ? "text-white" : "hover:text-white"} h-[56px] w-full`}
      onClick={onClick}
    >
      {/* 番号 */}
      <td className="h-[56px] w-[50px] hidden sm:table-cell">
        <div
          className={`w-[18px] h-[18px] items-center justify-center ml-5 hidden sm:flex hover:text-white ${isSelected ? "text-theme-orange" : "text-theme-gray"}`}
          onClick={handleClick}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          {isHovered && !isSelected ? (
            <FontAwesomeIcon
              icon={faPlay}
              style={{ width: "100%", height: "100%" }}
            />
          ) : isHovered && isSelected && !isPlaying ? (
            <FontAwesomeIcon
              icon={faPlay}
              style={{ width: "100%", height: "100%" }}
            />
          ) : isHovered && isSelected && isPlaying ? (
            <FontAwesomeIcon
              icon={faPause}
              style={{ width: "100%", height: "100%" }}
            />
          ) : (
            <span
              style={{
                width: "100%",
                height: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {index + 1}
            </span>
          )}
        </div>
      </td>
      {/* 曲名セクション */}
      <td className="h-[56px] w-[300px] max-w-[300px] items-center overflow-hidden">
        <div
          className="flex items-center w-full h-full ml-5 sm:ml-0"
          onClick={handleClick}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          {/* 画像 */}
          <img
            src={imageUrls[0]}
            alt="images"
            className="object-cover h-10 w-10 rounded-sm flex-shrink-0"
          />
          {/* 曲名・アーティスト */}
          <div className="overflow-hidden ml-5 w-full flex-shrink">
            <h1
              ref={tuneNameRef}
              className={`text-sm font-extralight whitespace-nowrap overflow-x-hidden ${
                isSelected ? "text-theme-orange" : "text-white"
              } `}
            >{`${tune.name}`}</h1>
            <h2
              ref={tuneArtistRef}
              className="text-xs font-extralight whitespace-nowrap overflow-x-hidden"
            >{`${tune.artist}`}</h2>
          </div>
        </div>
      </td>
      {/* アルバムセクション */}
      <td className="h-[56px] w-[300px] overflow-hidden hidden lg:table-cell">
        <div className="flex items-center w-full whitespace-nowrap pl-5">
          <h1
            ref={tuneAlbumRef}
            className="text-sm font-extralight overflow-hidden"
          >
            {tune.album}
          </h1>
        </div>
      </td>
      {/* 追加日セクション */}
      <td className="hidden h-[56px] w-[300px] sm:table-cell justify-between mx-5 overflow-hidden">
        <div className="flex items-center justify-between pl-5 w-full">
          {/* 追加日 */}
          {/* YYYY年M月D日で日付を表示 */}
          <span className="hidden sm:flex text-sm font-extralight ">
            {formattedDate}
          </span>
          <div className="flex items-center space-x-14 pr-16">
            {/* チェックボタン */}
            <ColorIcon icon={faCircleCheck} />
            {/* レコメンドボタン */}
            <ColorIcon icon={faThumbsUp} />
            {/* コメントボタン */}
            <ColorIcon icon={faCommentDots} />
          </div>
        </div>
      </td>
      {/* 再生時間 */}
      <td className="mx-5 h-[56px] w-[150px] overflow-hidden hidden lg:table-cell">
        <div className="flex items-center">
          <span className="text-sm font-extralight">
            {formatTime(tune.time)}
          </span>
        </div>
      </td>
      {/* ドットメニュー */}
      <td className="sm:hidden">
        <div className="md:hidden justify-center px-4">
          <DotsMenu />
        </div>
      </td>
    </tr>
  );
};

TuneColumn.propTypes = {
  tune: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    artist: PropTypes.string.isRequired,
    album: PropTypes.string.isRequired,
    images: PropTypes.string.isRequired,
    added_at: PropTypes.string.isRequired,
    time: PropTypes.string.isRequired,
  }),
  index: PropTypes.number.isRequired,
  onClick: PropTypes.func.isRequired,
};
