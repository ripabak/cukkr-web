"use client";

import { useEffect, useState } from "react";

function rgbToHsl(r: number, g: number, b: number) {
    r /= 255;
    g /= 255;
    b /= 255;

    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);

    let h = 0, s = 0;
    const l = (max + min) / 2;

    if (max !== min) {
        const d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

        switch (max) {
            case r:
                h = (g - b) / d + (g < b ? 6 : 0);
                break;
            case g:
                h = (b - r) / d + 2;
                break;
            case b:
                h = (r - g) / d + 4;
                break;
        }

        h /= 6;
    }

    return {
        h: h * 360,
        s: s * 100,
        l: l * 100
    };
}

function parseColor(color: string) {
    // support hex (#fff / #ffffff)
    if (color.startsWith("#")) {
        let hex = color.replace("#", "");

        if (hex.length === 3) {
            hex = hex.split("").map((c) => c + c).join("");
        }

        const bigint = parseInt(hex, 16);

        return {
            r: (bigint >> 16) & 255,
            g: (bigint >> 8) & 255,
            b: bigint & 255
        };
    }

    // fallback default
    return { r: 200, g: 200, b: 200 };
}

export function useBottomImageColor({
    src,
    fallbackColor = "#cccccc"
}: {
    src?: string;
    fallbackColor?: string;
}) {
    const [textColor, setTextColor] = useState("hsl(0,0%,95%)");

    useEffect(() => {
        // 🔥 CASE 1: tidak ada image → pakai fallback color
        if (!src) {
            const { r, g, b } = parseColor(fallbackColor);
            const { h, s, l } = rgbToHsl(r, g, b);

            const textLightness = l > 60 ? 15 : 92;
            const textSaturation = Math.min(s, 60);

            // eslint-disable-next-line react-hooks/set-state-in-effect
            setTextColor(`hsl(${h}, ${textSaturation}%, ${textLightness}%)`);
            return;
        }

        // 🔥 CASE 2: pakai image
        const img = new Image();
        img.crossOrigin = "anonymous";
        img.src = src;

        img.onload = () => {
            const canvas = document.createElement("canvas");
            const ctx = canvas.getContext("2d");

            if (!ctx) return;

            const width = img.width;
            const height = img.height;

            canvas.width = width;
            canvas.height = height;

            ctx.drawImage(img, 0, 0);

            const startY = Math.floor(height * 0.7);
            const imageData = ctx.getImageData(0, startY, width, height - startY);

            const data = imageData.data;

            let r = 0, g = 0, b = 0, count = 0;

            for (let i = 0; i < data.length; i += 4) {
                r += data[i];
                g += data[i + 1];
                b += data[i + 2];
                count++;
            }

            r /= count;
            g /= count;
            b /= count;

            const { h, s, l } = rgbToHsl(r, g, b);

            const textLightness = l > 60 ? 15 : 92;
            const textSaturation = Math.min(s, 60);

            setTextColor(`hsl(${h}, ${textSaturation}%, ${textLightness}%)`);
        };
    }, [src, fallbackColor]);

    return textColor;
}