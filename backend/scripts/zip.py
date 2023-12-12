import zipfile
import os

def zip_directory():
    directory_path = './out'
    zip_file_path = './tmp/encrypted.zip'
    with zipfile.ZipFile(zip_file_path, 'w') as zip_file:
        for foldername, _ , filenames in os.walk(directory_path):
            for filename in filenames:
                file_path = os.path.join(foldername, filename)
                arcname = os.path.relpath(file_path, directory_path)
                zip_file.write(file_path, arcname)



zip_directory()
