import {createTheme} from "@mui/material";

const theme = createTheme({
    palette: {
        mode: "light"
    },
    components: {
        MuiTextField: {
            defaultProps: {
                variant: 'outlined',
                fullWidth: true,
            }
        }
    },
});

export default theme;