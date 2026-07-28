import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  ComposedChart,
  Line,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import type { Indicadores } from '../lib/stats'

/**
 * Os gráficos vivem em módulo separado porque o recharts responde por
 * metade do bundle. Carregado sob demanda, o painel pinta os números na
 * hora e o gráfico entra logo depois.
 */

const TOOLTIP = {
  background: '#1b212c',
  border: '1px solid #29323f',
  borderRadius: 12,
  fontSize: 12,
}

export function GraficoRitmo({ meses }: { meses: Indicadores['meses'] }) {
  return (
    <div className="h-56 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <ComposedChart data={meses} margin={{ top: 4, right: 4, bottom: 0, left: -22 }}>
          <CartesianGrid stroke="#29323f" vertical={false} />
          <XAxis dataKey="label" stroke="#8f9aab" tickLine={false} axisLine={false} fontSize={11} />
          <YAxis stroke="#8f9aab" tickLine={false} axisLine={false} fontSize={11} />
          <Tooltip
            contentStyle={TOOLTIP}
            labelStyle={{ color: '#e7ebf1' }}
            formatter={(v, n) => (n === 'horas' ? [`${v}h`, 'Horas'] : [`${v}`, 'Finalizados'])}
          />
          <Bar dataKey="horas" fill="#d4a537" radius={[4, 4, 0, 0]} maxBarSize={28} />
          <Line
            type="monotone"
            dataKey="finalizadas"
            stroke="#3fa8a0"
            strokeWidth={2}
            dot={{ r: 3, fill: '#3fa8a0' }}
          />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  )
}

export function GraficoStatus({ porStatus }: { porStatus: Indicadores['porStatus'] }) {
  return (
    <div className="h-52 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={porStatus}
          layout="vertical"
          margin={{ top: 0, right: 12, bottom: 0, left: 24 }}
        >
          <XAxis type="number" hide />
          <YAxis
            type="category"
            dataKey="label"
            stroke="#8f9aab"
            tickLine={false}
            axisLine={false}
            fontSize={11}
            width={86}
          />
          <Tooltip
            cursor={{ fill: '#ffffff08' }}
            contentStyle={TOOLTIP}
            formatter={(v) => [`${v}`, 'modelos']}
          />
          <Bar dataKey="valor" radius={[0, 6, 6, 0]} maxBarSize={22}>
            {porStatus.map((s) => (
              <Cell key={s.status} fill={s.cor} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}
