from django.db import models

class TraceRecord(models.Model):
    crop_name = models.CharField(max_length=100)
    farmer_name = models.CharField(max_length=100)
    location = models.CharField(max_length=150)
    harvest_date = models.DateField()
    quality = models.CharField(max_length=50)
    status = models.CharField(max_length=50, default="Harvested")
    notes = models.TextField(blank=True)

    def __str__(self):
        return f"{self.crop_name} - {self.farmer_name}"
