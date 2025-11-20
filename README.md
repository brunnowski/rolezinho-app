Rolezinho
=========

Rolezinho é um aplicativo web mobile-first que transforma fotos em mapas interativos, criando rotas automáticas a partir dos dados de GPS (EXIF) das imagens. Você pode organizar um rolê, visualizar o percurso, salvar no Supabase e compartilhar com outras pessoas via link único.

----------------------------------------
FUNCIONALIDADES
----------------------------------------

UPLOAD DE FOTOS
- Envie várias fotos
- Apenas fotos são aceitas (vídeos ignorados)
- GPS é extraído automaticamente (EXIF)
- Miniaturas comprimidas em tempo real
- Upload para Supabase Storage

MAPA INTERATIVO
- Marcadores gerados automaticamente
- Popups com thumbnails e navegação entre imagens
- Rota gerada via OSRM
- Fallback quando rota não existe
- Auto-focus quando há apenas 1 waypoint
- Centralização inteligente com header compartilhado

PERFIS COM SUPABASE AUTH
- Login com Google
- Login com Apple
- Magic Link por email
- Perfil criado automaticamente
- Atualização de foto de perfil
- Lista de rolês criados

MODELO DE DADOS SUPABASE
- profiles
- roles
- waypoints
- thumbnails (bucket)

Compartilhamento
- Cada rolê recebe UUID
- Link compartilhável:  https://site.com/?role=UUID
- Visitantes podem abrir sem login
- Modo compartilhado com header especial


----------------------------------------
TECNOLOGIAS
----------------------------------------

- HTML + CSS + JS vanilla
- Leaflet (mapas)
- OSRM (rotas)
- Supabase (Auth, DB, Storage)
- exifr.js (EXIF GPS)
- FileSaver


----------------------------------------
DEPLOY NO GITHUB PAGES
----------------------------------------

1. Criar repositório
2. Adicionar index.html e README.txt
3. Ir em Settings > Pages
4. Selecionar:
   - Branch: main
   - Pasta: root
5. Acessar URL pública


----------------------------------------
SEGURANÇA
----------------------------------------

- RLS configurado no Supabase
- Policies para leitura e escrita segura
- Acesso de visitantes limitado ao UUID compartilhado
- requireAuth() protege upload e salvamento
- Uploads apenas autenticados


----------------------------------------
ROADMAP FUTURO
----------------------------------------

- PWA (versão instalável)
- Editor de título estilizado
- Ordenação manual de waypoints
- Explorar rolês públicos
- Cluster em uploads grandes
- Animações avançadas no mapa


----------------------------------------
AUTOR
----------------------------------------

Desenvolvido por Brunno Rossetti
Com assistência do ChatGPT


----------------------------------------
LICENÇA
----------------------------------------

MIT — livre para uso e modificação.
