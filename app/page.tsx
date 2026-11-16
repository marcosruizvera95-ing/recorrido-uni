import Link from "next/link";
import {
  ArrowRight,
  Building2,
  Globe,
  MapPin,
  Move3D,
  Phone,
} from "lucide-react";

const faculties = [
  {
    name: "Universidad Nacional de Itapúa",
    category: "Campus",
    description: "Explora los alrededores de la universidad.",
    slug: "uni",
    logo: "/assets/logos/uni-30-anos.png",
  },
  {
    name: "Facultad de Derecho",
    category: "Derecho",
    description:
      "Conoce las instalaciones y espacios académicos de la Facultad de Derecho.",
    slug: "derecho",
    logo: "/assets/logos/derecho.png",
  },
  {
    name: "Facultad de Ciencias y Tecnologías",
    category: "CyT",
    description:
      "Conoce las instalaciones y espacios académicos de la Facultad de Ciencias y Tecnologías.",
    slug: "cyt",
    logo: "/assets/logos/cyt.png",
  },
  {
    name: "Facultad de Humanidades",
    category: "Humanidades",
    description:
      "Conoce las instalaciones y espacios académicos de la Facultad de Humanidades.",
    slug: "humanidades",
    logo: "/assets/logos/humanidades.png",
  },
  {
    name: "Facultad de Ingeniería",
    category: "Ingeniería",
    description:
      "Explora laboratorios, aulas y espacios de la Facultad de Ingeniería.",
    slug: "ingenieria",
    logo: "/assets/logos/ingenieria.png",
  },
  {
    name: "Facultad de Ciencias Económicas y Administrativas",
    category: "FACEA",
    description:
      "Recorre virtualmente los espacios de la Facultad de Ciencias Económicas y Administrativas.",
    slug: "facea",
    logo: "/assets/logos/facea.png",
  },
  {
    name: "Facultad de Medicina",
    category: "Medicina",
    description:
      "Recorre virtualmente los espacios de la Facultad de Medicina.",
    slug: "medicina",
    logo: "/assets/logos/medicina.png",
  },
];

const stats = [
  { value: "28", label: "Escenas 360°" },
  { value: "7", label: "Facultades" },
  { value: "100%", label: "Online" },
  { value: "24/7", label: "Disponible" },
];

const steps = [
  {
    number: "01",
    title: "Elige una facultad",
    text: "Selecciona el edificio que quieres conocer.",
    icon: Building2,
  },
  {
    number: "02",
    title: "Navega en 360°",
    text: "Mueve la vista y explora cada espacio de manera interactiva.",
    icon: Move3D,
  },
  {
    number: "03",
    title: "Descubre el campus",
    text: "Utiliza los puntos de navegación para desplazarte entre espacios.",
    icon: MapPin,
  },
];

const navLinks = [
  { label: "Facultades", href: "#facultades" },
  { label: "Cómo funciona", href: "#como-funciona" },
];

const socials = [
  { label: "Facebook", href: "https://www.facebook.com/uni.itapua", icon: "/assets/facebook.svg" },
  { label: "Instagram", href: "https://www.instagram.com/uni.itapua/", icon: "/assets/instagram.svg" },
  { label: "X / Twitter", href: "https://x.com/uni_itapua", icon: "/assets/x-twitter.svg" },
  { label: "YouTube", href: "https://www.youtube.com/@uni.itapua", icon: "/assets/youtube.svg" },
];

const primaryButton =
  "inline-flex items-center justify-center gap-2.5 bg-uni-orange px-6 py-3 font-heading text-sm font-medium text-white transition hover:bg-uni-orange-dark";

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-4">
      <h2 className="text-3xl font-bold tracking-tight sm:text-[34px]">
        {children}
      </h2>
      <span className="h-0.5 w-11 bg-uni-orange" aria-hidden />
    </div>
  );
}

export default function Home() {
  return (
    <main className="relative min-h-screen overflow-x-hidden bg-white">
      {/* Hero con navegación superpuesta, como en uni.edu.py */}
      <section className="relative isolate flex min-h-[88vh] flex-col bg-uni-ink">
        <div
          className="absolute inset-0 -z-10 bg-cover bg-center"
          style={{ backgroundImage: "url('/assets/hero-campus.jpg')" }}
          aria-hidden
        />
        <div className="absolute inset-0 -z-10 bg-black/55" aria-hidden />

        <nav className="relative z-20">
          <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-6 py-5 lg:px-8">
            <Link href="/" className="flex items-center gap-3">
              <img src="/assets/logos/uni-30-anos.png" alt="Logo UNI 30 años" className="h-16 w-16 object-contain" />
              <span className="hidden font-heading text-sm font-medium leading-tight text-white sm:block">
                Universidad Nacional
                <br />
                de Itapúa
              </span>
            </Link>

            <div className="flex items-center gap-8">
              <ul className="hidden items-center gap-8 md:flex">
                {navLinks.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="font-heading text-[13px] font-medium text-white transition hover:text-uni-orange-light"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
              <a
                href="https://uni.edu.py/"
                className="bg-white px-3 py-1.5 font-heading text-xs font-medium text-uni-orange transition hover:bg-uni-orange hover:text-white"
              >
                uni.edu.py
              </a>
            </div>
          </div>
        </nav>

        <div className="mx-auto flex w-full max-w-7xl flex-1 flex-col justify-center px-6 pb-24 pt-10 lg:px-8">
          <p className="font-heading text-lg font-light text-white/75 sm:text-xl">
            Universidad Nacional de Itapúa
          </p>
          <h1 className="mt-3 max-w-3xl text-5xl font-light leading-[1.1] text-white sm:text-6xl lg:text-7xl">
            Recorrido Virtual 360°
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-white/80">
            Recorre virtualmente nuestras facultades, descubre sus
            instalaciones y conoce cada espacio mediante una experiencia
            inmersiva en 360°.
          </p>
          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <Link href="/walkthrough/uni" className={`group ${primaryButton}`}>
              Comenzar recorrido
              <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
            </Link>
            <Link
              href="#como-funciona"
              className="inline-flex items-center justify-center gap-2.5 border border-white px-6 py-3 font-heading text-sm font-medium text-white transition hover:bg-white hover:text-uni-ink"
            >
              ¿Cómo funciona?
            </Link>
          </div>
        </div>
      </section>

      {/* Franja naranja de contadores */}
      <section className="uni-lines-light bg-uni-orange">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-y-8 px-6 py-10 sm:grid-cols-4 lg:px-8">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="font-heading text-4xl font-bold text-white">
                {stat.value}
              </p>
              <p className="mt-2 font-heading text-sm font-semibold tracking-wider text-white">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Facultades */}
      <section id="facultades" className="uni-lines px-6 py-20 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-10 flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
            <SectionTitle>Facultades</SectionTitle>
            <Link href="#como-funciona" className={`group self-start sm:self-auto ${primaryButton}`}>
              Más información
              <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
            </Link>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {faculties.map((faculty) => (
              <Link
                key={faculty.slug}
                href={`/walkthrough/${faculty.slug}`}
                className="group flex flex-col overflow-hidden rounded-sm border-t-[3px] border-uni-orange bg-white shadow-[0_0_20px_rgba(0,0,0,0.10)] transition hover:-translate-y-1 hover:shadow-[0_8px_30px_rgba(0,0,0,0.16)]"
              >
                <div className="relative flex h-36 items-center justify-center bg-white px-6 pt-6">
                  <img
                    src={faculty.logo}
                    alt={`Logo ${faculty.name}`}
                    loading="lazy"
                    className="h-28 w-28 object-contain transition duration-500 group-hover:scale-105"
                  />
                  <span className="absolute right-3 top-3 rounded-full bg-uni-orange px-2.5 py-0.5 font-heading text-[10px] font-medium uppercase text-white">
                    {faculty.category}
                  </span>
                </div>

                <div className="flex flex-1 flex-col px-5 pb-5 pt-4 text-center">
                  <h3 className="text-sm font-semibold leading-snug">
                    {faculty.name}
                  </h3>
                  <p className="mt-2 flex-1 text-[13px] leading-5">
                    {faculty.description}
                  </p>
                  <span className="mt-4 font-heading text-[11px] font-medium uppercase text-uni-orange">
                    Explorar recorrido »
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Cómo funciona */}
      <section id="como-funciona" className="px-6 pb-20 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-10">
            <SectionTitle>Cómo funciona</SectionTitle>
          </div>

          <div className="grid gap-7 md:grid-cols-3">
            {steps.map((step) => {
              const Icon = step.icon;
              return (
                <div
                  key={step.number}
                  className="rounded-sm bg-white p-7 shadow-[0_0_20px_rgba(0,0,0,0.12)]"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex h-12 w-12 items-center justify-center bg-uni-orange text-white">
                      <Icon className="h-6 w-6" />
                    </div>
                    <span className="font-heading text-sm font-semibold text-uni-orange-light">
                      {step.number}
                    </span>
                  </div>
                  <h3 className="mt-6 text-lg font-semibold">{step.title}</h3>
                  <p className="mt-2 text-sm leading-6">{step.text}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Banda oscura con foto, como "Ofertas Académicas" */}
      <section className="relative isolate bg-uni-ink">
        <div
          className="absolute inset-0 -z-10 bg-cover bg-center"
          style={{ backgroundImage: "url('/assets/hero-campus.jpg')" }}
          aria-hidden
        />
        <div className="absolute inset-0 -z-10 bg-black/75" aria-hidden />
        <div className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
          <h2 className="max-w-2xl text-4xl font-light text-white sm:text-5xl">
            Conoce tu próximo espacio universitario
          </h2>
          <p className="mt-4 max-w-xl text-white/75">
            Empieza a explorar nuestras facultades y descubre el campus antes
            de visitarlo.
          </p>
          <Link href="#facultades" className={`group mt-8 ${primaryButton}`}>
            Explorar facultades
            <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
          </Link>
        </div>
      </section>

      {/* Footer oscuro, como el del sitio oficial */}
      <footer className="relative isolate bg-uni-ink text-sm text-white/75">
        <div
          className="absolute inset-0 -z-10 bg-cover bg-bottom opacity-15"
          style={{ backgroundImage: "url('/assets/hero-campus.jpg')" }}
          aria-hidden
        />
        <div className="mx-auto grid max-w-7xl gap-10 px-6 py-14 sm:grid-cols-2 lg:grid-cols-3 lg:px-8">
          <div>
            <img src="/assets/logos/uni-30-anos.png" alt="Logo UNI 30 años" className="h-20 w-20 object-contain" />
            <p className="mt-4 max-w-xs leading-6">
              Recorrido virtual 360° por las facultades de la Universidad
              Nacional de Itapúa.
            </p>
          </div>

          <div>
            <h3 className="text-base font-semibold text-white">Contacto</h3>
            <ul className="mt-4 space-y-3">
              <li className="flex gap-3">
                <Phone className="mt-0.5 h-4 w-4 flex-none text-uni-orange" />
                +595 986 668 545
              </li>
              <li className="flex gap-3">
                <MapPin className="mt-0.5 h-4 w-4 flex-none text-uni-orange" />
                <span>
                  Abg. Lorenzo Zacarías López 255 y Ruta PY01, Km. 2,5
                  <br />
                  Encarnación - Itapúa
                </span>
              </li>
              <li className="flex gap-3">
                <Globe className="mt-0.5 h-4 w-4 flex-none text-uni-orange" />
                <a href="https://uni.edu.py/" className="transition hover:text-uni-orange-light">
                  www.uni.edu.py
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-base font-semibold text-white">Síguenos</h3>
            <div className="mt-4 flex gap-3">
              {socials.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex h-9 w-9 items-center justify-center rounded-full bg-white transition hover:bg-uni-orange"
                >
                  <img
                    src={social.icon}
                    alt=""
                    className="h-4 w-4 invert transition group-hover:invert-0"
                  />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="border-t border-white/15">
          <p className="mx-auto max-w-7xl px-6 py-5 text-xs lg:px-8">
            © 2026 Universidad Nacional de Itapúa. Todos los derechos reservados.
          </p>
        </div>
      </footer>
    </main>
  );
}
