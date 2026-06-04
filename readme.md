# 🛡️ DepCheck – GitHub Security Analyzer

> An AI-powered full-stack web application to scan GitHub repositories for security vulnerabilities using LangGraph agents. Supports detection in dependencies, code, Docker setups, and Infrastructure as Code (IaC)..
>
> 

---

## 🚀 Features

- 🔐 Token-based JWT authentication
- 📁 Add public/private GitHub repos with optional access tokens
- ⚙️ AI-powered multi-agent scanning:
  - Code vulnerabilities
  - Dependency issues (via OSV.dev)
  - Docker misconfigurations
  - IaC security issues (e.g., Terraform)
- 📊 Analytics dashboard
- 🌈 Responsive UI with TailwindCSS
- 🧠 Built with LangGraph + OpenAI

---

## 🛠️ Tech Stack

### Frontend

- React
- TailwindCSS
- React Router
- Axios
- Context API

### Backend (API)

- Node.js
- Express
- MongoDB + Mongoose
- JWT + Bcrypt

### Scanning Engine

- FastAPI (Python)
- GitPython
- LangGraph + LangChain
- OpenAI APIs
- OSV.dev Vulnerability DB

---
