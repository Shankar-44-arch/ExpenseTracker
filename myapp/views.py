from django.shortcuts import render

# Create your views here.


def dashboard_view(request):
    return render(request, 'dash.html')

def category_view(request):
    return render(request, 'cat.html')

def report_view(request):
    return render(request, 'report.html')

def setting_view(request):
    return render(request, 'settings.html')

def transaction_view(request):
    return render(request, 'transaction.html')
