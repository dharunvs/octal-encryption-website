import zipfile
import os
import sys

def zip_directory(directory_path, zip_file_path):
    with zipfile.ZipFile(zip_file_path, 'w') as zip_file:
        for foldername, _ , filenames in os.walk(directory_path):
            for filename in filenames:
                file_path = os.path.join(foldername, filename)
                arcname = os.path.relpath(file_path, directory_path)
                zip_file.write(file_path, arcname)

directory_to_zip = './out'
zip_file_path = './tmp/encrypted.zip'

zip_directory(directory_to_zip, zip_file_path)
