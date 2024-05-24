import { createTheme } from "@mui/material";

export const defaultTheme = createTheme({
    components: {
        MuiStack: {
            styleOverrides: {
                root: {
                    "*::-webkit-scrollbar": { height: "8px", width: "8px" },
                    "*::-webkit-scrollbar-track": { background: "none" },
                    "*::-webkit-scrollbar-thumb": {
                        backgroundColor: "rgba(0, 0, 0, 0)",
                        borderRadius: "20px",
                        border: "3px solid rgba(0, 0, 0, 0)",
                    },
                    "*::-webkit-scrollbar-thumb:hover": { backgroundColor: "#e0e0e0", transition: ".2s" },
                },
            },
        },
    },
})