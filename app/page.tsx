import HeroSection from "@/src/components/heroSection";
import ToolsSection from "@/src/components/toolsSection";

export default function TopPage() {
  return (
    <div className="flex-grow">
      <HeroSection />
      <ToolsSection />
    </div>
  );
}
