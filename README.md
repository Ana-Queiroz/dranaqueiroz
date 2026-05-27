# Dra. Ana Carolina Queiroz — Site Institucional

Site institucional da **Dra. Ana Carolina Queiroz**, médica pediatra em Petrópolis e Rio de Janeiro. Layout editorial com estilo magazine, desenvolvido em HTML, CSS e JavaScript puro.

---

## Sobre o projeto

Site one-page de apresentação profissional voltado para famílias que buscam pediatria humanizada. O design prioriza acolhimento visual, tipografia expressiva e conversão via WhatsApp.

**Profissional:** Dra. Ana Carolina Queiroz  
**Especialidade:** Pediatria  
**CRM-RJ:** 1216252 · **RQE:** 60445  

**Petrópolis, RJ**  
Endereço: R. Prof. Stroeller, 428 — Casarão 13  
Contato: (24) 98844-0005  

**Rio de Janeiro, RJ**  
Endereço: Largo do Machado, 39 — 4º andar, Sala 08  
Contato: (24) 98833-2023  

**Instagram:** [@dranaqueirozped](https://instagram.com/dranaqueirozped)

---

## Estrutura de arquivos

```
Medica_Ana/
├── index.html
├── assets/
│   ├── bebe-nuvem.png       # Ilustração hero
│   ├── foto-dra-ana.jpeg    # Foto da médica (seção Sobre)
│   └── icons/
│       └── icone.png        # Favicon / apple-touch-icon
├── css/
│   ├── styles.css           # Entry point — importa todos os módulos
│   ├── base.css             # Reset, variáveis, tipografia global
│   ├── header.css           # Navbar e menu mobile
│   ├── footer.css           # Rodapé
│   ├── responsive.css       # Media queries gerais
│   └── sections/            # Um arquivo por seção
├── js/
│   └── script.js            # Interatividade (tabs, accordion, scroll reveal)
└── dist/                    # Build/output (se aplicável)
```

---

## Seções do site

| # | Seção | Descrição |
|---|-------|-----------|
| 1 | **Hero** | Apresentação editorial com blobs decorativos e CTA WhatsApp |
| 2 | **Sobre** | Foto + biografia com dropcap |
| 3 | **Formação** | Timeline vertical (graduação, especialização, atuação atual) |
| 4 | **Abordagem** | Manifesto em full-bleed com destaques coloridos |
| 5 | **Áreas** | Tabs interativas com 5 áreas de atuação |
| 6 | **Diferenciais** | Lista editorial com 6 diferenciais do atendimento |
| 7 | **FAQ** | Accordion com 5 perguntas frequentes |
| 8 | **Missão** | Split-screen diagonal para/missão |
| 9 | **Agendamento** | CTA com marquee animado |
| 10 | **Contato** | Links diretos para WhatsApp, Instagram e endereço |

---

## Tecnologias

- **HTML5** semântico com Schema.org (tipo `Physician`) e Open Graph
- **CSS3** modular — variáveis, animações, grid e flexbox
- **JavaScript** vanilla — tabs, accordion (`<details>`), scroll reveal, marquee
- **Fontes** (Google Fonts): Playfair Display · DM Sans · Space Mono
- **Acessibilidade:** skip link, `aria-label`, `role="tab"`, `aria-expanded`

---

## Como rodar localmente

Não há dependências ou build necessário. Basta abrir o arquivo diretamente:

```bash
# Opção 1 — abrir direto no navegador
start index.html

# Opção 2 — servidor local (recomendado para evitar CORS)
npx serve .
# ou
python -m http.server 8080
```

---

## Paleta de cores

| Variável | Cor |
|----------|-----|
| Azul escuro (primária) | `#1A2472` |
| Rosa | `#F9A8D4` / `#EC4899` |
| Amarelo | `#FEF3C7` / `#FBBF24` |
| Teal | `#A5F3FC` / `#22D3EE` |
| Texto escuro | `#1E293B` |

---

## Desenvolvido por

**Gabriela Fernandes Teixeira** — Desenvolvedora Web Freelancer  
gfteixeira99@gmail.com · (24) 99224-2013
