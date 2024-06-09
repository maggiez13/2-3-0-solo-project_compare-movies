import Chart from 'chart.js/auto';
import { getMovieReviews } from './local-storage-handlers';

// Function to render the bar chart
const renderBarChart = (data) => {
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

const renderDoughnutChart = (data) => {
  const genreGross = {};
  data.forEach(movie => {
    if (genreGross[movie.genre]) {
      genreGross[movie.genre] += movie.domestic;
    } else {
      genreGross[movie.genre] = movie.domestic;
    }
  });

  let genreLabels = Object.keys(genreGross);
  genreLabels.sort(); // Sort the genre labels alphabetically

  genreLabels.sort((a, b) => genreGross[b] - genreGross[a]);
  
  const genreEarnings = genreLabels.map(label => genreGross[label]);

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
            'rgba(255, 99, 132, 0.5)',
            'rgba(54, 162, 235, 0.5)',
            'rgba(255, 205, 86, 0.5)',
            'rgba(75, 192, 192, 0.5)',
            'rgba(153, 102, 255, 0.5)',
            'rgba(255, 159, 64, 0.5)',
            'rgba(255, 99, 132, 0.5)',
            'rgba(54, 162, 235, 0.5)',
            'rgba(255, 205, 86, 0.5)',
            'rgba(75, 192, 192, 0.5)',
            'rgba(153, 102, 255, 0.5)',
            'rgba(255, 159, 64, 0.5)',
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

(async function() {
  const data = getMovieReviews();

  renderBarChart(data);
  renderDoughnutChart(data);
})();
