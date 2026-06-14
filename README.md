# Weather App

Aplicação web para consulta de clima em tempo real com histórico de buscas salvo em banco de dados na nuvem.

## Stack

- **Frontend:** HTML, CSS, JavaScript (vanilla)
- **API de Clima:** [wttr.in](https://wttr.in)
- **Banco de Dados:** Supabase (PostgreSQL na nuvem)

## Funcionalidades

- Busca de clima por cidade (temperatura, umidade, vento, descrição)
- Previsão dos próximos 3 dias
- Histórico de buscas salvo no banco de dados
- Visualização dos dados climáticos de buscas anteriores

## Como rodar localmente

1. Clone o repositório:
   ```
   git clone https://github.com/hbaylo/weather-app.git
   cd weather-app
   ```

2. Crie um projeto gratuito em [supabase.com](https://supabase.com) e obtenha a URL e a anon key

3. Crie o arquivo `supabase-config.js` na raiz do projeto:
   ```js
   const SUPABASE_URL = "https://SEU_PROJETO.supabase.co";
   const SUPABASE_ANON_KEY = "SUA_CHAVE_ANON_AQUI";
   ```

4. No SQL Editor do Supabase, execute o conteúdo de `supabase-schema.sql`

5. Abra o `index.html` no navegador

## Publicação

https://hbaylo.github.io/weather-app/

## Integrantes

- Fernando Roque França
- Henrique Baylo Cordeiro
