export const brandSettings = {
    logo: {
        src: "", // Add logo image URL here (e.g., "/assets/logo.png")
        alt: "[Brand Name]",
        variations: [ // you might have wordmarks / different color variants than what is listed here, that's fine just adjust it
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
        primaryFont: "Helvetica Neue",  // this will automatically get set as the page font
        secondaryFont: "Verdana", // dont be a bum, go find some google/adobe fonts you like. just make sure to load them in the stylesheet or Layout astro file 
        baseSize: "16px",
        lineHeight: "1.5",
        paragraphSpacing: "2"
    },
    palette: [ // these will load automatically into your page into the color section
        { name: "White", hex: "#ffffff" },
        { name: "Black", hex: "#000000" },
        { name: "Primary Blue", hex: "#0056b3" },
        { name: "Secondary Teal", hex: "#17a2b8" },
        { name: "Accent Yellow", hex: "#ffc107" },
        { name: "Dark Gray", hex: "#343a40" },
        { name: "Light Gray", hex: "#f8f9fa" }
    ]
};