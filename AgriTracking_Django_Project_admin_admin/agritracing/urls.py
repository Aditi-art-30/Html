from django.contrib import admin
from django.urls import path
from trace import views

urlpatterns = [
    path("admin/", admin.site.urls),
    path("", views.home, name="home"),
    path("records/", views.records, name="records"),
    path("add/", views.add_record, name="add_record"),
]
