from rest_framework import serializers
from .models import *
from django.contrib.auth.hashers import make_password
from rest_framework_gis.serializers import GeoModelSerializer



class AppUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = AppUser
        fields = ['id', 'email', 'password']

    password = serializers.CharField(write_only=True)

    def create(self, validated_data):
        validated_data["password"] = make_password(validated_data["password"]) # hashes our password
        return super().create(validated_data)


class CommentSerializer(serializers.ModelSerializer):
    user= AppUserSerializer(read_only=True)
    class Meta:
        model = Comment
        fields = ["id", "post", "user", "text", "time_created"]



class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ['id', 'name', 'description']
        


class PostSerializer(GeoModelSerializer):
    comments = CommentSerializer(many=True, read_only=True)
    category = CategorySerializer(read_only=True)
    category_id = serializers.PrimaryKeyRelatedField(many=False, write_only=True, source='category', queryset=Category.objects.all())

    class Meta:
        model = Post
        geo_field = "location"
        fields = ['id', 'user', 'title', 'description', 'category', 'category_id', 'time_created', 'image_time_stamp', 'comments', 'image', 'location']









    

    