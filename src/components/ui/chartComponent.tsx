"use client";

import { useEffect, useState } from "react";
import { TrendingUp } from "lucide-react";
import { CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { getPredictions } from "@/services/api";

// Definição dos tipos
interface Prediction {
  date: string;
  prediction: number;
}

interface PredictionsResponse {
  predictions: Prediction[];
}

interface ChartData {
  time: string;
  value: number;
}

// Configuração do gráfico
const chartConfig: ChartConfig = {
  value: {
    label: "Preço",
    color: "hsl(var(--chart-3))",
  },
};

export function ChartComponent() {
  const [chartPredictions, setChartPredictions] = useState<PredictionsResponse | null>(null);
  const [timeRange, setTimeRange] = useState("1m_future");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        const data = await getPredictions();
        console.log("Chart Predictions:", data); // Log para depuração
        setChartPredictions(data);
      } catch (error: any) {
        console.error("Erro ao buscar dados do gráfico:", error);
        setError("Não foi possível carregar os dados do gráfico. O serviço de previsões está indisponível.");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // Arredondar os valores para 2 casas decimais durante o mapeamento
  const chartData: ChartData[] = chartPredictions?.predictions.map((p: Prediction) => ({
    time: p.date,
    value: Number(p.prediction.toFixed(2)), // Arredondar para 2 casas decimais
  })) || [];

  // Definindo o valor mínimo para o eixo Y, com proteção contra array vazio
  const fetchMin = chartData.length > 0 ? Math.min(...chartData.map((d) => d.value)) - 10 : 0;

  const getFilteredData = (): ChartData[] => {
    if (!chartPredictions) return [];
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    let endDate: Date;

    switch (timeRange) {
      case "1m_future":
        endDate = new Date(today.getTime() + 30 * 24 * 60 * 60 * 1000);
        break;
      case "3m_future":
        endDate = new Date(today.getTime() + 90 * 24 * 60 * 60 * 1000);
        break;
      case "6m_future":
        endDate = new Date(today.getTime() + 180 * 24 * 60 * 60 * 1000);
        break;
      default:
        endDate = new Date(today.getTime() + 30 * 24 * 60 * 60 * 1000);
    }

    const filteredData = chartData
      .filter((d) => {
        const date = new Date(d.time);
        date.setHours(0, 0, 0, 0);
        return date >= today && date <= endDate;
      })
      .sort((a, b) => new Date(a.time).getTime() - new Date(b.time).getTime());

    console.log("Filtered Chart Data:", filteredData); // Log para depuração
    return filteredData;
  };

  return (
    <Card>
      <CardHeader className="flex items-center gap-2 space-y-0 border-b py-5 sm:flex-row">
        <div className="grid flex-1 gap-1 text-center sm:text-left">
          <CardTitle>Gráfico em Linha - Previsões</CardTitle>
          <CardDescription>Previsões de preços ao longo do tempo</CardDescription>
        </div>
        <Select value={timeRange} onValueChange={setTimeRange}>
          <SelectTrigger className="w-[160px] rounded-lg sm:ml-auto" aria-label="Selecionar intervalo de tempo">
            <SelectValue placeholder="Próximo mês" />
          </SelectTrigger>
          <SelectContent className="rounded-xl">
            <SelectItem value="1m_future" className="rounded-lg">Próximo mês</SelectItem>
            <SelectItem value="3m_future" className="rounded-lg">Próximos 3 meses</SelectItem>
            <SelectItem value="6m_future" className="rounded-lg">Próximos 6 meses</SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
        {loading ? (
          <p>Carregando dados...</p>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : chartPredictions ? (
          <ChartContainer config={chartConfig} className="aspect-auto h-[250px] w-full">
            <LineChart data={getFilteredData()}>
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="time"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                tickFormatter={(value) => new Date(value).toLocaleDateString("pt-BR", { day: "2-digit", month: "2-digit" })}
                minTickGap={32}
              />
              <YAxis
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                tickFormatter={(value) => `R$${value.toFixed(2)}`} // Já correto
                domain={[fetchMin, "dataMax + 10"]}
              />
              <ChartTooltip
                cursor={{ stroke: "var(--border)", strokeWidth: 1 }}
                content={<ChartTooltipContent indicator="line" valueFormatter={(value) => `R$${value.toFixed(2)}`} />} // Já correto
              />
              <Line
                type="monotone"
                dataKey="value"
                stroke="var(--color-value)"
                strokeWidth={2}
                dot={false}
                activeDot={{ r: 4, strokeWidth: 2 }}
              />
              <ChartLegend content={<ChartLegendContent />} />
            </LineChart>
          </ChartContainer>
        ) : (
          <p>Nenhum dado recebido da API.</p>
        )}
      </CardContent>
      <CardFooter>
        <div className="flex w-full items-start gap-2 text-sm">
          <div className="grid gap-2">
            <div className="flex items-center gap-2 font-medium leading-none">
              Última atualização <TrendingUp className="h-4 w-4" />
            </div>
            <div className="flex items-center gap-2 leading-none text-muted-foreground">
              Atualizado em {new Date().toLocaleTimeString("pt-BR")}
            </div>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
}