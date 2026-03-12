from django.urls import path
from .views import *

urlpatterns = [
    path('', dashboard_view, name='dashboard'),
    path('login/', login_view, name='login'),
    path('signup/', signup_view, name='signup'),
    path('logout/', logout_view, name='logout'),
    path('categories/', category_view, name='category'),
    path('report/', report_view, name='report'),
    path('setting/', setting_view, name='setting'),
    path('transaction/', transaction_view, name='transaction'),
    path('calculator/', calculator_view, name='calculator'),

    # Transaction CRUD
    path('transaction/add/', add_transaction, name='add_transaction'),
    path('transaction/edit/<int:pk>/', edit_transaction, name='edit_transaction'),
    path('transaction/delete/<int:pk>/', delete_transaction, name='delete_transaction'),

    # Category CRUD
    path('categories/add/', add_category, name='add_category'),
    path('categories/edit/<int:pk>/', edit_category, name='edit_category'),
    path('categories/delete/<int:pk>/', delete_category, name='delete_category'),

    # Settings actions
    path('setting/update-profile/', update_profile, name='update_profile'),
    path('setting/change-password/', change_password, name='change_password'),
    path('setting/delete-account/', delete_account, name='delete_account'),

    # Alerts
    path('alerts/', alert_view, name='alert'),
    path('alerts/add/', add_alert, name='add_alert'),
    path('alerts/edit/<int:pk>/', edit_alert, name='edit_alert'),
    path('alerts/delete/<int:pk>/', delete_alert, name='delete_alert'),

    # Report exports
    path('report/export/csv/', export_csv, name='export_csv'),
    path('report/export/excel/', export_excel, name='export_excel'),
    path('report/export/pdf/', export_pdf, name='export_pdf'),
    path('report/export/image/', export_image, name='export_image'),

    # Stocks
    path('stocks/', stock_view, name='stock'),
    path('stocks/<str:symbol>/', stock_detail_view, name='stock_detail'),
    path('api/stocks/<str:symbol>/', stock_detail_api, name='stock_detail_api'),
]