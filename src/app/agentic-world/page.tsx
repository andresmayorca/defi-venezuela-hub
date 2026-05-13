import Link from "next/link";
import { ArrowRight, ChevronRight, Bot, Zap, Code, DollarSign, Cpu, Globe, Mail } from "lucide-react";
import Button from "@/components/ui/Button";

const useCases = [
  {
    icon: "🤖",
    title: "Trading Bots DeFi",
    description: "Agentes que monitorean pools de liquidez, ejecutan estrategias de yield farming y gestionan riesgo de forma autónoma.",
    difficulty: "Avanzado",
    tools: ["Claude API", "Web3.js", "Uniswap SDK"],
  },
  {
    icon: "🔍",
    title: "Research Agents",
    description: "IA que analiza whitepapers, revisa contratos inteligentes y genera reportes de due diligence sobre proyectos crypto.",
    difficulty: "Intermedio",
    tools: ["Claude API", "Perplexity", "CoinGecko API"],
  },
  {
    icon: "💬",
    title: "Chatbots Web3",
    description: "Asistentes inteligentes para tu proyecto DeFi que responden preguntas, guían usuarios y explican transacciones.",
    difficulty: "Principiante",
    tools: ["Claude API", "Next.js", "Vercel AI SDK"],
  },
  {
    icon: "📊",
    title: "Analytics con IA",
    description: "Dashboards inteligentes que interpretan datos on-chain y generan insights accionables automáticamente.",
    difficulty: "Intermedio",
    tools: ["Claude API", "The Graph", "Dune Analytics"],
  },
  {
    icon: "🔔",
    title: "Agentes de Alertas",
    description: "Monitoreo continuo de wallets, protocolos y mercados. Notificaciones inteligentes cuando importa.",
    difficulty: "Principiante",
    tools: ["Claude API", "Telegram Bot", "Etherscan API"],
  },
  {
    icon: "💼",
    title: "Automatización de Negocios",
    description: "Agentes que procesan pagos en crypto, emiten facturas, gestionan nóminas y reportan automáticamente.",
    difficulty: "Avanzado",
    tools: ["Claude API", "n8n", "Circle API"],
  },
];

const learningPath = [
  { step: "01", title: "Fundamentos de IA", desc: "¿Qué son los LLMs, cómo funcionan los agentes, qué puedes buildear." },
  { step: "02", title: "APIs de IA", desc: "Claude API, OpenAI API. Cómo hacer tu primer llamado, manejo de contexto." },
  { step: "03", title: "Herramientas y funciones", desc: "Darle superpoderes a tu agente: búsqueda web, ejecución de código, APIs externas." },
  { step: "04", title: "Agentes con memoria", desc: "Agentes que recuerdan contexto, aprenden de interacciones y mejoran con el tiempo." },
  { step: "05", title: "IA + Blockchain", desc: "Conectar agentes con wallets, protocolos DeFi y datos on-chain." },
  { step: "06", title: "Monetización", desc: "Cómo vender acceso a tus agentes, suscripciones, APIs propias." },
];

const newsletterTopics = [
  { emoji: "🧠", title: "LLMs y modelos", desc: "Novedades de Claude, GPT, Gemini y los modelos open source que deberías conocer." },
  { emoji: "🤖", title: "Agentes autónomos", desc: "Casos reales de agentes en producción, frameworks y patrones de arquitectura." },
  { emoji: "⛓️", title: "IA + Blockchain", desc: "La intersección entre inteligencia artificial y protocolos descentralizados." },
  { emoji: "🛠️", title: "Herramientas y stacks", desc: "Las mejores herramientas para construir agentes hoy: LangChain, n8n, Vercel AI SDK." },
  { emoji: "💡", title: "Casos de uso venezolanos", desc: "Cómo el venezolano puede usar IA agéntica para generar ingresos reales." },
  { emoji: "📈", title: "Tendencias del mercado", desc: "Qué está pasando en el ecosistema de IA y hacia dónde va en los próximos meses." },
];

const difficultyColors: Record<string, string> = {
  Principiante: "text-[#9DA5B4] bg-[#9DA5B4]/8 border border-[#9DA5B4]/15",
  Intermedio: "text-[#00FF88] bg-[#00FF88]/15 border border-[#00FF88]/20",
  Avanzado: "text-[#F0F1F5] bg-[#00FF88]/20 border border-[#00FF88]/30",
};

export default function AgenticWorldPage() {
  return (
    <div className="min-h-screen">
      {/* Header */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 border-b border-white/5 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#00FF88]/8 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#161B24]/30 rounded-full blur-3xl" />
        </div>
        <div className="relative max-w-7xl mx-auto">
          <div className="flex items-center gap-2 text-sm text-[#9DA5B4]/50 mb-6">
            <Link href="/" className="hover:text-[#00FF88] transition-colors">Inicio</Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-[#9DA5B4]">Agentic World</span>
          </div>

          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#00FF88]/30 bg-[#00FF88]/10 text-[#00FF88] text-sm font-medium mb-6">
              <Bot className="w-4 h-4" />
              La frontera de IA + Blockchain
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[#F0F1F5] mb-6 leading-tight">
              Agentic World
              <span className="block text-[#00FF88]">Venezuela</span>
            </h1>
            <p className="text-xl text-[#9DA5B4]/70 leading-relaxed mb-8">
              El único espacio en Venezuela dedicado a la intersección de Agentes de IA y Web3.
              Aprende a construir, deployar y monetizar agentes inteligentes en la economía descentralizada.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button variant="primary" size="lg" asChild>
                <Link href="/aprende/agentes-ia" className="flex items-center gap-2">
                  Empezar track gratuito <ArrowRight className="w-5 h-5" />
                </Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link href="#newsletter">Suscribirse al newsletter</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Por qué ahora */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
            {[
              { icon: Cpu, title: "Los agentes llegaron para quedarse", desc: "2025 es el año en que los agentes de IA pasan de demo a producción. Quien aprenda ahora lidera." },
              { icon: DollarSign, title: "Nueva economía de ingresos", desc: "Puedes cobrar en USDC por agentes que trabajan 24/7. Sin jefe, sin horario, sin fronteras." },
              { icon: Globe, title: "Venezuela tiene ventaja", desc: "La necesidad crea innovación. El venezolano tiene el contexto para buildear soluciones que el mundo necesita." },
            ].map((item) => (
              <div key={item.title} className="p-6 rounded-2xl border border-white/5 bg-[#161B24]">
                <div className="w-10 h-10 rounded-xl bg-[#00FF88]/10 flex items-center justify-center mb-4">
                  <item.icon className="w-5 h-5 text-[#00FF88]" />
                </div>
                <h3 className="font-bold text-[#F0F1F5] mb-2">{item.title}</h3>
                <p className="text-[#9DA5B4]/60 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Casos de uso */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-[#161B24]/30">
        <div className="max-w-7xl mx-auto">
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-[#F0F1F5] mb-4">¿Qué puedes construir?</h2>
            <p className="text-[#9DA5B4]/70 max-w-2xl">
              Desde automatizaciones simples hasta sistemas complejos de agentes. Ideas concretas para construir con IA + blockchain.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {useCases.map((uc) => (
              <div
                key={uc.title}
                className="p-6 rounded-2xl border border-white/5 bg-[#0D1117] hover:border-[#00FF88]/20 transition-all group"
              >
                <div className="text-3xl mb-4">{uc.icon}</div>
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-bold text-[#F0F1F5]">{uc.title}</h3>
                  <span className={`text-xs px-2 py-1 rounded-full ${difficultyColors[uc.difficulty]}`}>
                    {uc.difficulty}
                  </span>
                </div>
                <p className="text-[#9DA5B4]/60 text-sm leading-relaxed mb-4">{uc.description}</p>
                <div className="flex flex-wrap gap-2">
                  {uc.tools.map((tool) => (
                    <span key={tool} className="text-xs px-2 py-1 rounded bg-[#00FF88]/10 text-[#9DA5B4]/60 font-mono">
                      {tool}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Ruta de aprendizaje */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-[#F0F1F5] mb-4">La ruta de aprendizaje</h2>
            <p className="text-[#9DA5B4]/70">De cero a agentes en producción. 6 fases progresivas.</p>
          </div>

          <div className="relative">
            <div className="absolute left-8 top-0 bottom-0 w-px bg-[#00FF88]/20 hidden sm:block" />
            <div className="flex flex-col gap-6">
              {learningPath.map((item) => (
                <div key={item.step} className="flex gap-6 items-start">
                  <div className="relative flex-shrink-0 w-16 h-16 rounded-2xl bg-[#00FF88]/10 border border-[#00FF88]/20 flex items-center justify-center z-10">
                    <span className="text-[#00FF88] font-bold text-sm">{item.step}</span>
                  </div>
                  <div className="flex-1 pt-3">
                    <h3 className="font-bold text-[#F0F1F5] mb-1">{item.title}</h3>
                    <p className="text-[#9DA5B4]/60 text-sm">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-12 text-center">
            <Button variant="primary" size="lg" asChild>
              <Link href="/aprende/agentes-ia" className="flex items-center gap-2 justify-center">
                <Code className="w-5 h-5" />
                Comenzar el track gratuito
                <ArrowRight className="w-5 h-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Newsletter de Agentes IA */}
      <section id="newsletter" className="py-16 px-4 sm:px-6 lg:px-8 bg-[#161B24]/30">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#00FF88]/30 bg-[#00FF88]/10 text-[#00FF88] text-sm font-medium mb-6">
              <Mail className="w-4 h-4" />
              Newsletter de Agentic World
            </div>
            <h2 className="text-3xl font-bold text-[#F0F1F5] mb-4">
              Mantente al día en IA agéntica
            </h2>
            <p className="text-[#9DA5B4]/70 text-lg max-w-2xl mx-auto">
              Cada semana: novedades en LLMs, agentes autónomos, IA + blockchain y casos de uso
              concretos para builders venezolanos.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-10">
            {newsletterTopics.map((topic) => (
              <div key={topic.title} className="p-4 rounded-xl border border-white/5 bg-[#0D1117]">
                <div className="text-2xl mb-2">{topic.emoji}</div>
                <h3 className="font-semibold text-[#F0F1F5] text-sm mb-1">{topic.title}</h3>
                <p className="text-[#9DA5B4]/50 text-xs leading-relaxed">{topic.desc}</p>
              </div>
            ))}
          </div>

          <div className="rounded-2xl border border-[#00FF88]/20 bg-[#0D1117] p-8">
            <div className="flex flex-col sm:flex-row gap-4 max-w-xl mx-auto">
              <input
                type="email"
                placeholder="tu@email.com"
                className="flex-1 px-4 py-3 rounded-xl bg-[#161B24] border border-white/10 text-[#F0F1F5] placeholder-[#9DA5B4]/30 focus:outline-none focus:border-[#00FF88]/50 text-sm"
              />
              <Button variant="primary" asChild>
                <Link href="/newsletter" className="flex items-center gap-2 whitespace-nowrap">
                  Suscribirse <ArrowRight className="w-4 h-4" />
                </Link>
              </Button>
            </div>
            <p className="text-center text-[#9DA5B4]/30 text-xs mt-4">
              Sin spam. Un correo por semana. Cancela cuando quieras.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
