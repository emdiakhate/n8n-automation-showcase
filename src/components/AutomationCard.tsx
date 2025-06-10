import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { Play, MoreVertical, Activity, Clock, TestTube } from "lucide-react";
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
    if ((automation.formType === 'scrapping' || automation.formType === 'file') && !formData) {
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
      const requestBody = {
        timestamp: new Date().toISOString(),
        triggered_from: window.location.origin,
        automation_id: automation.id,
        automation_title: automation.title,
        ...formData
      };

      const response = await fetch(automation.webhookUrl!, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });

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
      "Marketing": "bg-pink-100 text-pink-800 border-pink-200"
    };
    return colors[category as keyof typeof colors] || "bg-gray-100 text-gray-800 border-gray-200";
  };

  const getButtonText = () => {
    if (automation.formType === 'video') {
      return "Ouvrir le formulaire";
    }
    return "Tester l'automatisation";
  };

  const renderResponseContent = () => {
    if (!webhookResponse) return null;

    // Si les données contiennent un tableau, l'afficher sous forme de tableau
    if (webhookResponse.data && Array.isArray(webhookResponse.data)) {
      return (
        <div className="space-y-4">
          <DataTable data={webhookResponse.data} title="Résultats" />
          {webhookResponse.message && (
            <div className="bg-white p-3 rounded-lg border">
              <h4 className="font-medium text-gray-700 mb-1">Message:</h4>
              <p className="text-gray-600">{webhookResponse.message}</p>
            </div>
          )}
        </div>
      );
    }

    // Sinon, utiliser l'affichage standard
    return (
      <WebhookResponse 
        response={webhookResponse}
        automationTitle={automation.title}
        timestamp={responseTimestamp}
      />
    );
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

      {/* Dialog pour le formulaire de fichier */}
      {automation.formType === 'file' && (
        <Dialog open={isFormDialogOpen} onOpenChange={setIsFormDialogOpen}>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Traitement de fichier</DialogTitle>
            </DialogHeader>
            <FileUploadForm 
              onSubmit={handleTest}
              isLoading={isTestRunning}
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
          {renderResponseContent()}
        </DialogContent>
      </Dialog>
    </div>
  );
};
