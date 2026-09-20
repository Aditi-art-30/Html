from django.contrib import admin
from .models import TraceRecord

@admin.register(TraceRecord)
class TraceRecordAdmin(admin.ModelAdmin):
    list_display = ("crop_name", "farmer_name", "location", "harvest_date", "quality", "status")
    search_fields = ("crop_name", "farmer_name", "location")
