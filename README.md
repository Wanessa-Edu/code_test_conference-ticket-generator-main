# Conference Ticket Generator
---
## Processo de desenvolvimento
Eu tenho experiência avançada em desenvolvimento web e cheguei a fazer uma grande parte do bootcamp da **Dr. Angela Yu** (*The Complete Full-Stack Web Development Bootcamp*).
Porém, em 2023 o curso passou por uma grande remodelação e acabei perdendo todo o meu progresso (que já passava dos 50%). A frustração na época me fez desanimar e afastar do desenvolvimento web por um tempo.
 porém, com as melhores das minhas habilidades me propus ao desafio e senti um impacto significamente satisfatório nas minhas habilidades já enferrujadas de **HTML, CSS e JavaScript**.
 Sem mais delongas, aqui está o processo de construção do projeto...
---
## Como executar

1. Clone este repositório.
2. Abra a pasta do projeto.
3. Execute o arquivo `index.html` no navegador.

Também é possível usar a extensão Live Server no VS Code.

### 1. Estrutura inicial do HTML

No caso comecei montando o HTML básico.
* **`aria-hidden="true"`**: Utilizado em elementos decorativos (como ícones) para que os leitores de tela os ignorem, evitando poluição sonora para usuários que usam leitores de tela.
* **`aria-label="..."`**: Fornece uma descrição legível para o leitor de tela em elementos visuais que não possuem texto explícito.
![Construindo o HTML](<Screenshot 2026-09-13 151457.png>)


### 2. Acessibilidade
**Opção pelo Idioma:** Optei por manter toda a estrutura do site em **Inglês**. Como sou bilíngue, fez sentido manter o conteúdo original do desafio sem alterar o design ou o sentido das frases.


### 3. Organização visual com CSS
![montando uma estrutura](image.png)
Com o HTML pronto, passei para a organização da estrutura e montagem da lógica visual do projeto.

## Desenvolvimento do CSS

Depois de finalizar a estrutura HTML, comecei a estilização da página por partes,
seguindo a organização visual do protótipo.

#### Configuração da fonte

Primeiro, carreguei a fonte Inconsolata utilizando `@font-face`. Assim, a fonte
pôde ser aplicada em toda a página por meio da propriedade `font-family`.

```css
@font-face {
  font-family: "Inconsolata";
  src: url("./assets/fonts/Inconsolata-Regular.ttf") format("truetype");
}
```

Depois, apliquei essa fonte no `body`, garantindo que os textos da página
seguissem a mesma identidade visual.

#### Organização das cores

Criei variáveis dentro de `:root` para guardar as cores utilizadas no projeto.
Separei tons neutros para o fundo, textos e bordas, além de tons alaranjados
para o botão, os destaques e as mensagens de erro. Assim, uma cor pode ser
alterada em um único lugar.

#### Construção do fundo

Utilizei várias imagens na propriedade `background` para combinar a textura
principal com as linhas decorativas do protótipo. Também utilizei os pseudo-
elementos `body::before` e `body::after` para criar círculos decorativos sem
adicionar novos elementos ao HTML.

#### Organização do formulário

A classe `.page-shell` controla a largura máxima, o espaçamento e o alinhamento
geral da página. Já a classe `.ticket-form` limita a largura do formulário e o
mantém centralizado com `margin: 0 auto`.

Nos campos, utilizei bordas arredondadas, fundos semitransparentes e espaçamento
interno para aproximar o resultado visual do protótipo.

#### Estados de interação

Adicionei os estados `:hover`, `:focus` e `:focus-visible` para indicar quando
um campo ou botão está sendo utilizado. O foco também melhora a acessibilidade
para quem navega utilizando o teclado.

Na área de upload, `.is-dragging` altera o fundo quando uma imagem é arrastada
sobre o campo, enquanto `.has-error` modifica a borda dos campos com erro.

#### Tipografia e responsividade

Utilizei `rem` em grande parte dos espaçamentos e tamanhos de fonte. Também
utilizei porcentagens, `vw` e `clamp()` quando era necessário adaptar o layout
ao tamanho da tela.

No título principal, `clamp()` define um tamanho mínimo, um tamanho flexível e
um tamanho máximo:

```css
font-size: clamp(2.6rem, 5vw, 4rem);
```

![preview da estrutura](image-1.png)

[![Beta-Test](https://youtube.com)](https://youtube.com/LE9mEsbndLg)
Fazendo testes, como não tinha JavaScrypt não tinha retorno do servidor então é apenas um demostrativo, fiz testes apenas para validação visual do fluxo.

### 4. Ajustes de responsividade e alinhamento

![tex-align](image-2.png)
* **Unidades relativas**: Utilizei `rem`, porcentagens, `vw` e `clamp()` de acordo com a necessidade de cada elemento, garantindo uma adaptação melhor a diferentes telas.
* **Centralização**: Utilizei `text-align: center` e alinhamentos de Grid e Flexbox para posicionar o conteúdo conforme o protótipo do desafio.


[![Bunitim](https://youtube.com)](https://youtube.com/cv0PwazFVPc)
O projeto já está tomando forma e ficando com o visual certinho!
