# Cortouch Media — Backend Architecture & REST API Documentation

This directory contains the complete backend structure for the **Cortouch Media Brand Platform**. Built with a clean, layered architectural pattern in TypeScript and Express, it provides endpoints for client onboarding, service inquiries, multi-platform analytics reporting, content approval workflows, milestone timeline tracking, and AI-powered copy generation.

---

## 📁 Directory Structure

```text
/backend/
├── app.ts                 # Express application initialization & middleware pipeline
├── index.ts               # Public barrel exports for all backend modules
├── types/
│   └── index.ts           # Domain models, request/response DTOs, and API interfaces
├── data/
│   └── store.ts           # In-memory thread-safe data store with initial seed data
├── middleware/
│   ├── errorHandler.ts    # Centralized error handler and 404 router
│   ├── requestLogger.ts   # Latency and endpoint access logger
│   └── validator.ts       # Request body field validation middleware
├── services/
│   ├── clients.service.ts    # Client profiles and service package catalog
│   ├── content.service.ts    # Post approvals, revisions, comments, and drafts
│   ├── analytics.service.ts  # Cross-platform metrics aggregation & strategic insights
│   ├── milestones.service.ts # Project phases, checklists, and progress calculation
│   ├── requests.service.ts   # Service inquiry pipeline & dynamic pricing estimation
│   └── ai.service.ts         # Gemini 3.8 Flash social caption & hook generator
├── controllers/
│   ├── clients.controller.ts
│   ├── content.controller.ts
│   ├── analytics.controller.ts
│   ├── milestones.controller.ts
│   ├── requests.controller.ts
│   ├── ai.controller.ts
│   └── health.controller.ts
└── routes/
    ├── index.ts           # Root `/api` router combining all resources
    ├── clients.routes.ts
    ├── content.routes.ts
    ├── analytics.routes.ts
    ├── milestones.routes.ts
    ├── requests.routes.ts
    └── ai.routes.ts
```

---

## 🌐 API Endpoints Reference

All routes are mounted under the `/api` prefix.

### 1. Health Check
| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/health` | Service uptime, status, and route catalog |

### 2. Clients & Packages
| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/clients` | List all active client brand profiles |
| `GET` | `/api/clients/:id` | Get single client profile details |
| `GET` | `/api/clients/packages` | List Cortouch Media service packages and deliverables |

### 3. Content Approval & Scheduling
| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/content` | List posts (filter by `?clientId=`, `?status=`, `?platform=`) |
| `GET` | `/api/content/:id` | Get post details, media assets, and revision history |
| `GET` | `/api/content/stats/approvals` | Count of posts requiring approval (`?clientId=`) |
| `POST` | `/api/content/draft` | Create new post draft for review |
| `POST` | `/api/content/:id/approve` | Approve post (optional feedback note) |
| `POST` | `/api/content/:id/request-changes` | Request revisions with mandatory feedback note |
| `POST` | `/api/content/:id/comments` | Add comment to post discussion thread |
| `DELETE` | `/api/content/:id` | Delete post |

### 4. Analytics & Reporting
| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/analytics` | Get analytics metrics for client (`?clientId=`) |
| `GET` | `/api/analytics/all` | Get analytics for all managed clients |
| `GET` | `/api/analytics/:clientId/platforms` | Platform-specific breakdown (IG, TikTok, LinkedIn, etc.) |
| `GET` | `/api/analytics/:clientId/insights` | Strategic growth insights and algorithmic opportunities |
| `GET` | `/api/analytics/:clientId/summary` | Executive high-level KPI summary |

### 5. Project Milestones & Timeline
| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/milestones` | List milestones (filter by `?clientId=`) |
| `GET` | `/api/milestones/:id` | Get single milestone by ID |
| `GET` | `/api/milestones/client/:clientId/summary` | Milestone completion rates and category summaries |
| `POST` | `/api/milestones` | Create a new project milestone |
| `PUT` | `/api/milestones/:id` | Update milestone fields |
| `POST` | `/api/milestones/:milestoneId/tasks/:taskId/toggle` | Toggle task checkmark and recalculate progress |

### 6. Service Requests & Quotes
| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/requests` | List client service inquiries (filter by `?status=`) |
| `GET` | `/api/requests/summary` | Agency inquiry pipeline summary & estimated value |
| `GET` | `/api/requests/:id` | Get inquiry details |
| `POST` | `/api/requests` | Submit new client service inquiry |
| `PATCH` | `/api/requests/:id/status` | Advance status (`pending`, `reviewed`, `proposal_sent`, `approved`, `active`) |

### 7. AI Content Generator
| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/api/ai/generate` | Generate high-converting captions, hashtags, and retention hooks with Gemini 3.8 Flash |

**Request Body (`POST /api/ai/generate`):**
```json
{
  "topic": "Sustainable silk autumn capsule launch",
  "platform": "instagram",
  "tone": "luxurious",
  "targetAudience": "Eco-conscious luxury shoppers",
  "cta": "Reserve VIP early access"
}
```

---

## 🛠️ Server Integration

The backend is mounted onto the main Node.js server via `server.ts` at the root of the project:
- In **development**, Express serves the `/api` routes and mounts Vite dev server middlewares on port `3000`.
- In **production**, Express serves `/api` routes and statically hosts the compiled frontend in `dist/`.
