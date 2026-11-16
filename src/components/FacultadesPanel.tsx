'use client';
import { useEffect, useRef } from "react";
import { Building2, X } from "lucide-react";
import { FACULTADES } from "../data/facultades";
import FacultadBolita from "./FacultadBolita";
import { MODERN_THEME, ViewerTheme } from "./viewerTheme";

type FacultadesPanelProps = {
    open: boolean;
    onToggle: () => void;
    theme?: ViewerTheme;
};

export default function FacultadesPanel({ open, onToggle, theme = MODERN_THEME }: FacultadesPanelProps) {
    const rowRef = useRef<HTMLDivElement>(null);
    const sliderRef = useRef<HTMLDivElement>(null);
    const thumbRef = useRef<HTMLDivElement>(null);

    // Arrastrar horizontalmente la fila de bolitas
    useEffect(() => {
        const row = rowRef.current;
        if (!row) return;
        let down = false;
        let moved = false;
        let startX = 0;
        let startScroll = 0;

        const onDown = (e: MouseEvent) => {
            down = true;
            moved = false;
            startX = e.clientX;
            startScroll = row.scrollLeft;
            row.classList.add('dragging');
            e.preventDefault();
        };

        const onMove = (e: MouseEvent) => {
            if (!down) return;
            const dx = e.clientX - startX;
            if (Math.abs(dx) > 5) moved = true;
            row.scrollLeft = startScroll - dx;
            e.preventDefault();
        };

        const onUp = () => {
            down = false;
            row.classList.remove('dragging');
        };

        // Evita que un arrastre dispare la navegacion de una bolita
        const onClickCapture = (e: MouseEvent) => {
            if (moved) {
                e.preventDefault();
                e.stopPropagation();
                moved = false;
            }
        };

        row.addEventListener('mousedown', onDown);
        window.addEventListener('mousemove', onMove);
        window.addEventListener('mouseup', onUp);
        row.addEventListener('click', onClickCapture, true);

        return () => {
            row.removeEventListener('mousedown', onDown);
            window.removeEventListener('mousemove', onMove);
            window.removeEventListener('mouseup', onUp);
            row.removeEventListener('click', onClickCapture, true);
        };
    }, []);

    // Slider horizontal del panel
    useEffect(() => {
        const rowEl = rowRef.current;
        const sliderEl = sliderRef.current;
        const thumbEl = thumbRef.current;
        if (!rowEl || !sliderEl || !thumbEl) return;
        const row: HTMLDivElement = rowEl;
        const slider: HTMLDivElement = sliderEl;
        const thumb: HTMLDivElement = thumbEl;
        let isDragging = false;

        function thumbTravel(): number {
            return Math.max(0, slider.clientWidth - thumb.offsetWidth);
        }

        function maxScroll(): number {
            return Math.max(0, row.scrollWidth - row.clientWidth);
        }

        function setThumbFromScroll() {
            const ms = maxScroll();
            const ratio = ms ? (row.scrollLeft / ms) : 0;
            thumb.style.left = (ratio * thumbTravel()) + 'px';
            thumb.setAttribute('aria-valuenow', String(Math.round(ratio * 100)));
        }

        function setScrollFromX(clientX: number) {
            const rect = slider.getBoundingClientRect();
            const travel = thumbTravel();
            let x = clientX - rect.left - (thumb.offsetWidth / 2);
            x = Math.max(0, Math.min(travel, x));
            const ratio = travel ? (x / travel) : 0;
            thumb.style.left = x + 'px';
            row.scrollLeft = ratio * maxScroll();
            thumb.setAttribute('aria-valuenow', String(Math.round(ratio * 100)));
        }

        function getClientX(e: MouseEvent | TouchEvent): number {
            const touch = (e as Partial<TouchEvent>).touches?.[0];
            return touch ? touch.clientX : (e as MouseEvent).clientX;
        }

        const onStart = (e: MouseEvent | TouchEvent) => {
            isDragging = true;
            thumb.classList.add('dragging');
            setScrollFromX(getClientX(e));
            e.preventDefault();
        };

        const onMove = (e: MouseEvent | TouchEvent) => {
            if (!isDragging) return;
            setScrollFromX(getClientX(e));
        };

        const onEnd = () => {
            isDragging = false;
            thumb.classList.remove('dragging');
        };

        const onClick = (e: MouseEvent) => {
            if (e.target === thumb) return;
            setScrollFromX(e.clientX);
        };

        const onKeyDown = (e: KeyboardEvent) => {
            const step = 24;
            if (e.key === 'ArrowRight') { row.scrollLeft += step; setThumbFromScroll(); e.preventDefault(); }
            if (e.key === 'ArrowLeft') { row.scrollLeft -= step; setThumbFromScroll(); e.preventDefault(); }
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
        row.addEventListener('scroll', setThumbFromScroll);
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
            row.removeEventListener('scroll', setThumbFromScroll);
            window.removeEventListener('resize', onResize);
        };
    }, [open]);

    return (
        <>
            <button
                type="button"
                className={`fac-toggle${open ? " open" : ""}`}
                aria-label={open ? "Cerrar facultades" : "Abrir facultades"}
                aria-expanded={open}
                onClick={onToggle}
            >
                {open ? <X color={theme.accent} aria-hidden /> : <Building2 color={theme.accent} aria-hidden />}
            </button>

            <div className={`panel fac-panel${open ? " open" : ""}`}>
                <h2>Facultades</h2>
                <div className="fac-row" ref={rowRef}>
                    {FACULTADES.map((fac) => (
                        <FacultadBolita key={fac.name} faculty={fac} />
                    ))}
                </div>
                <div className="fac-slider" ref={sliderRef}>
                    <div className="track"></div>
                    <div
                        ref={thumbRef}
                        className="fac-thumb"
                        role="slider"
                        aria-orientation="horizontal"
                        aria-label="Desplazar facultades"
                        aria-valuemin={0}
                        aria-valuemax={100}
                        aria-valuenow={0}
                        tabIndex={0}
                    >
                        <img src={theme.thumbIcon} alt="" />
                    </div>
                </div>
            </div>
        </>
    );
}
