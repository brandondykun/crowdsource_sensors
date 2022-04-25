from datetime import datetime
from django.contrib.auth.models import (AbstractUser)
from django.contrib.gis.db import models 
from django.contrib.gis.geos import Point
from .utils import get_meta_from_jpeg
import os


class AppUser(AbstractUser):
    email = models.EmailField(
        verbose_name='email address',
        max_length=64,
        unique=True,
    )

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []


class Category(models.Model):
    name = models.CharField(max_length=64)
    description = models.CharField(max_length=255)

    def __str__(self):
        return self.name



class Post(models.Model):
    user = models.ForeignKey(AppUser, on_delete=models.CASCADE, related_name='posts')
    category = models.ForeignKey(Category, on_delete=models.CASCADE ,related_name='posts')
    title = models.CharField(max_length=64)
    description = models.CharField(max_length=255)
    image = models.ImageField(upload_to='images/')
    time_created = models.DateTimeField(auto_now_add=True, blank=True)
    image_time_stamp = models.DateTimeField(auto_now_add=True, blank=True)
    location = models.PointField(blank=True, null=True)

    def __str__(self):
        return self.title

    def save(self, *args, **kwargs):
        if self.image:
            super(Post, self).save(*args, **kwargs)
            meta = get_meta_from_jpeg(f"{self.image.path}")
            self.image_time_stamp = datetime.strptime(meta['timestamp'], "%Y/%m/%d %H:%M:%S")
            self.location = Point(meta['longitude'], meta['latitude'], srid=4326)
            # super(Post, self).save(*args, **kwargs)
    


class Comment(models.Model):
    post = models.ForeignKey(Post, on_delete=models.CASCADE, related_name='comments')
    user = models.ForeignKey(AppUser, on_delete=models.CASCADE, related_name='comments')
    text = models.CharField(max_length=255)
    time_created = models.DateTimeField(auto_now_add=True, blank=True)









