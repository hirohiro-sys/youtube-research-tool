import { VirtualUser } from "../../hooks/useAiVote";

type VirtualUserListProps = {
  targetUserRules: string;
  setTargetUserRules: (value: string) => void;
  generateVirtualUsers: () => Promise<void>;
  virtualUsers: VirtualUser[];
};

export const VirtualUserList = ({
  targetUserRules,
  setTargetUserRules,
  generateVirtualUsers,
  virtualUsers,
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
          <button
            className="btn"
            disabled={!targetUserRules}
            onClick={generateVirtualUsers}
          >
            仮想ユーザーを生成
          </button>
        </div>
        <div className="label">
          年齢層、職業、経験レベル、学習目的、ライフスタイルなどを具体的に記述してください
        </div>
      </fieldset>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {virtualUsers.map((user) => (
          <div key={user.id} className="card bg-base-100 shadow-md">
            <div className="card-body">
              <h2 className="card-title">
                {user.name}({user.age}歳)
              </h2>
              <p className="text-xs">{user.overview}</p>
              <p className="text-xs">興味: {user.interest}</p>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};
