from django.shortcuts import render, redirect
from django.contrib.auth import authenticate, login, logout, update_session_auth_hash
from django.contrib.auth.models import User
from django.contrib.auth.decorators import login_required
from django.contrib import messages
from django.http import HttpResponse, JsonResponse
from django.views.decorators.http import require_POST
from .models import Transaction
import csv
import io
import json
import base64


def login_view(request):
    if request.user.is_authenticated:
        return redirect('dashboard')

    if request.method == 'POST':
        username = request.POST.get('username', '').strip()
        password = request.POST.get('password', '')

        user = authenticate(request, username=username, password=password)
        if user is not None:
            login(request, user)
            return redirect('dashboard')
        else:
            messages.error(request, 'Invalid username or password.')

    return render(request, 'loginmain.html')


def signup_view(request):
    if request.user.is_authenticated:
        return redirect('dashboard')

    if request.method == 'POST':
        username = request.POST.get('username', '').strip()
        email = request.POST.get('email', '').strip()
        password1 = request.POST.get('password1', '')
        password2 = request.POST.get('password2', '')

        if not username or not email or not password1:
            messages.error(request, 'All fields are required.')
        elif password1 != password2:
            messages.error(request, 'Passwords do not match.')
        elif len(password1) < 8:
            messages.error(request, 'Password must be at least 8 characters.')
        elif User.objects.filter(username=username).exists():
            messages.error(request, 'Username already taken.')
        elif User.objects.filter(email=email).exists():
            messages.error(request, 'Email already registered.')
        else:
            user = User.objects.create_user(
                username=username,
                email=email,
                password=password1,
            )
            login(request, user)
            messages.success(request, 'Account created successfully!')
            return redirect('dashboard')

    return render(request, 'loginmain.html')


def logout_view(request):
    logout(request)
    return redirect('login')


@login_required
def dashboard_view(request):
    return render(request, 'dash.html')

@login_required
def transaction_view(request):
    return render(request, 'transaction.html')

@login_required
def category_view(request):
    return render(request, 'cat.html')

@login_required
def report_view(request):
    return render(request, 'report.html')

@login_required
def calculator_view(request):
    return render(request, 'cal.html')

@login_required
def setting_view(request):
    return render(request, 'settings.html')


# ================= SETTINGS ACTIONS =================

@login_required
@require_POST
def update_profile(request):
    user = request.user
    username = request.POST.get('username', '').strip()
    email = request.POST.get('email', '').strip()

    if not username or not email:
        messages.error(request, 'Username and email are required.')
        return redirect('setting')

    if User.objects.filter(username=username).exclude(pk=user.pk).exists():
        messages.error(request, 'That username is already taken.')
        return redirect('setting')

    if User.objects.filter(email=email).exclude(pk=user.pk).exists():
        messages.error(request, 'That email is already in use.')
        return redirect('setting')

    user.username = username
    user.email = email

    first_name = request.POST.get('first_name', '').strip()
    last_name = request.POST.get('last_name', '').strip()
    if first_name:
        user.first_name = first_name
    if last_name:
        user.last_name = last_name

    user.save()
    messages.success(request, 'Profile updated successfully.')
    return redirect('setting')


@login_required
@require_POST
def change_password(request):
    user = request.user
    current = request.POST.get('current_password', '')
    new1 = request.POST.get('new_password', '')
    new2 = request.POST.get('confirm_password', '')

    if not user.check_password(current):
        messages.error(request, 'Current password is incorrect.')
        return redirect('setting')

    if new1 != new2:
        messages.error(request, 'New passwords do not match.')
        return redirect('setting')

    if len(new1) < 8:
        messages.error(request, 'New password must be at least 8 characters.')
        return redirect('setting')

    user.set_password(new1)
    user.save()
    update_session_auth_hash(request, user)
    messages.success(request, 'Password changed successfully.')
    return redirect('setting')


@login_required
@require_POST
def delete_account(request):
    user = request.user
    password = request.POST.get('password', '')

    if not user.check_password(password):
        messages.error(request, 'Incorrect password. Account not deleted.')
        return redirect('setting')

    user.delete()
    messages.success(request, 'Account deleted.')
    return redirect('login')


# ================= REPORT EXPORTS =================

@login_required
def export_csv(request):
    transactions = Transaction.objects.filter(user=request.user)

    response = HttpResponse(content_type='text/csv')
    response['Content-Disposition'] = 'attachment; filename="transactions_report.csv"'

    writer = csv.writer(response)
    writer.writerow(['Description', 'Category', 'Type', 'Amount', 'Date'])
    for t in transactions:
        writer.writerow([t.description, t.category, t.transaction_type, t.amount, t.date.strftime('%d/%m/%Y')])

    return response


@login_required
def export_excel(request):
    try:
        import openpyxl
    except ImportError:
        return HttpResponse('openpyxl is not installed. Run: pip install openpyxl', status=500)

    transactions = Transaction.objects.filter(user=request.user)

    wb = openpyxl.Workbook()
    ws = wb.active
    ws.title = 'Transactions'

    headers = ['Description', 'Category', 'Type', 'Amount', 'Date']
    ws.append(headers)

    # Style header row
    from openpyxl.styles import Font, PatternFill
    for cell in ws[1]:
        cell.font = Font(bold=True, color='FFFFFF')
        cell.fill = PatternFill(start_color='4CAF50', end_color='4CAF50', fill_type='solid')

    for t in transactions:
        ws.append([t.description, t.category, t.transaction_type, float(t.amount), t.date.strftime('%d/%m/%Y')])

    # Auto-width columns
    for col in ws.columns:
        max_len = max(len(str(cell.value or '')) for cell in col)
        ws.column_dimensions[col[0].column_letter].width = max_len + 3

    output = io.BytesIO()
    wb.save(output)
    output.seek(0)

    response = HttpResponse(output.read(), content_type='application/vnd.openxmlformats-officedocument.spreadsheetml.sheet')
    response['Content-Disposition'] = 'attachment; filename="transactions_report.xlsx"'
    return response


@login_required
def export_pdf(request):
    try:
        from reportlab.lib.pagesizes import A4
        from reportlab.lib import colors
        from reportlab.platypus import SimpleDocTemplate, Table, TableStyle, Paragraph, Spacer
        from reportlab.lib.styles import getSampleStyleSheet
    except ImportError:
        return HttpResponse('reportlab is not installed. Run: pip install reportlab', status=500)

    transactions = Transaction.objects.filter(user=request.user)

    buffer = io.BytesIO()
    doc = SimpleDocTemplate(buffer, pagesize=A4)
    elements = []

    styles = getSampleStyleSheet()
    elements.append(Paragraph('Transaction Report', styles['Title']))
    elements.append(Spacer(1, 20))

    data = [['Description', 'Category', 'Type', 'Amount', 'Date']]
    for t in transactions:
        data.append([t.description, t.category, t.transaction_type, str(t.amount), t.date.strftime('%d/%m/%Y')])

    if len(data) == 1:
        data.append(['No transactions found', '', '', '', ''])

    table = Table(data, colWidths=[140, 90, 70, 80, 80])
    table.setStyle(TableStyle([
        ('BACKGROUND', (0, 0), (-1, 0), colors.HexColor('#4CAF50')),
        ('TEXTCOLOR', (0, 0), (-1, 0), colors.white),
        ('FONTNAME', (0, 0), (-1, 0), 'Helvetica-Bold'),
        ('FONTSIZE', (0, 0), (-1, 0), 11),
        ('BOTTOMPADDING', (0, 0), (-1, 0), 10),
        ('BACKGROUND', (0, 1), (-1, -1), colors.HexColor('#f9f9f9')),
        ('GRID', (0, 0), (-1, -1), 0.5, colors.HexColor('#cccccc')),
        ('ROWBACKGROUNDS', (0, 1), (-1, -1), [colors.white, colors.HexColor('#f2f2f2')]),
        ('FONTSIZE', (0, 1), (-1, -1), 10),
        ('TOPPADDING', (0, 1), (-1, -1), 6),
        ('BOTTOMPADDING', (0, 1), (-1, -1), 6),
    ]))

    elements.append(table)
    doc.build(elements)

    buffer.seek(0)
    response = HttpResponse(buffer.read(), content_type='application/pdf')
    response['Content-Disposition'] = 'attachment; filename="transactions_report.pdf"'
    return response


@login_required
def export_image(request):
    """Return chart data as JSON for client-side canvas-to-image download."""
    transactions = Transaction.objects.filter(user=request.user)

    category_totals = {}
    for t in transactions:
        category_totals[t.category] = category_totals.get(t.category, 0) + float(t.amount)

    return JsonResponse({
        'labels': list(category_totals.keys()) or ['No Data'],
        'data': list(category_totals.values()) or [0],
    })




