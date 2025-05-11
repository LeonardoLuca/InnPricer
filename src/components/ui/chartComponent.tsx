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
  start: string;
  end: string;
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
  const [timeRange, setTimeRange] = useState("1m_past");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      const today = new Date();
      const startDate = new Date(today.getTime() - 180 * 24 * 60 * 60 * 1000).toISOString().split("T")[0];
      const endDate = new Date(today.getTime() + 180 * 24 * 60 * 60 * 1000).toISOString().split("T")[0];

      try {
        const data = await getPredictions(startDate, endDate);
        setChartPredictions(data);
      } catch (error: any) {
        console.error("Erro ao buscar dados do gráfico:", error);
        setError("Não foi possível carregar os dados do gráfico. Verifique a conexão com o servidor.");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const chartData: ChartData[] = chartPredictions?.predictions.map((p: Prediction) => ({
    time: p.date,
    value: p.prediction,
  })) || [];

  const getFilteredData = (): ChartData[] => {
    if (!chartPredictions) return [];
    const today = new Date();
    let startDate: Date;
    let endDate: Date;

    switch (timeRange) {
      case "1m_past":
        startDate = new Date(today.getTime() - 30 * 24 * 60 * 60 * 1000);
        endDate = today;
        break;
      case "1m_future":
        startDate = today;
        endDate = new Date(today.getTime() + 30 * 24 * 60 * 60 * 1000);
        break;
      case "3m_past":
        startDate = new Date(today.getTime() - 90 * 24 * 60 * 60 * 1000);
        endDate = today;
        break;
      case "3m_future":
        startDate = today;
        endDate = new Date(today.getTime() + 90 * 24 * 60 * 60 * 1000);
        break;
      case "6m_past":
        startDate = new Date(today.getTime() - 180 * 24 * 60 * 60 * 1000);
        endDate = today;
        break;
      case "6m_future":
        startDate = today;
        endDate = new Date(today.getTime() + 180 * 24 * 60 * 60 * 1000);
        break;
      default:
        startDate = new Date(chartPredictions.start);
        endDate = new Date(chartPredictions.end);
    }

    return chartData
      .filter((d) => {
        const date = new Date(d.time);
        return date >= startDate && date <= endDate;
      })
      .sort((a, b) => new Date(a.time).getTime() - new Date(b.time).getTime());
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
            <SelectValue placeholder="Último mês" />
          </SelectTrigger>
          <SelectContent className="rounded-xl">
            <SelectItem value="1m_past" className="rounded-lg">Último mês</SelectItem>
            <SelectItem value="1m_future" className="rounded-lg">Próximo mês</SelectItem>
            <SelectItem value="3m_past" className="rounded-lg">Últimos 3 meses</SelectItem>
            <SelectItem value="3m_future" className="rounded-lg">Próximos 3 meses</SelectItem>
            <SelectItem value="6m_past" className="rounded-lg">Últimos 6 meses</SelectItem>
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
                tickFormatter={(value) => `R$${value.toFixed(2)}`}
              />
              <ChartTooltip
                cursor={{ stroke: "var(--border)", strokeWidth: 1 }}
                content={<ChartTooltipContent indicator="line" valueFormatter={(value) => `R$${value.toFixed(2)}`} />}
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