# Guía de Deployment — DefiVenezuela

## Pre-requisitos

1. **Cuenta en GitHub**
   - Este proyecto debe estar en un repositorio de GitHub (público o privado)
   - Push el código: `git push origin main`

2. **Cuenta en Vercel**
   - Ir a https://vercel.com y crear cuenta (puedes usar GitHub para login)
   - Autorizar Vercel a acceder a tus repositorios

3. **Google Analytics (opcional pero recomendado)**
   - Crear cuenta en https://analytics.google.com
   - Crear una propiedad Web
   - Anotar el ID (GA_ID, ej: G-XXXXXXXXXXXXX)

4. **Dominio**
   - Registrar `defivenezuela.com` en Namecheap, GoDaddy, o similar
   - O usar un subdominio existente

5. **Variables de entorno**
   - NEXT_PUBLIC_SUPABASE_URL
   - SUPABASE_ANON_KEY
   - RESEND_API_KEY
   - NEXT_PUBLIC_GA_ID (Google Analytics)
   - ADMIN_USER (por defecto: admin)
   - ADMIN_PASSWORD (generar contraseña segura)
   - ADMIN_EMAIL (email de contacto del admin)

---

## Paso 1: Push a GitHub

```bash
git add .
git commit -m "MVP fase 1 completo: blog, contacto, SEO, favicon, analytics"
git push origin main
```

---

## Paso 2: Crear proyecto en Vercel

1. Ve a https://vercel.com/dashboard
2. Click en "New Project"
3. Selecciona el repositorio `defi-venezuela`
4. Click "Import"

### Configuración del proyecto

En la página de configuración:

**Framework Preset:** Next.js (detectado automáticamente)

**Environment Variables:** Agregar todas las variables listadas arriba:

```
NEXT_PUBLIC_SUPABASE_URL=https://[tu-project].supabase.co
SUPABASE_ANON_KEY=eyJhbGc...
RESEND_API_KEY=re_XXXXX...
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXXXXX
ADMIN_USER=admin
ADMIN_PASSWORD=DefiVenezuela2026!Admin
ADMIN_EMAIL=admin@defivenezuela.com
```

### Deploy

5. Click "Deploy"
6. Esperar 2-3 minutos a que se complete el build
7. Ver la URL temporal: `https://defi-venezuela-[hash].vercel.app`

---

## Paso 3: Conectar dominio

### Opción A: Usar nameservers de Vercel (recomendado)

1. En Vercel dashboard, ir a Project > Settings > Domains
2. Agregar dominio: `defivenezuela.com`
3. Vercel mostrará 4 nameservers
4. En tu registrador (Namecheap, etc):
   - Ir a "Manage Domain"
   - Cambiar nameservers a los de Vercel
   - Guardar cambios
5. Esperar 24-48 horas para propagación DNS

### Opción B: Usar CNAME (más rápido)

1. En Vercel dashboard, agregar dominio
2. Seleccionar "CNAME" en lugar de nameservers
3. En tu registrador:
   - Crear registro CNAME: `alias: defivenezuela.com` → `cname.vercel-dns.com`
   - Guardar
4. Vercel detectará el CNAME automáticamente

---

## Paso 4: Verificar ambiente de producción

Una vez el dominio esté propagado:

```bash
# Verificar que el sitio está live
curl https://defivenezuela.com

# Verificar metadatos SEO
curl -I https://defivenezuela.com

# Verificar analytics está cargando
# Ir a https://analytics.google.com y revisar tráfico en tiempo real
```

---

## Paso 5: Configurar SSL/HTTPS

- Vercel proporciona SSL gratuito automáticamente
- Los certificados se renuevan automáticamente
- Verificar en browser: candado verde ✅

---

## Paso 6: Configurar Google Analytics

1. Ir a Google Analytics
2. Crear una propiedad para `defivenezuela.com`
3. Copiar ID (G-XXXXXXXXXXXXX)
4. En Vercel, agregar env var: `NEXT_PUBLIC_GA_ID=G-XXXXXXXXXXXXX`
5. Re-deployar automáticamente o manualmente
6. Esperar 24 horas para ver datos

---

## Paso 7: Tests post-deployment

- [ ] Homepage carga correctamente: https://defivenezuela.com
- [ ] Navegación funciona (Aprende, Blog, Contacto)
- [ ] Blog posts cargan: https://defivenezuela.com/blog/remesas-usdc-venezuela
- [ ] Formulario de contacto funciona
- [ ] Admin panel accesible: https://defivenezuela.com/admin (con auth Basic)
- [ ] Favicon visible en tab del browser
- [ ] Metadatos SEO presentes (inspeccionar con DevTools)

---

## Comandos útiles

```bash
# Build local para verificar
npm run build

# Preview local del build
npm run start

# Logs de Vercel
vercel logs [project-name]

# Redeploy manual
vercel deploy --prod
```

---

## Solución de problemas

### "Build failed"
- Revisar logs en Vercel dashboard
- Verificar env vars están correctas
- Hacer `npm run build` localmente para debuggear

### "Domain not working"
- Esperar 24-48 horas para propagación DNS
- Verificar nameservers con `nslookup defivenezuela.com`
- En Vercel, verificar que el dominio esté en "Connected"

### "Analytics no muestra datos"
- Verificar `NEXT_PUBLIC_GA_ID` está configurado
- Abrir DevTools > Network y buscar requests a `googletagmanager.com`
- Puede tomar 24 horas para aparecer en Analytics

---

## Próximas fases (después de deployment)

- [ ] Crear primeros 5 blog posts reales
- [ ] Integrar CMS (Sanity o Contentful)
- [ ] Configurar Stripe para membresías
- [ ] Crear first learning track
- [ ] Integrar Discord Community
- [ ] Monitoreo y optimización de performance

---

**¡El MVP está listo para ir a producción!** 🚀
