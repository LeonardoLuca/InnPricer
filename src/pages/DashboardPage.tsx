import { BarChart, Hotel, Users } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartComponent } from "@/components/ui/ChartComponent"; // Importando o gráfico corretamente


export default function DashboardPage() {

  // Lista de hotéis e seus preços
  const hotels = [
    { name: "Hotel A", price: 250.00 },
    { name: "Hotel B", price: 320.00 },
    { name: "Hotel C", price: 180.00 },
  ];

  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight text-black">Dashboard</h2>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Preço Recomendado
            </CardTitle>
            <Hotel className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">R$112,00</div>
            <p className="text-xs text-muted-foreground">
              +12% em relação a semana anterior
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Análise Média do Concorrentes
            </CardTitle>
            <BarChart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">R$ 280,00</div>
            <p className="text-xs text-muted-foreground">
              +5% em relação a semana anterior
            </p>
          </CardContent>
        </Card>
        
        {/* Card de Hóspedes Ativos com a lista de hotéis */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Análise dos Concorrentes</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="mt-4">
              <h4 className="text-sm font-semibold">Hotéis e Preços</h4>
              <ul className="mt-2 space-y-1 text-sm text-muted-foreground">
                {hotels.map((hotel, index) => (
                  <li key={index}>
                    {hotel.name} - R${hotel.price.toFixed(2)}
                  </li>
                ))}
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Gráfico */}
      <div className="mt-12 w-full">
        <ChartComponent />
      </div>

    </div >
  );
}