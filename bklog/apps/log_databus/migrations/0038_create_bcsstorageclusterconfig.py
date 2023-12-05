# Generated by Django 3.2.15 on 2023-11-24 09:34

from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ('log_databus', '0037_auto_20230803_2217'),
    ]

    operations = [
        migrations.CreateModel(
            name='BcsStorageClusterConfig',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('created_at', models.DateTimeField(auto_now_add=True, db_index=True, verbose_name='创建时间')),
                ('created_by', models.CharField(default='', max_length=32, verbose_name='创建者')),
                ('updated_at', models.DateTimeField(auto_now=True, db_index=True, null=True, verbose_name='更新时间')),
                ('updated_by', models.CharField(blank=True, default='', max_length=32, verbose_name='修改者')),
                ('is_deleted', models.BooleanField(default=False, verbose_name='是否删除')),
                ('deleted_at', models.DateTimeField(blank=True, null=True, verbose_name='删除时间')),
                ('deleted_by', models.CharField(blank=True, max_length=32, null=True, verbose_name='删除者')),
                ('bk_biz_id', models.IntegerField(verbose_name='业务id')),
                ('bcs_cluster_id', models.CharField(max_length=128, verbose_name='bcs集群ID')),
                ('storage_cluster_id', models.IntegerField(verbose_name='存储集群ID')),
            ],
            options={
                'abstract': False,
            },
        ),
    ]
