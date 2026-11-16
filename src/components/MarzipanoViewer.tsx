'use client';
import { useEffect, useRef, useState } from "react";
import Marzipano from "marzipano";
import { List, X } from "lucide-react";
import { TourData, Scene, Faculty } from "../types/MarzipanoTypes";
import FacultadesPanel from "./FacultadesPanel";
import { MODERN_THEME, ViewerTheme } from "./viewerTheme";


export type ViewerScene = {
    data: Scene;
    scene: Marzipano.Scene;
    view: Marzipano.RectilinearView;
}

export function findSceneById(
    scenes: ViewerScene[],
    id: string
): ViewerScene | undefined {
    return scenes.find(x => x.data.id === id);
}


export function stopAutorotate(viewer: Marzipano.Viewer) {
    if (!viewer.current) return;
    viewer.current.stopMovement();
    viewer.current.setIdleMovement(Infinity);
}

export function startAutorotate(viewer: Marzipano.Viewer) {
    if (!viewer.current || !autorotate) return;
    viewer.current.startMovement(autorotate);
    viewer.current.setIdleMovement(3000, autorotate);
}

export function switchScene(viewer: Marzipano.Viewer, viewerScene: ViewerScene) {
    stopAutorotate(viewer);
    viewerScene.view.setParameters(viewerScene.data.initialViewParameters);
    viewerScene.scene.switchTo();
    startAutorotate(viewer);
}

let autorotate: Marzipano.Autorotate | null = null;

type ActivePanel = 'indice' | 'facultades' | null;



export default function MarzipanoViewer({ faculty, tourData, theme = MODERN_THEME }: { faculty: Faculty, tourData: TourData, theme?: ViewerTheme }) {
    const marzipanoViewerTarget = useRef<HTMLDivElement>(null);
    const viewer = useRef<Marzipano.Viewer | null>(null);
    const scenes = useRef<ViewerScene[]>([]);
    const [allScenes, setAllScenes] = useState<ViewerScene[]>([]);
    const [currentScene, setCurrentScene] = useState<ViewerScene | null>(null);
    const [activePanel, setActivePanel] = useState<ActivePanel>(null);

    const listRef = useRef<HTMLOListElement>(null);
    const sliderRef = useRef<HTMLDivElement>(null);
    const thumbRef = useRef<HTMLDivElement>(null);
    const dragging = useRef<boolean>(false);


    // Set Viewer
    useEffect(() => {
        if (!marzipanoViewerTarget.current) { return }
        if (!autorotate) {
            // Set up autorotate, if enabled.
            autorotate = Marzipano.autorotate({
                yawSpeed: 0.03,
                targetPitch: 0,
                targetFov: Math.PI / 2
            });
        }

        const viewerOpts = {
            controls: {
                mouseViewMode: tourData.settings.mouseViewMode
            }
        };
        // Clean up any previous viewer first
        if (viewer.current) {
            viewer.current.destroy();
            viewer.current = null;
        }
        const marzipanoViewer = new Marzipano.Viewer(marzipanoViewerTarget.current, viewerOpts);
        viewer.current = marzipanoViewer;
        console.log('Marzipano viewer initialized:', viewer);


        const viewerScenes = tourData.scenes.map((sceneData: Scene): ViewerScene => {
            const geometry = new Marzipano.CubeGeometry(sceneData.levels);
            const source = Marzipano.ImageUrlSource.fromString(`/tours/${faculty}/tiles/${sceneData.id}/{z}/{f}/{y}/{x}.jpg`,
                {
                    cubeMapPreviewUrl: `/tours/${faculty}/tiles/${sceneData.id}/preview.jpg`
                });

            const limiter = Marzipano.RectilinearView.limit.traditional(sceneData.faceSize, 100 * Math.PI / 180, 120 * Math.PI / 180);
            const view = new Marzipano.RectilinearView(sceneData.initialViewParameters, limiter);

            const scene = viewer.current.createScene({
                source: source,
                geometry: geometry,
                view: view,
                pinFirstLevel: true
            });

            sceneData.linkHotspots.forEach((linkHotspot) => {
                const element = document.createElement('div');
                element.className = 'cursor-pointer';
                element.style.transform = `rotate(${linkHotspot.rotation}rad)`;
                element.innerHTML = `<div class="link-hotspot"><svg viewBox="0 0 24 24" fill="none" stroke="${theme.accent}" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 16 12 8 18 16"/></svg></div>`;
                element.addEventListener('click', () => {
                    const target = findSceneById(scenes.current, linkHotspot.target);
                    if (target) {
                        switchScene(viewer.current!, target);
                        setCurrentScene(target);
                    }
                });
                scene.hotspotContainer().createHotspot(element, linkHotspot);
            });

            sceneData.infoHotspots.forEach((infoHotspot) => {
                const element = document.createElement('div');
                element.className = 'info-hotspot-wrapper';

                const button = document.createElement('div');
                button.className = 'info-hotspot';
                button.innerHTML = `<svg viewBox="0 0 24 24" fill="none" stroke="${theme.accent}" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="14"/><line x1="12" y1="18" x2="12" y2="18"/></svg>`;

                const box = document.createElement('div');
                box.className = 'info-box';
                box.hidden = true;

                if (infoHotspot.title) {
                    const title = document.createElement('h3');
                    title.textContent = infoHotspot.title;
                    box.appendChild(title);
                }
                if (infoHotspot.text) {
                    const text = document.createElement('p');
                    text.textContent = infoHotspot.text;
                    box.appendChild(text);
                }
                if (infoHotspot.addon) {
                    const addon = document.createElement('div');
                    addon.className = 'info-box-addon';
                    addon.innerHTML = infoHotspot.addon;
                    box.appendChild(addon);
                }

                button.addEventListener('click', (e) => {
                    e.stopPropagation();
                    box.hidden = !box.hidden;
                });
                box.addEventListener('click', (e) => e.stopPropagation());

                element.appendChild(button);
                element.appendChild(box);
                scene.hotspotContainer().createHotspot(element, infoHotspot);
            });

            return {
                data: sceneData,
                scene: scene,
                view: view
            }

        });

        scenes.current = viewerScenes;
        setAllScenes(viewerScenes);
        if (viewerScenes.length > 0) {
            const firstScene = viewerScenes[0];
            switchScene(viewer, firstScene);
            setCurrentScene(firstScene);
        }


        return () => {
            viewer.current?.destroy();
            viewer.current = null;
            console.log('Marzipano viewer destroyed safely');
        };

    }, [faculty, tourData, theme.accent]);

    function handleSelect(viewerScene: ViewerScene) {
        if (!viewer.current) return;
        switchScene(viewer.current, viewerScene);
        setCurrentScene(viewerScene);
    }

    useEffect(() => {
        const listEl = listRef.current;
        const sliderEl = sliderRef.current;
        const thumbEl = thumbRef.current;
        if (!listEl || !sliderEl || !thumbEl) return;
        const list: HTMLOListElement = listEl;
        const slider: HTMLDivElement = sliderEl;
        const thumb: HTMLDivElement = thumbEl;

        function thumbTravel(): number {
            return Math.max(0, slider.clientHeight - thumb.offsetHeight);
        }

        function maxScroll(): number {
            return Math.max(0, list.scrollHeight - list.clientHeight);
        }

        function setThumbFromScroll() {
            const ms = maxScroll();
            const ratio = ms ? (list.scrollTop / ms) : 0;
            thumb.style.top = (ratio * thumbTravel()) + 'px';
            thumb.setAttribute('aria-valuenow', String(Math.round(ratio * 100)));
        }

        function setScrollFromY(clientY: number) {
            const rect = slider.getBoundingClientRect();
            const travel = thumbTravel();
            let y = clientY - rect.top - (thumb.offsetHeight / 2);
            y = Math.max(0, Math.min(travel, y));
            const ratio = travel ? (y / travel) : 0;
            thumb.style.top = y + 'px';
            list.scrollTop = ratio * maxScroll();
            thumb.setAttribute('aria-valuenow', String(Math.round(ratio * 100)));
        }

        function getClientY(e: MouseEvent | TouchEvent): number {
            const touch = (e as Partial<TouchEvent>).touches?.[0];
            return touch ? touch.clientY : (e as MouseEvent).clientY;
        }

        const onStart = (e: MouseEvent | TouchEvent) => {
            dragging.current = true;
            thumb.style.cursor = 'grabbing';
            setScrollFromY(getClientY(e));
            e.preventDefault();
        };

        const onMove = (e: MouseEvent | TouchEvent) => {
            if (!dragging.current) return;
            setScrollFromY(getClientY(e));
        };

        const onEnd = () => {
            dragging.current = false;
            thumb.style.cursor = 'grab';
        };

        const onClick = (e: MouseEvent) => {
            if (e.target === thumb) return;
            setScrollFromY(e.clientY);
        };

        const onKeyDown = (e: KeyboardEvent) => {
            const step = 24;
            if (e.key === 'ArrowDown') { list.scrollTop += step; setThumbFromScroll(); e.preventDefault(); }
            if (e.key === 'ArrowUp') { list.scrollTop -= step; setThumbFromScroll(); e.preventDefault(); }
        };

        const onResize = () => setThumbFromScroll();

        thumb.addEventListener('mousedown', onStart);
        thumb.addEventListener('touchstart', onStart, { passive: false });
        window.addEventListener('mousemove', onMove);
        window.addEventListener('touchmove', onMove, { passive: false });
        window.addEventListener('mouseup', onEnd);
        window.addEventListener('touchend', onEnd);
        slider.addEventListener('click', onClick);
        thumb.addEventListener('keydown', onKeyDown);
        list.addEventListener('scroll', setThumbFromScroll);
        window.addEventListener('resize', onResize);
        setThumbFromScroll();

        return () => {
            thumb.removeEventListener('mousedown', onStart);
            thumb.removeEventListener('touchstart', onStart);
            window.removeEventListener('mousemove', onMove);
            window.removeEventListener('touchmove', onMove);
            window.removeEventListener('mouseup', onEnd);
            window.removeEventListener('touchend', onEnd);
            slider.removeEventListener('click', onClick);
            thumb.removeEventListener('keydown', onKeyDown);
            list.removeEventListener('scroll', setThumbFromScroll);
            window.removeEventListener('resize', onResize);
        };
    }, [allScenes]);

    const togglePanel = (panel: Exclude<ActivePanel, null>) =>
        setActivePanel((current) => (current === panel ? null : panel));

    return (
        <div className="walkthrough-stage">
            <div className="walkthrough-hero">
                <div id="marzipano-viewer" className="w-full h-full absolute" ref={marzipanoViewerTarget}></div>

                <button
                    type="button"
                    className={`indice-toggle${activePanel === "indice" ? " open" : ""}`}
                    aria-label={activePanel === "indice" ? "Cerrar índice" : "Abrir índice"}
                    aria-expanded={activePanel === "indice"}
                    onClick={() => togglePanel("indice")}
                >
                    {activePanel === "indice" ? <X color={theme.accent} aria-hidden /> : <List color={theme.accent} aria-hidden />}
                </button>

                <div className={`panel indice-panel${activePanel === "indice" ? " open" : ""}`}>
                    <h2>INDICE</h2>
                    <div className="indice-body">
                        <div className="indice-list-wrap">
                            <ol id="indiceList" ref={listRef}>
                                {allScenes.map((scene) => (
                                    <li
                                        key={scene.data.id}
                                        className={scene.data.id === currentScene?.data.id ? "active" : ""}
                                        onClick={() => handleSelect(scene)}
                                    >
                                        {scene.data.name.replace(/^\d+\.\s*/, "")}
                                    </li>
                                ))}
                            </ol>
                        </div>
                        <div className="indice-slider" ref={sliderRef}>
                            <div className="track"></div>
                            <div
                                ref={thumbRef}
                                className="indice-thumb"
                                role="slider"
                                aria-orientation="vertical"
                                aria-label="Desplazar índice"
                                aria-valuemin={0}
                                aria-valuemax={100}
                                aria-valuenow={0}
                                tabIndex={0}
                            >
                                <img src={theme.thumbIcon} alt="" />
                            </div>
                        </div>
                    </div>
                </div>

                <FacultadesPanel
                    open={activePanel === "facultades"}
                    onToggle={() => togglePanel("facultades")}
                    theme={theme}
                />
            </div>
        </div>
    )
}