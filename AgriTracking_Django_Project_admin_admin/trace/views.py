from django.shortcuts import render, redirect
from .models import TraceRecord

def home(request):
    return render(request, "home.html", {"count": TraceRecord.objects.count()})

def records(request):
    q = request.GET.get("q", "")
    records = TraceRecord.objects.all().order_by("-harvest_date")
    if q:
        records = records.filter(crop_name__icontains=q) | records.filter(farmer_name__icontains=q)
    return render(request, "records.html", {"records": records, "q": q})

def add_record(request):
    if request.method == "POST":
        TraceRecord.objects.create(
            crop_name=request.POST["crop_name"],
            farmer_name=request.POST["farmer_name"],
            location=request.POST["location"],
            harvest_date=request.POST["harvest_date"],
            quality=request.POST["quality"],
            status=request.POST["status"],
            notes=request.POST.get("notes", ""),
        )
        return redirect("records")
    return render(request, "add_record.html")
