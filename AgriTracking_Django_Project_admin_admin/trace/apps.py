from django.apps import AppConfig

class TraceConfig(AppConfig):
    default_auto_field = "django.db.models.BigAutoField"
    name = "trace"

    def ready(self):
        from django.db.models.signals import post_migrate
        from django.contrib.auth import get_user_model

        def create_default_admin(sender, **kwargs):
            User = get_user_model()
            if not User.objects.filter(username="admin").exists():
                User.objects.create_superuser(
                    username="admin",
                    email="admin@agritracing.local",
                    password="admin"
                )

        post_migrate.connect(create_default_admin, sender=self, dispatch_uid="create_default_admin")
