import Link from "next/link";
import { Montserrat, Dancing_Script } from "next/font/google";
import DynamicViewer from '@/src/components/DynamicViewer';
import { CLASSIC_THEME } from '@/src/components/viewerTheme';
import { Faculty, TourData } from '@/src/types/MarzipanoTypes';

const montserrat = Montserrat({
    subsets: ["latin"],
    weight: ["400", "500", "600", "700", "800"],
    variable: "--font-montserrat",
    display: "swap",
});

const dancingScript = Dancing_Script({
    subsets: ["latin"],
    weight: ["600", "700"],
    variable: "--font-dancing-script",
    display: "swap",
});

// Original brick-style walkthrough used by every tour (styles in walkthrough-classic.css)
export default function ClassicWalkthrough({ faculty, tourData }: { faculty: Faculty, tourData: TourData }) {
    return (
        <div className={`wt-classic ${montserrat.variable} ${dancingScript.variable}`}>
            <div className="walkthrough-page">
                <header>
                    <div className="brand">
                        <img src="/assets/logos/uni-30-anos.png" alt="Logo UNI 30 años" className="crest" />
                        <div className="brand-text">
                            <h1>UNIVERSIDAD NACIONAL DE ITAPÚA</h1>
                            <p>Líder en innovación y excelencia</p>
                        </div>
                    </div>

                    <nav className="mainnav" aria-label="Navegación principal">
                        {/* Full page load (not <Link>) so the campus tour always restarts from its first scene,
                            even when already inside it: a soft navigation to the same route keeps the viewer state */}
                        {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
                        <a href="/walkthrough/uni" className="navlink">
                            <img src="/assets/home.svg" alt="Inicio" />
                            <span>INICIO</span>
                        </a>
                        <Link href="/#facultades" className="navlink">
                            <img src="/assets/info.svg" alt="Información" />
                            <span>INFORMACIÓN</span>
                        </Link>
                    </nav>

                    <div className="tagline script">30 años construyendo educación, ciencia y<br />compromiso con la sociedad</div>
                </header>

                <DynamicViewer faculty={faculty} tourData={tourData} theme={CLASSIC_THEME} />

                <footer>
                    <div className="foot-left">
                        <div className="foot-item">
                            <img src="/assets/location.svg" alt="Ubicación" />
                            <span>Encarnación, Itapúa - Paraguay</span>
                        </div>
                        <div className="foot-item">
                            <img src="/assets/globe.svg" alt="Sitio web" />
                            <span>www.uni.edu.py</span>
                        </div>
                    </div>

                    <div className="foot-social" aria-label="Redes sociales">
                        <a href="https://www.facebook.com/uni.itapua" target="_blank" rel="noopener noreferrer" aria-label="Facebook"><img src="/assets/facebook.svg" alt="Facebook" /></a>
                        <a href="https://www.instagram.com/uni.itapua/" target="_blank" rel="noopener noreferrer" aria-label="Instagram"><img src="/assets/instagram.svg" alt="Instagram" /></a>
                        <a href="https://x.com/uni_itapua" target="_blank" rel="noopener noreferrer" aria-label="X / Twitter"><img src="/assets/x-twitter.svg" alt="X / Twitter" /></a>
                        <a href="https://www.youtube.com/@uni.itapua" target="_blank" rel="noopener noreferrer" aria-label="YouTube"><img src="/assets/youtube.svg" alt="YouTube" /></a>
                    </div>

                    <div className="foot-right">
                        <span className="line"></span>
                        <span className="script script-text">Construyendo tu futuro</span>
                    </div>
                </footer>
            </div>
        </div>
    );
}
