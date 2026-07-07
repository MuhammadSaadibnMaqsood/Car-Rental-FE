import { Link } from "react-router-dom";

export default function NavDrawer({ open, setOpen }) {
    const links = [
        { label: "Institutional Services", path: "/institutional-services" },
        { label: "Coverage Area", path: "/coverage-area" },
        { label: "Events & Delegations", path: "/events-delegations" },
        { label: "Safety & Compliance", path: "/safety-compliance" },
        { label: "Corporate Transportation", path: "/corporate-transportation" },
        { label: "About Us", path: "/about-us" },
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
                        {links.map((link, i) => (
                            <li key={link.path} style={{ transitionDelay: `${i * 60}ms` }}>
                                <Link to={link.path} onClick={() => setOpen(false)}>
                                    {link.label}
                                </Link>
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
