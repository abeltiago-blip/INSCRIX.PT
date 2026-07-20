## Objetivo

Recriar todo o schema da base de dados do projeto (tabelas, funções, triggers, políticas RLS, buckets de storage) no novo Cloud, aplicando as 92 migrações históricas em `supabase/migrations/`. Sem migração de dados (opção 1 escolhida).

## Estado atual

- `public` tem 0 tabelas (Cloud vazio).
- Existem 92 ficheiros SQL em `supabase/migrations/`, ordenados por timestamp.
- `src/integrations/supabase/types.ts` foi regenerado vazio, causando erros de build.

## Passos

1. **Concatenar** os 92 ficheiros por ordem cronológica num único bloco SQL.
2. **Executar via migration tool** num único migration (com `IF NOT EXISTS` / `DROP ... IF EXISTS` já presentes na maioria; adicionar tolerância `DO $$ BEGIN ... EXCEPTION WHEN OTHERS THEN NULL; END $$` só se necessário para statements idempotentes problemáticos).
3. **Não** re-executar seeds/INSERTs de dados históricos (ex.: eliminações de eventos específicos por UUID). Vou filtrar ou manter apenas os DDL — os `DELETE`/`INSERT` de dados serão retirados pois referem-se a IDs que já não existem.
4. Após aprovação e execução, o `types.ts` regenera-se e o build passa a compilar.
5. **Storage**: verificar que os buckets `event-images` e `event-documents` são recriados pelas migrações; caso contrário, adicionar no fim.
6. **Verificação pós-migração**: correr `supabase--linter` e corrigir avisos de segurança relevantes (RLS em falta, `search_path` em funções).

## Fora do âmbito

- Migração de dados (eventos, utilizadores, inscrições, pagamentos). O Cloud arrancará vazio; utilizadores terão de se registar novamente e organizadores recriar eventos.
- Reconfiguração de secrets externos (EasyPay, Resend, Google Maps) — já estão no novo projeto.

## Riscos

- Alguma migração antiga pode referenciar objectos que outra posterior remove; se o concat falhar, divido em blocos e reaplico em ordem.
- Funções/triggers em `auth` schema não são permitidos — se existirem, serão retirados.

Confirma para eu avançar com a construção e submissão da migração consolidada.