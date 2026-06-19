#test_quantum_crypto.py
from Crypto.PublicKey import RSA
key = RSA.generate(2048)        # ← QBOM: Shor's vulnerable
weak = RSA.generate(1024)       # ← CBOM + QBOM: classically weak AND quantum-vulnerable
