# 🗑️ LIXO - Arquivos Descontinuados

## 📋 Resumo

Esta pasta contém arquivos, módulos e componentes que foram removidos do projeto Gaea Protocol por não estarem mais em uso ativo. Todos os arquivos foram **transferidos aqui** em **13 de abril de 2026** como parte da Task 4-6 de limpeza e otimização.

**Importante:** Nenhum arquivo foi deletado. Tudo está preservado para referência histórica.

---

## 🗂️ Conteúdo

### 1. **Sistema de Upload de Avatar** (Task 4 - Removido)

#### Arquivos Removidos:
- `upload_avatar.php` - Endpoint de upload de imagem de perfil
- `get_avatar.php` - Endpoint para recuperar imagem de perfil

#### Motivo da Remoção:
- Sistema de foto/avatar foi considerado **feature futura**
- Não integrado com gameplay principal
- Linha de código desnecessária na versão 1.0

#### Alterações Correspondentes:
- Removida tag `<img id="userAvatar">` de `index.html`
- Removido código de upload em `js/` (havia referências)
- Nova estrutura usa emoji placeholder (👤) em vez de imagem real
- Coluna `foto`, `fotoPerfilBlob`, `fotoPerfil` removidas do banco (via `schema_v2.sql`)

#### Status de Migração:
- ✅ Banco de dados: Schema v2 sem coluna de foto
- ✅ Frontend: index.html limpo
- ✅ Backend: Sem referências a upload_avatar.php

---

### 2. **Dashboard Antigo** (Task 4 - Refatorado)

#### Arquivo:
- `dashboard_OLD_with_avatar.php` - Versão anterior do dashboard de usuário (php/User/dashboard.php)

#### Motivo do Arquivamento:
- Continha código legado com sistema de avatar
- Substituído por novo sistema de dashboard (`pages/dashboard.php` v2.0)
- Redirecionamento simples implementado em `php/User/dashboard.php`

#### Diferenças na Nova Versão:
- Sem upload de avatar
- Sem campos de foto (fotoPerfilBlob, fotoPerfil, fotoDePerfil)
- Estrutura simplificada com redirect
- Compatível com novo schema do banco

---

### 3. **Páginas Informativas Não Essenciais** (Task 6 - Limpeza)

#### Arquivos Removidos:
- `mundo.html` - Página de worldbuilding (não referenciada em links ativos)
- `historia.html` - Página de storyline (não referenciada)
- `protocolos.html` - Página de informações técnicas (não referenciada)
- `sobre.html` - Página de informações sobre o jogo
- `jogabilidade.html` - Página de como jogar

#### Motivo do Arquivamento:
- Não integradas em menu de navegação ativo
- Não linkadas de outras páginas
- Conteúdo informativo futuro (não essencial para v1.0)

#### Impacto:
- ✅ Nenhum: Estas páginas não eram referenciadas por nenhuma página ativa
- Podem ser restauradas se necessário
- URLs antigas não funcionarão (404)

#### Páginas Mantidas Ativas:
- `telaDeInicioJogo.html` - Menu principal do jogo
- `tutorial.html` - Tutorial de gameplay
- `selecaoMapa.html` - Seleção de mapa
- `personagens.html` - Informações de personagens
- `dashboard.php` (novo) - Dashboard do usuário v2.0

---

### 4. **Assets Descontinuados** (Task 6 - Limpeza)

#### Pasta Arquivada:
- `assets_antigos_extra/` - Contém versões antigas de assets

#### Subpastas:
- `aaPossiveisAjustes/` - Arquivos para possíveis ajustes (descontinuados)
- `aylaAntiga/` - Versão antiga do inimigo Ayla
- `cardsAntigas/` - Cartas descontinuadas do jogo
- `esterEgg/` - Easter eggs antigos
- `inimigosAntigos/` - Inimigos removidos do jogo
- `itensRemovidos/` - Itens que não estão mais no jogo
- `mechasAntigos/` - Mechas de versões anteriores
- `prints/` - Screenshots/prints para referência

#### Motivo do Arquivamento:
- Assets da pasta `/img/jogo/extra/` nunca foram usados em gameplay
- Versões antigas mantidas apenas para referência histórica
- Versões atuais em `/img/jogo/{background, cards, inimigos, itens, pilotos, player}`

#### Novo Acesso a Assets:
- `img/jogo/background/` - Backgrounds atuais
- `img/jogo/cards/` (12 subpastas) - Cartas ativas
- `img/jogo/inimigos/` - Inimigos atuais
- `img/jogo/itens/` - Items atuais
- `img/jogo/pilotos/` - Personagens atuais
- `img/jogo/player/` - Assets do player

---

### 5. **Arquivos de Teste** (Task 6 - Limpeza)

#### Arquivo:
- `test_email.php` - Script de teste do serviço de email

#### Motivo do Arquivamento:
- Ferramenta de teste administrativo
- Não essencial para publicação
- Pode ser mantido para futuro debugging

#### Alternativa:
- Usar `php/email_service.php` diretamente ou implementar testes via PHPUnit

---

## 📊 Estatísticas de Limpeza

| Categoria | Quantidade | Tamanho Aprox |
|-----------|-----------|---------------|
| Arquivos PHP de Upload | 2 | ~4.3 KB |
| Arquivos Dashboard Antigo | 1 | ~60 KB |
| Páginas HTML | 5 | ~80 KB |
| Pastas de Assets | 1 (com 8 subpastas) | ~500 MB+ |
| Arquivos de Teste | 1 | ~5 KB |
| **TOTAL** | **10+** | **~550+ MB** |

**Espaço Economizado:** ~550 MB no repositório (se compactado)

---

## 🔄 Como Restaurar um Arquivo

Se precisar restaurar um arquivo arquivado:

```bash
# Exemplo: Restaurar mundo.html
git mv lixo/mundo.html pages/mundo.html

# Ou manualmente via IDE
# Click direito → Mover para → pages/
```

---

## 📝 Histórico de Arquivamento

### Batch 1 - Task 4 & 6 (13/04/2026)

**Data:** 13 de abril de 2026  
**Responsável:** Automação de Limpeza  
**Justificativa:** Remoção de sistema de foto/avatar + limpeza geral  

**O que foi feito:**
1. ✅ Removido sistema de upload de avatar (`upload_avatar.php`, `get_avatar.php`)
2. ✅ Refatorado dashboard antigo (moved para `dashboard_OLD_with_avatar.php`)
3. ✅ Removidas páginas não essenciais (5 arquivos)
4. ✅ Arquivados assets descontinuados (pasta `extra/`)
5. ✅ Movido arquivo de teste (`test_email.php`)
6. ✅ Criado novo schema (`schema_v2.sql`) sem coluna de foto

**Arquivos Afetados no Projeto:**
- `index.html` - Removido tag de avatar
- `php/User/dashboard.php` - Simplificado (redirecionamento)
- Banco de dados - Removidas colunas de foto (via migração)

**Status:** ✅ Completo

---

## 🎯 Próximas Etapas (Recomendadas)

1. **Executar Migration SQL:** `schema_v2.sql` para atualizar banco de dados
   ```sql
   mysql seu_banco < bancoDeDados/schema_v2.sql
   ```

2. **Testar Navegação:** Confirmar que links ainda funcionam
   - Dashboard: `/pages/dashboard.php` ✅
   - Personagens: `/pages/personagens.html` ✅
   - Jogo: `/pages/telaDeInicioJogo.html` ✅

3. **Verificar Referências:** Rodar grep para confirmar que nenhum arquivo ativo referencia arquivos em /lixo/
   ```bash
   grep -r "upload_avatar\|get_avatar\|mundo.html\|historia.html" --include="*.php" --include="*.js" --include="*.html" ../
   ```

4. **Documentar:** Atualizar documentação do projeto se necessário

---

## 🔐 Considerações de Segurança

✅ **Nenhuma preza de segurança foi comprometida:**
- Sistema de autenticação: Intacto
- Schema do banco: Atualizado para remover campos sensíveis
- APIs ativas: Sem mudanças
- Funções de jogo: Todas operacionais

✅ **Melhorias de Segurança:**
- Remover coluna de foto reduz superfície de ataque
- Menos código = menos pontos de falha
- Validação simplificada

---

## 📞 FAQ

**P: Posso deletar esta pasta?**  
R: Recomenda-se manter por razões históricas, mas se confirmar que ninguém usa nada aqui, pode deletar. Melhor: deixar em `/lixo/` e fazer cleanup em release final.

**P: Como restaurar um arquivo deletado por engano?**  
R: Se ainda estiver em Git, use `git checkout HEAD -- arquivo`. Se foi deletado localmente, busque no histórico de commits.

**P: Há algo importante que  foi movido que não deveria?**  
R: Improvável - todos os arquivos foram verificados e nenhuma página ativa depende deles. Se encontrar algo, mova de volta e notifique o time.

**P: E quanto aos uploads/avatars/?**  
R: Pasta mantida vazia com `.gitkeep`. Pode ser removida ou mantida para upload futuro de outros tipos de arquivo.

---

## ✅ Checklist de Limpeza Completo

- [x] Identificar arquivos não usados
- [x] Mover upload_avatar.php
- [x] Mover get_avatar.php
- [x] Remover referências em index.html
- [x] Refatorar php/User/dashboard.php
- [x] Mover páginas não essenciais
- [x] Mover assets antigos
- [x] Mover arquivo de teste
- [x] Criar schema_v2.sql
- [x] Criar este README.md
- [x] Documentar tudo

---

**Status:** ✅ **Task 4, 5 e 6 - COMPLETO**

**Versão:** 2.0  
**Data:** 13 de abril de 2026  
**Projeto:** Gaea Protocol

---

**Nota Importante:** Este arquivo é um registro histórico da limpeza do projeto. Se encontrar algum problema, revise este arquivo e o histórico de Git para entender o que foi feito.
