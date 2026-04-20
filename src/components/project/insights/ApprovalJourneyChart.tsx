import React, { useState } from 'react';
import { TrendingUp } from 'lucide-react';

interface ApprovalJourneyChartProps {
  journeyData: any[];
  total: number;
}

export const ApprovalJourneyChart: React.FC<ApprovalJourneyChartProps> = ({ journeyData, total }) => {
  const [hoveredData, setHoveredData] = useState<any>(null);

  const width = 800;
  const height = 150; 
  const paddingX = 20; 
  const paddingY = 30;
  
  const targetVal = total || 1;
  const maxVal = targetVal; 
  const maxTime = journeyData.length - 1 || 1;

  const getX = (i: number) => (i / maxTime) * (width - paddingX * 2) + paddingX;
  const getY = (val: number) => height - ((Math.min(val, targetVal) / maxVal) * (height - paddingY * 2) + paddingY);

  const points = journeyData.map((d, i) => ({ x: getX(i), y: getY(d.count) }));
  
  let pathD = "";
  if (points.length > 0) {
    pathD = `M ${points[0].x} ${points[0].y}`;
    for (let i = 0; i < points.length - 1; i++) {
      const p0 = points[i];
      const p1 = points[i + 1];
      const cpX = (p0.x + p1.x) / 2;
      pathD += ` C ${cpX} ${p0.y}, ${cpX} ${p1.y}, ${p1.x} ${p1.y}`;
    }
  }

  const targetY = getY(targetVal);

  return (
    <div className="card" style={{ padding: '24px', display: 'flex', flexDirection: 'column' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '24px' }}>
        <div>
          <h3 style={{ fontSize: '13px', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '10px', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            <TrendingUp size={16} /> Approval Journey (S-Curve)
          </h3>
          <p style={{ fontSize: '11px', color: 'var(--text-secondary)', marginTop: '2px' }}>Cumulative trend toward project completion</p>
        </div>
        <div style={{ textAlign: 'right' }}>
            <div style={{ fontSize: '18px', fontWeight: 900, color: 'var(--accent)' }}>{total}</div>
            <div style={{ fontSize: '10px', fontWeight: 800, color: 'var(--text-secondary)' }}>TOTAL TARGET</div>
        </div>
      </div>

      <div style={{ flex: 1, position: 'relative', margin: '0 -10px' }}>
        <svg viewBox={`0 0 ${width} ${height}`} style={{ width: '100%', height: '220px', display: 'block' }}>
          {/* Target Line */}
          <line x1={0} y1={targetY} x2={width} y2={targetY} stroke="var(--accent)" strokeWidth="1" strokeDasharray="4 4" opacity="0.3" />
          <text x={width-90} y={targetY - 6} fontSize="8" fill="var(--accent)" fontWeight="900">100% GOAL</text>

          {/* Fade Area */}
          <path d={`${pathD} L ${points[points.length-1]?.x} ${height} L ${points[0]?.x} ${height} Z`} fill="url(#chartFade)" />

          {/* Main Line */}
          <path d={pathD} fill="none" stroke="var(--accent)" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
          
          {/* Points */}
          {journeyData.map((d, i) => {
            const cx = getX(i);
            const cy = getY(d.count);
            return (
              <g key={i}>
                <circle cx={cx} cy={cy} r="3.5" fill="white" stroke="var(--accent)" strokeWidth="2.5" />
                
                {/* Hover Target */}
                <circle 
                  cx={cx} cy={cy} r="20" 
                  fill="transparent" 
                  style={{ cursor: 'pointer' }}
                  onMouseEnter={() => setHoveredData({ ...d, x: cx, y: cy })}
                  onMouseLeave={() => setHoveredData(null)}
                />
              </g>
            );
          })}

          <defs>
            <linearGradient id="chartFade" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="var(--accent)" stopOpacity="0.15" />
              <stop offset="100%" stopColor="var(--accent)" stopOpacity="0" />
            </linearGradient>
          </defs>
        </svg>

        {/* Tooltip */}
        {hoveredData && (
          <div style={{
            position: 'absolute',
            left: `${(hoveredData.x / width) * 100}%`,
            top: hoveredData.y - 12,
            transform: 'translate(-50%, -100%)',
            backgroundColor: '#fff',
            border: '1px solid var(--border-color)',
            borderRadius: '8px',
            padding: '8px 12px',
            zIndex: 100,
            pointerEvents: 'none',
            minWidth: '140px'
          }}>
            <div style={{ fontSize: '10px', fontWeight: 800, color: 'var(--text-secondary)', borderBottom: '1px solid var(--border-color)', paddingBottom: '4px', marginBottom: '4px' }}>{hoveredData.date}</div>
            <div style={{ fontSize: '14px', fontWeight: 900, color: 'var(--accent)' }}>{hoveredData.count} <span style={{ fontSize: '10px', fontWeight: 600 }}>Docs</span></div>
          </div>
        )}
      </div>
    </div>
  );
};
