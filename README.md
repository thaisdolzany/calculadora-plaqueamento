# calculadora-plaqueamento
Calculadora de plaqueamento celular · Cell seeding calculator for plates and flasks.
# Calculadora de Plaqueamento Celular · Cell Seeding Calculator

> 🇧🇷 Português · 🇬🇧 English below

Ferramenta de bancada em página única (HTML, sem dependências) que calcula o
volume de suspensão de células e de meio de cultura necessário para semear
placas e garrafas a partir de uma suspensão já contada.

**Acesse:** `https://thaisdolzany.github.io/calculadora-plaqueamento/`

![Status](https://img.shields.io/badge/status-online-brightgreen)
![Sem dependências](https://img.shields.io/badge/depend%C3%AAncias-nenhuma-blue)

---

## 🇧🇷 Português

### O que faz

A partir da concentração da sua suspensão (células/mL), do vaso escolhido e do
alvo de plaqueamento, a calculadora monta a receita de uma única suspensão de
trabalho (*master mix*) e informa:

- volume de suspensão de células a pipetar;
- volume de meio de cultura a adicionar;
- volume total, total de células, densidade final e fator de diluição.

### Como usar

1. Escolha o tipo de vaso (placa de 6 a 384 poços, Petri ou garrafa T). A área
   e o volume de trabalho típicos são preenchidos e podem ser ajustados.
2. Informe quantos poços/garrafas vai semear e a sobra de segurança (%).
3. Defina o alvo por células por poço **ou** por densidade (células/cm²).
4. Informe a concentração da suspensão contada (aceita notação científica, ex.: `1e6`).

A calculadora avisa quando a suspensão está diluída demais para o alvo e quando
o volume a pipetar é pequeno demais para precisão.

### Observação importante

As áreas de crescimento e os volumes de trabalho variam entre fabricantes. Os
valores pré-carregados são os mais comuns (Corning/Thermo) e servem como ponto
de partida. **Confira sempre o catálogo da sua marca e o seu protocolo.** A
ferramenta é uma conferência de bancada, não substitui validação experimental.

---

## 🇬🇧 English

### What it does

From your counted cell suspension (cells/mL), the chosen vessel, and the seeding
target, the calculator builds a single working suspension (master mix) and
reports the volume of cell suspension and culture medium to combine, plus total
volume, total cells, final density, and dilution factor.

### How to use

1. Pick the vessel (6 to 384-well plates, Petri dishes, or T-flasks). Typical
   growth area and working volume are pre-filled and editable.
2. Enter how many wells/flasks to seed and a safety overage (%).
3. Set the target by cells per well **or** by density (cells/cm²).
4. Enter the concentration of your counted suspension (scientific notation
   accepted, e.g. `1e6`).

The tool warns when the suspension is too dilute for the target and when the
volume to pipette is too small for accuracy.

### Important note

Growth areas and working volumes vary by manufacturer. Pre-loaded values are
common references (Corning/Thermo) and are a starting point only. **Always check
your brand's catalogue and your own protocol.** This is a bench-side check, not
a substitute for experimental validation.

---

## Tecnologia · Tech

Página estática única (`index.html`), HTML + CSS + JavaScript puro, sem
bibliotecas externas. Funciona offline e em qualquer hospedagem estática.

## Licença · License

MIT.

**Autora · Author:** Thaís Dolzany de Oliveira, PhD
