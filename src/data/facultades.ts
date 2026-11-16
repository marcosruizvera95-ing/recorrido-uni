export type FacultadItem = {
    name: string;
    logo: string;
    link: string;
};

// Faculties without an official logo yet use the UNI logo
const UNI_LOGO = '/assets/logos/uni-30-anos.png';

// Editar aqui: nombre, logo y link de cada bolita
export const FACULTADES: FacultadItem[] = [
    { name: 'UNI', logo: UNI_LOGO, link: '/walkthrough/uni' },
    { name: 'FIUNI', logo: '/assets/logos/ingenieria.png', link: '/walkthrough/ingenieria' },
    { name: 'Medicina', logo: '/assets/logos/medicina.png', link: '/walkthrough/medicina' },
    { name: 'CyT', logo: '/assets/logos/cyt.png', link: '/walkthrough/cyt' },
    { name: 'Ciencias Jurídicas', logo: '/assets/logos/derecho.png', link: '/walkthrough/derecho' },
    { name: 'FACEA', logo: '/assets/logos/facea.png', link: '/walkthrough/facea' },
    { name: 'FACEA2', logo: '/assets/logos/facea.png', link: '/walkthrough/facea2' },
    { name: 'FaCAF', logo: '/assets/logos/facaf.png', link: '/walkthrough/facaf' },
    { name: 'Humanidades', logo: '/assets/logos/humanidades.png', link: '/walkthrough/humanidades' },
    { name: 'PostGrado', logo: UNI_LOGO, link: '/walkthrough/posgrado' },

];
