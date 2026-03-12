(function() {
    var symbol = document.getElementById('stockSymbol').textContent.trim();
    var chartEl = document.getElementById('candleChart');
    var loadingEl = document.getElementById('chartLoading');
    var isDark = document.body.classList.contains('dark');

    var chart = LightweightCharts.createChart(chartEl, {
        width: chartEl.offsetWidth,
        height: 500,
        layout: {
            background: { color: isDark ? '#1e1e1e' : '#ffffff' },
            textColor: isDark ? '#e0e0e0' : '#333',
            attributionLogo: false,
        },
        grid: {
            vertLines: { color: isDark ? '#2a2a2a' : '#f0f0f0' },
            horzLines: { color: isDark ? '#2a2a2a' : '#f0f0f0' },
        },
        crosshair: { mode: LightweightCharts.CrosshairMode.Normal },
        timeScale: { borderColor: isDark ? '#444' : '#ddd', timeVisible: true },
        rightPriceScale: { borderColor: isDark ? '#444' : '#ddd' },
    });

    var candleSeries = chart.addSeries(
        LightweightCharts.CandlestickSeries,
        {
            upColor: '#4CAF50',
            downColor: '#f44336',
            borderUpColor: '#4CAF50',
            borderDownColor: '#f44336',
            wickUpColor: '#4CAF50',
            wickDownColor: '#f44336',
        }
    );

    function loadData(period) {
        loadingEl.style.display = 'block';
        fetch('/api/stocks/' + encodeURIComponent(symbol) + '/?period=' + period)
            .then(function(r) { return r.json(); })
            .then(function(data) {
                loadingEl.style.display = 'none';
                if (data.error) {
                    loadingEl.textContent = 'Error: ' + data.error;
                    loadingEl.style.display = 'block';
                    return;
                }
                candleSeries.setData(data.candles);
                chart.timeScale().fitContent();

                var currencySymbol = symbol.indexOf('.NS') !== -1 ? '\u20B9' : '$';
                document.getElementById('stockPrice').textContent = currencySymbol + data.price;
                var changeEl = document.getElementById('stockChange');
                var prefix = data.change >= 0 ? '+' : '';
                changeEl.textContent = prefix + data.change + ' (' + data.change_pct + '%)';
                changeEl.className = 'detail-change ' + (data.change >= 0 ? 'up' : 'down');
            })
            .catch(function(err) {
                loadingEl.textContent = 'Failed to load data';
                loadingEl.style.display = 'block';
            });
    }

    // Period tabs
    document.querySelectorAll('.period-btn').forEach(function(btn) {
        btn.addEventListener('click', function() {
            document.querySelectorAll('.period-btn').forEach(function(b) { b.classList.remove('active'); });
            btn.classList.add('active');
            loadData(btn.dataset.period);
        });
    });

    // Responsive resize
    window.addEventListener('resize', function() {
        chart.applyOptions({ width: chartEl.offsetWidth });
    });

    // Initial load
    loadData('1mo');
})();
