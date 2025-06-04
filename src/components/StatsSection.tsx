
import { TrendingUp, Users, Zap, Clock } from "lucide-react";

const stats = [
  {
    icon: Zap,
    value: "150+",
    label: "Automatisations Créées",
    description: "Flux de travail optimisés"
  },
  {
    icon: Clock,
    value: "2000h",
    label: "Temps Économisé",
    description: "Pour mes clients"
  },
  {
    icon: Users,
    value: "50+",
    label: "Clients Satisfaits",
    description: "Projets réussis"
  },
  {
    icon: TrendingUp,
    value: "99.9%",
    label: "Fiabilité",
    description: "Uptime garanti"
  }
];

export const StatsSection = () => {
  return (
    <section className="py-16 px-4 bg-white/50 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="text-center group"
            >
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl mb-4 group-hover:scale-110 transition-transform duration-300">
                <stat.icon className="w-8 h-8 text-white" />
              </div>
              <div className="text-3xl md:text-4xl font-bold text-gray-900 mb-1">
                {stat.value}
              </div>
              <div className="text-sm md:text-base font-semibold text-gray-700 mb-1">
                {stat.label}
              </div>
              <div className="text-xs md:text-sm text-gray-500">
                {stat.description}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
