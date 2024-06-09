import Chart from 'chart.js/auto';
import { getMovieReviews } from './local-storage-handlers';

(async function() {
  const data = getMovieReviews();

  // Sort movies by domestic gross revenue
  data.sort((a, b) => b.domestic - a.domestic);

  // Extract movie titles and domestic gross revenue
  const movieTitles = data.map(movie => movie.title);
  const domesticGross = data.map(movie => movie.domestic);

  // Create the bar chart
  new Chart(
    document.getElementById('domestic-bar-chart'),
    {
      type: 'bar',
      data: {
        labels: movieTitles,
        datasets: [{
          label: 'Domestic Gross',
          data: domesticGross,
          backgroundColor: 'rgba(54, 162, 235, 0.5)', // Background color for bars
          borderColor: 'rgba(54, 162, 235, 1)', // Border color for bars
          borderWidth: 1 // Border width for bars
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              // Custom callback function to format tick values
              callback: function(value, index, values) {
                // Convert value to millions and format the label
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
                // Format the label with commas for thousands separator
                label += '$' + context.parsed.y.toLocaleString();
              }
              return label;
            }
          }
        }
      }
    }
  );
})();
