# 🎮 Gamodoo — Frontend

> Le frontend de l'application **Gamodoo**, ton ami anti-procrastination !

---

## 🚀 Stack technique

| Technologie | Rôle |
|---|---|
| [Next.js](https://nextjs.org) | Framework React (App Router) |
| TypeScript | Typage statique |
| CSS | Styles |
| Docker | Conteneurisation |

---

## 📦 Installation

### Prérequis

- Node.js `>= 18`
- npm / yarn / pnpm

### Cloner le projet

```bash
git clone https://github.com/Wildyax/gamodoo-front.git
cd gamodoo-front
```

### Installer les dépendances

```bash
npm install
```

---

## 🧑‍💻 Démarrage en développement

```bash
npx next dev
```

Ouvre [http://localhost:3000](http://localhost:3000) dans ton navigateur.

---

## 🏗️ Structure du projet

```
gamodoo-front/
├── app/          # App Router Next.js (layouts, pages)
├── pages/        # Pages supplémentaires
├── src/          # Composants, hooks, utils
├── public/       # Assets statiques
├── Dockerfile    # Config Docker
└── next.config.ts
```

---

## 🛠️ Scripts disponibles

| Commande | Description |
|---|---|
| `npm run dev` | Lance le serveur de développement |
| `npm run build` | Build de production |
| `npm run start` | Démarre le serveur de production |
| `npm run lint` | Vérifie le code avec ESLint |

---

## 🔗 Liens utiles

- [Documentation Next.js](https://nextjs.org/docs)
- [Repo backend Gamodoo]([https://github.com/Wildyax](https://github.com/Wildyax/gamodoo-back)
