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
              <Button variant="ghost">Cadastre-se</Button>
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
                src="https://www.youtube.com/embed/iLsdhHUa18Q?autoplay=1&loop=1&mute=1&controls=0&modestbranding=1&rel=0&playlist=iLsdhHUa18Q"
                title="Vídeo de Apresentação do InnPricer"
                frameBorder="0"
                allow="autoplay; encrypted-media"
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

        <section>
          <div className="contato-container">
            <div className="contato-header">
              <h2 className="text-3xl font-bold text-center mb-12">Fale Conosco</h2>
              <br />
              <p>Estamos disponíveis para atender todas as suas necessidades</p>
              <br />
            </div>

            <div className="contato-info">
              <div className="info-item">
                <i className="fas fa-phone"></i>
                <p><strong>Telefone:</strong> (81) 5555-1234</p>
              </div>

              <div className="info-item">
                <i className="fas fa-envelope"></i>
                <p><strong>E-mail:</strong> contato@innpricer.com.br</p>
              </div>

              <div className="info-item">
                <i className="fas fa-map-marker-alt"></i>
                <p><strong>Endereço:</strong> Av. Cais do Apolo, 77 - Recife, SP</p>
              </div>
            </div>

            <div className="social-media">
              <h3>Siga-nos nas redes sociais</h3>
              <div className="social-icons">
                <a href="https://facebook.com/innpricer" target="_blank" className="social-icon">
                  <svg xmlns="http://www.w3.org/2000/svg"
                    className="h-7 w-7"
                    fill="white"
                    style={{ color: "#ff0000" }}
                    viewBox="0 0 24 24">
                    <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" />
                  </svg>
                </a>
                <a href="https://instagram.com/innpricer" target="_blank" className="social-icon">
                  <svg xmlns="http://www.w3.org/2000/svg"
                    className="h-7 w-7"
                    fill="white"
                    style={{ color: "#ff0000" }}
                    viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                  </svg>
                </a>
                <a href="https://linkedin.com/company/innpricer" target="_blank" className="social-icon">
                  <svg xmlns="http://www.w3.org/2000/svg"
                    className="h-7 w-7"
                    fill="white"
                    style={{ color: "#ff0000" }}
                    viewBox="0 0 24 24">
                    <path d="M4.98 3.5c0 1.381-1.11 2.5-2.48 2.5s-2.48-1.119-2.48-2.5c0-1.38 1.11-2.5 2.48-2.5s2.48 1.12 2.48 2.5zm.02 4.5h-5v16h5v-16zm7.982 0h-4.968v16h4.969v-8.399c0-4.67 6.029-5.052 6.029 0v8.399h4.988v-10.131c0-7.88-8.922-7.593-11.018-3.714v-2.155z" />
                  </svg>
                </a>
                <a href="https://twitter.com/innpricer" target="_blank" className="social-icon">
                  <svg xmlns="http://www.w3.org/2000/svg"
                    className="h-7 w-7"
                    fill="white"
                    style={{ color: "#ff0000" }}
                    viewBox="0 0 24 24">
                    <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                  </svg>
                </a>
              </div>
            </div>

            <Link to="mailto:contato@innpricer.com.br">
              <Button variant="ghost" className="h-30 w-60 text-xl">Fale Conosco</Button>
            </Link>

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