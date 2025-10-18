type VirtualUserListProps = {
  targetUserRules: string;
  setTargetUserRules: (value: string) => void;
};

export const VirtualUserList = ({
  targetUserRules,
  setTargetUserRules,
}: VirtualUserListProps) => {
  return (
    <>
      <fieldset className="fieldset">
        <legend className="fieldset-legend">想定ユーザー</legend>
        <div className="flex items-end gap-2">
          <textarea
            className="textarea h-24"
            placeholder="例: 20〜30代のプログラミング初心者、転職を考えている社会人、副業でプログラミングを学びたい人"
            value={targetUserRules}
            onChange={(e) => setTargetUserRules(e.target.value)}
          ></textarea>
          <button className="btn" disabled={!targetUserRules}>
            仮想ユーザーを生成
          </button>
        </div>
        <div className="label">
          年齢層、職業、経験レベル、学習目的、ライフスタイルなどを具体的に記述してください
        </div>
      </fieldset>
    </>
  );
};
