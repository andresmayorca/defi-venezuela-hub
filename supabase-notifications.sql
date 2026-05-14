-- ========================================
-- TABLAS PARA EL SISTEMA DE NOTIFICACIONES
--
-- IMPORTANTE: Ejecutar supabase-schema.sql PRIMERO
-- Este archivo agrega columnas y nuevas tablas
-- ========================================

-- ─── Agregar columna notify_newsletter a subscribers ───────────────────────
ALTER TABLE subscribers ADD COLUMN IF NOT EXISTS notify_newsletter BOOLEAN DEFAULT true;

-- ─── Newsletter Issues (Publicados) ─────────────────────────────────────────
CREATE TABLE IF NOT EXISTS newsletter_issues (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  issue_number INT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  content_html TEXT NOT NULL,
  sent_at TIMESTAMP WITH TIME ZONE,
  sent_to INT DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE newsletter_issues ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can read newsletter issues" ON newsletter_issues FOR SELECT USING (true);
CREATE POLICY "Service role full access" ON newsletter_issues USING (true) WITH CHECK (true);

-- ─── Newsletter Drafts (Borradores) ─────────────────────────────────────────
CREATE TABLE IF NOT EXISTS newsletter_drafts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  content_html TEXT NOT NULL,
  generated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  approved_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  approved_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE newsletter_drafts ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Service role full access" ON newsletter_drafts USING (true) WITH CHECK (true);

-- ─── Notification History (Historial) ───────────────────────────────────────
CREATE TABLE IF NOT EXISTS notification_history (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  section TEXT NOT NULL,
  title TEXT NOT NULL,
  url TEXT,
  recipients_count INT DEFAULT 0,
  sent_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_by UUID REFERENCES auth.users(id) ON DELETE SET NULL
);

ALTER TABLE notification_history ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Service role full access" ON notification_history USING (true) WITH CHECK (true);

-- ─── Índices para Performance ───────────────────────────────────────────────
CREATE INDEX IF NOT EXISTS idx_newsletter_issues_sent_at ON newsletter_issues(sent_at);
CREATE INDEX IF NOT EXISTS idx_newsletter_issues_number ON newsletter_issues(issue_number);
CREATE INDEX IF NOT EXISTS idx_notification_history_section ON notification_history(section);
CREATE INDEX IF NOT EXISTS idx_notification_history_sent_at ON notification_history(sent_at);
