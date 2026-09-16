import React, { useEffect, useRef } from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

const FundingChart = ({ raised = 9000, goal = 60000 }) => {
  const chartData = {
    labels: ['Raised', 'Remaining'],
    datasets: [
      {
        data: [raised, Math.max(goal - raised, 0)],
        backgroundColor: ['#500000', '#e2e8f0'],
        borderColor: ['#6e0000', '#cbd5e1'],
        borderWidth: 1
      }
    ]
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    cutout: '75%',
    plugins: {
      legend: { display: false },
      tooltip: {
        callbacks: {
          label: (context) => `$${context.raw.toLocaleString()}`
        }
      }
    }
  };

  return (
    <div className="funding-goal">
      <div className="chart-container" style={{ position: 'relative', width: '220px', height: '220px', margin: '0 auto' }}>
        <Doughnut data={chartData} options={options} />
        <div
          className="chart-center"
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            textAlign: 'center'
          }}
        >
          <p style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'var(--text-main)', margin: 0 }}>
            ${raised.toLocaleString()}
          </p>
          <small style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>
            of ${goal.toLocaleString()} goal
          </small>
        </div>
      </div>
    </div>
  );
};

export default FundingChart;
