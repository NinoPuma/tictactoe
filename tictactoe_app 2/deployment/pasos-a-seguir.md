
# 🚀 Despliegue de Aplicación Node.js en Minikube (PowerShell)

Este documento te guía paso a paso para crear una imagen Docker de tu aplicación, y desplegarla en **Minikube** usando **PowerShell**.

---

## 📁 1. Estructura esperada del proyecto

Asegúrate de tener algo similar a esto:

```
tictactoe-app/
│
├── Dockerfile
├── package.json
├── package-lock.json
├── src/ (u otros archivos del proyecto)
└── deployment/
    ├── k8s/
        ├── namespace.yaml
        └── deployment.yaml
```

---

## 🐳 2. Crear imagen Docker en el entorno de Minikube

Minikube usa su propio Docker interno. Para trabajar con él en **PowerShell**, haz lo siguiente:

```powershell
minikube docker-env | Invoke-Expression
```

> Esto cambiará tu entorno de PowerShell para que `docker build` funcione directamente dentro de Minikube.

Ahora construye la imagen:

```powershell
docker build -t img-proyecto-prueba3 -f deployment/Dockerfile .
```

> Asegúrate de que el `Dockerfile` esté bien ubicado y que el contexto `.` apunte al root del proyecto.

---

## 📦 3. Crear el Namespace

```powershell
kubectl apply -f deployment/k8s/namespace.yaml
```

Contenido del `namespace.yaml`:

```yaml
apiVersion: v1
kind: Namespace
metadata:
  name: despliegue-k8s-proyecto-nspc
```

---

## 📤 4. Crear el Deployment

```powershell
kubectl apply -f deployment/k8s/deployment.yaml
```

Ejemplo de `deployment.yaml`:

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: mi-app
  namespace: despliegue-k8s-proyecto-nspc

spec:
  replicas: 1
  selector:
    matchLabels:
      app: mi-app
  template:
    metadata:
      labels:
        app: mi-app
    spec:
      containers:
      - name: mi-app
        image: img-proyecto-prueba3
        imagePullPolicy: Never
        ports:
        - containerPort: 3000
```

---

## 🌐 5. Crear el Service (opcional, pero recomendado)

Crea un archivo `service.yaml`:

```yaml
apiVersion: v1
kind: Service
metadata:
  name: tictactoe-service
  namespace: despliegue-k8s-proyecto-nspc
spec:
  type: NodePort
  selector:
    app: mi-app
  ports:
    - port: 3000
      targetPort: 3000
      nodePort: 30001
```

Y aplícalo con:

```powershell
kubectl apply -f deployment/k8s/service.yaml
```

---

## 🧪 6. Probar que todo funcione

Verifica que los pods estén corriendo:

```powershell
kubectl get pods -n despliegue-k8s-proyecto-nspc
```

Accede a la app con:

```powershell
minikube service tictactoe-service -n despliegue-k8s-proyecto-nspc
```

---

## ✅ Consejos

- Si modificas la imagen, vuelve a correr `docker build`.
- Si algo falla, revisa logs con:
  ```powershell
  kubectl logs <nombre-del-pod> -n despliegue-k8s-proyecto-nspc
  ```

---

Listo. ¡Tu app debería estar levantada en Kubernetes con Minikube! 🚀
