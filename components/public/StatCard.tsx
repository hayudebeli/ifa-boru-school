import { LucideIcon } from "lucide-react";

interface StatCardProps {
  icon: LucideIcon;
  value: number | string;
  label: string;
  color?: "blue" | "orange" | "green" | "purple";
  suffix?: string;
}

const colorMap = {
  blue: {
    bg: "bg-blue-50",
    icon: "bg-[#1a3a8f] text-white",
    value: "text-[#1a3a8f]",
    border: "border-[#1a3a8f]/20",
  },
  orange: {
    bg: "bg-orange-50",
    icon: "bg-[#f97316] text-white",
    value: "text-[#f97316]",
    border: "border-[#f97316]/20",
  },
  green: {
    bg: "bg-green-50",
    icon: "bg-green-600 text-white",
    value: "text-green-700",
    border: "border-green-200",
  },
  purple: {
    bg: "bg-purple-50",
    icon: "bg-purple-600 text-white",
    value: "text-purple-700",
    border: "border-purple-200",
  },
};

export default function StatCard({ icon: Icon, value, label, color = "blue", suffix = "" }: StatCardProps) {
  const colors = colorMap[color];

  return (
    <div className={`${colors.bg} ${colors.border} border rounded-2xl p-6 text-center card-hover transition-all duration-300 group`}>
      {/* Icon */}
      <div className={`w-14 h-14 ${colors.icon} rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
        <Icon className="w-7 h-7" />
      </div>

      {/* Value */}
      <div className={`text-3xl md:text-4xl font-extrabold ${colors.value} mb-1`}>
        {typeof value === "number" ? value.toLocaleString() : value}
        {suffix}
      </div>

      {/* Label */}
      <p className="text-gray-600 text-sm font-medium">{label}</p>
    </div>
  );
}
