
type TourData = {
    name: string;
    scenes: Scene[];
    settings: {
        mouseViewMode: string;
        autoRotateEnabled: boolean;
        fullscreenButton: boolean;
        viewControlButtons: boolean;
    };
}

type Scene = {
    id: string;
    name: string;
    levels: Level[],
    faceSize: number;
    initialViewParameters: {
        yaw: number;
        pitch: number;
        fov: number;
    };
    linkHotspots: LinkHotspot[];
    infoHotspots: InfoHotspot[];

}

type Level = {
    tileSize: number;
    size: number;
    fallbackOnly?: boolean;
}

type LinkHotspot = {
    yaw: number;
    pitch: number;
    rotation: number;
    target: string;
}

type InfoHotspot = {
    yaw: number;
    pitch: number;
    title: string;
    text: string;
    addon: string;
}

type Faculty = "uni" | "ingenieria" | "derecho" | "medicina" | "biblioteca";

export type { TourData, Scene, Level, LinkHotspot, InfoHotspot, Faculty };