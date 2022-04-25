# from PIL import Image as PilImage
from PIL import Image
from PIL.ExifTags import TAGS, GPSTAGS
import os
from exif import Image as ExifImage
# import pillow_heif
# import pyheif
# import piexif


def get_meta_from_jpeg(file):
    with open(file, "rb") as photo_file:
        image = ExifImage(photo_file)

    image_metadata = {}

    image_metadata['timestamp'] = format_date_time(image.datetime)
    image_metadata['latitude'] = dms_coordinates_to_dd_coordinates(image.gps_latitude, image.gps_latitude_ref)
    image_metadata['longitude'] = dms_coordinates_to_dd_coordinates(image.gps_longitude, image.gps_longitude_ref)

    return image_metadata


def format_date_time(datetime):
    date_time_split = datetime.split(' ')
    date_split = date_time_split[0].split(':')
    date_join = ("/").join(date_split)
    date_time_split[0] = date_join
    return (" ").join(date_time_split)



def dms_coordinates_to_dd_coordinates(coordinates, coordinates_ref):
    decimal_degrees = coordinates[0] + \
                      coordinates[1] / 60 + \
                      coordinates[2] / 3600
    
    if coordinates_ref == "S" or coordinates_ref == "W":
        decimal_degrees = -decimal_degrees
    
    return decimal_degrees

