import { useRouter } from "next/navigation";
import { logout } from "@/app/login/actions";

export default function LogOut() {
  const router = useRouter();

  const handleGoogleLogout = async () => {
    const result = await logout();
    if (result) router.refresh();
  };
  return (
    <div className="text-right mt-8 mr-[245px]">
      <button className="btn btn-link" onClick={handleGoogleLogout}>
        ログアウト
      </button>
    </div>
  );
}
