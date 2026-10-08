import { useRef, useState, type CSSProperties, type PointerEvent } from "react"

const assetPath = "/assets"

const fireflies = [
  [8, 78, 0.4, 9.8],
  [18, 82, 2.2, 10.8],
  [31, 72, 4.1, 9.9],
  [42, 88, 1.1, 11.3],
  [55, 74, 3.6, 9.6],
  [66, 84, 5.5, 10.9],
  [74, 69, 1.8, 9.2],
  [83, 79, 4.7, 11.1],
  [91, 74, 2.9, 10.2],
] as const

const cardDetails = {
  aerospace: "Flight systems, concepts & research",
  design: "Interfaces, identities & visual stories",
} as const

type CardName = keyof typeof cardDetails

export default function App() {
  const heroRef = useRef<HTMLElement>(null)
  const [activeCard, setActiveCard] = useState<CardName | null>(null)

  function handlePointerMove(event: PointerEvent<HTMLElement>) {
    const hero = heroRef.current
    if (!hero) return

    const bounds = hero.getBoundingClientRect()
    const x = (event.clientX - bounds.left) / bounds.width
    const y = (event.clientY - bounds.top) / bounds.height
    const xOffset = x - 0.5
    const yOffset = y - 0.5
    const offsets = {
      "--sky-x": `${xOffset * -8}px`,
      "--sky-y": `${yOffset * -5}px`,
      "--cloud-left-x": `${xOffset * 19}px`,
      "--cloud-left-y": `${yOffset * 12}px`,
      "--cloud-right-x": `${xOffset * -24}px`,
      "--cloud-right-y": `${yOffset * -14}px`,
      "--land-x": `${xOffset * -14}px`,
      "--land-y": `${yOffset * -8}px`,
      "--plane-x": `${xOffset * 38}px`,
      "--plane-y": `${yOffset * 24}px`,
    }

    Object.entries(offsets).forEach(([property, value]) => {
      hero.style.setProperty(property, value)
    })
    hero.style.setProperty("--pointer-x", `${event.clientX - bounds.left}px`)
    hero.style.setProperty("--pointer-y", `${event.clientY - bounds.top}px`)
  }

  function resetParallax() {
    const hero = heroRef.current
    if (!hero) return
    ;[
      "--sky-x",
      "--sky-y",
      "--cloud-left-x",
      "--cloud-left-y",
      "--cloud-right-x",
      "--cloud-right-y",
      "--land-x",
      "--land-y",
      "--plane-x",
      "--plane-y",
    ].forEach((property) => hero.style.setProperty(property, "0px"))
  }

  return (
    <main>
      <section
        ref={heroRef}
        className="hero"
        id="home"
        onPointerMove={handlePointerMove}
        onPointerLeave={resetParallax}
      >
        <div className="scene" aria-hidden="true">
          <img
            className="scene__layer scene__sky"
            src={`${assetPath}/cf4fb.png`}
            alt=""
          />
          <img
            className="scene__layer scene__clouds scene__clouds--left"
            src={`${assetPath}/cbb4d.png`}
            alt=""
          />
          <img
            className="scene__layer scene__clouds scene__clouds--right"
            src={`${assetPath}/84fcd.png`}
            alt=""
          />
          <div className="scene__wash" />
          <img className="scene__plane" src={`${assetPath}/1dcb6.png`} alt="" />
          <div className="cursor-glow" />
        </div>

        <div className="fireflies" aria-hidden="true">
          {fireflies.map(([left, top, delay, duration], index) => (
            <span
              className="firefly"
              key={`${left}-${top}`}
              style={
                {
                  "--left": `${left}%`,
                  "--top": `${top}%`,
                  "--delay": `${delay}s`,
                  "--duration": `${duration}s`,
                  "--drift-out": `${index % 2 === 0 ? 22 : -22}px`,
                  "--drift-back": `${index % 2 === 0 ? -13 : 13}px`,
                  "--drift-low": `${index % 2 === 0 ? 16 : -16}px`,
                } as CSSProperties
              }
            >
              <img
                src={`${assetPath}/${
                  index % 3 === 0 ? "fe347.svg" : "cd999.svg"
                }`}
                alt=""
              />
            </span>
          ))}
        </div>

        <img
          className="landscape-overlay"
          src={`${assetPath}/92c8f.png`}
          alt=""
          aria-hidden="true"
        />

        <nav className="nav" aria-label="Primary navigation">
          <div className="nav__group">
            <a className="nav__link nav__link--active" href="#home">
              Home
            </a>
            <a className="nav__link" href="#about">
              About
            </a>
            <a className="nav__link" href="#works">
              Works
            </a>
          </div>
          <a className="contact-button" href="#about">
            Contact Me
          </a>
        </nav>

        <div className="hero__content">
          <header className="name">
            <p className="name__hello">Hello, I'm</p>
            <h1>Roshan Giri</h1>
            <p className="name__role">Aerospace Engineering Student</p>
          </header>

          <div className="cards" id="works">
            <article className="about-card" id="about">
              <p>
                ...an Aerospace Engineering student who moonlights in design,
                interest in everything at once, might just be allergic to free
                time, although always on internet....
              </p>
            </article>

            {(["aerospace", "design"] as const).map((card) => (
              <button
                className={`stat-card${
                  activeCard === card ? " is-active" : ""
                }`}
                key={card}
                type="button"
                aria-pressed={activeCard === card}
                onClick={() =>
                  setActiveCard((current) => (current === card ? null : card))
                }
              >
                <span className="stat-card__count">00+</span>
                <span className="stat-card__label">
                  {card === "aerospace"
                    ? "Aerospace Projects"
                    : "Design Projects"}
                </span>
                <span className="stat-card__detail">{cardDetails[card]}</span>
              </button>
            ))}
          </div>
        </div>

        <p className="interaction-hint">Move to explore · Select a project</p>
      </section>
    </main>
  )
}
