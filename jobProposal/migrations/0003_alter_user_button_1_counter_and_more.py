# Generated by Django 4.2.3 on 2023-07-13 01:00

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('jobProposal', '0002_remove_user_id_alter_user_username'),
    ]

    operations = [
        migrations.AlterField(
            model_name='user',
            name='button_1_counter',
            field=models.IntegerField(null=True),
        ),
        migrations.AlterField(
            model_name='user',
            name='button_2_counter',
            field=models.IntegerField(null=True),
        ),
    ]
