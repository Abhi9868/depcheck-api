# test_crypto.py
import hashlib

def verify_checksum(data):
    return hashlib.md5(data.encode()).hexdigest()   # ← CBOM: MD5 HIGH

def legacy_hash(data):
    return hashlib.sha1(data.encode()).hexdigest()   # ← CBOM: SHA-1 MEDIUM
