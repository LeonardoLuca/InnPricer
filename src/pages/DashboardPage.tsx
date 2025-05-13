import { BarChart, Hotel, Users } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartComponent } from "@/components/ui/chartComponent"; // Importando o gráfico corretamente


export default function DashboardPage() {
  const [predictions, setPredictions] = useState<PredictionsResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const hotels = [
    { name: "Hotel A", price: 250.00 },
    { name: "Hotel B", price: 320.00 },
    { name: "Hotel C", price: 180.00 },
  ];

  useEffect(() => {
    const fetchPredictions = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await getPredictions();
        setPredictions(data);
      } catch (error: any) {
        console.error('Erro ao buscar previsões:', error);
        setError("Não foi possível carregar as previsões. O serviço de previsões está indisponível.");
      } finally {
        setLoading(false);
      }
    };
    fetchPredictions();
  }, []);

  console.log("Predictions:", predictions);

  interface Prediction {
    date: string;
    prediction: number;
  }

  interface PredictionsResponse {
    predictions: Prediction[];
  }

  // Obter a previsão do dia atual ou a mais próxima no futuro
  const today = new Date().toISOString().split('T')[0];
  const todayDate = new Date(today);
  const nearestFuturePrediction = predictions?.predictions
    .filter(p => new Date(p.date) >= todayDate)
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())[0];

  const todayPrediction = nearestFuturePrediction?.prediction;
  console.log('Data atual:', today);
  console.log('Previsão mais próxima:', nearestFuturePrediction);

  // Calcular a média das previsões (apenas futuras, já garantido pela API)
  const averagePrediction = predictions && predictions.predictions.length > 0 
    ? predictions.predictions.reduce((sum: number, p: Prediction) => sum + p.prediction, 0) / predictions.predictions.length 
    : 0;

  console.log("Average predictions:", averagePrediction);

  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight text-black">Dashboard</h2>
      </div>
      {error ? (
        <div className="text-red-500 p-4 border border-red-500 rounded">
          {error}
        </div>
      ) : (
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
                  <p className="text-xs text-muted-foreground">
                    Previsão para {nearestFuturePrediction.date}
                  </p>
                </>
              ) : (
                <div>Previsão não disponível</div>
              )}
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Análise Média dos Concorrentes</CardTitle>
              <BarChart className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              {loading ? (
                <div>Carregando...</div>
              ) : averagePrediction || todayPrediction ? (
                <>
                  <div className="text-2xl font-bold">R${averagePrediction.toFixed(2)}</div>
                  <p className="text-xs text-muted-foreground">
                    Média para {nearestFuturePrediction.date}
                  </p>
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
      )}
      <div className="mt-12 w-full">
        <ChartComponent />
      </div>

    </div >
  );
}
