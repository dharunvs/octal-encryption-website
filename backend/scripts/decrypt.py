from PIL import Image
from data import *
from aes import *
from main import octal_to_text
from check_encrypted import check_encrypted
from junk import removejunk

canvas = (CANVAS_SIZE, CANVAS_SIZE)
box_size = BOX_SIZE

def decrypt(key, im):

    with open(key, "r") as f:
        num = int(f.read())

    im = Image.open(im)
    rgb_im = im.convert('RGB')

    if check_encrypted(im):
        li = []
        x=y=a=0

        for i in range(num):
            rgb = rgb_im.getpixel((x, y))
            li.append(rgb)
            
            x+=box_size
            a+=1
            if a>= canvas[0]/box_size:
                a=0
                y+=box_size
                x=0

        colors_li = []
        for rgb in li:
            color = (rgb[0], rgb[1], rgb[2])
            for name, rgb in COLOR_NAME_MAP.items():
                if rgb == color:
                    color_name = name
                    break
            colors_li.append(color_name)


        text = ""

        for i in colors_li:
            text += NUMS[i]
            # text += "1"

        text = removejunk(text)
        print("Octal format:",text)
        decrypted = octal_to_text(text)
        print("AES encrypted text:", decrypted)
        aes_key = get_aes_key()
        decrypted = aes_decrypt_text(decrypted, aes_key)
        print("Decrypted text:",decrypted)
        
        with open("./tmp/decryptOut.txt", 'w') as file:
            file.write(decrypted)

    else:
        with open("./tmp/decryptOut.txt", 'w') as file:
            file.write("Fake image")
    

decrypt("key", "./tmp/input.png")