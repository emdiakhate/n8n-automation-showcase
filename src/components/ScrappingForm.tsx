
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Search } from "lucide-react";

interface ScrappingFormProps {
  onSubmit: (data: { recherche: string; localisation: string; nombreMax: number }) => void;
  isLoading: boolean;
}

export const ScrappingForm = ({ onSubmit, isLoading }: ScrappingFormProps) => {
  const [recherche, setRecherche] = useState("");
  const [localisation, setLocalisation] = useState("");
  const [nombreMax, setNombreMax] = useState(10);
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!recherche.trim() || !localisation.trim()) {
      toast({
        title: "Erreur",
        description: "Veuillez remplir tous les champs requis.",
        variant: "destructive",
      });
      return;
    }

    onSubmit({ recherche, localisation, nombreMax });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="recherche">Recherche *</Label>
        <Input
          id="recherche"
          type="text"
          value={recherche}
          onChange={(e) => setRecherche(e.target.value)}
          placeholder="Ex: restaurants italiens"
          disabled={isLoading}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="localisation">Localisation *</Label>
        <Input
          id="localisation"
          type="text"
          value={localisation}
          onChange={(e) => setLocalisation(e.target.value)}
          placeholder="Ex: Paris, France"
          disabled={isLoading}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="nombreMax">Nombre maximum de résultats</Label>
        <Input
          id="nombreMax"
          type="number"
          min="1"
          max="100"
          value={nombreMax}
          onChange={(e) => setNombreMax(parseInt(e.target.value) || 10)}
          disabled={isLoading}
        />
      </div>

      <Button 
        type="submit" 
        disabled={isLoading}
        className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
      >
        {isLoading ? (
          <>
            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
            Scrapping en cours...
          </>
        ) : (
          <>
            <Search className="w-4 h-4 mr-2" />
            Lancer le scrapping
          </>
        )}
      </Button>
    </form>
  );
};
