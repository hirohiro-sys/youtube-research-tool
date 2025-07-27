import Breadcrumb from "@/src/components/breadcrumb";

export default function Page() {
  return (
    <div className="pt-22 flex-grow">
      <Breadcrumb
        items={[
          { label: "ホーム", href: "/" },
          { label: "AIサムネイル分析", href: "/thumbnail-analysis" },
        ]}
      />
    </div>
  );
}
