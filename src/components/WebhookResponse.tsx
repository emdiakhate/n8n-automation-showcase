
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, AlertCircle, Clock, Server } from "lucide-react";

interface WebhookResponseProps {
  response: any;
  automationTitle: string;
  timestamp: string;
}

export const WebhookResponse = ({ response, automationTitle, timestamp }: WebhookResponseProps) => {
  const formatValue = (value: any): string => {
    if (typeof value === 'object' && value !== null) {
      return JSON.stringify(value, null, 2);
    }
    return String(value);
  };

  const getStatusIcon = (success: boolean) => {
    return success ? (
      <CheckCircle className="w-5 h-5 text-green-500" />
    ) : (
      <AlertCircle className="w-5 h-5 text-red-500" />
    );
  };

  return (
    <Card className="mt-4 border-2 border-blue-200 bg-blue-50/50">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg flex items-center gap-2">
            <Server className="w-5 h-5 text-blue-600" />
            Réponse de {automationTitle}
          </CardTitle>
          <Badge variant="outline" className="flex items-center gap-1">
            <Clock className="w-3 h-3" />
            {timestamp}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {response.status && (
            <div className="flex items-center gap-2">
              {getStatusIcon(response.status === 'success')}
              <span className="font-medium">
                Statut: {response.status === 'success' ? 'Succès' : 'Erreur'}
              </span>
            </div>
          )}
          
          {response.message && (
            <div className="bg-white p-3 rounded-lg border">
              <h4 className="font-medium text-gray-700 mb-1">Message:</h4>
              <p className="text-gray-600">{response.message}</p>
            </div>
          )}
          
          {response.data && (
            <div className="bg-white p-3 rounded-lg border">
              <h4 className="font-medium text-gray-700 mb-2">Données:</h4>
              <pre className="text-sm text-gray-600 whitespace-pre-wrap bg-gray-50 p-2 rounded">
                {formatValue(response.data)}
              </pre>
            </div>
          )}
          
          {response.execution_time && (
            <div className="bg-white p-3 rounded-lg border">
              <h4 className="font-medium text-gray-700 mb-1">Temps d'exécution:</h4>
              <p className="text-gray-600">{response.execution_time}</p>
            </div>
          )}
          
          {/* Affichage générique pour toute autre propriété */}
          {Object.keys(response).filter(key => 
            !['status', 'message', 'data', 'execution_time'].includes(key)
          ).map(key => (
            <div key={key} className="bg-white p-3 rounded-lg border">
              <h4 className="font-medium text-gray-700 mb-1 capitalize">{key.replace('_', ' ')}:</h4>
              <p className="text-gray-600">{formatValue(response[key])}</p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
