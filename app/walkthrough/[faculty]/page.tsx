import { loadTourData } from '@/src/services/TourData';
import { Faculty } from '@/src/types/MarzipanoTypes';
import ClassicWalkthrough from './ClassicWalkthrough';

// Every tour uses the original brick design
export default async function WalkThroughPage({ params }: { params: Promise<{ faculty: string }> }) {
    const { faculty: facultyParam } = await params;
    const faculty: Faculty = facultyParam as Faculty;
    const data = await loadTourData(faculty);
    return <ClassicWalkthrough faculty={faculty} tourData={data} />;
}
