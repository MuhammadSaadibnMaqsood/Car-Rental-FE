
const GOLD = "#b89753";       // Deepened slightly for crisp contrast on light backgrounds


export default function Footer() {
    return <footer className="footer" style={{ backgroundColor: "#111215", color: "#fff", paddingTop: "60px" }}>
        <div className="footer-top">
            <div className="footer-mark" style={{ color: GOLD }}>MAPLEBRIDGE</div>
            <div className="footer-links">
                <div>
                    <h4 style={{ color: GOLD }}>Services</h4>
                    <a href="#" style={{ color: "#c5c8cf" }}>Institutional Services</a>
                    <a href="#" style={{ color: "#c5c8cf" }}>Events & Delegations</a>
                    <a href="#" style={{ color: "#c5c8cf" }}>Corporate Travel</a>
                    <a href="#" style={{ color: "#c5c8cf" }}>Safety & Compliance</a>
                </div>
                <div>
                    <h4 style={{ color: GOLD }}>Cities</h4>
                    <a href="#" style={{ color: "#c5c8cf" }}>Toronto · Ottawa · Montréal</a>
                    <a href="#" style={{ color: "#c5c8cf" }}>Vancouver · Calgary · Edmonton</a>
                    <a href="#" style={{ color: "#c5c8cf" }}>Québec City · Niagara Falls · Hamilton</a>
                </div>
                <div>
                    <h4 style={{ color: GOLD }}>Contact</h4>
                    <a href="mailto:corporate@maplepont.ca" style={{ color: "#c5c8cf" }}>corporate@maplepont.ca</a>
                    <a href="tel:+18886275313" style={{ color: "#c5c8cf" }}>+1 (888) 627-5313</a>
                    <p style={{ fontSize: '11px', marginTop: '10px', color: 'rgba(255,255,255,0.4)' }}>
                        100 King St W, Suite 5600, Toronto, ON
                    </p>
                </div>
            </div>
        </div>
        <div className="footer-bottom" style={{ borderTop: "1px solid rgba(255,255,255,0.1)", color: "#8a8e95" }}>
            <span>© 2026 Maplebridge. All rights reserved. All pricing in CAD.</span>
            <span>No platforms. No aggregators. Accountable ground transportation.</span>
        </div>
    </footer>
}
