# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

ConnectEn is a multi-tenant SaaS ERP platform specialized for the dance studio industry. Following subsidy approval, the project has evolved from a single-company system to a comprehensive platform serving multiple dance studios, with En Dance Studio as the initial tenant.

## Common Development Commands

### Main Application (connect-en-app)
```bash
# Navigate to the main app directory
cd connect-en-app

# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run linting
npm run lint
```

## Architecture & Structure

### Repository Layout
- **connect-en-app/**: Main Next.js application
  - `src/app/`: App Router pages and layouts
    - Admin routes: dashboard, members, staff, billing, etc.
    - User routes: under `/user/` for customer-facing features
  - `src/components/`: Reusable React components
  - TypeScript with strict mode enabled
  - Tailwind CSS for styling
  - Path alias `@/*` maps to `./src/*`

- **mio_desgin_system/**: Design documentation and specifications
  - Contains bilingual (JP/EN) system design documents
  - Screen flow diagrams and UI guidelines

- **now_JP_system/**: Screenshots of current Japanese system
- **now_USA_mind_body/**: Screenshots of MindBody system for reference

### Key Technical Details
- **Framework**: Next.js 14 with App Router
- **Architecture**: Multi-tenant SaaS with tenant isolation
- **Language**: TypeScript (strict mode)
- **Styling**: Tailwind CSS
- **Database**: PostgreSQL with tenant separation
- **ORM**: Prisma (configured for multi-tenancy)
- **Authentication**: JWT with tenant context
- **Deployment**: Vercel (frontend), AWS (backend services)

### Development Workflow
1. **Multi-tenant First**: All features must be designed with tenant isolation in mind
2. Bilingual support (Japanese/English) is a core requirement
3. Follow existing naming conventions in both languages (e.g., `会員管理-Member_Management`)
4. Component structure follows common/layout organization pattern
5. **Tenant Context**: Always ensure tenant context is properly maintained throughout the application

### Important Notes
- No test framework is currently configured
- No ESLint configuration beyond Next.js defaults
- The project integrates multiple studio management functions: membership, scheduling, payments, marketing, reporting, and inventory management
- Screenshots in `now_JP_system` and `now_USA_mind_body` serve as reference for feature implementation

## SaaS Development Guidelines

### Multi-tenant Architecture Principles
1. **Data Isolation**: Every database query must include tenant context
2. **API Design**: All endpoints follow `/api/v1/:tenantId/` pattern
3. **Authentication**: JWT tokens must contain tenant information
4. **Resource Scoping**: All resources (files, uploads, etc.) must be tenant-scoped

### Critical SaaS Considerations
- **Never access data across tenants** - Always validate tenant context
- **Database queries** must include tenant_id in WHERE clauses
- **File uploads** should be stored in tenant-specific directories
- **Configuration** should be tenant-specific, not environment-based
- **Error messages** should not leak tenant information

### Development Best Practices
- Use middleware to inject tenant context into requests
- Implement Row Level Security (RLS) in PostgreSQL
- Test with multiple tenants to ensure proper isolation
- Monitor for tenant data leakage in logs and errors

### Platform vs Tenant Features
- **Platform features**: Tenant management, billing, platform analytics
- **Tenant features**: All business logic (member management, scheduling, etc.)
- Clearly separate platform and tenant-specific code