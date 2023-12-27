from cryptography.fernet import Fernet

def generate_aes_key():
    key = Fernet.generate_key()
    return key

def get_aes_key():
    with open('key_aes', "r") as f:
        key = f.read()
    key = key.encode('utf-8')
    return key

def aes_encrypt_text(text, aes_key):
    fernet = Fernet(aes_key)
    encrypted_text = fernet.encrypt(text.encode())
    encrypted_text = encrypted_text.decode('utf-8')
    return encrypted_text

def aes_decrypt_text(encrypted_text, aes_key):
    fernet = Fernet(aes_key)
    encrypted_text = encrypted_text.encode('utf-8')
    decrypted_text = fernet.decrypt(encrypted_text).decode()
    return decrypted_text
