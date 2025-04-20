import { useEffect, useState } from "react";
import { BarChart, Hotel, Users } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartComponent } from "@/components/ui/chartComponent";
import { getPredictions } from "@/services/api";

export default function DashboardPage() {
  const [predictions, setPredictions] = useState<PredictionsResponse | null>(null);
  //const [predictions, setPredictions] = useState<PredictionsResponse | null>(null);

  const [loading, setLoading] = useState(true);

  // Lista de hotéis (mantida como está por enquanto)
  const hotels = [
    { name: "Hotel A", price: 250.00 },
    { name: "Hotel B", price: 320.00 },
    { name: "Hotel C", price: 180.00 },
  ];

  useEffect(() => {
    const fetchPredictions = async () => {
      const today = new Date();
      const startDate = new Date(today.getTime() - 180 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
      const endDate = new Date(today.getTime() + 180 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];

      try {
        const data = await getPredictions(startDate, endDate);
        setPredictions(data);
      } catch (error) {
        console.error('Erro ao buscar previsões:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchPredictions();
  }, []);

  console.log("Predctions:", predictions);

  interface Prediction {
    date: string;
    prediction: number;
  }

  interface PredictionsResponse {
    start: string;
    end: string;
    predictions: Prediction[];
  }

// Obter a previsão do dia atual
const today = new Date().toISOString().split('T')[0];
const todayPrediction = predictions?.predictions.find(p => p.date === today)?.prediction;

// Calcular a média das previsões
const averagePrediction = predictions && predictions.predictions.length > 0 ? predictions.predictions.reduce((sum: number, p: Prediction) => sum + p.prediction, 0) / predictions.predictions.length : 0;

console.log("Avarege predctions:", averagePrediction);

  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight text-black">Dashboard</h2>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Preço Recomendado</CardTitle>
            <Hotel className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            {loading ? (
              <div>Carregando...</div>
            ) : todayPrediction ? (
              <>
                <div className="text-2xl font-bold">R${todayPrediction.toFixed(2)}</div>
                <p className="text-xs text-muted-foreground">+12% em relação a mês anterior</p>
              </>
            ) : (
              <div>Previsão não disponível para hoje</div>
            )}
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Análise Média do Concorrentes</CardTitle>
            <BarChart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            {loading ? (
              <div>Carregando...</div>
            ) : averagePrediction ? (
              <>
                <div className="text-2xl font-bold">R${averagePrediction.toFixed(2)}</div>
                <p className="text-xs text-muted-foreground">+5% em relação a mês anterior</p>
              </>
            ) : (
              <div>Média não disponível</div>
            )}
          </CardContent>
        </Card>
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
      <div className="mt-12 w-full">
        <ChartComponent />
      </div>
    </div>
  );
}