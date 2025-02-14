import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Hotel, BarChart3, Shield } from 'lucide-react';

export default function LandingPage() {
  return (
    <div className="min-h-screen w-full bg-background">
      <header className="border-b">
        <div className=" mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Hotel className="h-6 w-6" />
            <span className="text-xl font-bold">InnPricer</span>
          </div>
          <nav className="space-x-4">
            <Link to="/login">
              <Button variant="ghost">Login</Button>
            </Link>
            <Link to="/register">
              <Button>Cadastre-se</Button>
            </Link>
          </nav>
        </div>
      </header>

      <main>
        <section className="py-20 px-4">
          <div className="container mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Precificação inteligente para seu hotel
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Maximize sua receita com nossa solução de precificação dinâmica baseada em IA
            </p>
            <Link to="/register">
              <Button size="lg" className="text-lg">
                Comece agora gratuitamente
              </Button>
            </Link>
          </div>
          <div className="mt-12">
            <div className="relative aspect-video max-w-4xl mx-auto">
              <iframe
                className="w-full h-full rounded-lg shadow-lg"
                src="https://www.youtube.com/embed/p7E96I28Hyk"
                title="Vídeo de Apresentação do InnPricer"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        </section>

        <section className="py-20 bg-muted/50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">
              Benefícios principais
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center p-6">
                <BarChart3 className="h-12 w-12 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">Análise em tempo real</h3>
                <p className="text-muted-foreground">
                  Monitore e ajuste seus preços baseado em dados do mercado
                </p>
              </div>
              <div className="text-center p-6">
                <Shield className="h-12 w-12 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">Decisões seguras</h3>
                <p className="text-muted-foreground">
                  Tome decisões respaldadas por dados confiáveis
                </p>
              </div>
              <div className="text-center p-6">
                <Hotel className="h-12 w-12 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">Gestão simplificada</h3>
                <p className="text-muted-foreground">
                  Interface intuitiva para gerenciar suas tarifas
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t py-8">
        <div className="container mx-auto px-4 text-center text-muted-foreground">
          © 2024 InnPricer. Todos os direitos reservados.
        </div>
      </footer>
    </div>
  );
}