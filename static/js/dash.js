const isDark = document.body.classList.contains('dark');
const textColor = isDark ? '#e0e0e0' : '#666';
const gridColor = isDark ? '#333' : '#e0e0e0';

const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
        legend: {
            position: 'bottom',
            labels: { color: textColor }
        },
        tooltip: {
            callbacks: {
                label: ctx => `₹${ctx.raw}`
            }
        }
    },
    scales: {
        x: {
            ticks: { color: textColor },
            grid: { color: gridColor }
        },
        y: {
            ticks: { color: textColor },
            grid: { color: gridColor }
        }
    }
};

/* Monthly Trend */
new Chart(monthlyChart, {
    type: 'line',
    data: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
        datasets: [{
            label: 'Expense',
            data: [4000, 5200, 4800, 6100, 5600, 5000],
            borderColor: '#f44336',
            tension: 0.4
        }]
    },
    options
});

/* Expense Category */
new Chart(expenseChart, {
    type: 'pie',
    data: {
        labels: ['Food', 'Rent', 'Travel', 'Shopping'],
        datasets: [{
            data: [8000, 12000, 3500, 5000],
            backgroundColor: ['#FF6384', '#4CAF50', '#2196F3', '#FF9800']
        }]
    },
    options
});

/* Income vs Expense */
new Chart(incomeExpenseChart, {
    type: 'bar',
    data: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
        datasets: [
            {
                label: 'Income',
                data: [35000, 36000, 34000, 38000, 37000],
                backgroundColor: '#4CAF50'
            },
            {
                label: 'Expense',
                data: [22000, 24000, 23000, 26000, 25000],
                backgroundColor: '#f44336'
            }
        ]
    },
    options
});
