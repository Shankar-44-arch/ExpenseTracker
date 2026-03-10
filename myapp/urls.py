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

    # Settings actions
    path('setting/update-profile/', update_profile, name='update_profile'),
    path('setting/change-password/', change_password, name='change_password'),
    path('setting/delete-account/', delete_account, name='delete_account'),

    # Report exports
    path('report/export/csv/', export_csv, name='export_csv'),
    path('report/export/excel/', export_excel, name='export_excel'),
    path('report/export/pdf/', export_pdf, name='export_pdf'),
    path('report/export/image/', export_image, name='export_image'),
]