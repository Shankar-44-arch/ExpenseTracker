from django.urls import path
from .views import *

urlpatterns = [
    path('', dashboard_view, name='dashboard'),
    path('categories/', category_view, name='category'),
    path('report/', report_view, name='report'),
    path('setting/', setting_view, name='setting'),
    path('transaction/', transaction_view, name='transaction'),
    path('calculator/', calculator_view, name='calculator'),
]