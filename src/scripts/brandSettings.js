export const brandSettings = {
    logo: {
        src: "", // Add logo URL here (e.g., "/assets/logo.png")
        alt: "[Brand Name] Logo",
        variations: [
            { 
                name: "Primary - Light Background", 
                src: "", // Add image path
                bg: "#ffffff", 
                darkText: true,
                description: "Use this version on white or light backgrounds."
            },
            { 
                name: "Primary - Dark Background", 
                src: "", // Add image path
                bg: "#333333", 
                darkText: false,
                description: "Use this version on dark or brand-colored backgrounds."
            },
            { 
                name: "Monochrome - Black", 
                src: "", // Add image path
                bg: "#ffffff", 
                darkText: true,
                description: "For black and white print or single-color applications."
            },
            { 
                name: "Monochrome - White", 
                src: "", // Add image path
                bg: "#000000", 
                darkText: false,
                description: "For dark backgrounds where color is not permitted."
            }
        ]
    },
    favicon: "/favicon.svg", // Add favicon URL here
    typography: {
        primaryFont: "Helvetica Neue",
        secondaryFont: "Verdana",
        baseSize: "16px",
        lineHeight: "1.5",
        paragraphSpacing: "2"
    },
    palette: [
        { name: "White", hex: "#ffffff" },
        { name: "Black", hex: "#000000" },
        { name: "Primary Blue", hex: "#0056b3" },
        { name: "Secondary Teal", hex: "#17a2b8" },
        { name: "Accent Yellow", hex: "#ffc107" },
        { name: "Dark Gray", hex: "#343a40" },
        { name: "Light Gray", hex: "#f8f9fa" }
    ]
};