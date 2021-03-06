# Generated by Django 2.1.7 on 2019-03-14 13:43

import django.core.validators
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Airport',
            fields=[
                ('code', models.CharField(max_length=10, primary_key=True, serialize=False)),
                ('name', models.TextField()),
            ],
        ),
        migrations.CreateModel(
            name='Carrier',
            fields=[
                ('code', models.CharField(max_length=10, primary_key=True, serialize=False)),
                ('name', models.TextField()),
            ],
        ),
        migrations.CreateModel(
            name='DelayCountStatistics',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('late_aircraft', models.IntegerField(default=0, validators=[django.core.validators.MinValueValidator(0, message='Invalid value: negative.')])),
                ('weather', models.IntegerField(default=0, validators=[django.core.validators.MinValueValidator(0, message='Invalid value: negative.')])),
                ('security', models.IntegerField(default=0, validators=[django.core.validators.MinValueValidator(0, message='Invalid value: negative.')])),
                ('national_aviation_system', models.IntegerField(default=0, validators=[django.core.validators.MinValueValidator(0, message='Invalid value: negative.')])),
                ('carrier', models.IntegerField(default=0, validators=[django.core.validators.MinValueValidator(0, message='Invalid value: negative.')])),
            ],
        ),
        migrations.CreateModel(
            name='DelayTimeStatistics',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('late_aircraft', models.IntegerField(default=0, validators=[django.core.validators.MinValueValidator(0, message='Invalid value: negative.')])),
                ('weather', models.IntegerField(default=0, validators=[django.core.validators.MinValueValidator(0, message='Invalid value: negative.')])),
                ('security', models.IntegerField(default=0, validators=[django.core.validators.MinValueValidator(0, message='Invalid value: negative.')])),
                ('national_aviation_system', models.IntegerField(default=0, validators=[django.core.validators.MinValueValidator(0, message='Invalid value: negative.')])),
                ('carrier', models.IntegerField(default=0, validators=[django.core.validators.MinValueValidator(0, message='Invalid value: negative.')])),
            ],
        ),
        migrations.CreateModel(
            name='FlightStatistics',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('cancelled', models.IntegerField(default=0, validators=[django.core.validators.MinValueValidator(0, message='Invalid value: negative.')])),
                ('on_time', models.IntegerField(default=0, validators=[django.core.validators.MinValueValidator(0, message='Invalid value: negative.')])),
                ('total', models.IntegerField(default=0, validators=[django.core.validators.MinValueValidator(0, message='Invalid value: negative.')])),
                ('delayed', models.IntegerField(default=0, validators=[django.core.validators.MinValueValidator(0, message='Invalid value: negative.')])),
                ('diverted', models.IntegerField(default=0, validators=[django.core.validators.MinValueValidator(0, message='Invalid value: negative.')])),
            ],
        ),
        migrations.CreateModel(
            name='Statistics',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('month', models.IntegerField(validators=[django.core.validators.MinValueValidator(1), django.core.validators.MaxValueValidator(12)])),
                ('year', models.IntegerField(validators=[django.core.validators.MinValueValidator(1900, message='Invalid year: year < 1900.')])),
                ('airport', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='trvl.Airport')),
                ('carrier', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='trvl.Carrier')),
                ('delay_count_statistic', models.ForeignKey(on_delete=django.db.models.deletion.DO_NOTHING, to='trvl.DelayCountStatistics')),
                ('delay_time_statistic', models.ForeignKey(on_delete=django.db.models.deletion.DO_NOTHING, to='trvl.DelayTimeStatistics')),
                ('flight_statistic', models.ForeignKey(on_delete=django.db.models.deletion.DO_NOTHING, to='trvl.FlightStatistics')),
            ],
        ),
        migrations.AddField(
            model_name='airport',
            name='carriers',
            field=models.ManyToManyField(related_name='airports', to='trvl.Carrier'),
        ),
        migrations.AlterUniqueTogether(
            name='statistics',
            unique_together={('airport', 'carrier', 'month', 'year')},
        ),
    ]
