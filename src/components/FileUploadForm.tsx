
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Upload } from "lucide-react";

interface FileUploadFormProps {
  onSubmit: (data: { fileContent: string; fileName: string }) => void;
  isLoading: boolean;
  acceptedFileTypes?: string;
  title?: string;
}

export const FileUploadForm = ({ 
  onSubmit, 
  isLoading, 
  acceptedFileTypes = ".txt,.csv,.json,.pdf",
  title = "Fichier à traiter"
}: FileUploadFormProps) => {
  const [file, setFile] = useState<File | null>(null);
  const { toast } = useToast();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!file) {
      toast({
        title: "Erreur",
        description: "Veuillez sélectionner un fichier.",
        variant: "destructive",
      });
      return;
    }

    try {
      let fileContent: string;
      
      if (file.type === 'application/pdf') {
        // Pour les PDF, on envoie le fichier en base64
        const reader = new FileReader();
        reader.onload = (e) => {
          const base64 = e.target?.result as string;
          onSubmit({ 
            fileContent: base64,
            fileName: file.name 
          });
        };
        reader.readAsDataURL(file);
        return;
      } else {
        // Pour les autres fichiers, on lit le contenu texte
        fileContent = await file.text();
      }
      
      onSubmit({ 
        fileContent, 
        fileName: file.name 
      });
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Impossible de lire le fichier.",
        variant: "destructive",
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="file">{title} *</Label>
        <Input
          id="file"
          type="file"
          onChange={handleFileChange}
          disabled={isLoading}
          accept={acceptedFileTypes}
        />
        {file && (
          <p className="text-sm text-gray-600">
            Fichier sélectionné: {file.name}
          </p>
        )}
      </div>

      <Button 
        type="submit" 
        disabled={isLoading || !file}
        className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
      >
        {isLoading ? (
          <>
            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
            Traitement en cours...
          </>
        ) : (
          <>
            <Upload className="w-4 h-4 mr-2" />
            Traiter le fichier
          </>
        )}
      </Button>
    </form>
  );
};
