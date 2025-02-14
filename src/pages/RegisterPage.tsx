import { Link } from "react-router-dom";
import { Hotel } from "lucide-react";
import { Button } from "@/components/ui/button";
import RegisterForm from "@/components/forms/RegisterForm";

export default function RegisterPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container relative min-h-screen flex-col items-center justify-center grid lg:max-w-none lg:grid-cols-2 lg:px-0">
        <Link
          to="/login"
          className="absolute right-4 top-4 md:right-8 md:top-8"
        >
          <Button variant="ghost">Login</Button>
        </Link>
        <div className="relative hidden h-full flex-col bg-muted p-10 text-white lg:flex dark:border-r">
          <div className="absolute inset-0 bg-zinc-900" />
          <div className="relative z-20 flex items-center text-lg font-medium">
            <Hotel className="mr-2 h-6 w-6" />
            InnPricer
          </div>
          <div className="relative z-20 mt-auto">
            <blockquote className="space-y-2">
              <p className="text-lg">
                "O InnPricer revolucionou a forma como precificamos nossas diárias.
                Aumentamos nossa receita em 25% no primeiro mês."
              </p>
              <footer className="text-sm">Luiz Lima, Hotel Empika</footer>
            </blockquote>
          </div>
        </div>
        <div className="lg:p-8">
          <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px] lg:w-[400px]">
            <div className="flex flex-col space-y-2 text-center">
              <h1 className="text-2xl font-semibold tracking-tight">
                Criar uma conta
              </h1>
              <p className="text-sm text-muted-foreground">
                Preencha os dados abaixo para começar
              </p>
            </div>
            <RegisterForm />
            <p className="px-8 text-center text-sm text-muted-foreground">
              Ao clicar em cadastrar, você concorda com nossos{" "}
              <Link
                to="/terms"
                className="link-custom"
              >
                Termos de Serviço
              </Link>{" "}
              e{" "}
              <Link
                to="/privacy"
                className="link-custom"
              >
                Política de Privacidade
              </Link>
              .
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}