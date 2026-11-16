import { MapPin } from 'lucide-react';
import { useEffect, useRef } from 'react';
import { ViewerScene } from './MarzipanoViewer';
import { LinkHotspot } from '../types/MarzipanoTypes';


export default function LinkHotspotComponent({ viewerScene, linkHotspot, onNavigate }: { viewerScene: ViewerScene; linkHotspot: LinkHotspot; onNavigate: () => void }) {
    const LinkHotspotTarget = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!LinkHotspotTarget.current) { return }
        const element = LinkHotspotTarget.current;
        viewerScene.scene.hotspotContainer().createHotspot(element, linkHotspot);
    }, [viewerScene, linkHotspot]);
    return (
        <div ref={LinkHotspotTarget} className="cursor-pointer" style={{ transform: `rotate(${linkHotspot.rotation}rad)` }} onClick={onNavigate}>
            <div className="hotspot-icon">
                <MapPin size={24} />
            </div>
        </div>
    );
}   