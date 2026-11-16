// Visual theme of the 360° viewer: accent color (hotspots, menu toggles) and slider thumb icon
export type ViewerTheme = {
    accent: string;
    thumbIcon: string;
};

// Official uni.edu.py style
export const MODERN_THEME: ViewerTheme = {
    accent: "#cc6633",
    thumbIcon: "/assets/thumb.svg",
};

// Original brick style, used by every tour
export const CLASSIC_THEME: ViewerTheme = {
    accent: "#5c2620",
    thumbIcon: "/assets/thumb-classic.svg",
};
