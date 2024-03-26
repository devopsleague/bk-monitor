# Generated by Django 3.2.15 on 2024-02-21 08:04

from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ("apm", "0036_alter_profiledatasource_retention"),
    ]

    operations = [
        migrations.AddField(
            model_name="apmapplication",
            name="is_enabled_profiling",
            field=models.BooleanField(default=False, verbose_name="是否开启 Profiling 功能"),
        ),
    ]
