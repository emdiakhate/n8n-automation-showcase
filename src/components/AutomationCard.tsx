import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { Play, MoreVertical, Activity, Clock, TestTube, FileText, Sparkles } from "lucide-react";
import { useState } from "react";
import { WebhookResponse } from "./WebhookResponse";
import { ScrappingForm } from "./ScrappingForm";
import { FileUploadForm } from "./FileUploadForm";
import { DataTable } from "./DataTable";

interface Automation {
  id: number;
  title: string;
  description: string;
  category: string;
  videoUrl: string;
  webhookUrl?: string;
  formUrl?: string;
  isActive: boolean;
  executionCount: number;
  lastExecution: string;
  formType?: 'scrapping' | 'video' | 'file';
}

interface AutomationCardProps {
  automation: Automation;
}

export const AutomationCard = ({ automation }: AutomationCardProps) => {
  const [isTestRunning, setIsTestRunning] = useState(false);
  const [webhookResponse, setWebhookResponse] = useState<any>(null);
  const [responseTimestamp, setResponseTimestamp] = useState<string>("");
  const [isResponseDialogOpen, setIsResponseDialogOpen] = useState(false);
  const [isFormDialogOpen, setIsFormDialogOpen] = useState(false);
  const { toast } = useToast();

  const handleTest = async (formData?: any) => {
    if (automation.formType === 'scrapping' && !formData) {
      setIsFormDialogOpen(true);
      return;
    }

    if (automation.formType === 'file' && !formData) {
      setIsFormDialogOpen(true);
      return;
    }

    if (automation.formType === 'video') {
      if (automation.formUrl) {
        window.open(automation.formUrl, '_blank');
        return;
      }
    }

    if (!automation.webhookUrl && !automation.formType) {
      // Comportement par défaut pour les automatisations sans webhook
      setIsTestRunning(true);
      console.log(`Testing automation: ${automation.title}`);
      
      toast({
        title: "Test en cours...",
        description: `Lancement du test pour "${automation.title}"`,
      });

      setTimeout(() => {
        setIsTestRunning(false);
        toast({
          title: "Test réussi !",
          description: `L'automatisation "${automation.title}" fonctionne parfaitement.`,
        });
      }, 3000);
      return;
    }

    // Nouveau comportement pour les webhooks
    setIsTestRunning(true);
    setWebhookResponse(null);
    console.log(`Calling webhook for: ${automation.title}`, automation.webhookUrl);
    
    toast({
      title: "Appel du webhook en cours...",
      description: `Connexion à l'automatisation "${automation.title}"`,
    });

    try {
      // Vérifier si c'est RAG ou Générer Documents pour utiliser GET
      const isGetRequest = automation.title === "RAG" || automation.title === "Générer Documents";
      
      let response;
      
      if (isGetRequest) {
        // Requête GET simple
        response = await fetch(automation.webhookUrl!, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
      } else {
        // Requête POST avec données
        const requestBody = {
          timestamp: new Date().toISOString(),
          triggered_from: window.location.origin,
          automation_id: automation.id,
          automation_title: automation.title,
          ...formData
        };

        response = await fetch(automation.webhookUrl!, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(requestBody),
        });
      }

      if (response.ok) {
        const data = await response.json();
        setWebhookResponse(data);
        setResponseTimestamp(new Date().toLocaleString('fr-FR'));
        setIsResponseDialogOpen(true);
        setIsFormDialogOpen(false);
        
        toast({
          title: "Webhook exécuté avec succès !",
          description: `L'automatisation "${automation.title}" a répondu.`,
        });
      } else {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }
    } catch (error) {
      console.error("Error calling webhook:", error);
      
      const errorResponse = {
        status: 'error',
        message: error instanceof Error ? error.message : 'Erreur inconnue',
        timestamp: new Date().toISOString()
      };
      
      setWebhookResponse(errorResponse);
      setResponseTimestamp(new Date().toLocaleString('fr-FR'));
      setIsResponseDialogOpen(true);
      setIsFormDialogOpen(false);
      
      toast({
        title: "Erreur lors de l'appel du webhook",
        description: `Impossible de contacter l'automatisation "${automation.title}".`,
        variant: "destructive",
      });
    } finally {
      setIsTestRunning(false);
    }
  };

  const getCategoryColor = (category: string) => {
    const colors = {
      "CRM & Marketing": "bg-blue-100 text-blue-800 border-blue-200",
      "Communication": "bg-green-100 text-green-800 border-green-200",
      "Infrastructure": "bg-purple-100 text-purple-800 border-purple-200",
      "Reporting": "bg-orange-100 text-orange-800 border-orange-200",
      "Finance": "bg-yellow-100 text-yellow-800 border-yellow-200",
      "Scrapping": "bg-red-100 text-red-800 border-red-200",
      "Marketing": "bg-pink-100 text-pink-800 border-pink-200",
      "Intelligence Artificielle": "bg-indigo-100 text-indigo-800 border-indigo-200"
    };
    return colors[category as keyof typeof colors] || "bg-gray-100 text-gray-800 border-gray-200";
  };

  const getButtonText = () => {
    if (automation.formType === 'video') {
      return "Ouvrir le formulaire";
    }
    return "Tester l'automatisation";
  };

  const renderVideoThumbnail = () => {
    // Special thumbnail for "Générer Documents"
    if (automation.title === "Générer Documents") {
      return (
        <div className="relative bg-gradient-to-br from-indigo-100 via-blue-50 to-purple-100 rounded-lg aspect-video mb-4 overflow-hidden group/video">
          <div className="absolute inset-0 flex items-center justify-center">
            {/* AI Document Generation themed background */}
            <div className="absolute inset-0 opacity-20">
              <div className="absolute top-4 left-4 w-8 h-10 bg-blue-300 rounded transform rotate-12"></div>
              <div className="absolute top-8 right-6 w-6 h-8 bg-purple-300 rounded transform -rotate-12"></div>
              <div className="absolute bottom-6 left-8 w-10 h-6 bg-indigo-300 rounded transform rotate-45"></div>
              <Sparkles className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-16 h-16 text-blue-400 opacity-30" />
            </div>
            
            {/* Main content */}
            <div className="relative z-10 text-center">
              <div className="bg-white/90 rounded-full p-4 mb-3 shadow-lg">
                <FileText className="w-8 h-8 text-blue-600" />
              </div>
              <Dialog>
                <DialogTrigger asChild>
                  <Button 
                    variant="secondary" 
                    size="lg"
                    className="bg-white/90 hover:bg-white shadow-lg group-hover/video:scale-110 transition-transform"
                  >
                    <Play className="w-6 h-6 mr-2" />
                    Voir la démo
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-4xl">
                  <DialogHeader>
                    <DialogTitle>{automation.title} - Démonstration</DialogTitle>
                  </DialogHeader>
                  <div className="aspect-video bg-gray-900 rounded-lg overflow-hidden">
                    <iframe
                      width="100%"
                      height="100%"
                      src="https://www.youtube.com/embed/9UsJwm3OYfc"
                      title="Générer Documents - Démonstration"
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    ></iframe>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </div>
      );
    }

    // Default thumbnail for other automations
    return (
      <div className="relative bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg aspect-video mb-4 overflow-hidden group/video">
        <div className="absolute inset-0 flex items-center justify-center">
          <Dialog>
            <DialogTrigger asChild>
              <Button 
                variant="secondary" 
                size="lg"
                className="bg-white/90 hover:bg-white shadow-lg group-hover/video:scale-110 transition-transform"
              >
                <Play className="w-6 h-6 mr-2" />
                Voir la démo
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-4xl">
              <DialogHeader>
                <DialogTitle>{automation.title} - Démonstration</DialogTitle>
              </DialogHeader>
              <div className="aspect-video bg-gray-900 rounded-lg flex items-center justify-center">
                <div className="text-center text-white">
                  <Play className="w-16 h-16 mx-auto mb-4 opacity-50" />
                  <p className="text-lg">Vidéo de démonstration</p>
                  <p className="text-sm opacity-75">URL: {automation.videoUrl}</p>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    );
  };

  const getFileUploadProps = () => {
    if (automation.title === "Synchronisation CRM") {
      return {
        acceptedFileTypes: ".pdf",
        title: "Fichier PDF à analyser"
      };
    }
    return {
      acceptedFileTypes: ".txt,.csv,.json",
      title: "Fichier à traiter"
    };
  };

  return (
    <div>
      <Card className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border-0 shadow-lg bg-white/80 backdrop-blur-sm">
        <CardHeader className="pb-4">
          <div className="flex items-start justify-between">
            <div className="flex items-center space-x-2">
              <div className={`w-3 h-3 rounded-full ${automation.isActive ? 'bg-green-500' : 'bg-gray-400'}`}></div>
              <Badge className={getCategoryColor(automation.category)}>
                {automation.category}
              </Badge>
            </div>
            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
              <MoreVertical className="w-4 h-4" />
            </Button>
          </div>
          
          <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
            {automation.title}
          </h3>
        </CardHeader>

        <CardContent className="pb-6">
          <p className="text-gray-600 mb-4 leading-relaxed">
            {automation.description}
          </p>
          
          <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
            <div className="flex items-center space-x-1">
              <Activity className="w-4 h-4" />
              <span>{automation.executionCount} exécutions</span>
            </div>
            <div className="flex items-center space-x-1">
              <Clock className="w-4 h-4" />
              <span>{automation.lastExecution}</span>
            </div>
          </div>

          {/* Video Thumbnail */}
          {renderVideoThumbnail()}
        </CardContent>

        <CardFooter>
          <Button 
            onClick={() => handleTest()}
            disabled={isTestRunning || !automation.isActive}
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 disabled:opacity-50"
          >
            {isTestRunning ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                {automation.webhookUrl ? "Appel en cours..." : "Test en cours..."}
              </>
            ) : (
              <>
                <TestTube className="w-4 h-4 mr-2" />
                {getButtonText()}
              </>
            )}
          </Button>
        </CardFooter>
      </Card>
      
      {/* Dialog pour le formulaire de scrapping */}
      {automation.formType === 'scrapping' && (
        <Dialog open={isFormDialogOpen} onOpenChange={setIsFormDialogOpen}>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Configuration Scrapping</DialogTitle>
            </DialogHeader>
            <ScrappingForm 
              onSubmit={handleTest}
              isLoading={isTestRunning}
            />
          </DialogContent>
        </Dialog>
      )}

      {/* Dialog pour le formulaire de fichier - seulement pour Synchronisation CRM */}
      {automation.formType === 'file' && automation.title === "Synchronisation CRM" && (
        <Dialog open={isFormDialogOpen} onOpenChange={setIsFormDialogOpen}>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Analyse de PDF</DialogTitle>
            </DialogHeader>
            <FileUploadForm 
              onSubmit={handleTest}
              isLoading={isTestRunning}
              {...getFileUploadProps()}
            />
          </DialogContent>
        </Dialog>
      )}
      
      {/* Dialog pour afficher la réponse du webhook */}
      <Dialog open={isResponseDialogOpen} onOpenChange={setIsResponseDialogOpen}>
        <DialogContent className="max-w-6xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Résultat de l'automatisation - {automation.title}</DialogTitle>
          </DialogHeader>
          {webhookResponse && (
            <WebhookResponse 
              response={webhookResponse}
              automationTitle={automation.title}
              timestamp={responseTimestamp}
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};
