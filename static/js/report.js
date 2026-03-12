/* Parse report data from data attributes */
var _rEl = document.getElementById('reportDataHolder');
var REPORT_DATA = _rEl ? {
    monthLabels: JSON.parse(_rEl.dataset.monthLabels),
    monthExpense: JSON.parse(_rEl.dataset.monthExpense),
    monthIncome: JSON.parse(_rEl.dataset.monthIncome),
    catLabels: JSON.parse(_rEl.dataset.catLabels),
    catData: JSON.parse(_rEl.dataset.catData),
} : {};

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

/* ===== EXPORT IMAGE ===== */
var exportBtn = document.getElementById('exportImageBtn');
if (exportBtn) {
    exportBtn.addEventListener('click', function () {
        var exportUrl = exportBtn.dataset.url;
        fetch(exportUrl)
            .then(function(r) { return r.json(); })
            .then(function(data) {
                var canvas = document.getElementById('exportCanvas');
                canvas.style.display = 'block';
                var ctx = canvas.getContext('2d');

                var colors = ['#4CAF50','#2196F3','#FF9800','#9C27B0','#F44336','#00BCD4','#795548','#607D8B'];

                new Chart(ctx, {
                    type: 'pie',
                    data: {
                        labels: data.labels,
                        datasets: [{
                            data: data.data,
                            backgroundColor: colors.slice(0, data.labels.length),
                        }]
                    },
                    options: { animation: false, responsive: false },
                    plugins: [{
                        id: 'downloadAfterRender',
                        afterRender: function(chart) {
                            setTimeout(function() {
                                var link = document.createElement('a');
                                link.download = 'expense_report.png';
                                link.href = canvas.toDataURL('image/png');
                                link.click();
                                canvas.style.display = 'none';
                                chart.destroy();
                            }, 200);
                        }
                    }]
                });
            });
    });
}
