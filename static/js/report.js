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

const R = typeof REPORT_DATA !== 'undefined' ? REPORT_DATA : {};

/* Monthly Trend */
new Chart(monthlyChart, {
    type: 'line',
    data: {
        labels: R.monthLabels || [],
        datasets: [{
            label: 'Expense',
            data: R.monthExpense || [],
            borderColor: '#f44336',
            tension: 0.4
        }]
    },
    options
});

/* Expense Category */
const pieColors = ['#FF6384','#4CAF50','#2196F3','#FF9800','#9C27B0','#00BCD4','#795548','#607D8B','#E91E63','#CDDC39'];
new Chart(expenseChart, {
    type: 'pie',
    data: {
        labels: R.catLabels || [],
        datasets: [{
            data: R.catData || [],
            backgroundColor: pieColors.slice(0, (R.catLabels || []).length)
        }]
    },
    options
});

/* Income vs Expense */
new Chart(incomeExpenseChart, {
    type: 'bar',
    data: {
        labels: R.monthLabels || [],
        datasets: [
            {
                label: 'Income',
                data: R.monthIncome || [],
                backgroundColor: '#4CAF50'
            },
            {
                label: 'Expense',
                data: R.monthExpense || [],
                backgroundColor: '#f44336'
            }
        ]
    },
    options
});
