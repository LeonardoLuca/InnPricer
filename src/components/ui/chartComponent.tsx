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

// Definição do tipo dos dados do gráfico
interface ChartData {
  time: string;
  value: number;
}

// Função para gerar dados a cada 5 minutos dentro de um range de 12 horas
const generateChartData = (): ChartData[] => {
  const now = new Date();
  now.setMinutes(Math.floor(now.getMinutes() / 5) * 5);
  now.setSeconds(0);

  const data: ChartData[] = [];
  for (let i = 0; i < 12 * 60; i += 5) {
    const time = new Date(now.getTime() - i * 60 * 1000);
    data.unshift({
      time: time.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      value: Math.floor(Math.random() * 100) + 50,
    });
  }
  return data;
};

// Configuração do gráfico
const chartConfig: ChartConfig = {
  value: {
    label: "Valor",
    color: "hsl(var(--chart-3))",
  },
};

export function ChartComponent() {
  const [chartData, setChartData] = useState<ChartData[]>(generateChartData());
  const [timeRange, setTimeRange] = useState("12h");

  // Atualizar os dados a cada 5 minutos
  useEffect(() => {
    const interval = setInterval(() => {
      setChartData(generateChartData());
    }, 5 * 60 * 1000);

    return () => clearInterval(interval);
  }, []);

  // Filtrar dados baseado no range selecionado
  const getFilteredData = () => {
    const hours = timeRange === "6h" ? 6 : timeRange === "3h" ? 3 : 12;
    const dataPoints = hours * 12; // 12 pontos por hora (5 minutos de intervalo)
    return chartData.slice(-dataPoints);
  };

  return (
    <Card>
      <CardHeader className="flex items-center gap-2 space-y-0 border-b py-5 sm:flex-row">
        <div className="grid flex-1 gap-1 text-center sm:text-left">
          <CardTitle>Gráfico em Linha - Tempo Real</CardTitle>
          <CardDescription>
            Mostrando valores atualizados a cada 5 minutos
          </CardDescription>
        </div>
        <Select value={timeRange} onValueChange={setTimeRange}>
          <SelectTrigger
            className="w-[160px] rounded-lg sm:ml-auto"
            aria-label="Selecionar intervalo de tempo"
          >
            <SelectValue placeholder="Últimas 12 horas" />
          </SelectTrigger>
          <SelectContent className="rounded-xl">
            <SelectItem value="12h" className="rounded-lg">
              Últimas 12 horas
            </SelectItem>
            <SelectItem value="6h" className="rounded-lg">
              Últimas 6 horas
            </SelectItem>
            <SelectItem value="3h" className="rounded-lg">
              Últimas 3 horas
            </SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[250px] w-full"
        >
          <LineChart data={getFilteredData()}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="time"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
            />
            <YAxis
              domain={[50, 150]}
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
              Atualizado em 4:15PM
            </div>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
}