
import { AutomationCard } from "@/components/AutomationCard";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { StatsSection } from "@/components/StatsSection";

const automations = [
  {
    id: 1,
    title: "Gestion Intelligente des Emails",
    description: "Tri automatique, classement, réponses automatiques et synchronisation avec Google Sheets ou Slack pour optimiser votre messagerie.",
    category: "Communication",
    videoUrl: "https://example.com/demo-video-1.mp4",
    webhookUrl: "https://n8n.srv837294.hstgr.cloud/webhook/email_management",
    isActive: true,
    executionCount: 1567,
    lastExecution: "Il y a 5 minutes"
  },
  {
    id: 2,
    title: "Extraction de Données de Factures",
    description: "Extraction automatique de données depuis les factures reçues par email ou Telegram, puis enregistrement dans Google Sheets ou CRM.",
    category: "Finance",
    videoUrl: "https://example.com/demo-video-2.mp4",
    webhookUrl: "https://n8n.srv837294.hstgr.cloud/webhook/invoice_extraction",
    isActive: true,
    executionCount: 892,
    lastExecution: "Il y a 15 minutes",
    formType: "file" as const
  },
  {
    id: 3,
    title: "Publication Automatique Réseaux Sociaux",
    description: "Création et publication automatique de contenus sur TikTok, LinkedIn, Instagram à partir d'un flux RSS, blog ou podcast.",
    category: "Marketing",
    videoUrl: "https://example.com/demo-video-3.mp4",
    webhookUrl: "https://n8n.srv837294.hstgr.cloud/webhook/social_media",
    isActive: true,
    executionCount: 1234,
    lastExecution: "Il y a 30 minutes"
  },
  {
    id: 4,
    title: "Agent IA WhatsApp",
    description: "Réponses automatiques, prise de rendez-vous, suivi client et intégration avec OpenAI pour des réponses personnalisées sur WhatsApp.",
    category: "Communication",
    videoUrl: "https://example.com/demo-video-4.mp4",
    webhookUrl: "https://n8n.srv837294.hstgr.cloud/webhook/whatsapp_ai",
    isActive: true,
    executionCount: 789,
    lastExecution: "Il y a 2 minutes"
  },
  {
    id: 5,
    title: "Génération de Rapports Automatique",
    description: "Génération automatique de rapports financiers, RH, ventes à partir de différentes sources et envoi programmé par email ou Slack.",
    category: "Reporting",
    videoUrl: "https://example.com/demo-video-5.mp4",
    webhookUrl: "https://n8n.srv837294.hstgr.cloud/webhook/reports",
    isActive: true,
    executionCount: 456,
    lastExecution: "Il y a 1 heure"
  },
  {
    id: 6,
    title: "Système de Réservation Automatisé",
    description: "Gestion des réservations avec confirmation par SMS ou WhatsApp, gestion des disponibilités et synchronisation avec Google Calendar.",
    category: "CRM & Marketing",
    videoUrl: "https://example.com/demo-video-6.mp4",
    webhookUrl: "https://n8n.srv837294.hstgr.cloud/webhook/booking",
    isActive: true,
    executionCount: 678,
    lastExecution: "Il y a 20 minutes"
  },
  {
    id: 7,
    title: "Surveillance de Sites Web",
    description: "Monitoring automatique de sites web ou applications avec alertes automatiques en cas d'incident ou de changement détecté.",
    category: "Infrastructure",
    videoUrl: "https://example.com/demo-video-7.mp4",
    webhookUrl: "https://n8n.srv837294.hstgr.cloud/webhook/monitoring",
    isActive: true,
    executionCount: 2341,
    lastExecution: "Il y a 3 minutes"
  },
  {
    id: 8,
    title: "Automatisation Support Client",
    description: "Création de tickets, réponses initiales automatiques, et escalade intelligente selon la demande pour optimiser votre support.",
    category: "Communication",
    videoUrl: "https://example.com/demo-video-8.mp4",
    webhookUrl: "https://n8n.srv837294.hstgr.cloud/webhook/support",
    isActive: true,
    executionCount: 1123,
    lastExecution: "Il y a 8 minutes"
  },
  {
    id: 9,
    title: "Synchronisation de Contacts",
    description: "Synchronisation automatique de contacts ou leads entre plusieurs outils (CRM, Google Contacts, Mailchimp, etc.).",
    category: "CRM & Marketing",
    videoUrl: "https://example.com/demo-video-9.mp4",
    webhookUrl: "https://n8n.srv837294.hstgr.cloud/webhook/contact_sync",
    isActive: true,
    executionCount: 987,
    lastExecution: "Il y a 12 minutes"
  },
  {
    id: 10,
    title: "Génération de Contenus Visuels IA",
    description: "Génération de vidéos ou visuels à partir de prompts IA, stockage sur Google Drive et publication sur YouTube ou réseaux sociaux.",
    category: "Intelligence Artificielle",
    videoUrl: "https://example.com/demo-video-10.mp4",
    webhookUrl: "https://n8n.srv837294.hstgr.cloud/webhook/ai_content",
    isActive: true,
    executionCount: 543,
    lastExecution: "Il y a 25 minutes",
    formType: "video" as const
  }
];

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-blue-100">
      <Header />
      <Hero />
      <StatsSection />
      
      {/* Automatisations Section */}
      <section className="py-16 px-4 max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Nos Automatisations Intelligentes
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Découvrez comment Ynnovia optimise les processus métier avec des automatisations intelligentes et robustes
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
