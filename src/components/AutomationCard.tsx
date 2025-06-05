import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { Play, MoreVertical, Activity, Clock, TestTube } from "lucide-react";
import { useState } from "react";
import { WebhookResponse } from "./WebhookResponse";

interface Automation {
  id: number;
  title: string;
  description: string;
  category: string;
  videoUrl: string;
  webhookUrl?: string;
  isActive: boolean;
  executionCount: number;
  lastExecution: string;
}

interface AutomationCardProps {
  automation: Automation;
}

export const AutomationCard = ({ automation }: AutomationCardProps) => {
  const [isTestRunning, setIsTestRunning] = useState(false);
  const [webhookResponse, setWebhookResponse] = useState<any>(null);
  const [responseTimestamp, setResponseTimestamp] = useState<string>("");
  const { toast } = useToast();

  const handleTest = async () => {
    if (!automation.webhookUrl) {
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
      const response = await fetch(automation.webhookUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          timestamp: new Date().toISOString(),
          triggered_from: window.location.origin,
          automation_id: automation.id,
          automation_title: automation.title
        }),
      });

      if (response.ok) {
        const data = await response.json();
        setWebhookResponse(data);
        setResponseTimestamp(new Date().toLocaleString('fr-FR'));
        
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
      "Finance": "bg-yellow-100 text-yellow-800 border-yellow-200"
    };
    return colors[category as keyof typeof colors] || "bg-gray-100 text-gray-800 border-gray-200";
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
            onClick={handleTest}
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
                Tester l'automatisation
              </>
            )}
          </Button>
        </CardFooter>
      </Card>
      
      {/* Affichage de la réponse du webhook */}
      {webhookResponse && (
        <WebhookResponse 
          response={webhookResponse}
          automationTitle={automation.title}
          timestamp={responseTimestamp}
        />
      )}
    </div>
  );
};
