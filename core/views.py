from django.shortcuts import render
from .forms import UploadFileForm
from django.http import JsonResponse
import pandas as pd
import csv


def file_upload_view(request):
    if request.method == 'POST':
        form = UploadFileForm(request.POST, request.FILES)
        if form.is_valid():
            file = request.FILES['file']
            if file.name.endswith('.csv'):
                file_content = file.read(1024).decode('utf-8')
                file.seek(0)
                delimiter = csv.Sniffer().sniff(file_content).delimiter
                df = pd.read_csv(file, sep=delimiter)
            elif file.name.endswith('.xlsx'):
                df = pd.read_excel(file)
            else:
                return JsonResponse({'message': 'Unsupported file type.'}, status=400)
            data = df.to_dict(orient='records')
            return JsonResponse({'data': data})
    else:
        form = UploadFileForm()
    return render(request, 'upload.html', {'form': form})
