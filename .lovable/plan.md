
# Plano — Funcional primeiro, depois UX/Design

## Fase A — Validação funcional ponta-a-ponta

Testar cada fluxo com Playwright contra `http://localhost:8080`, capturar screenshots, ler console + network, e corrigir bugs encontrados em cada etapa antes de passar à seguinte.

1. **Auth**
   - Registo participante, organizador e equipa.
   - Login / logout / reset de password.
   - Verificar entrega de email (fila `auth_emails`, `email_send_log`).
   - Confirmar `AUTH_HOOK_SECRET` no webhook Supabase; se em falta, avisar-te para configurares.

2. **Criação e aprovação de evento**
   - Organizador cria evento em `/create-event` com imagem, documento (regulamento), coordenadas GPS, bilhetes com escalões / idade / género.
   - Admin aprova em `/admin/event-approvals`.
   - Confirmar aparecimento em Home (hero + próximos) e `/categorias`.

3. **Edição de evento**
   - Organizador via `/edit-event/:id`.
   - Admin via `/admin/event/:id/edit` (6 abas).

4. **Inscrição + checkout**
   - Adicionar bilhete ao carrinho, preencher dados de participante (validação CC/NIF, idade, género).
   - Checkout com os 3 modos de faturação (Particular, Consumidor Final, Empresa) e voucher.
   - Submissão da order (RLS INSERT) e criação do pagamento EasyPay.
   - Webhook EasyPay: teste em modo simulado com `EASYPAY_WEBHOOK_SECRET`.

5. **Emails transacionais**
   - Confirmação de inscrição, confirmação de pagamento, entrega de bilhete, lembretes.
   - `AdminEmailTest` e `AdminEmailCenter`.

6. **QR / Check-in**
   - Geração QR do evento e do bilhete.
   - `process-checkin` com utilizador autenticado (admin/organizador).

7. **Dashboards**
   - Participante (`/participant-dashboard`), Organizador (`/organizer-dashboard`), Admin (`/admin`).
   - Exportações e estatísticas.

8. **Teams**
   - Criar equipa, adicionar membros, associar inscrições.

Ao fim da Fase A: relatório curto com o que passou, o que foi corrigido, e o que precisa de ação tua (secrets, dados de teste, configurações externas).

## Fase B — Revisão UX / Design / Acessibilidade

Só arranca depois da Fase A estar verde (ou com bloqueios identificados).

- **Responsividade mobile** em Home, EventDetail, Checkout, Dashboards, Admin.
- **Tokens semânticos**: eliminar `text-white`, `bg-black`, hex arbitrários — passar tudo por `index.css`.
- **Acessibilidade**: `aria-label` em icon-buttons, alt text, um `<main>` por rota, `h-dvh`, contraste WCAG AA.
- **Header/Footer**: navegação coerente, links funcionais.
- **Estados vazios / loading / error**: skeletons + toasts consistentes.

## Notas

- Sem alterações a `client.ts`, `types.ts`, `.env`, `supabase/config.toml`.
- Dados de teste criados durante a Fase A serão listados para eliminares no fim.
- Se um fluxo depender de credenciais externas (EasyPay sandbox, SMTP), paro e peço-te.
- Bugs pequenos: corrijo no momento. Bugs grandes: paro, mostro-te o diagnóstico antes de corrigir.

Ordem: **Fase A → Fase B**.
