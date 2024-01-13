const button = document.getElementById('themeToggle');
const ctx = document.getElementById('canvas');
let total = document.getElementById('numbersWeek');

button.addEventListener('click', changeTheme);
function changeTheme(e) {
  e.preventDefault();
  console.log('hi');
  if (button.classList.contains('buttonClicked')) {
    button.classList.remove('buttonClicked');
    document.body.style.backgroundColor = 'var(--Cream)';
  } else {
    button.classList.add('buttonClicked');
    document.body.style.backgroundColor = 'var(--Dark-cyan)';
  }
}

//functions to change labels of tooltips
const titleTooltip = (e) => `$${e[0].formattedValue}`;
const labelTooltip = (e) => '';

let myChart = new Chart(ctx, {
  type: 'bar',
  data: {
    labels: ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'],
    datasets: [
      {
        data: [1, 10, 5.36, 31, 24, 43, 25.48],
        borderWidth: 0,
        borderRadius: 4,
        borderSkipped: false,
        backgroundColor: [
          'hsl(10, 79%, 65%)',
          'hsl(10, 79%, 65%)',
          'hsl(186, 34%, 60%)',
          'hsl(10, 79%, 65%)',
          'hsl(10, 79%, 65%)',
          'hsl(10, 79%, 65%)',
          'hsl(10, 79%, 65%)',
        ],
        hoverBackgroundColor: [
          'hsl(10, 79%, 75%)',
          'hsl(10, 79%, 75%)',
          'hsl(186, 34%, 70%)',
          'hsl(10, 79%, 75%)',
          'hsl(10, 79%, 75%)',
          'hsl(10, 79%, 75%)',
          'hsl(10, 79%, 75%)',
        ],
      },
    ],
  },

  options: {
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        backgroundColor: 'hsl(25, 47%, 15%)',
        padding: 3,
        titleMarginBottom: 0,
        yAlign: 'bottom',
        caretSize: 0,
        displayColors: false,
        callbacks: {
          title: titleTooltip,
          label: labelTooltip,
        },
      },
    },

    scales: {
      x: {
        grid: {
          display: false,
        },
        border: {
          display: false,
        },
      },
      y: {
        ticks: {
          display: false,
        },
        grid: {
          display: false,
        },
        border: {
          display: false,
        },
      },
    },
  },
});

function updateWithJSON(chart, url, total) {
  fetch(url)
    .then((response) => response.json())
    .then((jData) => {
      let sum = 0;
      for (i = 0; i < chart.data.datasets[0].data.length; i++) {
        chart.data.datasets[0].data[i] = jData[i].amount;
        sum += jData[i].amount;
      }
      chart.update();
      console.log(sum);
      total.innerText = '$' + sum;
    });
}
updateWithJSON(myChart, 'data.json', total);
