export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  author: string;
  date: string;
  category: string;
  image?: string;
  readTime: string;
  content: string;
  tags: string[];
}

export const blogPosts: BlogPost[] = [
  {
    slug: "remesas-usdc-venezuela",
    title: "Cómo enviar remesas con USDC a Venezuela sin comisiones abusivas",
    description: "Guía práctica para venezolanos en la diáspora: cómo convertir dinero a USDC y enviarlo a familia en Venezuela en minutos.",
    author: "DefiVenezuela Team",
    date: "2026-05-12",
    category: "Remesas",
    readTime: "8 min",
    tags: ["USDC", "Remesas", "Venezuela", "DeFi"],
    content: `
## Introducción

Las remesas son uno de los salvavidas de la economía venezolana. Pero enviar dinero desde el exterior hacia Venezuela ha sido históricamente caro, lento y complicado. Los bancos cobran comisiones de 10-20%, los procesadores de pagos demoran días, y muchos servicios ya no atienden clientes venezolanos.

Con USDC (stablecoin en la blockchain Ethereum), puedes enviar dinero a Venezuela en minutos, sin intermediarios, y con costos cercanos a cero.

## ¿Por qué USDC?

**USDC** es una moneda digital respaldada 1:1 en USD por Coinbase y Circle. Se ejecuta en la blockchain Ethereum (y otras), lo que significa:

- **Inmediato**: Tu dinero llega en minutos, no en días
- **Barato**: Las comisiones son 1-2 USD máximo (la gasolina de la red)
- **Seguro**: No hay intermediarios fraudulentos
- **Verificable**: Todo está en la blockchain, auditable públicamente

## Paso a paso: Enviar remesas con USDC

### 1. Obtén USDC donde vives (5 minutos)

**Si estás en EE.UU., Europa o Latinoamérica:**
- Crea una cuenta en Coinbase o Kraken
- Compra USDC con dinero de tu banco
- Transfiere USDC a tu wallet personal

**Si estás en una región sin acceso directo:**
- Usa exchanges P2P como Binance
- Busca vendedores de USDC locales en comunidades de telegram o Discord

### 2. Configura una wallet (5 minutos)

Recomendamos **MetaMask** o **Ledger Live** para empezar:

\`\`\`
1. Descarga MetaMask (metamask.io)
2. Crea una wallet nueva
3. Guarda tu seed phrase en un lugar seguro
4. Anota tu dirección pública (comienza con 0x...)
\`\`\`

### 3. Envía USDC a tu wallet (inmediato)

Desde Coinbase/Kraken:
1. Ve a "Enviar" o "Withdraw"
2. Selecciona USDC en red Ethereum
3. Pega tu dirección de MetaMask
4. Confirma

**En 1-2 minutos** verás los USDC en MetaMask.

### 4. Tu familia en Venezuela recibe en efectivo

**Opción A: A través de una exchange local**
- Usa exchanges venezolanas como Localbitcoins, Airtm o similares
- Vende USDC por bolívares
- Retira a tu banco venezolano

**Opción B: P2P directo (recomendado)**
- Conecta a través de Discord/Telegram de DeFi Venezuela
- Intercambia USDC directamente con alguien en Venezuela
- Recibe bolívares en su banco o efectivo en mano

**Opción C: Usar una tarjeta crypto**
- Algunos servicios ofrecen tarjetas de débito conectadas a USDC
- Retira directamente desde ATMs en Venezuela

## Costos reales

| Método | Costo | Tiempo |
|--------|-------|--------|
| Remesa tradicional | 10-20% | 3-7 días |
| USDC vía Ethereum | 1-2 USD | 5-10 minutos |
| Ahorro | 9-18% | 3-7 días menos |

**Ejemplo:** Enviar \$500 USD
- Banco: Pagas $550-600 USD, llega en 5 días
- USDC: Pagas $501 USD (incluida gasolina), llega en 5 minutos

## Seguridad: 5 reglas de oro

1. **Nunca compartas tu seed phrase** (las 12 palabras de recuperación)
2. **Verifica siempre la dirección** antes de enviar (blockchain no se puede revertir)
3. **Usa wallets establecidas** (MetaMask, Ledger, Trezor)
4. **Empieza pequeño** (prueba con $10 primero)
5. **No dejes fondos en exchanges** (transfiere siempre a tu wallet personal)

## Preguntas frecuentes

**¿Es legal?**
Sí. Enviar dinero a familia es legal. La blockchain es solo tecnología, como PayPal o Western Union.

**¿Qué pasa si se cae Ethereum?**
La blockchain Ethereum está online desde 2015 sin interrupciones. Tu dinero en USDC es seguro.

**¿Puedo enviar desde Coinbase directamente?**
Algunos exchanges sí permiten retiros a direcciones personales, otros no. Aquí usamos tu wallet personal para máxima libertad.

## Recursos útiles

- **MetaMask:** https://metamask.io
- **Coinbase:** https://coinbase.com
- **USDC Info:** https://www.circle.com/usdc
- **Discord DeFi Venezuela:** https://discord.gg/defivenezuela

---

**Conclusión:** USDC es la forma más rápida, barata y segura de enviar remesas a Venezuela. Si tienes familia en el país, esta herramienta puede ahorrarles miles de bolívares en comisiones.

¿Tienes dudas? Únete a nuestro [Discord](https://discord.gg/defivenezuela) y pregunta en el canal #remesas.
    `,
  },
  {
    slug: "defi-101-primeros-pasos",
    title: "DeFi 101: Los primeros pasos en finanzas descentralizadas",
    description: "Una introducción suave pero completa a DeFi: qué es, cómo funciona, y cómo empezar sin riesgo innecesario.",
    author: "DefiVenezuela Team",
    date: "2026-05-10",
    category: "DeFi",
    readTime: "12 min",
    tags: ["DeFi", "Educación", "Blockchain", "Web3"],
    content: `
## ¿Qué es DeFi?

DeFi significa "Finanzas Descentralizadas" (Decentralized Finance).

En pocas palabras: es el sistema financiero tradicional (bancos, exchanges, préstamos), pero sin intermediarios. Construido en blockchains como Ethereum usando **smart contracts** (contratos inteligentes).

### Tradicional vs DeFi

| Aspecto | Banco Tradicional | DeFi |
|--------|-----------------|-----|
| Control | Banco controla tu dinero | Tú controlas tu dinero |
| Horario | Lunes-viernes, 8am-5pm | 24/7, sin interrupciones |
| Comisiones | 1-5% por transacción | 0.1-1% (gasolina de red) |
| Acceso | Requiere verificación KYC | Acceso abierto, sin restricciones |
| Censura | Banco puede congelar tu cuenta | Imposible (está en la blockchain) |
| Velocidad | 1-3 días hábiles | 5-20 minutos |

## Conceptos clave

### 1. **Wallets (Billeteras)**
Tu llave privada para acceder a fondos en la blockchain. Ejemplos: MetaMask, Ledger.

### 2. **Smart Contracts**
Código que ejecuta automáticamente acuerdos. Ej: "Si depositas 100 USDC, recibes 5% anual en intereses".

### 3. **Stablecoins**
Criptomonedas atadas a una moneda fiat (USD). Ejemplo: USDC = 1 USD.

### 4. **Pools de liquidez**
Donde se intercambian criptos. Contribuyes fondos, recibes comisiones de traders.

### 5. **Yield Farming**
Prestar fondos a un protocolo y ganar intereses. Ej: Uniswap, Aave, Curve.

## Casos de uso DeFi reales

### Para venezolanos:
1. **Protección contra inflación**: Guardar ahorros en USDC
2. **Remesas baratas**: Enviar dinero a familia sin comisiones
3. **Ganar intereses**: 5-20% APY en stablecoins (comparado a 0% en bancos)
4. **Trading 24/7**: Sin horarios bancarios
5. **Acceso global**: Sin restricciones de capital control

## Riesgos (importante)

DeFi es innovador pero riesgoso. Ten cuidado con:

- **Rug pulls**: Proyectos fraudulentos que cierran y se llevan el dinero
- **Smart contract bugs**: Código con vulnerabilidades
- **Volatilidad**: Criptomonedas suben/bajan 20% en horas
- **Scams**: Phishing, wallet drainers, fake sites

## Los primeros pasos (seguro)

1. **Educa primero**: Lee antes de invertir dinero real
2. **Empieza pequeño**: \$10-100, no tu ahorro de vida
3. **Usa protocolos establecidos**: Aave, Uniswap, Curve (miles de millones USD en liquidez)
4. **Guarda tus keys privadas**: Nunca las compartas
5. **Diversifica**: No todo en un protocolo

## Protocolos recomendados para empezar

### **Aave** (Préstamos)
- Deposita USDC, gana ~4% anual
- Pide prestado contra collateral
- La más grande y segura del mercado

### **Uniswap** (Exchange)
- Intercambia criptos peer-to-peer
- No hay custodia de fondos
- Comisiones mínimas (0.01-1%)

### **Curve** (Stablecoins)
- Especializada en intercambios de stablecoins
- Slippage bajo, APY decente
- Muy segura

## Roadmap de aprendizaje

1. Instala MetaMask ✓
2. Compra \$10 USDC en Coinbase/Kraken ✓
3. Prueba un swap en Uniswap (USDC → ETH) ✓
4. Deposita USDC en Aave, observa intereses ✓
5. Lee whitepapers de los protocolos ✓
6. Únete a Discord DeFi Venezuela ✓

## Conclusión

DeFi es el futuro de las finanzas, pero requiere responsabilidad. No es "free money", es una herramienta poderosa que necesita educación.

Empieza hoy con nuestro [track de Aprende DeFi](/aprende/defi-101) — completamente gratuito.

---

**Siguiente paso:** [Instala MetaMask y tu primera wallet](/aprende/wallets-seguridad)
    `,
  },
];

export function getBlogPost(slug: string): BlogPost | undefined {
  return blogPosts.find((post) => post.slug === slug);
}

export function getRelatedPosts(
  currentSlug: string,
  limit: number = 3
): BlogPost[] {
  return blogPosts
    .filter((post) => post.slug !== currentSlug)
    .slice(0, limit);
}
