# Cell seeding calculator · Calculadora de plaqueamento celular

Single-page bench tool (HTML and plain JavaScript, no dependencies) that works out how
much counted cell suspension and how much medium to mix to seed plates, dishes and flasks.

Open it at **https://thaisdolzany.github.io/calculadora-plaqueamento/**. It also works
offline: download `index.html` and open it in a browser.

*Versão em português abaixo.*

## What it does

You choose the vessel (6- to 384-well plates, Petri dishes or T-flasks), the number of
wells, a safety overage, the target (cells per well or cells/cm²) and the concentration of
your counted suspension. The calculator returns a single master-mix recipe: the volume of
suspension to pipette, the volume of medium to add, the total volume and number of cells,
the final density and the dilution factor.

It warns when the suspension is too dilute to reach the target (instead of returning a
negative medium volume) and when the volume to pipette is below 5 µL. Each invalid field
gets its own message.

## How the numbers are calculated

With N wells, overage o (%), working volume W (mL) and area A (cm²) per well, target T
cells per well (or density D cells/cm², so T = D × A) and stock concentration S (cells/mL):

| Quantity | Formula |
|---|---|
| Wells including overage | N' = N × (1 + o/100) |
| Total volume of the mix | V = W × N' |
| Cells needed | C = T × N' |
| Suspension to pipette | C / S |
| Medium to add | V − C / S |
| Dilution factor | S / (T / W) |
| Final density | T / A |

Numbers can be typed as `5000`, `0,32`, `0.1` or `1e6`. Inputs grouped by thousands, such
as `100.000`, are rejected on purpose: in Portuguese they mean one hundred thousand, in
English one hundred, and a wrong guess would change the seeding by a factor of 1,000.

Growth areas and working volumes vary by manufacturer. The presets are common values
(Corning and Thermo catalogues) and are only a starting point: check your plate's datasheet
and your own protocol.

## Tests

```bash
node --test
```

The tests load the calculation functions straight from `index.html` and check a 96-well
example against a hand calculation, the density mode, the too-dilute warning, the number
parser (decimal comma, scientific notation, rejected inputs) and the range checks for every
field.

---

## Em português

Ferramenta de bancada em página única (HTML e JavaScript, sem dependências) que calcula
quanto da suspensão de células já contada e quanto de meio misturar para semear placas,
placas de Petri e garrafas.

Acesse em **https://thaisdolzany.github.io/calculadora-plaqueamento/** ou baixe o
`index.html` e abra no navegador, que funciona sem internet.

Você escolhe o vaso, o número de poços, a sobra de segurança, o alvo (células por poço ou
células/cm²) e a concentração da suspensão. A calculadora monta uma única suspensão de
trabalho e informa o volume de suspensão a pipetar, o volume de meio, o volume total, o
total de células, a densidade final e o fator de diluição. Ela avisa quando a suspensão
está diluída demais para o alvo e quando o volume a pipetar fica abaixo de 5 µL, e indica
qual campo está fora do esperado.

Os números podem ser digitados como `5000`, `0,32`, `0.1` ou `1e6`. Valores com ponto de
milhar, como `100.000`, são recusados de propósito, porque podem ser lidos como cem mil ou
como cem. As fórmulas estão na tabela acima.

As áreas e os volumes variam entre fabricantes. Os valores pré-carregados são referências
comuns (Corning e Thermo): confira o catálogo da sua placa e o seu protocolo.

## License · Licença

MIT. Thaís Dolzany de Oliveira, PhD.
