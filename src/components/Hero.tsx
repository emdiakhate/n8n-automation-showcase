
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Zap, CheckCircle } from "lucide-react";

export const Hero = () => {
  return (
    <section className="relative py-20 px-4 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-blue-700/10"></div>
      <div className="absolute top-20 left-10 w-72 h-72 bg-blue-400/20 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl"></div>
      
      <div className="relative max-w-7xl mx-auto text-center">
        <Badge className="mb-6 bg-blue-100 text-blue-800 border-blue-200">
          <Zap className="w-4 h-4 mr-2" />
          Automatisations Intelligentes Professionnelles
        </Badge>
        
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-gray-900 mb-6 leading-tight">
          Transformez vos
          <span className="bg-gradient-to-r from-blue-500 to-blue-700 bg-clip-text text-transparent"> Processus</span>
          <br />
          avec l'Automatisation
        </h1>
        
        <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
          Découvrez comment Ynnovia optimise les flux de travail avec des automatisations sur mesure, 
          robustes et scalables pour votre entreprise.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
          <Button size="lg" className="bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 text-lg px-8 py-4">
            Voir les Démonstrations
            <ArrowRight className="ml-2 w-5 h-5" />
          </Button>
          <Button variant="outline" size="lg" className="text-lg px-8 py-4 border-2 border-blue-500 text-blue-600 hover:bg-blue-50">
            Consultation Gratuite
          </Button>
        </div>
        
        {/* Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
          <div className="flex items-center justify-center space-x-3 text-gray-700">
            <CheckCircle className="w-6 h-6 text-blue-500" />
            <span className="text-lg font-medium">100% Sans Code</span>
          </div>
          <div className="flex items-center justify-center space-x-3 text-gray-700">
            <CheckCircle className="w-6 h-6 text-blue-500" />
            <span className="text-lg font-medium">Intégrations Multiples</span>
          </div>
          <div className="flex items-center justify-center space-x-3 text-gray-700">
            <CheckCircle className="w-6 h-6 text-blue-500" />
            <span className="text-lg font-medium">Support 24/7</span>
          </div>
        </div>
      </div>
    </section>
  );
};
