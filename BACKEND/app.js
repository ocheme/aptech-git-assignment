const { useState, useEffect } = React;

function Header() {
  return (
    <header className="header" role="banner" aria-label="Site header">
      <div className="logo">Fullstack Class</div>
      <nav className="nav-links" aria-label="Main navigation">
        <a href="#">Home</a>
        <a href="#">About</a>
        <a href="#">Schedule</a>
        <a href="#">Contact</a>
      </nav>
    </header>
  );
}

function Carousel({ slides, interval = 3500 }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const t = setInterval(() => {
      setIndex(i => (i + 1) % slides.length);
    }, interval);
    return () => clearInterval(t);
  }, [slides.length, interval]);

  return (
    <div>
      <div className="carousel" role="region" aria-roledescription="carousel" aria-label="Fullstack class slides">
        {slides.map((s, i) => (
          <div key={i} className={`slide ${i === index ? "active" : ""}`} aria-hidden={i === index ? "false" : "true"}>
            <img src={s.img} alt={s.title} />
            <div className="caption">
              <h2 style={{margin:'8px 0 4px'}}>{s.title}</h2>
              <p style={{margin:0}}>{s.caption}</p>
            </div>
          </div>
        ))}

        <div className="controls" aria-hidden="true">
          <div style={{display:'flex', alignItems:'center'}}>
            <button className="btn" onClick={() => setIndex((index - 1 + slides.length) % slides.length)}>Prev</button>
            <button className="btn" onClick={() => setIndex((index + 1) % slides.length)}>Next</button>
          </div>
        </div>
      </div>

      <div className="indicators" role="tablist" aria-label="Slide indicators">
        {slides.map((_, i) => (
          <button
            key={i}
            aria-label={`Goto slide ${i + 1}`}
            title={`Slide ${i + 1}`}
            onClick={() => setIndex(i)}
            style={{ background: i === index ? "#333" : "#ddd" }}
          />
        ))}
      </div>
    </div>
  );
}

function App() {
  const slides = [
    { title: "Fullstack Class — Intro", img: "https://via.placeholder.com/1000x350?text=Fullstack+Class+1", caption: "Welcome — brief orientation and goals." },
    { title: "Fullstack Class — Curriculum", img: "https://via.placeholder.com/1000x350?text=Fullstack+Class+2", caption: "Languages, frameworks & hands-on projects." },
    { title: "Fullstack Class — Graduation", img: "https://via.placeholder.com/1000x350?text=Fullstack+Class+3", caption: "Showcase & certificates." }
  ];

  return (
    <div>
      <Header />
      <main>
        <div style={{maxWidth:'1000px', margin:'20px auto', padding:'0 12px'}}>
          <h1>Welcome to the Fullstack Class</h1>
          <p className="meta">A simple demo index page: top menu + carousel showcasing the class sessions.</p>

          <Carousel slides={slides} interval={4000} />

          <section style={{marginTop:20}}>
            <h3>About this demo</h3>
            <p className="meta">This is a lightweight React demo (no build). To run locally, start a simple static server in the BACKEND folder.</p>
          </section>
        </div>
      </main>
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
