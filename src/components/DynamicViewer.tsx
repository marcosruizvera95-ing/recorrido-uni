'use client';

import dynamic from 'next/dynamic';
import { Faculty, TourData } from '../types/MarzipanoTypes';
import { ViewerTheme } from './viewerTheme';

const MarzipanoViewer = dynamic(() => import("@/src/components/MarzipanoViewer"), {
    loading: () => <p>Loading Marzipano Viewer...</p>,
    ssr: false
});

export default function DynamicViewer({ faculty, tourData, theme }: { faculty: Faculty, tourData: TourData, theme?: ViewerTheme }) {
    return (
        <MarzipanoViewer faculty={faculty} tourData={tourData} theme={theme} />
    );
}
