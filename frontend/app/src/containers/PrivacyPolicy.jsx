import React from "react";

const PrivacyPolicy = () => {
  return (
    <div className="container flex flex-col bg-theme-black max-w-[890px] h-full mx-auto my-8 rounded-sm justify-center items-center overflow-hidden">
      <div className="w-full max-w-[550px] mx-auto items-center text-white my-8">
        <div className="my-8">
          <p>
            Mixtones（以下、「当方」といいます。）は、本ウェブサイト上で提供するサービス（以下、「本サービス」といいます。）におけるユーザーの個人情報の取扱いについて、以下のとおりプライバシーポリシー（以下、「本ポリシー」といいます。）を定めます。
          </p>
        </div>
        <div className="text-theme-gray text-sm">
          <h2 className="text-xl text-white mt-4">お客様から取得する情報</h2>
          <p>当方は、お客様から以下の情報を取得します。</p>
          <ul className="list-disc pl-5">
            <li>氏名(ニックネームやペンネームも含む)</li>
            <li>メールアドレス</li>
            <li>
              外部サービスでお客様が利用するID、その他外部サービスのプライバシー設定によりお客様が連携先に開示を認めた情報
            </li>
            <li>
              本サービスの滞在時間、入力履歴、購買履歴等の本サービスにおけるお客様の行動履歴
            </li>
            <li>
              本サービスの起動時間、入力履歴、購買履歴等の本サービスの利用履歴
            </li>
          </ul>
          <h2 className="text-xl text-white mt-4">
            お客様の情報を利用する目的
          </h2>
          <p>
            当方は、お客様から取得した情報を、以下の目的のために利用します。
          </p>
          <ul className="list-disc pl-5">
            <li>
              当社サービスに関する登録の受付、お客様の本人確認、認証のため
            </li>
            <li>お客様の本サービスの利用履歴を管理するため</li>
            <li>以上の他、当社サービスの提供、維持、保護及び改善のため</li>
          </ul>
          <h2 className="text-xl text-white mt-4">
            安全管理のために講じた措置
          </h2>
          <p>
            当方が、お客様から取得した情報に関して安全管理のために講じた措置につきましては、末尾記載のお問い合わせ先にご連絡をいただきましたら、法令の定めに従い個別にご回答させていただきます。
          </p>
          <h2 className="text-xl text-white mt-4">第三者提供</h2>
          <p>
            当方は、お客様から取得する情報のうち、個人データ（個人情報保護法第２条第６項）に該当するものついては、あらかじめお客様の同意を得ずに、第三者（日本国外にある者を含みます。）に提供しません。
            但し、次の場合は除きます。
          </p>
          <ul className="list-disc pl-5">
            <li>個人データの取扱いを外部に委託する場合</li>
            <li>当方や本サービスが買収された場合</li>
            <li>
              事業パートナーと共同利用する場合（具体的な共同利用がある場合は、その内容を別途公表します。）
            </li>
            <li>その他、法律によって合法的に第三者提供が許されている場合</li>
          </ul>
          <h2 className="text-xl text-white mt-4">アクセス解析ツール</h2>
          <p>
            当方は、お客様のアクセス解析のために、「Googleアナリティクス」を利用しています。Googleアナリティクスは、トラフィックデータの収集のためにCookieを使用しています。トラフィックデータは匿名で収集されており、個人を特定するものではありません。Cookieを無効にすれば、これらの情報の収集を拒否することができます。詳しくはお使いのブラウザの設定をご確認ください。
            Googleアナリティクスについて、詳しくは
            <a
              href="https://marketingplatform.google.com/about/analytics/terms/jp/"
              target="_blank"
              rel="noreferrer"
            >
              こちら
            </a>
            からご確認ください。
          </p>
          <h2 className="text-xl text-white mt-4">
            プライバシーポリシーの変更
          </h2>
          <p>
            当方は、必要に応じて、このプライバシーポリシーの内容を変更します。この場合、変更後のプライバシーポリシーの施行時期と内容を適切な方法により周知または通知します。
          </p>
          <h2 className="text-xl text-white mt-4">お問い合わせ</h2>
          <p>
            お客様の情報の開示、情報の訂正、利用停止、削除をご希望の場合は、以下のメールアドレスにご連絡ください。
          </p>
          <span>
            e-mail:
            <p>sai.engineer3815@gmail.com</p>
          </span>
          <br />
          <br />
          <p>以上</p>
          <p>2024年07月23日 制定</p>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
