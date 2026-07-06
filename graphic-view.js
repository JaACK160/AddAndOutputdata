

    
const ctx2 = document.getElementById('doughnut');

new Chart(ctx2, {
    type: 'doughnut',
    data: {
    labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
    datasets: [{
        label: '# of Votes',
        data: [20, 12, 3, 5, 2, 3],
        borderWidth: 1
    }]
    },
    options: {
    scales: {
        y: {
        beginAtZero: true
        }
    }
    }
});

