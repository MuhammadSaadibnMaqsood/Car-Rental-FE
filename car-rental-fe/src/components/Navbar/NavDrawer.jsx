export default function NavDrawer({ open, setOpen }) {
    const links = [
        "Institutional Services",
        "Coverage Area",
        "Events & Delegations",
        "Safety & Compliance",
        "Corporate Transportation"
    ];
    return (
        <>
            <button className="nav-toggle light" onClick={() => setOpen(!open)} aria-label="menu">
                <span className={`bar ${open ? "open" : ""}`} />
                <span className={`bar ${open ? "open" : ""}`} />
                <span className={`bar ${open ? "open" : ""}`} />
            </button>



            <div className={`nav-drawer light ${open ? "active" : ""}`}>
                <div className="nav-drawer-inner">
                    <div className="nav-mark">MAPLEBRIDGE</div>
                    <ul>
                        {links.map((l, i) => (
                            <li key={l} style={{ transitionDelay: `${i * 60}ms` }}>
                                <a href="#" onClick={() => setOpen(false)}>
                                    {l}
                                </a>
                            </li>
                        ))}
                    </ul>
                    <div className="nav-foot">
                        <p>Toronto — Ottawa — Montréal — Vancouver — Calgary</p>
                        <p>+1 (888) 627-5313</p>
                    </div>
                </div>
            </div>
        </>
    );
}
