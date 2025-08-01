import React, { useState } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import './StatisticsCharts.css';

interface StatisticsChartsProps {
  stats: {
    total: number;
    read: number;
    reading: number;
    wantToRead: number;
    notRead: number;
    abandoned: number;
    favorites: number;
    new?: number;
    used?: number;
    damaged?: number;
    loaned?: number;
    averageRating?: number;
    totalPages?: number;
    readPages?: number;
  };
}

const READING_STATUS_COLORS = [
  '#22c55e',
  '#3b82f6',
  '#f59e0b',
  '#6b7280',
  '#ef4444',
];

const CONDITION_COLORS = [
  '#10b981',
  '#3b82f6',
  '#f59e0b',
  '#ef4444',
];

export const StatisticsCharts: React.FC<StatisticsChartsProps> = ({ stats }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  
  const readingStatusData = [
    { name: 'Lidos', value: stats.read, color: READING_STATUS_COLORS[0] },
    { name: 'Lendo', value: stats.reading, color: READING_STATUS_COLORS[1] },
    { name: 'Quero Ler', value: stats.wantToRead, color: READING_STATUS_COLORS[2] },
    { name: 'Não Lido', value: stats.notRead, color: READING_STATUS_COLORS[3] },
    { name: 'Abandonado', value: stats.abandoned, color: READING_STATUS_COLORS[4] },
  ].filter(item => item.value > 0);

  const conditionData = [
    { name: 'Novo', value: stats.new || 0, color: CONDITION_COLORS[0] },
    { name: 'Seminovo', value: Math.floor((stats.used || 0) * 0.7), color: CONDITION_COLORS[1] },
    { name: 'Usado', value: Math.floor((stats.used || 0) * 0.3), color: CONDITION_COLORS[2] },
    { name: 'Danificado', value: stats.damaged || 0, color: CONDITION_COLORS[3] },
  ].filter(item => (item.value || 0) > 0);

  const renderCustomizedCell = (entry: { color?: string }, index: number, colors: string[]) => {
    return <Cell key={`cell-${index}`} fill={entry.color || colors[index % colors.length]} />;
  };

  const CustomTooltip = ({ active, payload }: { active?: boolean; payload?: Array<{ name: string; value: number; color: string }> }) => {
    if (active && payload && payload.length) {
      const data = payload[0];
      return (
        <div className="chart-tooltip">
          <p className="tooltip-label">{data.name}</p>
          <p className="tooltip-value">
            <span style={{ color: data.color }}>{data.value}</span> livros
          </p>
          <p className="tooltip-percentage">
            {((data.value / stats.total) * 100).toFixed(1)}%
          </p>
        </div>
      );
    }
    return null;
  };

  if (stats.total === 0) {
    return (
      <div className="statistics-charts">
        <div className="stats-header">
          <div className="stats-summary">
            <div className="total-books-compact">
              <span className="total-number-compact">0</span>
              <span className="total-label-compact">Livros</span>
            </div>
            <div className="quick-stats-compact">
              <span className="stat-text-compact">Nenhum livro adicionado ainda</span>
            </div>
          </div>
          <div className="dropdown-arrow">
            <span>💭</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="statistics-charts">
      <div className="stats-header" onClick={() => setIsExpanded(!isExpanded)}>
        <div className="stats-summary">
          <div className="total-books-compact">
            <span className="total-number-compact">{stats.total}</span>
            <span className="total-label-compact">Total de Livros</span>
          </div>
          <div className="quick-stats-compact">
            <div className="quick-stat-compact">
              <span className="stat-icon-compact">📚</span>
              <span className="stat-text-compact">{stats.read} Lidos</span>
            </div>
            <div className="quick-stat-compact">
              <span className="stat-icon-compact">📖</span>
              <span className="stat-text-compact">{stats.reading} Lendo</span>
            </div>
            <div className="quick-stat-compact">
              <span className="stat-icon-compact">⭐</span>
              <span className="stat-text-compact">{stats.favorites} Favoritos</span>
            </div>
          </div>
        </div>
        <div className={`dropdown-arrow ${isExpanded ? 'expanded' : ''}`}>
          <span>▼</span>
        </div>
      </div>

      {isExpanded && (
        <div className="charts-content">
          <div className="chart-summary">
            <div className="total-books">
              <span className="total-number">{stats.total}</span>
              <span className="total-label">Total de Livros</span>
            </div>
          </div>

          <div className="chart-container">
            <h3 className="chart-title">Status de Leitura</h3>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={readingStatusData}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  dataKey="value"
                  label={({ name, percent }: { name?: string; percent?: number }) => 
                    percent ? `${name}: ${(percent * 100).toFixed(0)}%` : ''
                  }
                >
                  {readingStatusData.map((entry, index) => 
                    renderCustomizedCell(entry, index, READING_STATUS_COLORS)
                  )}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {conditionData.length > 0 && (
            <div className="chart-container">
              <h3 className="chart-title">Condição dos Livros</h3>
              <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Pie
                    data={conditionData}
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    dataKey="value"
                    label={({ name, percent }: { name?: string; percent?: number }) => 
                      percent ? `${name}: ${(percent * 100).toFixed(0)}%` : ''
                    }
                  >
                    {conditionData.map((entry, index) => 
                      renderCustomizedCell(entry, index, CONDITION_COLORS)
                    )}
                  </Pie>
                  <Tooltip content={<CustomTooltip />} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          )}

          <div className="quick-stats">
            <div className="quick-stat-item">
              <span className="stat-icon">⭐</span>
              <span className="stat-text">{stats.favorites} Favoritos</span>
            </div>
            <div className="quick-stat-item">
              <span className="stat-icon">📚</span>
              <span className="stat-text">{((stats.read / stats.total) * 100).toFixed(1)}% Lidos</span>
            </div>
            <div className="quick-stat-item">
              <span className="stat-icon">📖</span>
              <span className="stat-text">{stats.reading} Atualmente Lendo</span>
            </div>
            <div className="quick-stat-item">
              <span className="stat-icon">🎯</span>
              <span className="stat-text">{stats.wantToRead} Para Ler</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
