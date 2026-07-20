
# Revisão Completa do Site — Plano

Contexto: após a ativação do Lovable Cloud, o schema foi restaurado mas a base de dados arranca vazia. O build TypeScript está limpo. A auditoria da BD mostra 10 avisos de segurança (políticas RLS permissivas + funções SECURITY DEFINER expostas). Vou fazer a revisão em 3 fases, aplicando correções ao longo do caminho.

## Fase 1 — Segurança & BD (crítica, primeiro)

1. **Auditar as 26 tabelas** e confirmar que todas têm RLS ativo + policies coerentes + GRANTs corretos.
2. **Corrigir os 10 warnings do linter Supabase**:
   - 2× "RLS Policy Always True" em UPDATE/DELETE/INSERT → substituir por policies scoped a `auth.uid()` / `has_role()`.
   - 4× funções SECURITY DEFINER executáveis por `anon` → `REVOKE EXECUTE FROM anon, public`.
   - 4× funções SECURITY DEFINER executáveis por `authenticated` sem necessidade → revogar ou converter para SECURITY INVOKER.
3. **Verificar tabela `user_roles`** (roles têm de estar separadas do `profiles`, com função `has_role` SECURITY DEFINER). Se estiver misturado, migrar.
4. **Confirmar policy de INSERT em `orders`** (foi corrigida antes da migração — reaplicar se em falta).
5. **Storage buckets** `event-images` e `event-documents` — confirmar existência + policies de upload/leitura.
6. **Configurar auth**: ativar HIBP (leaked passwords), garantir que auto-confirm não está ligado, adicionar Google OAuth se pretendido.

## Fase 2 — Revisão Funcional (fluxos end-to-end)

Auditar cada fluxo com Playwright + leitura de código, corrigindo tudo o que quebrar:

- **Auth**: Register / Login / PasswordReset / ConfirmEmail — criar utilizador teste e completar sign-up.
- **Criação de evento** (`/create-event`) — organizador cria, com upload de imagem, documento, coordenadas, bilhetes com escalões + idade + género.
- **Edição de evento** — via `/edit-event/:id` (organizador) e `/admin/event/:id/edit` (admin).
- **Aprovação de eventos** (`AdminEventApprovals`) — pending → approved e verificar aparição em Home/Categorias.
- **Homepage** — Hero + Próximos Eventos + Categorias (real-time updates).
- **Checkout** — carrinho, dados de faturação (Particular / Consumidor Final / Empresa), voucher, submissão da order.
- **Inscrição de participantes** — validações CC/NIF por país, idade, género.
- **Emails** — templates, envio via Resend/SMTP, logs (`AdminEmailCenter`, `AdminEmailTest`).
- **QR codes / check-in** — geração e leitura.
- **Dashboards** — Participante, Organizador (estatísticas, exportações), Admin.
- **Teams** — criar equipa, adicionar membros.

Cada bug encontrado é corrigido no momento; erros grandes recebem correção isolada.

## Fase 3 — Design & UX / Acessibilidade

- **Responsividade mobile** em todas as páginas principais (Home, EventDetail, Checkout, Dashboards, Admin).
- **Consistência visual**: eliminar cores hardcoded (`text-white`, `bg-black`, hex arbitrário) — tudo passa por tokens semânticos do `index.css`.
- **Acessibilidade**:
  - `aria-label` em botões só de ícone.
  - Alt text em imagens.
  - Um `<main>` por rota.
  - `h-dvh` em vez de `h-screen`.
  - Contraste WCAG AA em toda a app.
- **Header/Footer** — navegação coerente, links funcionais.
- **Estados vazios** — placeholders úteis (não "undefined" ou lista vazia sem contexto).
- **Loading / error states** — skeletons + toasts consistentes.

## Entregáveis

- Relatório resumido no fim de cada fase com o que foi corrigido e o que ficou por resolver (com justificação, se aplicável).
- Todas as correções críticas e importantes aplicadas.
- Lista final de melhorias opcionais/nice-to-have para tu decidires depois.

## Notas técnicas

- Não vou tocar em `src/integrations/supabase/client.ts`, `types.ts`, `.env` nem `supabase/config.toml` (auto-gerados).
- Migrações SQL passarão pelo fluxo de aprovação normal (uma de cada vez).
- A revisão funcional exige uma conta de teste — vou criar uma via Playwright ou pedir credenciais se necessário.
- Como a BD está vazia, para testar fluxos que dependem de eventos existentes vou criar dados de teste (que podes eliminar depois) ou pedir-te para publicares um evento real primeiro.

Ordem de execução: **Fase 1 → Fase 2 → Fase 3**. Podes interromper a qualquer momento se preferires focar noutra coisa.
