import Link from "next/link";
import type { FacultadItem } from "../data/facultades";

export default function FacultadBolita({ faculty }: { faculty: FacultadItem }) {
    return (
        <Link
            className="fac-item"
            href={faculty.link}
            title={faculty.name}
        >
            <div className="fac-icon">
                <img src={faculty.logo} alt={faculty.name} />
            </div>
            <span>{faculty.name}</span>
        </Link>
    );
}
