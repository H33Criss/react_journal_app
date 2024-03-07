import { createTheme } from '@mui/material';
import { red } from '@mui/material/colors';

const { primary, secondary } = {

    primary: '#262254',
    secondary: '#543884'


};

export const svgIconSombred = {
    color: 'white',
    "&:hover": {
        filter: 'drop-shadow(5px 5px 10px #fff)',
        scale: '1.1',

    },
    transition: 'filter .2s, scale .2s',
};


export const purpleTheme = createTheme({
    palette: {
        primary: {
            main: primary
        },
        secondary: {
            main: secondary
        },
        error: {
            main: red.A400
        }
    },
    components: {
        MuiDrawer: {
            styleOverrides: {
                paper: {
                    backgroundColor: primary,
                    color: '#fff'

                }
            }
        },
        MuiListItemText: {
            styleOverrides: {
                secondary: {
                    color: 'rgb(255 ,255 ,255 , 0.6)'
                }
            }
        },
        MuiIconButton: {
            styleOverrides: {
                root: {
                    transition: 'box-shadow .2s',

                    ":disabled": {
                        color: 'grey',
                    },
                    // color: 'white',
                    // transition: 'box-shadow .5s , background-color .2s',
                    // ':hover': { backgroundColor: 'white', color: 'black', opacity: 0.9, boxShadow: '2px 3px 15px .1px purple', },
                }
            }
        },
        MuiListItem: {
            styleOverrides: {
                root: {
                    transition: 'background-color .3s',
                    "&:hover": {
                        backgroundColor: secondary,
                    }

                },

            }
        },

    }
})





