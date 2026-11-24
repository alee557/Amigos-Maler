import PropertyVisualizer from "./PropertyVisualizer";

export default function HomeBeforeProjects() {
  return (
    <>

    <section className="ai-section show" id="property-visualizer">
        <div className="ai-container">
            <div className="ai-top">
                <div className="ai-heading">
                    <span className="section-tag">PROPERTY VISUALIZER</span>
                    <h2>Visualize Your Property <span>Before You Paint.</span></h2>
                </div>
                <div className="ai-side">
                    <p>Upload a photo, select a wall and explore paint colours, wallpapers and finishes before making a decision.</p>
                </div>
            </div>
            <PropertyVisualizer />
        </div>
    </section>

    {/*7115*/}
    <section className="why-amigos">
        <div className="why-container">
            <div className="why-content reveal">
                <span className="section-tag">Why Amigos?</span>
                <h2>Craftsmanship. Trust. Property Preservation.</h2>
                <p>From individual painting work to complete renovations, we personally support owners and property managers with transparency and reliability.</p>
                <a href="/about" className="why-btn">GET TO KNOW AMIGOS</a>
            </div>
            <div className="why-project-image reveal">
                <img
                    src="/assets/home/why-amigos-project.webp"
                    alt="Amigos Maler project vehicle outside a completed building"
                    loading="lazy"
                    decoding="async"
                />
            </div>
            <div className="stats-column">
                <div className="stat reveal">
                    <h3 className="counter" data-target="500">500</h3>
                    <span>Completed Projects</span>
                </div>
                <div className="stat reveal">
                    <h3 className="counter" data-target="100">100</h3>
                    <span>Satisfied Clients</span>
                </div>
                <div className="stat reveal">
                    <h3 className="counter" data-target="10">10</h3>
                    <span>Years Experience</span>
                </div>
                <div className="stat reveal">
                    <h3 className="counter" data-target="6000">6000</h3>
                    <span>m² of Completed Surfaces</span>
                </div>
            </div>
        </div>
    </section>


    </>
  );
}
