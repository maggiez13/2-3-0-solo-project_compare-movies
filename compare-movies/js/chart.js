import Chart from 'chart.js/auto';
import { getMovieReviews } from './local-storage-handlers';

export const renderBarChart = (data) => {
  const canvas = document.getElementById('domestic-bar-chart');
  if (canvas) {
    // Check if a chart instance exists on the canvas
    const existingChart = Chart.getChart(canvas);
    if (existingChart) {
      // If a chart instance exists, destroy it
      existingChart.destroy();
    }
  }
  data.sort((a, b) => b.domestic - a.domestic);

  const movieTitles = data.map(movie => movie.title);
  const domesticGross = data.map(movie => movie.domestic);

  new Chart(
    document.getElementById('domestic-bar-chart'),
    {
      type: 'bar',
      data: {
        labels: movieTitles,
        datasets: [{
          label: 'Domestic Gross',
          data: domesticGross,
          backgroundColor: 'rgba(54, 162, 235, 0.5)',
          borderColor: 'rgba(54, 162, 235, 1)',
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              callback: function(value, index, values) {
                return '$' + (value / 1000000).toFixed(0) + 'M';
              }
            }
          }
        },
        tooltips: {
          callbacks: {
            label: function(context) {
              var label = context.dataset.label || '';
              if (label) {
                label += ': ';
              }
              if (context.parsed.y !== null) {
                label += '$' + context.parsed.y.toLocaleString();
              }
              return label;
            }
          }
        }
      }
    }
  );
};

export const renderDoughnutChart = (data) => {
  const canvas = document.getElementById('genre-doughnut-chart');
  if (canvas) {
    const existingChart = Chart.getChart(canvas);
    if (existingChart) {
      existingChart.destroy();
    }
  }

  // Calculate total gross earnings for each genre
  const genreGross = {};
  data.forEach(movie => {
    if (genreGross[movie.genre]) {
      genreGross[movie.genre] += parseInt(movie.domestic);
    } else {
      genreGross[movie.genre] = parseInt(movie.domestic);
    }
  });

  // Create an array of objects containing genre and gross earnings
  const genreEarningsArray = Object.entries(genreGross).map(([genre, gross]) => ({ genre, gross }));

  // Sort the array by gross earnings from greatest to least
  genreEarningsArray.sort((a, b) => b.gross - a.gross);

  // Extract genre labels and earnings after sorting
  const genreLabels = genreEarningsArray.map(item => item.genre);
  const genreEarnings = genreEarningsArray.map(item => item.gross);

  new Chart(
    document.getElementById('genre-doughnut-chart'),
    {
      type: 'doughnut',
      data: {
        labels: genreLabels,
        datasets: [{
          label: 'Genre Gross Earnings',
          data: genreEarnings,
          backgroundColor: [
            'rgba(255, 99, 132, 0.8)',
            'rgba(54, 162, 235, 0.8)',
            'rgba(255, 205, 86, 0.8)',
            'rgba(75, 192, 192, 0.8)',
            'rgba(153, 102, 255, 0.8)',
            'rgba(255, 159, 64, 0.8)',
            'rgba(255, 99, 132, 0.8)',
            'rgba(54, 162, 235, 0.8)',
            'rgba(255, 205, 86, 0.8)',
            'rgba(75, 192, 192, 0.8)',
            'rgba(153, 102, 255, 0.8)',
            'rgba(255, 159, 64, 0.8)',
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 205, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)',
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 205, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)',
          ],
          borderWidth: 1,
        }]
      },
    }
  );
};

export const renderScatterPlot = (data) => {
  const canvas = document.getElementById('critic-audience-score-chart');
  if (canvas) {
    const existingChart = Chart.getChart(canvas);
    if (existingChart) {
      existingChart.destroy();
    }
  }
  const criticScores = data.map(movie => parseInt(movie.criticScore));
  const audienceScores = data.map(movie => parseInt(movie.audienceScore));
  const domesticGross = data.map(movie => parseInt(movie.domestic));

  new Chart(
    document.getElementById('critic-audience-score-chart'),
    {
      type: 'scatter',
      data: {
        datasets: [
          {
            label: 'Audience Score',
            data: audienceScores.map((score, index) => ({ x: score, y: domesticGross[index] })),
            backgroundColor: 'rgba(54, 162, 235, 0.5)',
            borderColor: 'rgba(54, 162, 235, 1)',
            borderWidth: 1
          },
          {
            label: 'Critic Score',
            data: criticScores.map((score, index) => ({ x: score, y: domesticGross[index] })),
            backgroundColor: 'rgba(255, 99, 132, 0.5)',
            borderColor: 'rgba(255, 99, 132, 1)',
            borderWidth: 1
          }
        ]
      },
      options: {
        scales: {
          x: {
            title: {
              display: true,
              text: 'Rotten Tomato Score'
            }
          },
          y: {
            title: {
              display: true,
              text: 'Box Office'
            },
            ticks: {
              callback: function(value, index, values) {
                return '$' + (value / 1000000).toFixed(0) + 'M';
              }
            }
          }
        },
        tooltips: {
          callbacks: {
            label: function(context) {
              const label = context.dataset.label || '';
              let scoreType = '';
              if (label.includes('Audience')) {
                scoreType = 'Audience Score';
              } else if (label.includes('Critic')) {
                scoreType = 'Critic Score';
              }
              return `${scoreType}: ${context.parsed.x}, Box Office: $${(context.parsed.y / 1000000).toFixed(0)}M`;
            }
          }
        }
      }
    }
  );
};

(async function() {
  const data = getMovieReviews();
  // Call function to render charts
  renderBarChart(data);
  renderDoughnutChart(data);
  renderScatterPlot(data); 
})();