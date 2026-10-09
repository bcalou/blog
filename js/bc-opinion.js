class BcOpinion extends HTMLElement {
  static observedAttributes = [
    "initial-opinion",
    "ellipse-a-from",
    "ellipse-a-to",
    "ellipse-b-from",
    "ellipse-b-to",
  ];

  connectedCallback() {
    this.alt = this.innerHTML;
    this.attachShadow({ mode: "open" });
    this.shadowRoot.innerHTML = `
      <style>
        .container {
          font-family: Euclid;
          margin-block: ${this.getAttribute("ellipse-a-from") ? "6em" : "4em 5em"};
          margin-inline: ${this.getAttribute("ellipse-a-from") ? "11.5%" : ""};
          position: relative;
        }

        .line {
          width: 100%;
          height: 0.25rem;
          background: linear-gradient(
            to right,
            transparent 1rem,
            var(--blue-darker) 1rem,
            var(--blue-darker) calc(100% - 1rem),
            transparent
          );

          &::after,
          &::before {
            content: '';
            display: block;
            width: 0;
            height: 0;
            border-style: solid;
            border-width: 0.5rem 1rem 0.5rem 0px;
            border-color: transparent var(--blue-darker) transparent transparent;
            position: absolute;
            bottom: calc(-0.5rem + 0.125rem);
            z-index: -1;
          }

          &::before {
            left: 0;
          }

          &::after {
            right: 0;
            transform: rotate(180deg);
          }
        }

        .legend {
          position: absolute;
          font-size: 0.8em;
        }

        .legend--negative {
          left: 0;
        }

        .legend--positive {
          right: 0;
        }

        .point {
          background-color: var(--red-light);
          width: 1rem;
          height: 1rem;
          border-radius: 50%;
          position: absolute;
          bottom: calc(-0.5rem + 0.125rem);
          left: calc(${this.getAttribute("initial-opinion")}%);
        }

        .ellipse {
          position: absolute;
          height: 6em;
          top: calc(-3em + 0.125rem);
          border-radius: 50%;
          z-index: -1;
        }

        .ellipse--a {
          background-color: color-mix(var(--red-light), transparent);
          border: 1px dashed var(--red-light);
          left: ${this.getAttribute("ellipse-a-from")}%;
          right: calc(100% - ${this.getAttribute("ellipse-a-to")}%);
        }

        .ellipse--b {
          background-color: color-mix(var(--green-dark), transparent);
          border: 1px dashed var(--green-dark);
          left: ${this.getAttribute("ellipse-b-from")}%;
          right: calc(100% - ${this.getAttribute("ellipse-b-to")}%);
        }

        .ellipse__label {
          text-align: center;
        }

        .ellipse--a .ellipse__label {
          color: var(--red-dark);
        }

        .ellipse--b .ellipse__label {
          color: var(--green-dark);
        }
      </style>

      <div role="img" aria-label="${this.alt}">
        <div class="container">
          ${
            this.getAttribute("ellipse-a-from") &&
            this.getAttribute("ellipse-a-to")
              ? `<div class="ellipse ellipse--a"><div class="ellipse__label">A</div></div>`
              : ""
          }
          ${
            this.getAttribute("ellipse-b-from") &&
            this.getAttribute("ellipse-b-to")
              ? `<div class="ellipse ellipse--b"><div class="ellipse__label">B</div></div>`
              : ""
          }
          <div class="line"></div>
          <p class="legend legend--negative">Avis négatif</p>
          <p class="legend legend--positive">Avis positif</p>
          ${this.getAttribute("initial-opinion") ? `<div class="point"></div>` : ""}
        </div>
      </div>
    `;
  }
}

customElements.define("bc-opinion", BcOpinion);
