
import { AutomationCard } from "@/components/AutomationCard";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { StatsSection } from "@/components/StatsSection";

const automations = [
  {
    id: 1,
    title: "Synchronisation CRM-Email",
    description: "Automatise la synchronisation entre votre CRM et vos campagnes email. Met à jour automatiquement les contacts et déclenche des séquences personnalisées.",
    category: "CRM & Marketing",
    videoUrl: "https://example.com/demo-video-1.mp4",
    isActive: true,
    executionCount: 1247,
    lastExecution: "Il y a 2 minutes"
  },
  {
    id: 2,
    title: "Notification Slack des Ventes",
    description: "Envoie instantanément des notifications Slack à votre équipe lors de nouvelles ventes ou leads qualifiés avec tous les détails importants.",
    category: "Communication",
    videoUrl: "https://example.com/demo-video-2.mp4",
    isActive: true,
    executionCount: 892,
    lastExecution: "Il y a 15 minutes"
  },
  {
    id: 3,
    title: "Sauvegarde Base de Données",
    description: "Effectue des sauvegardes automatiques de vos bases de données critiques et les stocke de manière sécurisée dans le cloud.",
    category: "Infrastructure",
    videoUrl: "https://example.com/demo-video-3.mp4",
    isActive: true,
    executionCount: 156,
    lastExecution: "Il y a 1 heure"
  },
  {
    id: 4,
    title: "Génération de Rapports",
    description: "Génère et distribue automatiquement des rapports hebdomadaires de performance à votre équipe de direction.",
    category: "Reporting",
    videoUrl: "https://example.com/demo-video-4.mp4",
    isActive: false,
    executionCount: 78,
    lastExecution: "Il y a 3 jours"
  },
  {
    id: 5,
    title: "Traitement Factures",
    description: "Traite automatiquement les factures entrantes, extrait les données importantes et les intègre dans votre système comptable.",
    category: "Finance",
    videoUrl: "https://example.com/demo-video-5.mp4",
    isActive: true,
    executionCount: 342,
    lastExecution: "Il y a 30 minutes"
  },
  {
    id: 6,
    title: "Monitoring Serveurs",
    description: "Surveille la santé de vos serveurs 24/7 et envoie des alertes automatiques en cas de problème détecté.",
    category: "Infrastructure",
    videoUrl: "https://example.com/demo-video-6.mp4",
    isActive: true,
    executionCount: 2156,
    lastExecution: "Il y a 1 minute"
  }
];

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <Header />
      <Hero />
      <StatsSection />
      
      {/* Automatisations Section */}
      <section className="py-16 px-4 max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Mes Automatisations n8n
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Découvrez comment j'optimise les processus métier avec des automatisations intelligentes et robustes
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {automations.map((automation) => (
            <AutomationCard key={automation.id} automation={automation} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default Index;
