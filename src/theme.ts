import {
  lighten,
  adaptV4Theme,
  createTheme as createMuiTheme,
  alpha
} from "@mui/material/styles";
import { ChevronDownIcon } from "lucide-react";
import { CSSProperties } from "react";

interface LibraryShape {
  border: {
    xs: number;
    sm: number;
    sl: number;
  };
  radius: {
    sm: number;
    md: number;
  };
}

interface LibraryZIndex {
  banner: number;
}

declare module "@mui/system" {
  interface Shape extends LibraryShape {}
}

declare module "@mui/material/styles" {
  interface Theme {
    filters: {
      disabled: string;
    };
  }
  interface ThemeOptions {
    filters?: {
      disabled?: string;
    };
  }

  interface ZIndex extends LibraryZIndex {}
}
declare module "@mui/material/styles/createPalette" {
  interface ColorSystem {
    grey: [string, string];
    green: [string, string, string];
    blue: [string, string, string];
    purple: [string];
  }

  interface Palette {
    border: {
      primary: string;
      secondary: string;
      tertiary: string;
    };
    selected: {
      main: string;
      light: string;
      lighter: string;
    };
    hover: {
      primary: string;
    };
    avatar: string;
    emptyChart: string;
    depressed: string;
    quote: string;
    feedback: {
      text: string;
    };
    progress: {
      green: string;
      yellow: string;
      red: string;
      blue: string;
    };
    adminBar: {
      background: string;
    };
    activity: {
      habit: string;
      checkin: string;
      lesson: string;
    };
    editor: {
      background: string;
      border: string;
      icon: string;
    };
    delete: {
      primary: string;
    };
    attentionPoint: {
      warning: string;
    };
  }

  interface PaletteOptions {
    border: {
      primary: string;
      secondary: string;
      tertiary: string;
    };
    selected: {
      main: string;
      light: string;
      lighter: string;
    };
    hover: {
      primary: string;
    };
    avatar: string;
    emptyChart: string;
    depressed: string;
    quote: string;
    feedback: {
      text: string;
    };
    progress: {
      green: string;
      yellow: string;
      red: string;
      blue: string;
    };
    adminBar: {
      background: string;
    };
    activity: {
      habit: string;
      checkin: string;
      lesson: string;
    };
    editor: {
      background: string;
      border: string;
      icon: string;
    };
    delete: {
      primary: string;
    };
    attentionPoint: {
      warning: string;
    };
  }
}

declare module "@mui/system" {
  interface BreakpointOverrides {
    slg: true;
    llg: true;
  }
}

declare module "@mui/material/styles" {
  interface Theme {
    drawer: {
      width: number;
      minimizedWidth: number;
    };
    adminDrawer: {
      width: number;
    };
    list: {
      paddingLeft: string;
      margin: number;
    };
  }

  interface TypographyVariants {
    hint: React.CSSProperties;
  }

  interface TypographyVariantsOptions {
    hint?: React.CSSProperties;
  }
}

declare module "@mui/material/Typography" {
  interface TypographyPropsVariantOverrides {
    hint: true;
  }
}

const shadowKeyUmbraOpacity = 0.1;
const shadowKeyPenumbraOpacity = 0.12;
const shadowAmbientShadowOpacity = 0.1;

function createShadow(...px: number[]) {
  return [
    `${px[0]}px ${px[1]}px ${px[2]}px ${px[3]}px rgba(0,0,0,${shadowKeyUmbraOpacity})`,
    `${px[4]}px ${px[5]}px ${px[6]}px ${px[7]}px rgba(0,0,0,${shadowKeyPenumbraOpacity})`,
    `${px[8]}px ${px[9]}px ${px[10]}px ${px[11]}px rgba(0,0,0,${shadowAmbientShadowOpacity})`
  ].join(",");
}

export const colorSystem = {
  primary: "#6C63FF",
  primaryOpacity: "rgba(108, 99, 255, 0.1)",
  primaryOpacity2: "rgba(108, 99, 255, 0.3)",

  secondary: "#000000",
  gray: "#7E898F",
  grayAlpha1A: "#7E898F1A",
  grayAlpha55: "#7E898F55",
  secondaryGray: "#D0D8DC",
  secondaryGrayOpacity5: "rgba(208, 216, 220, 0.5)",
  secondaryGrayOpacity: "rgba(208,216,220,0.1)",
  greyOpacity: "rgba(125,137,142,0.83)",
  greyOpacity2: "rgba(126,137,143,0.15)",
  gray1: "#333333",
  gray2: "#4F4F4F",
  gray3: "#828282",
  gray4: "#BDBDBD",
  gray5: "#E0E0E0",
  gray6: "#F2F2F2",
  gray7: "#CCD7DD",
  gray8: "#EDF1F3",
  gray9: "#F3F3F3",
  gray10: "#FBFEFF",
  gray11: "#F4F4F4",
  background: "rgba(208, 216, 220, 0.1)",
  orange: "#F2994A",
  orange2: "#f85802",
  yellow: "#E5BF48",
  green: "#219653",
  green1: "#219653",
  green2: "#27AE60",
  green3: "#6FCF97",
  greenOpacity2: "rgba(39, 174, 96, 0.05)",
  greenOpacity: "rgba(39, 174, 96, 0.1)",
  green4: "#E9F7EF",
  blue1: "#6C63FF",
  blue2: "#2D9CDB",
  blue3: "#56CCF2",
  blue4: "#F2F5FA",
  purple2: "#BB6BD9",
  white: "#FFFFFF",
  white2: "#FAFAFA",
  white3: "#F5F5F5",
  black: "#000000",
  blackOpacity: "rgba(0,0,0,0.7)",
  blackOpacitySecond: "rgba(0,0,0,0.5)",
  border1: "#19191951",
  border2: "rgba(0, 0, 0, 0.23)",
  border3: "rgba(208, 216, 220, 0.2)",
  bluishGray: "#e2e8f0",
  slateGray: "#64748b",
  antiFlashWhite: "#f1f5f9",
  transparent: "#FFF0",
  nutritionCalories: "#EB5757",
  nutritionFats: "#F2C94C",
  nutritionCarbs: "#62C4B2",
  nutritionProteins: "#61AEFF"
};

export interface DefaultThemeOptions {
  primary: string;
}

export const defaultThemeOptions: DefaultThemeOptions = {
  primary: colorSystem.primary
};

export const createTheme = (
  options: DefaultThemeOptions = defaultThemeOptions
) => {
  const theme = createMuiTheme({
    breakpoints: {
      values: {
        xs: 0,
        sm: 600,
        md: 960,
        slg: 1180,
        lg: 1280,
        llg: 1330,
        xl: 1920
      }
    },
    palette: {
      contrastThreshold: 2.8,

      primary: {
        main: options.primary
      },
      secondary: {
        main: colorSystem.secondary
      },
      text: {
        secondary: colorSystem.gray
      },
      border: {
        primary: colorSystem.gray4,
        secondary: colorSystem.gray5,
        tertiary: colorSystem.gray6
      },

      progress: {
        green: colorSystem.green2,
        yellow: colorSystem.yellow,
        red: colorSystem.primary,
        blue: colorSystem.blue1
      },

      activity: {
        habit: colorSystem.orange,
        checkin: colorSystem.green,
        lesson: colorSystem.blue2
      },

      selected: {
        main: colorSystem.gray6,
        light: colorSystem.white2,
        lighter: colorSystem.gray7
      },

      hover: {
        primary: `${colorSystem.black}10`
      },

      depressed: `${colorSystem.blue1}0A`,

      emptyChart: colorSystem.gray2,

      attentionPoint: {
        warning: colorSystem.orange
      },

      avatar: colorSystem.gray3,
      quote: colorSystem.secondaryGray,
      feedback: {
        text: colorSystem.gray1
      },
      adminBar: {
        background: colorSystem.gray2
      },
      editor: {
        background: colorSystem.antiFlashWhite,
        border: colorSystem.bluishGray,
        icon: colorSystem.slateGray
      },
      delete: {
        primary: colorSystem.gray3
      }
    },

    filters: {
      disabled: "grayscale(0.6) opacity(0.6)"
    },

    typography: {
      fontFamily: "'Roboto', sans-serif;",
      hint: {
        fontSize: 10,
        lineHeight: 1.1
      }
    },

    shadows: [
      "none",
      createShadow(0, 2, 1, -1, 0, 1, 1, 0, 0, 1, 3, 0),
      createShadow(0, 3, 1, -2, 0, 2, 2, 0, 0, 1, 5, 0),
      createShadow(0, 3, 3, -2, 0, 3, 4, 0, 0, 1, 8, 0),
      createShadow(0, 2, 4, -1, 0, 4, 5, 0, 0, 1, 10, 0),
      createShadow(0, 3, 5, -1, 0, 5, 8, 0, 0, 1, 14, 0),
      createShadow(0, 3, 5, -1, 0, 6, 10, 0, 0, 1, 18, 0),
      createShadow(0, 4, 5, -2, 0, 7, 10, 1, 0, 2, 16, 1),
      createShadow(0, 5, 5, -3, 0, 8, 10, 1, 0, 3, 14, 2),
      createShadow(0, 5, 6, -3, 0, 9, 12, 1, 0, 3, 16, 2),
      createShadow(0, 6, 6, -3, 0, 10, 14, 1, 0, 4, 18, 3),
      createShadow(0, 6, 7, -4, 0, 11, 15, 1, 0, 4, 20, 3),
      createShadow(0, 7, 8, -4, 0, 12, 17, 2, 0, 5, 22, 4),
      createShadow(0, 7, 8, -4, 0, 13, 19, 2, 0, 5, 24, 4),
      createShadow(0, 7, 9, -4, 0, 14, 21, 2, 0, 5, 26, 4),
      createShadow(0, 8, 9, -5, 0, 15, 22, 2, 0, 6, 28, 5),
      createShadow(0, 8, 10, -5, 0, 16, 24, 2, 0, 6, 30, 5),
      createShadow(0, 8, 11, -5, 0, 17, 26, 2, 0, 6, 32, 5),
      createShadow(0, 9, 11, -5, 0, 18, 28, 2, 0, 7, 34, 6),
      createShadow(0, 9, 12, -6, 0, 19, 29, 2, 0, 7, 36, 6),
      createShadow(0, 10, 13, -6, 0, 20, 31, 3, 0, 8, 38, 7),
      createShadow(0, 10, 13, -6, 0, 21, 33, 3, 0, 8, 40, 7),
      createShadow(0, 10, 14, -6, 0, 22, 35, 3, 0, 8, 42, 7),
      createShadow(0, 11, 14, -7, 0, 23, 36, 3, 0, 9, 44, 8),
      createShadow(0, 11, 15, -7, 0, 24, 38, 3, 0, 9, 46, 8)
    ],

    shape: {
      border: {
        xs: 1,
        sm: 2,
        sl: 3
      },
      radius: {
        sm: 8,
        md: 16
      }
    },

    zIndex: {
      banner: 1450
    },

    components: {
      MuiSnackbar: {
        defaultProps: {
          autoHideDuration: 3000,
          anchorOrigin: {
            vertical: "top",
            horizontal: "center"
          }
        }
      },
      MuiCard: {
        defaultProps: {
          elevation: 4
        },
        styleOverrides: {
          root: ({ theme }) => ({
            borderRadius: theme.spacing(1),
            [theme.breakpoints.up("sm")]: {
              borderRadius: theme.spacing(1.5)
            }
          })
        }
      },
      MuiCardHeader: {
        styleOverrides: {
          root: ({ theme }) => ({
            [theme.breakpoints.up("sm")]: {
              padding: theme.spacing(4)
            }
          })
        }
      },
      MuiCardContent: {
        styleOverrides: {
          root: ({ theme }) => ({
            [theme.breakpoints.up("sm")]: {
              padding: theme.spacing(4)
            }
          })
        }
      },
      MuiButton: {
        defaultProps: {
          disableRipple: true
        },
        styleOverrides: {
          root: ({ theme }) => ({
            textTransform: "none",
            borderRadius: theme.shape.radius.md
          }),
          contained: ({ theme }) => ({
            color: theme.palette.common.white,
            backgroundColor: theme.palette.primary.main,
            boxShadow: theme.shadows[4],
            "&:hover": {
              backgroundColor: lighten(theme.palette.primary.main, 0.1),
              boxShadow: theme.shadows[6]
            }
          }),
          outlined: () => ({
            borderWidth: 2,
            "&:hover": {
              borderWidth: 2
            }
          })
        }
      },
      MuiTextField: {
        styleOverrides: {
          root: ({ theme }) => ({
            "& fieldset": {
              borderRadius: theme.spacing(0.5)
            },
            "& input, & textarea": {
              fontWeight: 500
            },
            "& label": {
              fontWeight: 500,
              pointerEvents: "none"
            },
            "& label.Mui-focused": {
              color: theme.palette.primary.main
            }
          })
        }
      },
      MuiOutlinedInput: {
        styleOverrides: {
          root: ({ theme, ownerState }) => ({
            borderRadius: theme.spacing(0.5),
            minHeight: 56,
            ...(ownerState?.size === "small" && {
              minHeight: 40
            }),

            "& input": {
              fontWeight: 500
            },

            "& input:not($disabled)": {
              backgroundColor: theme.palette.common.white
            },
            "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
              borderColor: alpha(theme.palette.primary.main, 0.3)
            }
          })
        }
      },
      MuiFilledInput: {
        styleOverrides: {
          root: ({ theme }) => ({
            "&": {
              backgroundColor: theme.palette.common.white,
              borderRadius: theme.spacing(0.5),
              transition: "box-shadow 0.2s ease-in-out",
              boxShadow: `inset 0 0 0 1px ${theme.palette.grey[300]}`
            },
            "&:hover": {
              boxShadow: `inset 0 0 0 1px ${theme.palette.grey[500]}`,
              backgroundColor: theme.palette.common.white
            },
            "&.Mui-focused": {
              boxShadow: `0 0 0 0.15rem ${alpha(theme.palette.primary.main, 0.3)}`,
              backgroundColor: theme.palette.common.white
            },
            "&.Mui-error": {
              boxShadow: `inset 0 0 0 1px ${theme.palette.error.main}`
            },
            "&.Mui-disabled": {
              backgroundColor: theme.palette.grey[100],
              boxShadow: `inset 0 0 0 1px ${theme.palette.grey[300]}`,
              "&::before, &::after": {
                border: "none"
              },
              "&.Mui-error": {
                boxShadow: `inset 0 0 0 1px ${theme.palette.error.dark}`
              }
            },
            "&::before, &::after": {
              border: "none"
            },
            "&:hover:not(.Mui-disabled, .Mui-error):before": {
              border: "none"
            },
            "&.Mui-focused:after": {
              border: "none"
            },
            "& .MuiInputBase-input": {
              "&:-webkit-autofill": {
                borderRadius: theme.spacing(0.5)
              },
              "&::placeholder": {
                fontWeight: 400
              }
            },
            "& label": {
              pointerEvents: "none"
            }
          })
        }
      },
      MuiSwitch: {
        defaultProps: {
          color: "default"
        },
        styleOverrides: {
          root: ({ theme }) => ({
            width: 42,
            height: 26,
            padding: 0,
            margin: theme.spacing(1)
          }),
          switchBase: ({ theme }) => ({
            padding: 1,
            "&.Mui-checked": {
              transform: "translateX(16px)",
              color: theme.palette.common.white,
              "& + .MuiSwitch-track": {
                backgroundColor: theme.palette.primary.main,
                opacity: 1,
                border: "none"
              }
            }
          }),
          thumb: {
            width: 24,
            height: 24
          },
          track: ({ theme }) => ({
            borderRadius: 13,
            border: `1px solid ${theme.palette.grey[400]}`,
            backgroundColor: theme.palette.grey[50],
            opacity: 1,
            transition: theme.transitions.create(["background-color", "border"])
          }),
          checked: {}
        }
      },
      MuiLink: {
        styleOverrides: {
          root: ({ theme }) => ({
            "&.MuiButton-contained": {
              color: theme.palette.common.white
            },
            "&.MuiButton-outlined.MuiButton-colorInherit": {
              color: theme.palette.common.white
            }
          })
        }
      },
      MuiMenuItem: {
        styleOverrides: {
          root: {
            outline: "none",
            fontWeight: 500
          }
        }
      },
      MuiListItemIcon: {
        styleOverrides: {
          root: ({ theme }) => ({
            minWidth: theme.spacing(5)
          })
        }
      },
      MuiDialogActions: {
        styleOverrides: {
          root: ({ theme }) => ({
            justifyContent: "flex-start",
            paddingLeft: theme.spacing(3),
            paddingBottom: theme.spacing(3)
          })
        }
      },
      MuiCheckbox: {
        defaultProps: {
          color: "primary"
        },
        styleOverrides: {
          root: ({ theme }) => ({
            "& + .MuiFormControlLabel-label": {
              ...theme.typography.body2
            }
          }),
          checked: ({ theme }) => ({
            "& + .MuiFormControlLabel-label": {
              color: theme.palette.primary.main
            }
          })
        }
      },
      MuiAccordion: {
        styleOverrides: {
          root: ({ theme }) => ({
            margin: 0,
            boxShadow: "none",
            border: "1px solid",
            borderRadius: theme.spacing(1),
            borderColor: theme.palette.grey[300],
            "&:before": {
              display: "none"
            },
            "&.Mui-expanded": {
              margin: 0,
              boxShadow:
                "0px -1px 2px rgba(0, 0, 0, 0.05), 0px 8px 16px rgba(0, 0, 0, 0.15), 0px 1px 2px rgba(0, 0, 0, 0.1)",
              border: "0 none"
            },
            "&.Mui-disabled": {
              backgroundColor: "transparent"
            }
          }),
          rounded: ({ theme }) => ({
            borderRadius: theme.spacing(1)
          })
        }
      },
      MuiAccordionSummary: {
        styleOverrides: {
          root: ({ theme }) => ({
            paddingLeft: theme.spacing(4),
            paddingRight: theme.spacing(4),
            fontWeight: 500,
            fontSize: 18
          }),
          content: ({ theme }) => ({
            margin: 0,
            paddingTop: theme.spacing(4),
            paddingBottom: theme.spacing(4),
            "&.Mui-expanded": {
              margin: 0
            }
          })
        }
      },
      MuiAccordionDetails: {
        styleOverrides: {
          root: ({ theme }) => ({
            paddingLeft: theme.spacing(4),
            paddingRight: theme.spacing(4),
            paddingBottom: theme.spacing(3)
          })
        }
      },
      MuiTooltip: {
        styleOverrides: {
          popper: {
            zIndex: 9999
          },
          arrow: ({ theme }) => ({
            color: theme.palette.common.black
          }),
          tooltip: ({ theme }) => ({
            color: theme.palette.common.white,
            backgroundColor: theme.palette.common.black,
            padding: theme.spacing(2),
            maxWidth: 250,
            textAlign: "center",
            fontSize: 14
          })
        }
      },
      MuiAvatar: {
        styleOverrides: {
          root: {
            borderRadius: 8
          }
        }
      },
      MuiListItem: {
        styleOverrides: {
          divider: ({ theme }) => ({
            borderBottomColor: theme.palette.quote
          })
        }
      },
      MuiSelect: {
        defaultProps: {
          IconComponent: ChevronDownIcon
        },
        styleOverrides: {
          root: {
            fontWeight: 500
          },
          icon: {
            fontSize: 20,
            width: 20,
            height: 20
          }
        }
      },
      MuiTable: {
        styleOverrides: {
          root: {
            borderCollapse: "separate",
            borderSpacing: "0 8px"
          }
        }
      },
      MuiTableCell: {
        styleOverrides: {
          root: {
            borderBottom: "none",
            padding: "12px 16px",
            backgroundColor: colorSystem.white3
          },
          head: ({ theme }) => ({
            fontWeight: theme.typography.fontWeightBold,
            backgroundColor: colorSystem.gray8
          })
        }
      },
      MuiInputLabel: {
        styleOverrides: {
          root: {
            color: colorSystem.gray,
            "&.Mui-focused": {
              color: colorSystem.primary
            }
          }
        }
      }
    }
  });

  const { typography } = theme;
  const { pxToRem, fontWeightBold } = typography;

  function buildTypography(
    css: CSSProperties,
    fontWeight: string | number | null | undefined,
    fontSizeMd: number,
    fontSizeSm: number,
    fontSizeXs: number
  ) {
    Object.assign(css, {
      fontWeight: fontWeight || css.fontWeight,
      fontSize: pxToRem(fontSizeXs),
      [theme.breakpoints.up("sm")]: { fontSize: pxToRem(fontSizeSm) },
      [theme.breakpoints.up("md")]: { fontSize: pxToRem(fontSizeMd) }
    });
  }

  buildTypography(typography.h1, fontWeightBold, 40, 38, 36);
  buildTypography(typography.h2, fontWeightBold, 36, 34, 32);
  buildTypography(typography.h3, fontWeightBold, 32, 30, 28);
  buildTypography(typography.h4, fontWeightBold, 28, 24, 22);
  buildTypography(typography.h5, fontWeightBold, 24, 22, 20);
  buildTypography(typography.h6, fontWeightBold, 20, 19, 18);
  buildTypography(typography.subtitle1, fontWeightBold, 16, 15, 14);
  buildTypography(typography.subtitle2, null, 14, 13, 13);
  buildTypography(typography.body1, null, 16, 15, 14);
  buildTypography(typography.body2, null, 14, 13, 13);
  buildTypography(typography.button, null, 14, 13, 13);
  buildTypography(typography.caption, null, 12, 11, 11);
  buildTypography(typography.overline, null, 12, 11, 11);
  buildTypography(typography.hint, null, 10, 10, 10);
  typography.button.lineHeight = 2;

  theme.drawer = {
    width: 300,
    minimizedWidth: 80
  };

  theme.adminDrawer = {
    width: 80
  };

  theme.list = {
    paddingLeft: "1.5em",
    margin: 0
  };

  return theme;
};

export const GLOBAL_STYLES = {
  "::-webkit-scrollbar": {
    width: "8px"
  },
  "::-webkit-scrollbar-track": {
    opacity: 0
  },
  "::-webkit-scrollbar-thumb": {
    background: colorSystem.blue3,
    borderRadius: "4px"
  },
  "*": {
    scrollbarWidth: "thin",
    scrollbarColor: colorSystem.blue3 + " " + colorSystem.white
  }
};
