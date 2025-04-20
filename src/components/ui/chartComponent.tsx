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
    label: "Valor",
    color: "hsl(var(--chart-3))",
  },
};

export function ChartComponent() {
  const [chartPredictions, setChartPredictions] = useState<PredictionsResponse | null>(null);
  const [timeRange, setTimeRange] = useState("1m");

  // Buscar dados da API
  useEffect(() => {
    const fetchData = async () => {
      const today = new Date();

      // Calcular 6 meses antes
      const startDate = new Date(today);
      startDate.setMonth(today.getMonth() - 6);
      const sixMonthsBefore = startDate.toISOString().split('T')[0]; // Formato YYYY-MM-DD

      // Calcular 6 meses depois
      const endDate = new Date(today);
      endDate.setMonth(today.getMonth() + 6);
      const sixMonthsAfter = endDate.toISOString().split('T')[0]; // Formato YYYY-MM-DD

      try {
        const data = await getPredictions(sixMonthsBefore, sixMonthsAfter);
        setChartPredictions(data);
      } catch (error) {
        console.error('Erro ao buscar dados do gráfico:', error);
      }
    };
    fetchData();
  }, []);

  // Mapear os dados da API para o formato do gráfico
  const chartData: ChartData[] = chartPredictions?.predictions.map((p: Prediction) => ({
    time: p.date,
    value: p.prediction,
  })) || [];

  // Filtrar dados com base no intervalo selecionado
  const getFilteredData = () => {
    if (!chartPredictions) return [];
    const today = new Date();
    let startDate: Date;
    let endDate: Date;

    switch (timeRange) {
      case "3m":
        startDate = new Date(today.getTime() - 90 * 24 * 60 * 60 * 1000);
        endDate = today;
        break;
      case "6m":
        startDate = new Date(today.getTime() - 180 * 24 * 60 * 60 * 1000);
        endDate = today;
        break;
      case "3m_future":
        startDate = today;
        endDate = new Date(today.getTime() + 90 * 24 * 60 * 60 * 1000);
        break;
      case "6m_future":
        startDate = today;
        endDate = new Date(today.getTime() + 180 * 24 * 60 * 60 * 1000);
        break;
      default:
        startDate = new Date(chartPredictions.start);
        endDate = new Date(chartPredictions.end);
    }

    return chartData.filter((d) => {
      const date = new Date(d.time);
      return date >= startDate && date <= endDate;
    });
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
            <SelectItem value="1m" className="rounded-lg">Último mês</SelectItem>
            <SelectItem value="3m" className="rounded-lg">Últimos 3 meses</SelectItem>
            <SelectItem value="6m" className="rounded-lg">Últimos 6 meses</SelectItem>
            <SelectItem value="1m_future" className="rounded-lg">Próximo mês</SelectItem>
            <SelectItem value="3m_future" className="rounded-lg">Próximos 3 meses</SelectItem>
            <SelectItem value="6m_future" className="rounded-lg">Próximos 6 meses</SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
        <ChartContainer config={chartConfig} className="aspect-auto h-[250px] w-full">
          <LineChart data={getFilteredData()}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="time"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => new Date(value).toLocaleDateString()}
              minTickGap={32}
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              tickMargin={8}
            />
            <ChartTooltip
              cursor={{ stroke: "var(--border)", strokeWidth: 1 }}
              content={<ChartTooltipContent indicator="line" />}
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
      </CardContent>
      <CardFooter>
        <div className="flex w-full items-start gap-2 text-sm">
          <div className="grid gap-2">
            <div className="flex items-center gap-2 font-medium leading-none">
              Última atualização <TrendingUp className="h-4 w-4" />
            </div>
            <div className="flex items-center gap-2 leading-none text-muted-foreground">
              Atualizado em {new Date().toLocaleTimeString()}
            </div>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
}