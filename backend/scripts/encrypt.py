from PIL import Image, ImageDraw
from main import text_to_octal
from aes import *
from data import *
from junk import addjunk
from zip import zip_directory
import random

canvas = (CANVAS_SIZE, CANVAS_SIZE)
box_size = BOX_SIZE
colors = COLORS

def encrypt(file):
    with open(file, "r") as f:
        num = f.read()
    aes_key = get_aes_key()
    num = aes_encrypt_text(num, aes_key)
    print("AES Encrypted text:", num)
    num = text_to_octal(num)
    print("Octal Format:", num)
    num , _ = addjunk(num)

    im = Image.new('RGBA', canvas, (255, 255, 255, 255))
    draw = ImageDraw.Draw(im)

    x=y=a=0

    for i in num:
        draw.rectangle([(x, y), (x+box_size, y+box_size)], fill=colors[i])
        x+=box_size
        a+=1
        if a>= canvas[0]/box_size:
            a=0
            y+=box_size
            x=0

    with open("key", "w") as f:
        f.write(str(len(num)))

    file = file.split(".")
    im.save(f"./out/encryptOut.png")

def encrypt_fake(file):
    with open(file, "r") as f:
        num = f.read()
    aes_key = get_aes_key()
    num = aes_encrypt_text(num, aes_key)
    num = text_to_octal(num)
    num , _ = addjunk(num, True)

    im = Image.new('RGBA', canvas, (255, 255, 255, 255))
    draw = ImageDraw.Draw(im)

    for j in range(1, 11):
        x=y=a=0
        num = list(num)
        random.shuffle(num)
        num = "".join(num)
        for i in num:
            draw.rectangle([(x, y), (x+box_size, y+box_size)], fill=colors[i])
            x+=box_size
            a+=1
            if a>= canvas[0]/box_size:
                a=0
                y+=box_size
                x=0

        with open("key", "w") as f:
            f.write(str(len(num)))

        fn= file.split(".")
        im.save(f"./out/encryptFakeOut/encryptFakeOut{j}.png")

encrypt_fake("./tmp/input.txt")
encrypt("./tmp/input.txt")
zip_directory()

# -- Testing --
# encrypt("../tmp/input.txt")
