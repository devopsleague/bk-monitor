# Generated by Django 3.2.15 on 2024-03-05 11:03

from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ("apm_web", "0018_alter_profileuploadrecord_app_name"),
    ]

    operations = [
        migrations.AddField(
            model_name="application",
            name="is_enabled_profiling",
            field=models.BooleanField(default=False, verbose_name="是否开启 Profiling 功能"),
        ),
        migrations.AddField(
            model_name="application",
            name="profiling_data_status",
            field=models.CharField(default="no_data", max_length=50, verbose_name="Profiling 数据状态"),
        ),
        migrations.AddField(
            model_name="profileuploadrecord",
            name="content",
            field=models.TextField(null=True, verbose_name="运行信息"),
        ),
        migrations.AddField(
            model_name="profileuploadrecord",
            name="file_key",
            field=models.CharField(default=None, max_length=1024, verbose_name="文件存储路径"),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name="profileuploadrecord",
            name="meta_info",
            field=models.JSONField(default=dict, verbose_name="数据元信息"),
        ),
        migrations.AddField(
            model_name="profileuploadrecord",
            name="query_end_time",
            field=models.CharField(max_length=128, null=True, verbose_name="查询此文件的 profile 数据时的结束时间"),
        ),
        migrations.AddField(
            model_name="profileuploadrecord",
            name="query_start_time",
            field=models.CharField(max_length=128, null=True, verbose_name="查询此文件的 profile 数据时的开始时间"),
        ),
        migrations.AlterField(
            model_name="profileuploadrecord",
            name="status",
            field=models.CharField(
                choices=[
                    ("uploaded", "已上传"),
                    ("parsing_failed", "解析失败"),
                    ("parsing_succeed", "已解析"),
                    ("store_succeed", "已存储"),
                    ("store_failed", "存储失败"),
                ],
                default="uploaded",
                max_length=36,
                verbose_name="状态",
            ),
        ),
    ]
