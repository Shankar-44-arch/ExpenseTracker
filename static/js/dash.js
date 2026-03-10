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

const D = typeof CHART_DATA !== 'undefined' ? CHART_DATA : {};

/* Monthly Trend */
new Chart(monthlyChart, {
    type: 'line',
    data: {
        labels: D.monthLabels || [],
        datasets: [{
            label: 'Expense',
            data: D.monthExpense || [],
            borderColor: '#f44336',
            tension: 0.4
        }]
    },
    options
});

/* Expense Category */
const pieColors = ['#FF6384','#4CAF50','#2196F3','#FF9800','#9C27B0','#00BCD4','#795548','#607D8B'];
new Chart(expenseChart, {
    type: 'pie',
    data: {
        labels: D.catLabels || [],
        datasets: [{
            data: D.catData || [],
            backgroundColor: pieColors.slice(0, (D.catLabels || []).length)
        }]
    },
    options
});

/* Income vs Expense */
new Chart(incomeExpenseChart, {
    type: 'bar',
    data: {
        labels: D.monthLabels || [],
        datasets: [
            {
                label: 'Income',
                data: D.monthIncome || [],
                backgroundColor: '#4CAF50'
            },
            {
                label: 'Expense',
                data: D.monthExpense || [],
                backgroundColor: '#f44336'
            }
        ]
    },
    options
});
