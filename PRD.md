# PRD — DefiVenezuela
**Product Requirements Document**
Versión 1.0 — Mayo 2025

---

## 1. Visión del producto

DefiVenezuela es un hub de educación, comunidad y herramientas sobre blockchain, Web3, DeFi e Inteligencia Artificial, diseñado específicamente para el venezolano dentro y fuera del país.

No es una landing page. Es una plataforma viva que combina contenido educativo estructurado, una comunidad activa, herramientas para empresas y un newsletter automatizado con IA — todo construido desde la realidad venezolana: inflación, remesas, control de cambio y talento tech subutilizado.

**Referencia de mercado:** defimexico.org (estructura base), adaptada al contexto venezolano con un diferenciador clave: la integración de Agentes de IA como pilar central junto a DeFi.

---

## 2. Problema que resuelve

| Problema | Contexto venezolano |
|---|---|
| Educación financiera nula en crypto | El venezolano necesita crypto por necesidad, no por hobby, pero no sabe cómo empezar |
| Contenido en inglés o sin contexto local | Todo el contenido de calidad está en inglés o pensado para mercados desarrollados |
| Sistema bancario inaccesible | Restricciones bancarias hacen que DeFi sea una necesidad real, no opcional |
| Remesas con comisiones abusivas | Enviar dinero a Venezuela puede costar 10-20% en comisiones |
| Diáspora desconectada del ecosistema | +8 millones de venezolanos fuera del país sin recursos en español para Web3 |
| Empresas sin acceso a herramientas Web3 | Startups venezolanas no tienen acceso a analytics DeFi ni automatización con IA |

---

## 3. Audiencia objetivo

### Usuario primario
- **El venezolano curioso:** 25-40 años, tech-savvy básico, ya usa crypto para remesas o ahorro pero no sabe cómo avanzar. Está en Venezuela o en la diáspora.

### Usuario secundario
- **El builder venezolano:** Desarrollador o emprendedor que quiere construir en Web3 o con IA. Busca mentoría y comunidad.

### Usuario B2B
- **Startups y empresas venezolanas:** Que aceptan o trabajan con crypto y necesitan herramientas de analytics, compliance o automatización con IA.

---

## 4. Propuesta de valor única

> "El único hub en Venezuela que combina educación en DeFi con Agentes de IA, creado por venezolanos para venezolanos."

**Diferenciadores:**
1. Contenido 100% en español venezolano (no traducido, creado nativamente)
2. Casos de uso reales del contexto venezolano (remesas en USDC, protección contra inflación)
3. Integración de IA Agéntica como pilar educativo (no solo DeFi clásico)
4. Newsletter semanal automatizado con IA
5. Modelo de negocio mixto: comunidad gratuita + academia premium + B2B

---

## 5. Stack tecnológico actual

| Capa | Tecnología |
|---|---|
| Framework | Next.js 14 (App Router) |
| Lenguaje | TypeScript |
| Estilos | Tailwind CSS v4 |
| Componentes UI | Componentes propios + Radix UI (Slot) |
| Íconos | Lucide React |
| Utilidades | clsx, tailwind-merge |
| Animaciones | CSS custom (animate-pulse-glow, animate-float) |
| Deploy (objetivo) | Vercel |
| CMS (pendiente) | Sanity o Contentful |
| Newsletter (pendiente) | Beehiiv |
| Pagos (pendiente) | Stripe + USDC (Circle API) |
| Auth (pendiente) | Clerk |
| Automatización IA (pendiente) | n8n + Claude API (Anthropic) |

---

## 6. Arquitectura de rutas — Estado actual

### Páginas construidas ✅

| Ruta | Estado | Descripción |
|---|---|---|
| `/` | ✅ Completo | Homepage con hero, tracks, features, Agentic World teaser, blog preview, newsletter CTA, herramientas B2B |
| `/aprende` | ✅ Completo | Hub de aprendizaje con 4 tracks y recursos complementarios |
| `/agentic-world` | ✅ Completo | Sección de IA agéntica + blockchain con casos de uso y ruta de aprendizaje |
| `/herramientas` | ✅ Completo | Pricing B2B (3 productos), FAQs, CTA de contacto |
| `/academia` | ✅ Completo | Planes de membresía (Gratis / Builder $15 USDC / Pro $49 USDC) + testimonios |
| `/newsletter` | ✅ Completo | Suscripción + beneficios + archivo de ediciones |
| `/blog` | ✅ Completo | Listado de posts con categorías y post destacado |
| `/recursos` | ✅ Completo | Glosario Web3 (12 términos) + links externos curados |

### Componentes de layout ✅

| Componente | Estado |
|---|---|
| `Navbar` | ✅ Responsive, con menú mobile |
| `Footer` | ✅ Links completos + redes sociales |
| `Button` | ✅ Variantes: primary, secondary, outline, ghost + asChild |

---

## 7. Roadmap de desarrollo

### Fase 1 — MVP funcional (ACTUAL → 2 semanas)

**Objetivo:** El sitio corre, se ve bien y tiene todo el contenido estático.

- [ ] Arreglar cualquier error de compilación
- [ ] Página de error 404 personalizada
- [ ] Página `/contacto` con formulario
- [ ] Rutas de tracks individuales (`/aprende/blockchain`, `/aprende/defi`, etc.)
- [ ] Página de post de blog individual (`/blog/[slug]`)
- [ ] Metadatos SEO en todas las páginas (title, description, OG tags)
- [ ] Favicon y logo SVG propio
- [ ] Deploy en Vercel con dominio `defivenezuela.com`
- [ ] Google Analytics / Plausible Analytics

### Fase 2 — Contenido real y CMS (Semanas 3-6)

**Objetivo:** El contenido se puede editar sin tocar código.

- [ ] Integrar Sanity CMS para blog y recursos
- [ ] Migrar posts del blog a Sanity
- [ ] Crear primeros 5 artículos reales
- [ ] Crear primeros 2 tracks completos (Blockchain Básico + DeFi 101) con lecciones individuales
- [ ] Página de lección individual con progreso
- [ ] Sistema de búsqueda básico (Algolia o búsqueda client-side)
- [ ] Glosario expandido (50+ términos)

### Fase 3 — Newsletter y automatización IA (Semanas 6-10)

**Objetivo:** El newsletter funciona y se genera/curada con IA.

- [ ] Integrar Beehiiv para gestión del newsletter
- [ ] Formulario de suscripción conectado a Beehiiv API
- [ ] Pipeline de automatización: RSS crypto news → Claude API (resumen/curación) → borrador en Beehiiv
- [ ] Generación automática de borradores de blog con Claude API
- [ ] Segmentación de suscriptores (principiante / avanzado / empresa)
- [ ] Página de archivo del newsletter (`/newsletter/archivo`)

### Fase 4 — Comunidad y Academia (Semanas 10-16)

**Objetivo:** Monetización con membresías y acceso a contenido premium.

- [ ] Integrar Clerk para autenticación
- [ ] Sistema de membresías con Stripe (USD) + Circle API (USDC)
- [ ] Contenido bloqueado para usuarios premium
- [ ] Integración Discord/Telegram para la comunidad
- [ ] Dashboard de usuario (progreso en tracks, recursos guardados)
- [ ] Certificados de completación (generados automáticamente)
- [ ] Sistema de referidos

### Fase 5 — Herramientas B2B (Mes 4-6)

**Objetivo:** Primera fuente de ingresos B2B real.

- [ ] Dashboard de DeFi Analytics (integración con DeFiLlama API, CoinGecko API)
- [ ] Sistema de agentes IA configurables (basados en Claude API)
- [ ] Panel de administración para clientes B2B
- [ ] Onboarding automatizado para empresas
- [ ] Sistema de facturación en USDC

---

## 8. Modelo de negocio

### Ingresos directos al consumidor (B2C)
| Producto | Precio | Meta usuarios |
|---|---|---|
| Comunidad básica | Gratis | 10,000 |
| Plan Builder | $15 USDC/mes | 500 |
| Plan Pro | $49 USDC/mes | 100 |

**MRR objetivo (12 meses):** $12,400 USDC/mes

### Ingresos empresariales (B2B)
| Producto | Precio | Meta clientes |
|---|---|---|
| DeFi Analytics Dashboard | $99/mes | 30 |
| Agentes IA Personalizados | $299/mes | 10 |
| Compliance Crypto | Proyecto | 5 proyectos/año |

**MRR objetivo B2B (12 meses):** $5,950 USDC/mes

### Ingresos indirectos
- Patrocinios de newsletter (CPM por audiencia venezolana en Web3)
- Afiliados de plataformas crypto
- Eventos y workshops pagos

---

## 9. Métricas clave (KPIs)

| Métrica | Meta 3 meses | Meta 12 meses |
|---|---|---|
| Visitas mensuales | 5,000 | 50,000 |
| Suscriptores newsletter | 1,000 | 10,000 |
| Usuarios registrados | 500 | 5,000 |
| Miembros pagos (B2C) | 50 | 600 |
| Clientes B2B | 2 | 40 |
| Tasa apertura newsletter | >40% | >35% |
| NPS comunidad | >60 | >65 |

---

## 10. Contenido — Plan editorial

### Blog (Frecuencia: 2 posts/semana)
**Categorías prioritarias:**
- Remesas y USDC (alto impacto en Venezuela)
- DeFi para principiantes
- Seguridad en crypto
- Agentes de IA aplicados
- Análisis de mercado (semanal)
- Casos de éxito de venezolanos en Web3

### Newsletter (1 edición/semana — lunes)
**Estructura de cada edición:**
1. Apertura: 1 insight del mercado crypto (3 líneas)
2. Historia principal: tutorial o análisis profundo
3. Oportunidades: 3 yields o proyectos interesantes
4. Herramienta de la semana
5. Cierre: 1 pregunta a la comunidad

**Pipeline de automatización:**
- Fuentes: CoinDesk, The Block, Bankless, DeFiLlama, Twitter/X curado
- Proceso: RSS → n8n → Claude API (resumen + contextualización venezolana) → borrador Beehiiv → revisión humana → envío

### Tracks educativos (Lanzamiento progresivo)
| Track | Lecciones | Formato | Estado |
|---|---|---|---|
| Blockchain Básico | 8 | Artículo + video | Pendiente |
| DeFi 101 | 12 | Artículo + video | Pendiente |
| Web3 & NFTs | 10 | Artículo + video | Pendiente |
| Agentes de IA | 15 | Artículo + código | Pendiente |

---

## 11. Diseño — Decisiones actuales

**Paleta de colores:**
- Background: `#0a0a0f` (negro profundo)
- Surface: `#13131a`
- Primary (amber): `#f59e0b`
- Secondary (violet): `#8b5cf6`
- Accent (cyan): `#06b6d4`

**Filosofía de diseño:** Dark mode, gradientes sutiles, glassmorphism leve, sin fondo blanco. Inspiración: Linear.app + Vercel + Uniswap.

**Tipografía:** Geist Sans (Google Fonts, variable)

---

## 12. Integraciones pendientes

| Integración | Propósito | Prioridad |
|---|---|---|
| Beehiiv API | Newsletter y suscripciones | Alta |
| Sanity CMS | Gestión de contenido del blog y tracks | Alta |
| Vercel Analytics | Métricas de tráfico | Alta |
| Claude API (Anthropic) | Automatización de contenido y agentes | Alta |
| Clerk | Autenticación de usuarios | Media |
| Stripe | Pagos en USD | Media |
| Circle API | Pagos en USDC | Media |
| n8n | Orquestación de automatizaciones | Media |
| Discord API | Comunidad premium | Baja |
| Telegram Bot API | Newsletter y alertas | Baja |
| DeFiLlama API | Datos DeFi para dashboard B2B | Baja |
| CoinGecko API | Precios y datos de mercado | Baja |

---

## 13. Riesgos y mitigaciones

| Riesgo | Probabilidad | Impacto | Mitigación |
|---|---|---|---|
| Baja adopción inicial | Media | Alto | SEO agresivo + distribución en comunidades venezolanas existentes |
| Competencia (defimexico, etc.) | Baja | Medio | Diferenciación por contexto local y foco en IA agéntica |
| Regulación crypto en Venezuela | Baja | Alto | No ofrecer servicios financieros directos, solo educación y herramientas |
| Costo de APIs de IA | Media | Medio | Prompt caching + batching para newsletter; límites por usuario |
| Churn en membresías | Media | Alto | Contenido nuevo semanal + comunidad activa como retención |

---

## 14. Lo que NO es este producto

- No es un exchange ni una plataforma de trading
- No es asesoría financiera
- No es una billetera o custodia de fondos
- No es solo una landing page (es un hub vivo con contenido actualizado)
- No es contenido traducido del inglés

---

## 15. Próximos pasos inmediatos

1. **Levantar el servidor y revisar el sitio** — `npm run dev` en `defi-venezuela/`
2. **Resolver errores de compilación** si los hay
3. **Crear `/contacto`** con formulario funcional
4. **Crear páginas de tracks individuales** (`/aprende/[track]`)
5. **Deploy inicial en Vercel** para tener URL pública
6. **Registrar dominio** `defivenezuela.com` y conectar a Vercel
7. **Abrir cuenta Beehiiv** y conectar el formulario de newsletter
8. **Crear las primeras 5 lecciones reales** del track Blockchain Básico

---

*Documento generado: Mayo 2025*
*Stack: Next.js 14 + TypeScript + Tailwind CSS v4*
*Directorio: `C:\Users\asus\Documents\ProyectosPersonales\defi-venezuela\`*
