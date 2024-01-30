import * as React from 'react';
import React__default, { useEffect, createContext, useRef, useReducer, useState } from 'react';
import styled, { ThemeProvider } from 'styled-components';
import 'mapbox-gl/dist/mapbox-gl.css';
import { BiShow, BiHide, BiBrush, BiEraser, BiMove, BiChevronRight, BiMapAlt, BiLock, BiLockOpen, BiShowAlt, BiNote, BiZoomIn, BiZoomOut } from 'react-icons/bi';
import { GiSewingNeedle } from 'react-icons/gi';
import { HiArrowsExpand } from 'react-icons/hi';
import { RxGroup, RxLayers } from 'react-icons/rx';
import { MdOutlineLabel } from 'react-icons/md';
import { FaArrowCircleLeft, FaArrowCircleRight } from 'react-icons/fa';
import { AxisTop } from '@visx/axis';
import { Group } from '@visx/group';
import { ParentSize } from '@visx/responsive';
import { scaleLinear, scaleBand, scaleOrdinal } from '@visx/scale';
import { BarStackHorizontal, Line } from '@visx/shape';
import mapboxgl from 'mapbox-gl';

/******************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */

function __rest(s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
}

const colors = {
    cream: '#F7F5ED',
    white: '#FFFFFF',
    black: '#000000',
    gray: {
        100: '#fafafa',
        200: '#e4e4e4',
        300: '#c9c9c9',
        400: '#b1b1b1',
        500: '#808080',
        600: '#666666',
        700: '#4d4d4d',
        800: '#333333',
        900: '#242424'
    },
    green: {
        100: '#CFFAD4',
        200: '#BDE4C2',
        300: '#A7C9AB',
        400: '#839E86',
        500: '#6A806C',
        600: '#556657',
        700: '#3F4D41',
        800: '#2A332B',
        900: '#1E241E'
    },
    red: {
        100: '#FA4F00',
        200: '#E44800',
        300: '#C94000',
        400: '#9E3200',
        500: '#802800',
        600: '#662000',
        700: '#4D1800',
        800: '#331000',
        900: '#240B00'
    }
};
const spacing = {
    xs: '10px',
    sm: '16px',
    md: '25px',
    lg: '45px',
    xl: '70px'
};
const shapes = {
    borderRadius: {
        xxs: '1px',
        xs: '2px',
        sm: '5px',
        md: '8px',
        lg: '13px'
    },
    sizes: {
        widths: {
            xs: '100px',
            sm: '160px',
            md: '260px',
            lg: '425px',
            xl: '685px'
        },
        heights: {
            xs: '100px',
            sm: '160px',
            md: '260px',
            lg: '425px',
            xl: '685px'
        },
        vw: {
            20: '20vw',
            40: '40vw',
            60: '60vw',
            80: '80vw',
            100: '100vw'
        },
        vh: {
            20: '20vh',
            40: '40vh',
            60: '60vh',
            80: '80vh',
            100: '100vh'
        }
    }
};
const media = {
    width: {
        xs: '320px',
        sm: '480px',
        md: '768px',
        lg: '1024px',
        xl: '1280px'
    },
    height: {
        xs: '480px',
        sm: '640px',
        md: '768px',
        lg: '1024px',
        xl: '1280px'
    },
    minWidth: {
        xs: '(min-width: 320px)',
        sm: '(min-width: 480px)',
        md: '(min-width: 768px)',
        lg: '(min-width: 1024px)',
        xl: '(min-width: 1280px)'
    },
    orientation: {
        portrait: 'portrait',
        landscape: 'landscape'
    }
};
const type = {
    baseFontSize: '16px',
    baseLineHeight: '1.4',
    fontFamily: {
        secondary: `malaga, "Palatino Linotype", Palatino, Palladio, "URW Palladio L", "Book Antiqua", Baskerville, "Bookman Old Style", "Bitstream Charter", "Nimbus Roman No9 L", Garamond, "Apple Garamond", "ITC Garamond Narrow", "New Century Schoolbook", "Century Schoolbook", "Century Schoolbook L", Georgia, serif;`,
        primary: `source-sans-3, Frutiger, "Frutiger Linotype", Univers, Calibri, "Gill Sans", "Gill Sans MT", "Myriad Pro", Myriad, "DejaVu Sans Condensed", "Liberation Sans", "Nimbus Sans L", Tahoma, Geneva, "Helvetica Neue", Helvetica, Arial, sans-serif;`
    },
    fontSize: {
        xxs: '0.579rem',
        xs: '0.694rem',
        sm: '0.833rem',
        md: '1rem',
        lg: '1.728rem',
        xl: '2.986rem',
        xxl: '3.853rem',
        p: '1rem',
        h6: '0.833rem',
        h5: '1rem',
        h4: '1.44rem',
        h3: '1.728rem',
        h2: '2.074rem',
        h1: '2.488rem'
    },
    fontWeight: {
        100: '100',
        200: '200',
        300: '300',
        400: '400',
        500: '500',
        600: '600',
        700: '700',
        800: '800',
        900: '900'
    },
    lineHeight: {
        xs: '1.1',
        sm: '1.2',
        md: '1.4',
        lg: '1.68'
    }
};
const tables = {
    gaps: {
        xs: '2px',
        sm: '4px',
        md: '8px',
        lg: '16px',
        xl: '32px'
    }
};
const commonProps = {
    colors: colors,
    spacing: spacing,
    shapes: shapes,
    type: type,
    media: media,
    tables: tables
};
const themeLight = Object.assign({ background: colors.cream, foreground: colors.gray[800], fontColor: colors.gray[800], borders: {
        100: `1px solid ${colors.gray[200]}`
    }, shadows: {
        100: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
        200: '0px 4px 4px rgba(0, 0, 0, 0.25)'
    } }, commonProps);
Object.assign({ background: colors.gray[800], foreground: colors.cream, fontColor: colors.white, borders: {
        100: `1px solid ${colors.gray[200]}`
    }, shadows: {
        100: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
        200: '0px 4px 4px rgba(0, 0, 0, 0.25)'
    } }, commonProps);
const DistrictrThemeProvider = ({ children }) => {
    return React.createElement(ThemeProvider, { theme: themeLight }, children);
};

function classNames(...args) {
    if (args) {
        let classes = [];
        for (let i = 0; i < args.length; i++) {
            let className = args[i];
            if (!className)
                continue;
            const type = typeof className;
            if (type === 'string' || type === 'number') {
                classes.push(className);
            }
            else if (type === 'object') {
                const _classes = Array.isArray(className)
                    ? className
                    : Object.entries(className).map(([key, value]) => (!!value ? key : null));
                classes = _classes.length ? classes.concat(_classes.filter((c) => !!c)) : classes;
            }
        }
        return classes.join(' ');
    }
    return undefined;
}

const StyledButton = styled.button `
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 0.5rem;
  border: 1px solid ${(props) => props.theme.colors.green[400]};
  border-radius: 4px;
  background: ${(props) => props.theme.colors.white};
  color: ${(props) => props.theme.foreground};
  cursor: pointer;
  transition: background 0.2s ease-in-out;
  font-size: ${(props) => props.theme.type.fontSize.md};
  font-family: ${(props) => props.theme.type.fontFamily.secondary};
  font-weight: 700;
  font-size: 1rem;
  text-decoration: none;
  line-height: 1;

  &.d-button--small {
    height: 24px;
    min-width: 24px;
    font-family: ${(props) => props.theme.type.fontFamily.primary};
    font-size: ${(props) => props.theme.type.fontSize.sm};
    font-weight: ${(props) => props.theme.type.fontWeight[400]};
  }

  &.d-button--medium {
    height: 36px;
  }

  &.d-button--large {
    height: 48px;
  }

  &.d-button--full-width {
    width: 100%;
  }

  &:active,
  &.d-button--pressed {
    background: ${(props) => props.theme.foreground};
    color: ${(props) => props.theme.background};
  }

  &.d-button--text {
    background: transparent;
    border: none;
    color: ${(props) => props.theme.foreground};
    padding: 0;
    font-family: ${(props) => props.theme.type.fontFamily.primary};
    cursor: pointer;
    transition: transform 0.2s ease-in-out;
  }

  &.d-button--toolbar {
    width: 36px;
    height: 36px;
    padding: 4px;
    background: ${(props) => props.theme.colors.white};

    &.d-button--small {
      width: 24px;
      height: 24px;
      border-radius: ${(props) => props.theme.shapes.borderRadius.xs};
    }

    svg {
      width: 100%;
      height: auto;
    }

    &.d-button--pressed {
      background: ${(props) => props.theme.foreground};
      color: ${(props) => props.theme.background};
      svg {
        fill: ${(props) => props.theme.background};
        width: 100%;
        height: auto;
      }
    }
  }

  &.d-button--swatch {
    width: 24px;
    height: 24px;
    border-radius: 50%;
    transition: transform 0.2s ease-in-out;
  }

  &.d-button--swatch:active,
  &.d-button--swatch.d-button--pressed {
    background: inherit;
    color: inherit;
  }

  &.d-button--toggle {
    border: none;
    background: transparent;
    color: ${(props) => props.theme.foreground};
    padding: 3px;
    cursor: pointer;
    transition: transform 0.2s ease-in-out;
  }

  &.d-button--toggle:active,
  &.d-button--toggle.d-button--pressed {
    background: transparent;
    color: ${(props) => props.theme.foreground};
    transform: rotate(45deg);
  }

  /* When .d-button-swatch is hovered or focused increased the size by 15% */
  &.d-button--swatch:hover,
  &.d-button--swatch:focus {
    transform: scale(1.15);
    cursor: pointer;
  }

  &.d-button--swatch.d-button--pressed {
    transform: scale(1.15);
  }

  &.d-button--primary {
    background: ${(props) => props.theme.colors.green[700]};
    color: ${(props) => props.theme.background};
    border: 3px solid ${(props) => props.theme.colors.green[400]};
    border-radius: 3px;
    font-weight: 600;
    padding: 4px 10px;
  }

  &.d-button--primary svg {
    fill: ${(props) => props.theme.background};
    height: 100%;
    width: auto;
  }
`;
styled.a `
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 0.5rem;
  border: 1px solid ${(props) => props.theme.colors.green[400]};
  border-radius: 4px;
  background: ${(props) => props.theme.background};
  color: ${(props) => props.theme.foreground};
  cursor: pointer;
  transition: background 0.2s ease-in-out;
  font-size: 1rem;
  text-decoration: none;
  line-height: 1;
  font-weight: 400;

  &.d-button--small {
    height: 24px;
  }

  &.d-button--medium {
    height: 36px;
  }

  &.d-button--large {
    height: 48px;
  }

  &.d-button--full-width {
    width: 100%;
  }

  &:active,
  &.d-button--pressed {
    background: ${(props) => props.theme.foreground};
    color: ${(props) => props.theme.background};
  }

  &.d-button--text {
    background: transparent;
    border: none;
    color: ${(props) => props.theme.foreground};
    padding: 0;
    cursor: pointer;
    transition: transform 0.2s ease-in-out;
  }

  &.d-button--toolbar {
    width: 36px;
    height: 36px;
    padding: 4px;
  }

  &.d-button--toolbar svg {
    width: 100%;
    height: auto;
  }

  &.d-button--swatch {
    width: 24px;
    height: 24px;
    border-radius: 50%;
    transition: transform 0.2s ease-in-out;
  }

  &.d-button--swatch:active,
  &.d-button--swatch.d-button--pressed {
    background: inherit;
    color: inherit;
  }

  &.d-button--toggle {
    border: none;
    background: transparent;
    color: ${(props) => props.theme.foreground};
    padding: 3px;
    cursor: pointer;
    transition: transform 0.2s ease-in-out;
  }

  &.d-button--toggle:active,
  &.d-button--toggle.d-button--pressed {
    background: transparent;
    color: ${(props) => props.theme.foreground};
    transform: rotate(45deg);
  }

  /* When .d-button-swatch is hovered or focused increased the size by 15% */
  &.d-button--swatch:hover,
  &.d-button--swatch:focus {
    transform: scale(1.15);
    cursor: pointer;
  }

  &.d-button--swatch.d-button--pressed {
    transform: scale(1.15);
  }

  &.d-button--primary {
    background: ${(props) => props.theme.colors.green[700]};
    color: ${(props) => props.theme.background};
    border: 3px solid ${(props) => props.theme.colors.green[400]};
    border-radius: 3px;
    font-weight: 600;
    padding: 4px 10px;
  }

  &.d-button--primary svg {
    fill: ${(props) => props.theme.background};
    height: 100%;
    width: auto;
  }
`;

const DEFAULT_SIZE = 'medium';
const DEFAULT_VARIANT = 'primary';
const DEFAULT_TEXTALIGN = 'center';
const Button = (_a) => {
    var { children, className, size = DEFAULT_SIZE, variant = DEFAULT_VARIANT, textAlign = DEFAULT_TEXTALIGN, fullWidth, href, icon, id, url, external, submit, disabled, loading, pressed, accessibilityLabel, role, ariaControls, ariaExpanded, ariaDescribedBy, ariaChecked, style, onClick, onFocus, onBlur, onMouseEnter, onTouchStart, onPointerDown, onKeyPress, onKeyUp, onKeyDown } = _a; __rest(_a, ["children", "className", "size", "variant", "textAlign", "fullWidth", "href", "icon", "id", "url", "external", "submit", "disabled", "loading", "pressed", "accessibilityLabel", "role", "ariaControls", "ariaExpanded", "ariaDescribedBy", "ariaChecked", "style", "onClick", "onFocus", "onBlur", "onMouseEnter", "onTouchStart", "onPointerDown", "onKeyPress", "onKeyUp", "onKeyDown"]);
    const classes = classNames('d-button', size && `d-button--${size}`, variant && `d-button--${variant}`, textAlign && `d-button--${textAlign}`, fullWidth && 'd-button--full-width', disabled && 'd-button--disabled', loading && 'd-button--loading', pressed && 'd-button--pressed', className);
    if (href) {
        return (React__default.createElement("a", { "data-testid": "Button", className: classes, id: id, href: href, role: role, "aria-label": accessibilityLabel, "aria-controls": ariaControls, "aria-expanded": ariaExpanded, "aria-describedby": ariaDescribedBy, "aria-checked": ariaChecked, onClick: onClick, onFocus: onFocus, onBlur: onBlur, onMouseEnter: onMouseEnter, onTouchStart: onTouchStart, onPointerDown: onPointerDown, tabIndex: disabled ? -1 : undefined, style: style }, children));
    }
    else {
        return (React__default.createElement(DistrictrThemeProvider, null,
            React__default.createElement(StyledButton, { "data-testid": "Button", className: classes, id: id, type: submit ? 'submit' : 'button', disabled: disabled, role: role, "aria-label": accessibilityLabel, "aria-controls": ariaControls, "aria-expanded": ariaExpanded, "aria-describedby": ariaDescribedBy, "aria-checked": ariaChecked, onClick: onClick, onFocus: onFocus, onBlur: onBlur, onMouseEnter: onMouseEnter, onTouchStart: onTouchStart, onPointerDown: onPointerDown, onKeyUp: onKeyUp, onKeyDown: onKeyDown, tabIndex: disabled ? -1 : undefined, style: style }, children)));
    }
};

var schemes = {
    districtr: {
        id: 'districtr',
        name: 'Districtr',
        description: 'A web app for drawing districting plans.',
        author: 'Districtr Team',
        url: 'https://districtr.org',
        type: 'schemes',
        schemeGroups: {
            qualitative: ['Classic', 'Core']
        },
        schemes: {
            Classic: {
                '0': [
                    '#0099cd',
                    '#ffca5d',
                    '#00cd99',
                    '#99cd00',
                    '#cd0099',
                    '#aa44ef',
                    '#8dd3c7',
                    '#bebada',
                    '#fb8072',
                    '#80b1d3',
                    '#fdb462',
                    '#b3de69',
                    '#fccde5',
                    '#bc80bd',
                    '#ccebc5',
                    '#ffed6f',
                    '#ffffb3',
                    '#a6cee3',
                    '#1f78b4',
                    '#b2df8a',
                    '#33a02c',
                    '#fb9a99',
                    '#e31a1c',
                    '#fdbf6f',
                    '#ff7f00',
                    '#cab2d6',
                    '#6a3d9a',
                    '#b15928',
                    '#64ffda',
                    '#00B8D4',
                    '#A1887F',
                    '#76FF03',
                    '#DCE775',
                    '#B388FF',
                    '#FF80AB',
                    '#D81B60',
                    '#26A69A',
                    '#FFEA00',
                    '#6200EA'
                ]
            },
            Core: {
                '0': ['#0099cd', '#ffca5d', '#00cd99', '#99cd00', '#cd0099', '#aa44ef']
            }
        }
    },
    colorBrewer: {
        id: 'colorBrewer',
        name: 'Color Brewer',
        description: 'Color Brewer is a tool for selecting color schemes for maps and data visualizations. It was developed by Cynthia Brewer (former Cartographer at ESRI) at Pennsylvania State University.',
        url: 'http://colorbrewer2.org/',
        type: 'schemes',
        schemeGroups: {
            sequential: [
                'BuGn',
                'BuPu',
                'GnBu',
                'OrRd',
                'PuBu',
                'PuBuGn',
                'PuRd',
                'RdPu',
                'YlGn',
                'YlGnBu',
                'YlOrBr',
                'YlOrRd'
            ],
            singlehue: ['Blues', 'Greens', 'Greys', 'Oranges', 'Purples', 'Reds'],
            diverging: ['BrBG', 'PiYG', 'PRGn', 'PuOr', 'RdBu', 'RdGy', 'RdYlBu', 'RdYlGn', 'Spectral'],
            qualitative: ['Accent', 'Dark2', 'Paired', 'Pastel1', 'Pastel2', 'Set1', 'Set2', 'Set3']
        },
        schemes: {
            YlGn: {
                '3': ['#f7fcb9', '#addd8e', '#31a354'],
                '4': ['#ffffcc', '#c2e699', '#78c679', '#238443'],
                '5': ['#ffffcc', '#c2e699', '#78c679', '#31a354', '#006837'],
                '6': ['#ffffcc', '#d9f0a3', '#addd8e', '#78c679', '#31a354', '#006837'],
                '7': ['#ffffcc', '#d9f0a3', '#addd8e', '#78c679', '#41ab5d', '#238443', '#005a32'],
                '8': ['#ffffe5', '#f7fcb9', '#d9f0a3', '#addd8e', '#78c679', '#41ab5d', '#238443', '#005a32'],
                '9': ['#ffffe5', '#f7fcb9', '#d9f0a3', '#addd8e', '#78c679', '#41ab5d', '#238443', '#006837', '#004529']
            },
            YlGnBu: {
                '3': ['#edf8b1', '#7fcdbb', '#2c7fb8'],
                '4': ['#ffffcc', '#a1dab4', '#41b6c4', '#225ea8'],
                '5': ['#ffffcc', '#a1dab4', '#41b6c4', '#2c7fb8', '#253494'],
                '6': ['#ffffcc', '#c7e9b4', '#7fcdbb', '#41b6c4', '#2c7fb8', '#253494'],
                '7': ['#ffffcc', '#c7e9b4', '#7fcdbb', '#41b6c4', '#1d91c0', '#225ea8', '#0c2c84'],
                '8': ['#ffffd9', '#edf8b1', '#c7e9b4', '#7fcdbb', '#41b6c4', '#1d91c0', '#225ea8', '#0c2c84'],
                '9': ['#ffffd9', '#edf8b1', '#c7e9b4', '#7fcdbb', '#41b6c4', '#1d91c0', '#225ea8', '#253494', '#081d58']
            },
            GnBu: {
                '3': ['#e0f3db', '#a8ddb5', '#43a2ca'],
                '4': ['#f0f9e8', '#bae4bc', '#7bccc4', '#2b8cbe'],
                '5': ['#f0f9e8', '#bae4bc', '#7bccc4', '#43a2ca', '#0868ac'],
                '6': ['#f0f9e8', '#ccebc5', '#a8ddb5', '#7bccc4', '#43a2ca', '#0868ac'],
                '7': ['#f0f9e8', '#ccebc5', '#a8ddb5', '#7bccc4', '#4eb3d3', '#2b8cbe', '#08589e'],
                '8': ['#f7fcf0', '#e0f3db', '#ccebc5', '#a8ddb5', '#7bccc4', '#4eb3d3', '#2b8cbe', '#08589e'],
                '9': ['#f7fcf0', '#e0f3db', '#ccebc5', '#a8ddb5', '#7bccc4', '#4eb3d3', '#2b8cbe', '#0868ac', '#084081']
            },
            BuGn: {
                '3': ['#e5f5f9', '#99d8c9', '#2ca25f'],
                '4': ['#edf8fb', '#b2e2e2', '#66c2a4', '#238b45'],
                '5': ['#edf8fb', '#b2e2e2', '#66c2a4', '#2ca25f', '#006d2c'],
                '6': ['#edf8fb', '#ccece6', '#99d8c9', '#66c2a4', '#2ca25f', '#006d2c'],
                '7': ['#edf8fb', '#ccece6', '#99d8c9', '#66c2a4', '#41ae76', '#238b45', '#005824'],
                '8': ['#f7fcfd', '#e5f5f9', '#ccece6', '#99d8c9', '#66c2a4', '#41ae76', '#238b45', '#005824'],
                '9': ['#f7fcfd', '#e5f5f9', '#ccece6', '#99d8c9', '#66c2a4', '#41ae76', '#238b45', '#006d2c', '#00441b']
            },
            PuBuGn: {
                '3': ['#ece2f0', '#a6bddb', '#1c9099'],
                '4': ['#f6eff7', '#bdc9e1', '#67a9cf', '#02818a'],
                '5': ['#f6eff7', '#bdc9e1', '#67a9cf', '#1c9099', '#016c59'],
                '6': ['#f6eff7', '#d0d1e6', '#a6bddb', '#67a9cf', '#1c9099', '#016c59'],
                '7': ['#f6eff7', '#d0d1e6', '#a6bddb', '#67a9cf', '#3690c0', '#02818a', '#016450'],
                '8': ['#fff7fb', '#ece2f0', '#d0d1e6', '#a6bddb', '#67a9cf', '#3690c0', '#02818a', '#016450'],
                '9': ['#fff7fb', '#ece2f0', '#d0d1e6', '#a6bddb', '#67a9cf', '#3690c0', '#02818a', '#016c59', '#014636']
            },
            PuBu: {
                '3': ['#ece7f2', '#a6bddb', '#2b8cbe'],
                '4': ['#f1eef6', '#bdc9e1', '#74a9cf', '#0570b0'],
                '5': ['#f1eef6', '#bdc9e1', '#74a9cf', '#2b8cbe', '#045a8d'],
                '6': ['#f1eef6', '#d0d1e6', '#a6bddb', '#74a9cf', '#2b8cbe', '#045a8d'],
                '7': ['#f1eef6', '#d0d1e6', '#a6bddb', '#74a9cf', '#3690c0', '#0570b0', '#034e7b'],
                '8': ['#fff7fb', '#ece7f2', '#d0d1e6', '#a6bddb', '#74a9cf', '#3690c0', '#0570b0', '#034e7b'],
                '9': ['#fff7fb', '#ece7f2', '#d0d1e6', '#a6bddb', '#74a9cf', '#3690c0', '#0570b0', '#045a8d', '#023858']
            },
            BuPu: {
                '3': ['#e0ecf4', '#9ebcda', '#8856a7'],
                '4': ['#edf8fb', '#b3cde3', '#8c96c6', '#88419d'],
                '5': ['#edf8fb', '#b3cde3', '#8c96c6', '#8856a7', '#810f7c'],
                '6': ['#edf8fb', '#bfd3e6', '#9ebcda', '#8c96c6', '#8856a7', '#810f7c'],
                '7': ['#edf8fb', '#bfd3e6', '#9ebcda', '#8c96c6', '#8c6bb1', '#88419d', '#6e016b'],
                '8': ['#f7fcfd', '#e0ecf4', '#bfd3e6', '#9ebcda', '#8c96c6', '#8c6bb1', '#88419d', '#6e016b'],
                '9': ['#f7fcfd', '#e0ecf4', '#bfd3e6', '#9ebcda', '#8c96c6', '#8c6bb1', '#88419d', '#810f7c', '#4d004b']
            },
            RdPu: {
                '3': ['#fde0dd', '#fa9fb5', '#c51b8a'],
                '4': ['#feebe2', '#fbb4b9', '#f768a1', '#ae017e'],
                '5': ['#feebe2', '#fbb4b9', '#f768a1', '#c51b8a', '#7a0177'],
                '6': ['#feebe2', '#fcc5c0', '#fa9fb5', '#f768a1', '#c51b8a', '#7a0177'],
                '7': ['#feebe2', '#fcc5c0', '#fa9fb5', '#f768a1', '#dd3497', '#ae017e', '#7a0177'],
                '8': ['#fff7f3', '#fde0dd', '#fcc5c0', '#fa9fb5', '#f768a1', '#dd3497', '#ae017e', '#7a0177'],
                '9': ['#fff7f3', '#fde0dd', '#fcc5c0', '#fa9fb5', '#f768a1', '#dd3497', '#ae017e', '#7a0177', '#49006a']
            },
            PuRd: {
                '3': ['#e7e1ef', '#c994c7', '#dd1c77'],
                '4': ['#f1eef6', '#d7b5d8', '#df65b0', '#ce1256'],
                '5': ['#f1eef6', '#d7b5d8', '#df65b0', '#dd1c77', '#980043'],
                '6': ['#f1eef6', '#d4b9da', '#c994c7', '#df65b0', '#dd1c77', '#980043'],
                '7': ['#f1eef6', '#d4b9da', '#c994c7', '#df65b0', '#e7298a', '#ce1256', '#91003f'],
                '8': ['#f7f4f9', '#e7e1ef', '#d4b9da', '#c994c7', '#df65b0', '#e7298a', '#ce1256', '#91003f'],
                '9': ['#f7f4f9', '#e7e1ef', '#d4b9da', '#c994c7', '#df65b0', '#e7298a', '#ce1256', '#980043', '#67001f']
            },
            OrRd: {
                '3': ['#fee8c8', '#fdbb84', '#e34a33'],
                '4': ['#fef0d9', '#fdcc8a', '#fc8d59', '#d7301f'],
                '5': ['#fef0d9', '#fdcc8a', '#fc8d59', '#e34a33', '#b30000'],
                '6': ['#fef0d9', '#fdd49e', '#fdbb84', '#fc8d59', '#e34a33', '#b30000'],
                '7': ['#fef0d9', '#fdd49e', '#fdbb84', '#fc8d59', '#ef6548', '#d7301f', '#990000'],
                '8': ['#fff7ec', '#fee8c8', '#fdd49e', '#fdbb84', '#fc8d59', '#ef6548', '#d7301f', '#990000'],
                '9': ['#fff7ec', '#fee8c8', '#fdd49e', '#fdbb84', '#fc8d59', '#ef6548', '#d7301f', '#b30000', '#7f0000']
            },
            YlOrRd: {
                '3': ['#ffeda0', '#feb24c', '#f03b20'],
                '4': ['#ffffb2', '#fecc5c', '#fd8d3c', '#e31a1c'],
                '5': ['#ffffb2', '#fecc5c', '#fd8d3c', '#f03b20', '#bd0026'],
                '6': ['#ffffb2', '#fed976', '#feb24c', '#fd8d3c', '#f03b20', '#bd0026'],
                '7': ['#ffffb2', '#fed976', '#feb24c', '#fd8d3c', '#fc4e2a', '#e31a1c', '#b10026'],
                '8': ['#ffffcc', '#ffeda0', '#fed976', '#feb24c', '#fd8d3c', '#fc4e2a', '#e31a1c', '#b10026'],
                '9': ['#ffffcc', '#ffeda0', '#fed976', '#feb24c', '#fd8d3c', '#fc4e2a', '#e31a1c', '#bd0026', '#800026']
            },
            YlOrBr: {
                '3': ['#fff7bc', '#fec44f', '#d95f0e'],
                '4': ['#ffffd4', '#fed98e', '#fe9929', '#cc4c02'],
                '5': ['#ffffd4', '#fed98e', '#fe9929', '#d95f0e', '#993404'],
                '6': ['#ffffd4', '#fee391', '#fec44f', '#fe9929', '#d95f0e', '#993404'],
                '7': ['#ffffd4', '#fee391', '#fec44f', '#fe9929', '#ec7014', '#cc4c02', '#8c2d04'],
                '8': ['#ffffe5', '#fff7bc', '#fee391', '#fec44f', '#fe9929', '#ec7014', '#cc4c02', '#8c2d04'],
                '9': ['#ffffe5', '#fff7bc', '#fee391', '#fec44f', '#fe9929', '#ec7014', '#cc4c02', '#993404', '#662506']
            },
            Purples: {
                '3': ['#efedf5', '#bcbddc', '#756bb1'],
                '4': ['#f2f0f7', '#cbc9e2', '#9e9ac8', '#6a51a3'],
                '5': ['#f2f0f7', '#cbc9e2', '#9e9ac8', '#756bb1', '#54278f'],
                '6': ['#f2f0f7', '#dadaeb', '#bcbddc', '#9e9ac8', '#756bb1', '#54278f'],
                '7': ['#f2f0f7', '#dadaeb', '#bcbddc', '#9e9ac8', '#807dba', '#6a51a3', '#4a1486'],
                '8': ['#fcfbfd', '#efedf5', '#dadaeb', '#bcbddc', '#9e9ac8', '#807dba', '#6a51a3', '#4a1486'],
                '9': ['#fcfbfd', '#efedf5', '#dadaeb', '#bcbddc', '#9e9ac8', '#807dba', '#6a51a3', '#54278f', '#3f007d']
            },
            Blues: {
                '3': ['#deebf7', '#9ecae1', '#3182bd'],
                '4': ['#eff3ff', '#bdd7e7', '#6baed6', '#2171b5'],
                '5': ['#eff3ff', '#bdd7e7', '#6baed6', '#3182bd', '#08519c'],
                '6': ['#eff3ff', '#c6dbef', '#9ecae1', '#6baed6', '#3182bd', '#08519c'],
                '7': ['#eff3ff', '#c6dbef', '#9ecae1', '#6baed6', '#4292c6', '#2171b5', '#084594'],
                '8': ['#f7fbff', '#deebf7', '#c6dbef', '#9ecae1', '#6baed6', '#4292c6', '#2171b5', '#084594'],
                '9': ['#f7fbff', '#deebf7', '#c6dbef', '#9ecae1', '#6baed6', '#4292c6', '#2171b5', '#08519c', '#08306b']
            },
            Greens: {
                '3': ['#e5f5e0', '#a1d99b', '#31a354'],
                '4': ['#edf8e9', '#bae4b3', '#74c476', '#238b45'],
                '5': ['#edf8e9', '#bae4b3', '#74c476', '#31a354', '#006d2c'],
                '6': ['#edf8e9', '#c7e9c0', '#a1d99b', '#74c476', '#31a354', '#006d2c'],
                '7': ['#edf8e9', '#c7e9c0', '#a1d99b', '#74c476', '#41ab5d', '#238b45', '#005a32'],
                '8': ['#f7fcf5', '#e5f5e0', '#c7e9c0', '#a1d99b', '#74c476', '#41ab5d', '#238b45', '#005a32'],
                '9': ['#f7fcf5', '#e5f5e0', '#c7e9c0', '#a1d99b', '#74c476', '#41ab5d', '#238b45', '#006d2c', '#00441b']
            },
            Oranges: {
                '3': ['#fee6ce', '#fdae6b', '#e6550d'],
                '4': ['#feedde', '#fdbe85', '#fd8d3c', '#d94701'],
                '5': ['#feedde', '#fdbe85', '#fd8d3c', '#e6550d', '#a63603'],
                '6': ['#feedde', '#fdd0a2', '#fdae6b', '#fd8d3c', '#e6550d', '#a63603'],
                '7': ['#feedde', '#fdd0a2', '#fdae6b', '#fd8d3c', '#f16913', '#d94801', '#8c2d04'],
                '8': ['#fff5eb', '#fee6ce', '#fdd0a2', '#fdae6b', '#fd8d3c', '#f16913', '#d94801', '#8c2d04'],
                '9': ['#fff5eb', '#fee6ce', '#fdd0a2', '#fdae6b', '#fd8d3c', '#f16913', '#d94801', '#a63603', '#7f2704']
            },
            Reds: {
                '3': ['#fee0d2', '#fc9272', '#de2d26'],
                '4': ['#fee5d9', '#fcae91', '#fb6a4a', '#cb181d'],
                '5': ['#fee5d9', '#fcae91', '#fb6a4a', '#de2d26', '#a50f15'],
                '6': ['#fee5d9', '#fcbba1', '#fc9272', '#fb6a4a', '#de2d26', '#a50f15'],
                '7': ['#fee5d9', '#fcbba1', '#fc9272', '#fb6a4a', '#ef3b2c', '#cb181d', '#99000d'],
                '8': ['#fff5f0', '#fee0d2', '#fcbba1', '#fc9272', '#fb6a4a', '#ef3b2c', '#cb181d', '#99000d'],
                '9': ['#fff5f0', '#fee0d2', '#fcbba1', '#fc9272', '#fb6a4a', '#ef3b2c', '#cb181d', '#a50f15', '#67000d']
            },
            Greys: {
                '3': ['#f0f0f0', '#bdbdbd', '#636363'],
                '4': ['#f7f7f7', '#cccccc', '#969696', '#525252'],
                '5': ['#f7f7f7', '#cccccc', '#969696', '#636363', '#252525'],
                '6': ['#f7f7f7', '#d9d9d9', '#bdbdbd', '#969696', '#636363', '#252525'],
                '7': ['#f7f7f7', '#d9d9d9', '#bdbdbd', '#969696', '#737373', '#525252', '#252525'],
                '8': ['#ffffff', '#f0f0f0', '#d9d9d9', '#bdbdbd', '#969696', '#737373', '#525252', '#252525'],
                '9': ['#ffffff', '#f0f0f0', '#d9d9d9', '#bdbdbd', '#969696', '#737373', '#525252', '#252525', '#000000']
            },
            PuOr: {
                '3': ['#f1a340', '#f7f7f7', '#998ec3'],
                '4': ['#e66101', '#fdb863', '#b2abd2', '#5e3c99'],
                '5': ['#e66101', '#fdb863', '#f7f7f7', '#b2abd2', '#5e3c99'],
                '6': ['#b35806', '#f1a340', '#fee0b6', '#d8daeb', '#998ec3', '#542788'],
                '7': ['#b35806', '#f1a340', '#fee0b6', '#f7f7f7', '#d8daeb', '#998ec3', '#542788'],
                '8': ['#b35806', '#e08214', '#fdb863', '#fee0b6', '#d8daeb', '#b2abd2', '#8073ac', '#542788'],
                '9': ['#b35806', '#e08214', '#fdb863', '#fee0b6', '#f7f7f7', '#d8daeb', '#b2abd2', '#8073ac', '#542788'],
                '10': [
                    '#7f3b08',
                    '#b35806',
                    '#e08214',
                    '#fdb863',
                    '#fee0b6',
                    '#d8daeb',
                    '#b2abd2',
                    '#8073ac',
                    '#542788',
                    '#2d004b'
                ],
                '11': [
                    '#7f3b08',
                    '#b35806',
                    '#e08214',
                    '#fdb863',
                    '#fee0b6',
                    '#f7f7f7',
                    '#d8daeb',
                    '#b2abd2',
                    '#8073ac',
                    '#542788',
                    '#2d004b'
                ]
            },
            BrBG: {
                '3': ['#d8b365', '#f5f5f5', '#5ab4ac'],
                '4': ['#a6611a', '#dfc27d', '#80cdc1', '#018571'],
                '5': ['#a6611a', '#dfc27d', '#f5f5f5', '#80cdc1', '#018571'],
                '6': ['#8c510a', '#d8b365', '#f6e8c3', '#c7eae5', '#5ab4ac', '#01665e'],
                '7': ['#8c510a', '#d8b365', '#f6e8c3', '#f5f5f5', '#c7eae5', '#5ab4ac', '#01665e'],
                '8': ['#8c510a', '#bf812d', '#dfc27d', '#f6e8c3', '#c7eae5', '#80cdc1', '#35978f', '#01665e'],
                '9': ['#8c510a', '#bf812d', '#dfc27d', '#f6e8c3', '#f5f5f5', '#c7eae5', '#80cdc1', '#35978f', '#01665e'],
                '10': [
                    '#543005',
                    '#8c510a',
                    '#bf812d',
                    '#dfc27d',
                    '#f6e8c3',
                    '#c7eae5',
                    '#80cdc1',
                    '#35978f',
                    '#01665e',
                    '#003c30'
                ],
                '11': [
                    '#543005',
                    '#8c510a',
                    '#bf812d',
                    '#dfc27d',
                    '#f6e8c3',
                    '#f5f5f5',
                    '#c7eae5',
                    '#80cdc1',
                    '#35978f',
                    '#01665e',
                    '#003c30'
                ]
            },
            PRGn: {
                '3': ['#af8dc3', '#f7f7f7', '#7fbf7b'],
                '4': ['#7b3294', '#c2a5cf', '#a6dba0', '#008837'],
                '5': ['#7b3294', '#c2a5cf', '#f7f7f7', '#a6dba0', '#008837'],
                '6': ['#762a83', '#af8dc3', '#e7d4e8', '#d9f0d3', '#7fbf7b', '#1b7837'],
                '7': ['#762a83', '#af8dc3', '#e7d4e8', '#f7f7f7', '#d9f0d3', '#7fbf7b', '#1b7837'],
                '8': ['#762a83', '#9970ab', '#c2a5cf', '#e7d4e8', '#d9f0d3', '#a6dba0', '#5aae61', '#1b7837'],
                '9': ['#762a83', '#9970ab', '#c2a5cf', '#e7d4e8', '#f7f7f7', '#d9f0d3', '#a6dba0', '#5aae61', '#1b7837'],
                '10': [
                    '#40004b',
                    '#762a83',
                    '#9970ab',
                    '#c2a5cf',
                    '#e7d4e8',
                    '#d9f0d3',
                    '#a6dba0',
                    '#5aae61',
                    '#1b7837',
                    '#00441b'
                ],
                '11': [
                    '#40004b',
                    '#762a83',
                    '#9970ab',
                    '#c2a5cf',
                    '#e7d4e8',
                    '#f7f7f7',
                    '#d9f0d3',
                    '#a6dba0',
                    '#5aae61',
                    '#1b7837',
                    '#00441b'
                ]
            },
            PiYG: {
                '3': ['#e9a3c9', '#f7f7f7', '#a1d76a'],
                '4': ['#d01c8b', '#f1b6da', '#b8e186', '#4dac26'],
                '5': ['#d01c8b', '#f1b6da', '#f7f7f7', '#b8e186', '#4dac26'],
                '6': ['#c51b7d', '#e9a3c9', '#fde0ef', '#e6f5d0', '#a1d76a', '#4d9221'],
                '7': ['#c51b7d', '#e9a3c9', '#fde0ef', '#f7f7f7', '#e6f5d0', '#a1d76a', '#4d9221'],
                '8': ['#c51b7d', '#de77ae', '#f1b6da', '#fde0ef', '#e6f5d0', '#b8e186', '#7fbc41', '#4d9221'],
                '9': ['#c51b7d', '#de77ae', '#f1b6da', '#fde0ef', '#f7f7f7', '#e6f5d0', '#b8e186', '#7fbc41', '#4d9221'],
                '10': [
                    '#8e0152',
                    '#c51b7d',
                    '#de77ae',
                    '#f1b6da',
                    '#fde0ef',
                    '#e6f5d0',
                    '#b8e186',
                    '#7fbc41',
                    '#4d9221',
                    '#276419'
                ],
                '11': [
                    '#8e0152',
                    '#c51b7d',
                    '#de77ae',
                    '#f1b6da',
                    '#fde0ef',
                    '#f7f7f7',
                    '#e6f5d0',
                    '#b8e186',
                    '#7fbc41',
                    '#4d9221',
                    '#276419'
                ]
            },
            RdBu: {
                '3': ['#ef8a62', '#f7f7f7', '#67a9cf'],
                '4': ['#ca0020', '#f4a582', '#92c5de', '#0571b0'],
                '5': ['#ca0020', '#f4a582', '#f7f7f7', '#92c5de', '#0571b0'],
                '6': ['#b2182b', '#ef8a62', '#fddbc7', '#d1e5f0', '#67a9cf', '#2166ac'],
                '7': ['#b2182b', '#ef8a62', '#fddbc7', '#f7f7f7', '#d1e5f0', '#67a9cf', '#2166ac'],
                '8': ['#b2182b', '#d6604d', '#f4a582', '#fddbc7', '#d1e5f0', '#92c5de', '#4393c3', '#2166ac'],
                '9': ['#b2182b', '#d6604d', '#f4a582', '#fddbc7', '#f7f7f7', '#d1e5f0', '#92c5de', '#4393c3', '#2166ac'],
                '10': [
                    '#67001f',
                    '#b2182b',
                    '#d6604d',
                    '#f4a582',
                    '#fddbc7',
                    '#d1e5f0',
                    '#92c5de',
                    '#4393c3',
                    '#2166ac',
                    '#053061'
                ],
                '11': [
                    '#67001f',
                    '#b2182b',
                    '#d6604d',
                    '#f4a582',
                    '#fddbc7',
                    '#f7f7f7',
                    '#d1e5f0',
                    '#92c5de',
                    '#4393c3',
                    '#2166ac',
                    '#053061'
                ]
            },
            RdGy: {
                '3': ['#ef8a62', '#ffffff', '#999999'],
                '4': ['#ca0020', '#f4a582', '#bababa', '#404040'],
                '5': ['#ca0020', '#f4a582', '#ffffff', '#bababa', '#404040'],
                '6': ['#b2182b', '#ef8a62', '#fddbc7', '#e0e0e0', '#999999', '#4d4d4d'],
                '7': ['#b2182b', '#ef8a62', '#fddbc7', '#ffffff', '#e0e0e0', '#999999', '#4d4d4d'],
                '8': ['#b2182b', '#d6604d', '#f4a582', '#fddbc7', '#e0e0e0', '#bababa', '#878787', '#4d4d4d'],
                '9': ['#b2182b', '#d6604d', '#f4a582', '#fddbc7', '#ffffff', '#e0e0e0', '#bababa', '#878787', '#4d4d4d'],
                '10': [
                    '#67001f',
                    '#b2182b',
                    '#d6604d',
                    '#f4a582',
                    '#fddbc7',
                    '#e0e0e0',
                    '#bababa',
                    '#878787',
                    '#4d4d4d',
                    '#1a1a1a'
                ],
                '11': [
                    '#67001f',
                    '#b2182b',
                    '#d6604d',
                    '#f4a582',
                    '#fddbc7',
                    '#ffffff',
                    '#e0e0e0',
                    '#bababa',
                    '#878787',
                    '#4d4d4d',
                    '#1a1a1a'
                ]
            },
            RdYlBu: {
                '3': ['#fc8d59', '#ffffbf', '#91bfdb'],
                '4': ['#d7191c', '#fdae61', '#abd9e9', '#2c7bb6'],
                '5': ['#d7191c', '#fdae61', '#ffffbf', '#abd9e9', '#2c7bb6'],
                '6': ['#d73027', '#fc8d59', '#fee090', '#e0f3f8', '#91bfdb', '#4575b4'],
                '7': ['#d73027', '#fc8d59', '#fee090', '#ffffbf', '#e0f3f8', '#91bfdb', '#4575b4'],
                '8': ['#d73027', '#f46d43', '#fdae61', '#fee090', '#e0f3f8', '#abd9e9', '#74add1', '#4575b4'],
                '9': ['#d73027', '#f46d43', '#fdae61', '#fee090', '#ffffbf', '#e0f3f8', '#abd9e9', '#74add1', '#4575b4'],
                '10': [
                    '#a50026',
                    '#d73027',
                    '#f46d43',
                    '#fdae61',
                    '#fee090',
                    '#e0f3f8',
                    '#abd9e9',
                    '#74add1',
                    '#4575b4',
                    '#313695'
                ],
                '11': [
                    '#a50026',
                    '#d73027',
                    '#f46d43',
                    '#fdae61',
                    '#fee090',
                    '#ffffbf',
                    '#e0f3f8',
                    '#abd9e9',
                    '#74add1',
                    '#4575b4',
                    '#313695'
                ]
            },
            Spectral: {
                '3': ['#fc8d59', '#ffffbf', '#99d594'],
                '4': ['#d7191c', '#fdae61', '#abdda4', '#2b83ba'],
                '5': ['#d7191c', '#fdae61', '#ffffbf', '#abdda4', '#2b83ba'],
                '6': ['#d53e4f', '#fc8d59', '#fee08b', '#e6f598', '#99d594', '#3288bd'],
                '7': ['#d53e4f', '#fc8d59', '#fee08b', '#ffffbf', '#e6f598', '#99d594', '#3288bd'],
                '8': ['#d53e4f', '#f46d43', '#fdae61', '#fee08b', '#e6f598', '#abdda4', '#66c2a5', '#3288bd'],
                '9': ['#d53e4f', '#f46d43', '#fdae61', '#fee08b', '#ffffbf', '#e6f598', '#abdda4', '#66c2a5', '#3288bd'],
                '10': [
                    '#9e0142',
                    '#d53e4f',
                    '#f46d43',
                    '#fdae61',
                    '#fee08b',
                    '#e6f598',
                    '#abdda4',
                    '#66c2a5',
                    '#3288bd',
                    '#5e4fa2'
                ],
                '11': [
                    '#9e0142',
                    '#d53e4f',
                    '#f46d43',
                    '#fdae61',
                    '#fee08b',
                    '#ffffbf',
                    '#e6f598',
                    '#abdda4',
                    '#66c2a5',
                    '#3288bd',
                    '#5e4fa2'
                ]
            },
            RdYlGn: {
                '3': ['#fc8d59', '#ffffbf', '#91cf60'],
                '4': ['#d7191c', '#fdae61', '#a6d96a', '#1a9641'],
                '5': ['#d7191c', '#fdae61', '#ffffbf', '#a6d96a', '#1a9641'],
                '6': ['#d73027', '#fc8d59', '#fee08b', '#d9ef8b', '#91cf60', '#1a9850'],
                '7': ['#d73027', '#fc8d59', '#fee08b', '#ffffbf', '#d9ef8b', '#91cf60', '#1a9850'],
                '8': ['#d73027', '#f46d43', '#fdae61', '#fee08b', '#d9ef8b', '#a6d96a', '#66bd63', '#1a9850'],
                '9': ['#d73027', '#f46d43', '#fdae61', '#fee08b', '#ffffbf', '#d9ef8b', '#a6d96a', '#66bd63', '#1a9850'],
                '10': [
                    '#a50026',
                    '#d73027',
                    '#f46d43',
                    '#fdae61',
                    '#fee08b',
                    '#d9ef8b',
                    '#a6d96a',
                    '#66bd63',
                    '#1a9850',
                    '#006837'
                ],
                '11': [
                    '#a50026',
                    '#d73027',
                    '#f46d43',
                    '#fdae61',
                    '#fee08b',
                    '#ffffbf',
                    '#d9ef8b',
                    '#a6d96a',
                    '#66bd63',
                    '#1a9850',
                    '#006837'
                ]
            },
            Accent: {
                '3': ['#7fc97f', '#beaed4', '#fdc086'],
                '4': ['#7fc97f', '#beaed4', '#fdc086', '#ffff99'],
                '5': ['#7fc97f', '#beaed4', '#fdc086', '#ffff99', '#386cb0'],
                '6': ['#7fc97f', '#beaed4', '#fdc086', '#ffff99', '#386cb0', '#f0027f'],
                '7': ['#7fc97f', '#beaed4', '#fdc086', '#ffff99', '#386cb0', '#f0027f', '#bf5b17'],
                '8': ['#7fc97f', '#beaed4', '#fdc086', '#ffff99', '#386cb0', '#f0027f', '#bf5b17', '#666666']
            },
            Dark2: {
                '3': ['#1b9e77', '#d95f02', '#7570b3'],
                '4': ['#1b9e77', '#d95f02', '#7570b3', '#e7298a'],
                '5': ['#1b9e77', '#d95f02', '#7570b3', '#e7298a', '#66a61e'],
                '6': ['#1b9e77', '#d95f02', '#7570b3', '#e7298a', '#66a61e', '#e6ab02'],
                '7': ['#1b9e77', '#d95f02', '#7570b3', '#e7298a', '#66a61e', '#e6ab02', '#a6761d'],
                '8': ['#1b9e77', '#d95f02', '#7570b3', '#e7298a', '#66a61e', '#e6ab02', '#a6761d', '#666666']
            },
            Paired: {
                '3': ['#a6cee3', '#1f78b4', '#b2df8a'],
                '4': ['#a6cee3', '#1f78b4', '#b2df8a', '#33a02c'],
                '5': ['#a6cee3', '#1f78b4', '#b2df8a', '#33a02c', '#fb9a99'],
                '6': ['#a6cee3', '#1f78b4', '#b2df8a', '#33a02c', '#fb9a99', '#e31a1c'],
                '7': ['#a6cee3', '#1f78b4', '#b2df8a', '#33a02c', '#fb9a99', '#e31a1c', '#fdbf6f'],
                '8': ['#a6cee3', '#1f78b4', '#b2df8a', '#33a02c', '#fb9a99', '#e31a1c', '#fdbf6f', '#ff7f00'],
                '9': ['#a6cee3', '#1f78b4', '#b2df8a', '#33a02c', '#fb9a99', '#e31a1c', '#fdbf6f', '#ff7f00', '#cab2d6'],
                '10': [
                    '#a6cee3',
                    '#1f78b4',
                    '#b2df8a',
                    '#33a02c',
                    '#fb9a99',
                    '#e31a1c',
                    '#fdbf6f',
                    '#ff7f00',
                    '#cab2d6',
                    '#6a3d9a'
                ],
                '11': [
                    '#a6cee3',
                    '#1f78b4',
                    '#b2df8a',
                    '#33a02c',
                    '#fb9a99',
                    '#e31a1c',
                    '#fdbf6f',
                    '#ff7f00',
                    '#cab2d6',
                    '#6a3d9a',
                    '#ffff99'
                ],
                '12': [
                    '#a6cee3',
                    '#1f78b4',
                    '#b2df8a',
                    '#33a02c',
                    '#fb9a99',
                    '#e31a1c',
                    '#fdbf6f',
                    '#ff7f00',
                    '#cab2d6',
                    '#6a3d9a',
                    '#ffff99',
                    '#b15928'
                ]
            },
            Pastel1: {
                '3': ['#fbb4ae', '#b3cde3', '#ccebc5'],
                '4': ['#fbb4ae', '#b3cde3', '#ccebc5', '#decbe4'],
                '5': ['#fbb4ae', '#b3cde3', '#ccebc5', '#decbe4', '#fed9a6'],
                '6': ['#fbb4ae', '#b3cde3', '#ccebc5', '#decbe4', '#fed9a6', '#ffffcc'],
                '7': ['#fbb4ae', '#b3cde3', '#ccebc5', '#decbe4', '#fed9a6', '#ffffcc', '#e5d8bd'],
                '8': ['#fbb4ae', '#b3cde3', '#ccebc5', '#decbe4', '#fed9a6', '#ffffcc', '#e5d8bd', '#fddaec'],
                '9': ['#fbb4ae', '#b3cde3', '#ccebc5', '#decbe4', '#fed9a6', '#ffffcc', '#e5d8bd', '#fddaec', '#f2f2f2']
            },
            Pastel2: {
                '3': ['#b3e2cd', '#fdcdac', '#cbd5e8'],
                '4': ['#b3e2cd', '#fdcdac', '#cbd5e8', '#f4cae4'],
                '5': ['#b3e2cd', '#fdcdac', '#cbd5e8', '#f4cae4', '#e6f5c9'],
                '6': ['#b3e2cd', '#fdcdac', '#cbd5e8', '#f4cae4', '#e6f5c9', '#fff2ae'],
                '7': ['#b3e2cd', '#fdcdac', '#cbd5e8', '#f4cae4', '#e6f5c9', '#fff2ae', '#f1e2cc'],
                '8': ['#b3e2cd', '#fdcdac', '#cbd5e8', '#f4cae4', '#e6f5c9', '#fff2ae', '#f1e2cc', '#cccccc']
            },
            Set1: {
                '3': ['#e41a1c', '#377eb8', '#4daf4a'],
                '4': ['#e41a1c', '#377eb8', '#4daf4a', '#984ea3'],
                '5': ['#e41a1c', '#377eb8', '#4daf4a', '#984ea3', '#ff7f00'],
                '6': ['#e41a1c', '#377eb8', '#4daf4a', '#984ea3', '#ff7f00', '#ffff33'],
                '7': ['#e41a1c', '#377eb8', '#4daf4a', '#984ea3', '#ff7f00', '#ffff33', '#a65628'],
                '8': ['#e41a1c', '#377eb8', '#4daf4a', '#984ea3', '#ff7f00', '#ffff33', '#a65628', '#f781bf'],
                '9': ['#e41a1c', '#377eb8', '#4daf4a', '#984ea3', '#ff7f00', '#ffff33', '#a65628', '#f781bf', '#999999']
            },
            Set2: {
                '3': ['#66c2a5', '#fc8d62', '#8da0cb'],
                '4': ['#66c2a5', '#fc8d62', '#8da0cb', '#e78ac3'],
                '5': ['#66c2a5', '#fc8d62', '#8da0cb', '#e78ac3', '#a6d854'],
                '6': ['#66c2a5', '#fc8d62', '#8da0cb', '#e78ac3', '#a6d854', '#ffd92f'],
                '7': ['#66c2a5', '#fc8d62', '#8da0cb', '#e78ac3', '#a6d854', '#ffd92f', '#e5c494'],
                '8': ['#66c2a5', '#fc8d62', '#8da0cb', '#e78ac3', '#a6d854', '#ffd92f', '#e5c494', '#b3b3b3']
            },
            Set3: {
                '3': ['#8dd3c7', '#ffffb3', '#bebada'],
                '4': ['#8dd3c7', '#ffffb3', '#bebada', '#fb8072'],
                '5': ['#8dd3c7', '#ffffb3', '#bebada', '#fb8072', '#80b1d3'],
                '6': ['#8dd3c7', '#ffffb3', '#bebada', '#fb8072', '#80b1d3', '#fdb462'],
                '7': ['#8dd3c7', '#ffffb3', '#bebada', '#fb8072', '#80b1d3', '#fdb462', '#b3de69'],
                '8': ['#8dd3c7', '#ffffb3', '#bebada', '#fb8072', '#80b1d3', '#fdb462', '#b3de69', '#fccde5'],
                '9': ['#8dd3c7', '#ffffb3', '#bebada', '#fb8072', '#80b1d3', '#fdb462', '#b3de69', '#fccde5', '#d9d9d9'],
                '10': [
                    '#8dd3c7',
                    '#ffffb3',
                    '#bebada',
                    '#fb8072',
                    '#80b1d3',
                    '#fdb462',
                    '#b3de69',
                    '#fccde5',
                    '#d9d9d9',
                    '#bc80bd'
                ],
                '11': [
                    '#8dd3c7',
                    '#ffffb3',
                    '#bebada',
                    '#fb8072',
                    '#80b1d3',
                    '#fdb462',
                    '#b3de69',
                    '#fccde5',
                    '#d9d9d9',
                    '#bc80bd',
                    '#ccebc5'
                ],
                '12': [
                    '#8dd3c7',
                    '#ffffb3',
                    '#bebada',
                    '#fb8072',
                    '#80b1d3',
                    '#fdb462',
                    '#b3de69',
                    '#fccde5',
                    '#d9d9d9',
                    '#bc80bd',
                    '#ccebc5',
                    '#ffed6f'
                ]
            }
        }
    },
    cartoColors: {
        id: 'cartoColor',
        name: 'CartoColor',
        description: 'CartoColor is a color scheme library for maps. It is a collection of color schemes designed for cartography, and it is based on ColorBrewer 2.0.',
        url: 'https://carto.com/carto-colors/',
        type: 'schemes',
        schemeGroups: {
            quantitative: [
                'Burg',
                'BurgYl',
                'RedOr',
                'OrYel',
                'Peach',
                'PinkYl',
                'Mint',
                'BluGrn',
                'DarkMint',
                'Emrld',
                'BluYl',
                'Teal',
                'TealGrn',
                'Purp',
                'PurpOr',
                'Sunset',
                'Magenta',
                'SunsetDark',
                'BrwnYl'
            ],
            aggregation: ['ag_GrnYl', 'ag_Sunset'],
            diverging: ['ArmyRose', 'Fall', 'Geyser', 'Temps', 'TealRose', 'Tropic', 'Earth'],
            qualitative: ['Antique', 'Bold', 'Pastel', 'Prism', 'Safe', 'Vivid'],
            colorblind: ['safe']
        },
        schemes: {
            Burg: {
                '2': ['#ffc6c4', '#672044'],
                '3': ['#ffc6c4', '#cc607d', '#672044'],
                '4': ['#ffc6c4', '#e38191', '#ad466c', '#672044'],
                '5': ['#ffc6c4', '#ee919b', '#cc607d', '#9e3963', '#672044'],
                '6': ['#ffc6c4', '#f29ca3', '#da7489', '#b95073', '#93345d', '#672044'],
                '7': ['#ffc6c4', '#f4a3a8', '#e38191', '#cc607d', '#ad466c', '#8b3058', '#672044']
            },
            BurgYl: {
                '2': ['#fbe6c5', '#70284a'],
                '3': ['#fbe6c5', '#dc7176', '#70284a'],
                '4': ['#fbe6c5', '#ee8a82', '#c8586c', '#70284a'],
                '5': ['#fbe6c5', '#f2a28a', '#dc7176', '#b24b65', '#70284a'],
                '6': ['#fbe6c5', '#f4b191', '#e7807d', '#d06270', '#a44360', '#70284a'],
                '7': ['#fbe6c5', '#f5ba98', '#ee8a82', '#dc7176', '#c8586c', '#9c3f5d', '#70284a']
            },
            RedOr: {
                '2': ['#f6d2a9', '#b13f64'],
                '3': ['#f6d2a9', '#ea8171', '#b13f64'],
                '4': ['#f6d2a9', '#f19c7c', '#dd686c', '#b13f64'],
                '5': ['#f6d2a9', '#f3aa84', '#ea8171', '#d55d6a', '#b13f64'],
                '6': ['#f6d2a9', '#f4b28a', '#ef9177', '#e3726d', '#cf5669', '#b13f64'],
                '7': ['#f6d2a9', '#f5b78e', '#f19c7c', '#ea8171', '#dd686c', '#ca5268', '#b13f64']
            },
            OrYel: {
                '2': ['#ecda9a', '#ee4d5a'],
                '3': ['#ecda9a', '#f7945d', '#ee4d5a'],
                '4': ['#ecda9a', '#f3ad6a', '#f97b57', '#ee4d5a'],
                '5': ['#ecda9a', '#f1b973', '#f7945d', '#f86f56', '#ee4d5a'],
                '6': ['#ecda9a', '#f0c079', '#f5a363', '#f98558', '#f76856', '#ee4d5a'],
                '7': ['#ecda9a', '#efc47e', '#f3ad6a', '#f7945d', '#f97b57', '#f66356', '#ee4d5a']
            },
            Peach: {
                '2': ['#fde0c5', '#eb4a40'],
                '3': ['#fde0c5', '#f59e72', '#eb4a40'],
                '4': ['#fde0c5', '#f8b58b', '#f2855d', '#eb4a40'],
                '5': ['#fde0c5', '#f9c098', '#f59e72', '#f17854', '#eb4a40'],
                '6': ['#fde0c5', '#fac7a1', '#f7ac80', '#f38f65', '#f0704f', '#eb4a40'],
                '7': ['#fde0c5', '#facba6', '#f8b58b', '#f59e72', '#f2855d', '#ef6a4c', '#eb4a40']
            },
            PinkYl: {
                '2': ['#fef6b5', '#e15383'],
                '3': ['#fef6b5', '#ffa679', '#e15383'],
                '4': ['#fef6b5', '#ffc285', '#fa8a76', '#e15383'],
                '5': ['#fef6b5', '#ffd08e', '#ffa679', '#f67b77', '#e15383'],
                '6': ['#fef6b5', '#ffd795', '#ffb77f', '#fd9576', '#f37378', '#e15383'],
                '7': ['#fef6b5', '#ffdd9a', '#ffc285', '#ffa679', '#fa8a76', '#f16d7a', '#e15383']
            },
            Mint: {
                '2': ['#e4f1e1', '#0d585f'],
                '3': ['#e4f1e1', '#63a6a0', '#0d585f'],
                '4': ['#e4f1e1', '#89c0b6', '#448c8a', '#0d585f'],
                '5': ['#E4F1E1', '#9CCDC1', '#63A6A0', '#337F7F', '#0D585F'],
                '6': ['#e4f1e1', '#abd4c7', '#7ab5ad', '#509693', '#2c7778', '#0d585f'],
                '7': ['#e4f1e1', '#b4d9cc', '#89c0b6', '#63a6a0', '#448c8a', '#287274', '#0d585f']
            },
            BluGrn: {
                '2': ['#c4e6c3', '#1d4f60'],
                '3': ['#c4e6c3', '#4da284', '#1d4f60'],
                '4': ['#c4e6c3', '#6dbc90', '#36877a', '#1d4f60'],
                '5': ['#c4e6c3', '#80c799', '#4da284', '#2d7974', '#1d4f60'],
                '6': ['#c4e6c3', '#8dce9f', '#5fb28b', '#3e927e', '#297071', '#1d4f60'],
                '7': ['#c4e6c3', '#96d2a4', '#6dbc90', '#4da284', '#36877a', '#266b6e', '#1d4f60']
            },
            DarkMint: {
                '2': ['#d2fbd4', '#123f5a'],
                '3': ['#d2fbd4', '#559c9e', '#123f5a'],
                '4': ['#d2fbd4', '#7bbcb0', '#3a7c89', '#123f5a'],
                '5': ['#d2fbd4', '#8eccb9', '#559c9e', '#2b6c7f', '#123f5a'],
                '6': ['#d2fbd4', '#9cd5be', '#6cafa9', '#458892', '#266377', '#123f5a'],
                '7': ['#d2fbd4', '#a5dbc2', '#7bbcb0', '#559c9e', '#3a7c89', '#235d72', '#123f5a']
            },
            Emrld: {
                '2': ['#d3f2a3', '#074050'],
                '3': ['#d3f2a3', '#4c9b82', '#074050'],
                '4': ['#d3f2a3', '#6cc08b', '#217a79', '#074050'],
                '5': ['#d3f2a3', '#82d091', '#4c9b82', '#19696f', '#074050'],
                '6': ['#d3f2a3', '#8fda94', '#60b187', '#35877d', '#145f69', '#074050'],
                '7': ['#d3f2a3', '#97e196', '#6cc08b', '#4c9b82', '#217a79', '#105965', '#074050']
            },
            ag_GrnYl: {
                '2': ['#245668', '#EDEF5D'],
                '3': ['#245668', '#39AB7E', '#EDEF5D'],
                '4': ['#245668', '#0D8F81', '#6EC574', '#EDEF5D'],
                '5': ['#245668', '#04817E', '#39AB7E', '#8BD16D', '#EDEF5D'],
                '6': ['#245668', '#09787C', '#1D9A81', '#58BB79', '#9DD869', '#EDEF5D'],
                '7': ['#245668', '#0F7279', '#0D8F81', '#39AB7E', '#6EC574', '#A9DC67', '#EDEF5D']
            },
            BluYl: {
                '2': ['#f7feae', '#045275'],
                '3': ['#f7feae', '#46aea0', '#045275'],
                '4': ['#f7feae', '#7ccba2', '#089099', '#045275'],
                '5': ['#f7feae', '#9bd8a4', '#46aea0', '#058092', '#045275'],
                '6': ['#f7feae', '#ace1a4', '#68bfa1', '#2a9c9c', '#02778e', '#045275'],
                '7': ['#f7feae', '#b7e6a5', '#7ccba2', '#46aea0', '#089099', '#00718b', '#045275']
            },
            Teal: {
                '2': ['#d1eeea', '#2a5674'],
                '3': ['#d1eeea', '#68abb8', '#2a5674'],
                '4': ['#d1eeea', '#85c4c9', '#4f90a6', '#2a5674'],
                '5': ['#d1eeea', '#96d0d1', '#68abb8', '#45829b', '#2a5674'],
                '6': ['#d1eeea', '#a1d7d6', '#79bbc3', '#599bae', '#3f7994', '#2a5674'],
                '7': ['#d1eeea', '#a8dbd9', '#85c4c9', '#68abb8', '#4f90a6', '#3b738f', '#2a5674']
            },
            TealGrn: {
                '2': ['#b0f2bc', '#257d98'],
                '3': ['#b0f2bc', '#4cc8a3', '#257d98'],
                '4': ['#b0f2bc', '#67dba5', '#38b2a3', '#257d98'],
                '5': ['#b0f2bc', '#77e2a8', '#4cc8a3', '#31a6a2', '#257d98'],
                '6': ['#b0f2bc', '#82e6aa', '#5bd4a4', '#3fbba3', '#2e9ea1', '#257d98'],
                '7': ['#b0f2bc', '#89e8ac', '#67dba5', '#4cc8a3', '#38b2a3', '#2c98a0', '#257d98']
            },
            Purp: {
                '2': ['#f3e0f7', '#63589f'],
                '3': ['#f3e0f7', '#b998dd', '#63589f'],
                '4': ['#f3e0f7', '#d1afe8', '#9f82ce', '#63589f'],
                '5': ['#f3e0f7', '#dbbaed', '#b998dd', '#9178c4', '#63589f'],
                '6': ['#f3e0f7', '#e0c2ef', '#c8a5e4', '#aa8bd4', '#8871be', '#63589f'],
                '7': ['#f3e0f7', '#e4c7f1', '#d1afe8', '#b998dd', '#9f82ce', '#826dba', '#63589f']
            },
            PurpOr: {
                '2': ['#f9ddda', '#573b88'],
                '3': ['#f9ddda', '#ce78b3', '#573b88'],
                '4': ['#f9ddda', '#e597b9', '#ad5fad', '#573b88'],
                '5': ['#f9ddda', '#eda8bd', '#ce78b3', '#9955a8', '#573b88'],
                '6': ['#f9ddda', '#f0b2c1', '#dd8ab6', '#bb69b0', '#8c4fa4', '#573b88'],
                '7': ['#f9ddda', '#f2b9c4', '#e597b9', '#ce78b3', '#ad5fad', '#834ba0', '#573b88']
            },
            Sunset: {
                '2': ['#f3e79b', '#5c53a5'],
                '3': ['#f3e79b', '#eb7f86', '#5c53a5'],
                '4': ['#f3e79b', '#f8a07e', '#ce6693', '#5c53a5'],
                '5': ['#f3e79b', '#fab27f', '#eb7f86', '#b95e9a', '#5c53a5'],
                '6': ['#f3e79b', '#fabc82', '#f59280', '#dc6f8e', '#ab5b9e', '#5c53a5'],
                '7': ['#f3e79b', '#fac484', '#f8a07e', '#eb7f86', '#ce6693', '#a059a0', '#5c53a5']
            },
            Magenta: {
                '2': ['#f3cbd3', '#6c2167'],
                '3': ['#f3cbd3', '#ca699d', '#6c2167'],
                '4': ['#f3cbd3', '#dd88ac', '#b14d8e', '#6c2167'],
                '5': ['#f3cbd3', '#e498b4', '#ca699d', '#a24186', '#6c2167'],
                '6': ['#f3cbd3', '#e7a2b9', '#d67ba5', '#bc5894', '#983a81', '#6c2167'],
                '7': ['#f3cbd3', '#eaa9bd', '#dd88ac', '#ca699d', '#b14d8e', '#91357d', '#6c2167']
            },
            SunsetDark: {
                '2': ['#fcde9c', '#7c1d6f'],
                '3': ['#fcde9c', '#e34f6f', '#7c1d6f'],
                '4': ['#fcde9c', '#f0746e', '#dc3977', '#7c1d6f'],
                '5': ['#fcde9c', '#f58670', '#e34f6f', '#d72d7c', '#7c1d6f'],
                '6': ['#fcde9c', '#f89872', '#ec666d', '#df4273', '#c5287b', '#7c1d6f'],
                '7': ['#fcde9c', '#faa476', '#f0746e', '#e34f6f', '#dc3977', '#b9257a', '#7c1d6f']
            },
            ag_Sunset: {
                '2': ['#4b2991', '#edd9a3'],
                '3': ['#4b2991', '#ea4f88', '#edd9a3'],
                '4': ['#4b2991', '#c0369d', '#fa7876', '#edd9a3'],
                '5': ['#4b2991', '#a52fa2', '#ea4f88', '#fa9074', '#edd9a3'],
                '6': ['#4b2991', '#932da3', '#d43f96', '#f7667c', '#f89f77', '#edd9a3'],
                '7': ['#4b2991', '#872ca2', '#c0369d', '#ea4f88', '#fa7876', '#f6a97a', '#edd9a3']
            },
            BrwnYl: {
                '2': ['#ede5cf', '#541f3f'],
                '3': ['#ede5cf', '#c1766f', '#541f3f'],
                '4': ['#ede5cf', '#d39c83', '#a65461', '#541f3f'],
                '5': ['#ede5cf', '#daaf91', '#c1766f', '#95455a', '#541f3f'],
                '6': ['#ede5cf', '#ddba9b', '#cd8c7a', '#b26166', '#8a3c56', '#541f3f'],
                '7': ['#ede5cf', '#e0c2a2', '#d39c83', '#c1766f', '#a65461', '#813753', '#541f3f']
            },
            ArmyRose: {
                '2': ['#929b4f', '#db8195'],
                '3': ['#a3ad62', '#fdfbe4', '#df91a3'],
                '4': ['#929b4f', '#d9dbaf', '#f3d1ca', '#db8195'],
                '5': ['#879043', '#c1c68c', '#fdfbe4', '#ebb4b8', '#d8758b'],
                '6': ['#7f883b', '#b0b874', '#e3e4be', '#f6ddd1', '#e4a0ac', '#d66d85'],
                '7': ['#798234', '#a3ad62', '#d0d3a2', '#fdfbe4', '#f0c6c3', '#df91a3', '#d46780']
            },
            Fall: {
                '2': ['#3d5941', '#ca562c'],
                '3': ['#3d5941', '#f6edbd', '#ca562c'],
                '4': ['#3d5941', '#b5b991', '#edbb8a', '#ca562c'],
                '5': ['#3d5941', '#96a07c', '#f6edbd', '#e6a272', '#ca562c'],
                '6': ['#3d5941', '#839170', '#cecea2', '#f1cf9e', '#e19464', '#ca562c'],
                '7': ['#3d5941', '#778868', '#b5b991', '#f6edbd', '#edbb8a', '#de8a5a', '#ca562c']
            },
            Geyser: {
                '2': ['#008080', '#ca562c'],
                '3': ['#008080', '#f6edbd', '#ca562c'],
                '4': ['#008080', '#b4c8a8', '#edbb8a', '#ca562c'],
                '5': ['#008080', '#92b69e', '#f6edbd', '#e6a272', '#ca562c'],
                '6': ['#008080', '#7eab98', '#ced7b1', '#f1cf9e', '#e19464', '#ca562c'],
                '7': ['#008080', '#70a494', '#b4c8a8', '#f6edbd', '#edbb8a', '#de8a5a', '#ca562c']
            },
            Temps: {
                '2': ['#009392', '#cf597e'],
                '3': ['#009392', '#e9e29c', '#cf597e'],
                '4': ['#009392', '#9ccb86', '#eeb479', '#cf597e'],
                '5': ['#009392', '#71be83', '#e9e29c', '#ed9c72', '#cf597e'],
                '6': ['#009392', '#52b684', '#bcd48c', '#edc783', '#eb8d71', '#cf597e'],
                '7': ['#009392', '#39b185', '#9ccb86', '#e9e29c', '#eeb479', '#e88471', '#cf597e']
            },
            TealRose: {
                '2': ['#009392', '#d0587e'],
                '3': ['#009392', '#f1eac8', '#d0587e'],
                '4': ['#009392', '#91b8aa', '#f1eac8', '#dfa0a0', '#d0587e'],
                '5': ['#009392', '#91b8aa', '#f1eac8', '#dfa0a0', '#d0587e'],
                '6': ['#009392', '#72aaa1', '#b1c7b3', '#e5b9ad', '#d98994', '#d0587e'],
                '7': ['#009392', '#72aaa1', '#b1c7b3', '#f1eac8', '#e5b9ad', '#d98994', '#d0587e']
            },
            Tropic: {
                '2': ['#009B9E', '#C75DAB'],
                '3': ['#009B9E', '#F1F1F1', '#C75DAB'],
                '4': ['#009B9E', '#A7D3D4', '#E4C1D9', '#C75DAB'],
                '5': ['#009B9E', '#7CC5C6', '#F1F1F1', '#DDA9CD', '#C75DAB'],
                '6': ['#009B9E', '#5DBCBE', '#C6DFDF', '#E9D4E2', '#D99BC6', '#C75DAB'],
                '7': ['#009B9E', '#42B7B9', '#A7D3D4', '#F1F1F1', '#E4C1D9', '#D691C1', '#C75DAB']
            },
            Earth: {
                '2': ['#A16928', '#2887a1'],
                '3': ['#A16928', '#edeac2', '#2887a1'],
                '4': ['#A16928', '#d6bd8d', '#b5c8b8', '#2887a1'],
                '5': ['#A16928', '#caa873', '#edeac2', '#98b7b2', '#2887a1'],
                '6': ['#A16928', '#c29b64', '#e0cfa2', '#cbd5bc', '#85adaf', '#2887a1'],
                '7': ['#A16928', '#bd925a', '#d6bd8d', '#edeac2', '#b5c8b8', '#79a7ac', '#2887a1']
            },
            Antique: {
                '2': ['#855C75', '#D9AF6B', '#7C7C7C'],
                '3': ['#855C75', '#D9AF6B', '#AF6458', '#7C7C7C'],
                '4': ['#855C75', '#D9AF6B', '#AF6458', '#736F4C', '#7C7C7C'],
                '5': ['#855C75', '#D9AF6B', '#AF6458', '#736F4C', '#526A83', '#7C7C7C'],
                '6': ['#855C75', '#D9AF6B', '#AF6458', '#736F4C', '#526A83', '#625377', '#7C7C7C'],
                '7': ['#855C75', '#D9AF6B', '#AF6458', '#736F4C', '#526A83', '#625377', '#68855C', '#7C7C7C'],
                '8': ['#855C75', '#D9AF6B', '#AF6458', '#736F4C', '#526A83', '#625377', '#68855C', '#9C9C5E', '#7C7C7C'],
                '9': [
                    '#855C75',
                    '#D9AF6B',
                    '#AF6458',
                    '#736F4C',
                    '#526A83',
                    '#625377',
                    '#68855C',
                    '#9C9C5E',
                    '#A06177',
                    '#7C7C7C'
                ],
                '10': [
                    '#855C75',
                    '#D9AF6B',
                    '#AF6458',
                    '#736F4C',
                    '#526A83',
                    '#625377',
                    '#68855C',
                    '#9C9C5E',
                    '#A06177',
                    '#8C785D',
                    '#7C7C7C'
                ],
                '11': [
                    '#855C75',
                    '#D9AF6B',
                    '#AF6458',
                    '#736F4C',
                    '#526A83',
                    '#625377',
                    '#68855C',
                    '#9C9C5E',
                    '#A06177',
                    '#8C785D',
                    '#467378',
                    '#7C7C7C'
                ]
            },
            Bold: {
                '2': ['#7F3C8D', '#11A579', '#A5AA99'],
                '3': ['#7F3C8D', '#11A579', '#3969AC', '#A5AA99'],
                '4': ['#7F3C8D', '#11A579', '#3969AC', '#F2B701', '#A5AA99'],
                '5': ['#7F3C8D', '#11A579', '#3969AC', '#F2B701', '#E73F74', '#A5AA99'],
                '6': ['#7F3C8D', '#11A579', '#3969AC', '#F2B701', '#E73F74', '#80BA5A', '#A5AA99'],
                '7': ['#7F3C8D', '#11A579', '#3969AC', '#F2B701', '#E73F74', '#80BA5A', '#E68310', '#A5AA99'],
                '8': ['#7F3C8D', '#11A579', '#3969AC', '#F2B701', '#E73F74', '#80BA5A', '#E68310', '#008695', '#A5AA99'],
                '9': [
                    '#7F3C8D',
                    '#11A579',
                    '#3969AC',
                    '#F2B701',
                    '#E73F74',
                    '#80BA5A',
                    '#E68310',
                    '#008695',
                    '#CF1C90',
                    '#A5AA99'
                ],
                '10': [
                    '#7F3C8D',
                    '#11A579',
                    '#3969AC',
                    '#F2B701',
                    '#E73F74',
                    '#80BA5A',
                    '#E68310',
                    '#008695',
                    '#CF1C90',
                    '#f97b72',
                    '#A5AA99'
                ],
                '11': [
                    '#7F3C8D',
                    '#11A579',
                    '#3969AC',
                    '#F2B701',
                    '#E73F74',
                    '#80BA5A',
                    '#E68310',
                    '#008695',
                    '#CF1C90',
                    '#f97b72',
                    '#4b4b8f',
                    '#A5AA99'
                ]
            },
            Pastel: {
                '2': ['#66C5CC', '#F6CF71', '#B3B3B3'],
                '3': ['#66C5CC', '#F6CF71', '#F89C74', '#B3B3B3'],
                '4': ['#66C5CC', '#F6CF71', '#F89C74', '#DCB0F2', '#B3B3B3'],
                '5': ['#66C5CC', '#F6CF71', '#F89C74', '#DCB0F2', '#87C55F', '#B3B3B3'],
                '6': ['#66C5CC', '#F6CF71', '#F89C74', '#DCB0F2', '#87C55F', '#9EB9F3', '#B3B3B3'],
                '7': ['#66C5CC', '#F6CF71', '#F89C74', '#DCB0F2', '#87C55F', '#9EB9F3', '#FE88B1', '#B3B3B3'],
                '8': ['#66C5CC', '#F6CF71', '#F89C74', '#DCB0F2', '#87C55F', '#9EB9F3', '#FE88B1', '#C9DB74', '#B3B3B3'],
                '9': [
                    '#66C5CC',
                    '#F6CF71',
                    '#F89C74',
                    '#DCB0F2',
                    '#87C55F',
                    '#9EB9F3',
                    '#FE88B1',
                    '#C9DB74',
                    '#8BE0A4',
                    '#B3B3B3'
                ],
                '10': [
                    '#66C5CC',
                    '#F6CF71',
                    '#F89C74',
                    '#DCB0F2',
                    '#87C55F',
                    '#9EB9F3',
                    '#FE88B1',
                    '#C9DB74',
                    '#8BE0A4',
                    '#B497E7',
                    '#B3B3B3'
                ],
                '11': [
                    '#66C5CC',
                    '#F6CF71',
                    '#F89C74',
                    '#DCB0F2',
                    '#87C55F',
                    '#9EB9F3',
                    '#FE88B1',
                    '#C9DB74',
                    '#8BE0A4',
                    '#B497E7',
                    '#D3B484',
                    '#B3B3B3'
                ]
            },
            Prism: {
                '2': ['#5F4690', '#1D6996', '#666666'],
                '3': ['#5F4690', '#1D6996', '#38A6A5', '#666666'],
                '4': ['#5F4690', '#1D6996', '#38A6A5', '#0F8554', '#666666'],
                '5': ['#5F4690', '#1D6996', '#38A6A5', '#0F8554', '#73AF48', '#666666'],
                '6': ['#5F4690', '#1D6996', '#38A6A5', '#0F8554', '#73AF48', '#EDAD08', '#666666'],
                '7': ['#5F4690', '#1D6996', '#38A6A5', '#0F8554', '#73AF48', '#EDAD08', '#E17C05', '#666666'],
                '8': ['#5F4690', '#1D6996', '#38A6A5', '#0F8554', '#73AF48', '#EDAD08', '#E17C05', '#CC503E', '#666666'],
                '9': [
                    '#5F4690',
                    '#1D6996',
                    '#38A6A5',
                    '#0F8554',
                    '#73AF48',
                    '#EDAD08',
                    '#E17C05',
                    '#CC503E',
                    '#94346E',
                    '#666666'
                ],
                '10': [
                    '#5F4690',
                    '#1D6996',
                    '#38A6A5',
                    '#0F8554',
                    '#73AF48',
                    '#EDAD08',
                    '#E17C05',
                    '#CC503E',
                    '#94346E',
                    '#6F4070',
                    '#666666'
                ],
                '11': [
                    '#5F4690',
                    '#1D6996',
                    '#38A6A5',
                    '#0F8554',
                    '#73AF48',
                    '#EDAD08',
                    '#E17C05',
                    '#CC503E',
                    '#94346E',
                    '#6F4070',
                    '#994E95',
                    '#666666'
                ]
            },
            Safe: {
                '2': ['#88CCEE', '#CC6677', '#888888'],
                '3': ['#88CCEE', '#CC6677', '#DDCC77', '#888888'],
                '4': ['#88CCEE', '#CC6677', '#DDCC77', '#117733', '#888888'],
                '5': ['#88CCEE', '#CC6677', '#DDCC77', '#117733', '#332288', '#888888'],
                '6': ['#88CCEE', '#CC6677', '#DDCC77', '#117733', '#332288', '#AA4499', '#888888'],
                '7': ['#88CCEE', '#CC6677', '#DDCC77', '#117733', '#332288', '#AA4499', '#44AA99', '#888888'],
                '8': ['#88CCEE', '#CC6677', '#DDCC77', '#117733', '#332288', '#AA4499', '#44AA99', '#999933', '#888888'],
                '9': [
                    '#88CCEE',
                    '#CC6677',
                    '#DDCC77',
                    '#117733',
                    '#332288',
                    '#AA4499',
                    '#44AA99',
                    '#999933',
                    '#882255',
                    '#888888'
                ],
                '10': [
                    '#88CCEE',
                    '#CC6677',
                    '#DDCC77',
                    '#117733',
                    '#332288',
                    '#AA4499',
                    '#44AA99',
                    '#999933',
                    '#882255',
                    '#661100',
                    '#888888'
                ],
                '11': [
                    '#88CCEE',
                    '#CC6677',
                    '#DDCC77',
                    '#117733',
                    '#332288',
                    '#AA4499',
                    '#44AA99',
                    '#999933',
                    '#882255',
                    '#661100',
                    '#6699CC',
                    '#888888'
                ]
            },
            Vivid: {
                '2': ['#E58606', '#5D69B1', '#A5AA99'],
                '3': ['#E58606', '#5D69B1', '#52BCA3', '#A5AA99'],
                '4': ['#E58606', '#5D69B1', '#52BCA3', '#99C945', '#A5AA99'],
                '5': ['#E58606', '#5D69B1', '#52BCA3', '#99C945', '#CC61B0', '#A5AA99'],
                '6': ['#E58606', '#5D69B1', '#52BCA3', '#99C945', '#CC61B0', '#24796C', '#A5AA99'],
                '7': ['#E58606', '#5D69B1', '#52BCA3', '#99C945', '#CC61B0', '#24796C', '#DAA51B', '#A5AA99'],
                '8': ['#E58606', '#5D69B1', '#52BCA3', '#99C945', '#CC61B0', '#24796C', '#DAA51B', '#2F8AC4', '#A5AA99'],
                '9': [
                    '#E58606',
                    '#5D69B1',
                    '#52BCA3',
                    '#99C945',
                    '#CC61B0',
                    '#24796C',
                    '#DAA51B',
                    '#2F8AC4',
                    '#764E9F',
                    '#A5AA99'
                ],
                '10': [
                    '#E58606',
                    '#5D69B1',
                    '#52BCA3',
                    '#99C945',
                    '#CC61B0',
                    '#24796C',
                    '#DAA51B',
                    '#2F8AC4',
                    '#764E9F',
                    '#ED645A',
                    '#A5AA99'
                ],
                '11': [
                    '#E58606',
                    '#5D69B1',
                    '#52BCA3',
                    '#99C945',
                    '#CC61B0',
                    '#24796C',
                    '#DAA51B',
                    '#2F8AC4',
                    '#764E9F',
                    '#ED645A',
                    '#CC3A8E',
                    '#A5AA99'
                ]
            }
        }
    }
};

const ColorPickerWrapper = styled.div`
  display: flex;
  flex-direction: column;
  background: rgb(253, 253, 247);
  padding: 12px;
  border: 1px solid #e6e6e6;

  .d-scheme-filters {
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 0;
    margin-bottom: 12px;
    overflow: hidden;
  }

  .d-panel-list {
    list-style: none;
    padding: 0;
    margin: 0;
    overflow-y: scroll;
    overflow-x: hidden;
    height: 200px;
    border: 1px solid #666666;
  }

  .d-list-item {
    display: flex;
    border-bottom: 1px solid #000000;
  }

  .d-scheme-item {
    display: grid;
    grid-template-columns: 1fr 3fr;
    grid-gap: 1rem;
    font-size: 0.65rem;
    justify-content: center;
    transition: all 0.2s ease-in;
    background-color: var(--background);
    padding: 0;
    margin: 0;
  }

  .d-scheme-item:hover {
    background-color: #ffffff;
    transform: scale(1.02);
    box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.2);
    cursor: pointer;
  }

  .d-scheme-item:active {
    background-color: #ffffff;
    transform: scale(1);
    box-shadow: 0;
    cursor: pointer;
  }

  .d-scheme-info {
    padding: 4px 10px;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: flex-start;
  }

  .d-scheme-title {
    font-weight: bold;
  }

  .d-colorpicker-color {
    width: 100%;
    height: 60px;
    border-radius: 3px;
    border: 1px solid #8d8d8d;
  }

  .d-scheme-colors {
    width: 100%;
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    justify-content: space-between;
    align-items: stretch;
    align-content: stretch;
  }

  .d-scheme-color {
    width: 100%;
    height: 100%;
  }

  .d-swatchpicker {
    padding: 4px 0;
    margin: 0;
    list-style-type: none;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
  }

  .d-swatchpicker-swatch {
    padding: 3px;
    margin: 0;
  }

  .d-circle-swatch {
    width: 24px;
    height: 24px;
    border-radius: 50%;
    border: 2px solid #333333;
  }

  .d-panel-section {
    margin-bottom: 8px;
  }

  .d-panel-input {
    width: 100%;
  }

  .d-panel-col {
    margin-right: 8px;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
  }

  .d-panel-col:last-of-type {
    margin-right: 0;
  }
`;

const ColorPicker = ({ color, defaultUnitCount, onChange, onInput, onInputChange }) => {
    const [sources, setSources] = React__default.useState(['districtr', 'cartoColors', 'colorBrewer']);
    const [unitCount, setUnitCount] = React__default.useState(defaultUnitCount);
    const [activeSchemeSource, setActiveSchemeSource] = React__default.useState('districtr');
    const [activeScheme, setActiveScheme] = React__default.useState('Core');
    const [activeSchemeGroup, setActiveSchemeGroup] = React__default.useState('All');
    const [schemeGroups, setSchemeGroups] = React__default.useState([]);
    const [colorSchemes, setColorSchemes] = React__default.useState([]);
    const [sourceFilter, setSourceFilter] = React__default.useState('All');
    const [filteredColorSchemes, setFilteredColorSchemes] = React__default.useState([]);
    const [activeColorScheme, setActiveColorScheme] = React__default.useState([]);
    const [activeColor, setActiveColor] = React__default.useState(color);
    const [hexInput, setHexInput] = React__default.useState(color);
    const inputRef = React__default.useRef(null);
    useEffect(() => {
        setSchemeGroups(createSchemeGroupOptions());
        setColorSchemes(createColorSchemeOptions());
        setActiveColorScheme(getSchemeForUnits(unitCount, schemes[activeSchemeSource]['schemes'][activeScheme]));
    }, []);
    useEffect(() => {
        setFilteredColorSchemes(filterColorSchemes());
    }, [colorSchemes]);
    useEffect(() => {
        setColorSchemes(createColorSchemeOptions());
    }, [unitCount]);
    useEffect(() => {
        setHexInput(activeColor);
    }, [activeColor]);
    useEffect(() => {
        setFilteredColorSchemes(filterColorSchemes());
        setActiveColorScheme(getSchemeForUnits(unitCount, schemes[activeSchemeSource]['schemes'][activeScheme]));
    }, [activeSchemeSource, activeSchemeGroup, activeScheme, sourceFilter]);
    const filterColorSchemes = () => {
        const filteredSchemes = colorSchemes.filter((scheme) => {
            // If the source filter is set to All, and the active scheme group is set to All, return all schemes
            if (sourceFilter === 'All' && activeSchemeGroup === 'All') {
                return scheme;
            }
            // If the source filter is set to All, and the active scheme group is set to a specific group, return all schemes in that group
            if (sourceFilter === 'All' && activeSchemeGroup !== 'All') {
                if (scheme.groups.includes(activeSchemeGroup)) {
                    return scheme;
                }
            }
            // If the source filter is set to a specific source, and the active scheme group is set to All, return all schemes in that source
            if (sourceFilter !== 'All' && activeSchemeGroup === 'All') {
                return scheme.source === sourceFilter;
            }
            // If the source filter is set to a specific source, and the active scheme group is set to a specific group, return all schemes in that source and group
            if (sourceFilter !== 'All' &&
                activeSchemeGroup !== 'All' &&
                scheme.groups.includes(activeSchemeGroup) &&
                scheme.source === sourceFilter) {
                return scheme;
            }
        });
        return filteredSchemes;
    };
    const createSchemeGroupOptions = () => {
        const schemeGroupOptions = ['All'];
        const schemeGroups = (sources
            .map((source) => {
            return schemes[source]['schemeGroups'];
        })
            .flat());
        schemeGroups.forEach((schemeGroup) => {
            (Object.keys(schemeGroup).map((key) => {
                // add schemes to schemeChoices
                if (!schemeGroupOptions.includes(key)) {
                    schemeGroupOptions.push(key);
                }
            }));
        });
        return schemeGroupOptions;
    };
    const createColorSchemeOptions = () => {
        let id = 0;
        const colorSchemeOptions = [];
        Object.keys(schemes).forEach((source) => {
            const schemeSource = schemes[source];
            const sourceSchemes = schemeSource['schemes'];
            const sourceSchemeGroups = schemeSource['schemeGroups'];
            Object.keys(sourceSchemes).forEach((scheme) => {
                id++;
                const schemeColors = getSchemeForUnits(unitCount, sourceSchemes[scheme]);
                // for every key in the schemeGroups object
                const schemeGroups = (Object.keys(sourceSchemeGroups).map((key) => {
                    const schemeGroup = sourceSchemeGroups[key];
                    if (schemeGroup.includes(scheme)) {
                        return key;
                    }
                    else {
                        return null;
                    }
                }));
                // remove nulls from the array
                const filteredSchemeGroups = schemeGroups.filter((group) => {
                    return group !== null;
                });
                colorSchemeOptions.push({
                    id: id,
                    value: scheme,
                    label: scheme,
                    source: source,
                    groups: filteredSchemeGroups,
                    colors: schemeColors
                });
            });
        });
        return colorSchemeOptions;
    };
    const getSchemeForUnits = (unitCount, scheme) => {
        // For each key in the colorScheme convert the value to a integer and add it to an array
        const colorSchemeChoices = (Object.keys(scheme).map((key) => {
            return parseInt(key);
        }));
        // Find the colorSchemeChoice that is closest to the unitCount
        const colorKey = colorSchemeChoices.reduce((a, b) => {
            return Math.abs(b - unitCount) < Math.abs(a - unitCount) ? b : a;
        });
        const colors = scheme[colorKey];
        return colors;
    };
    const handleSchemeGroupChange = (e) => {
        const schemeGroup = e.target.value;
        setActiveSchemeGroup(schemeGroup);
    };
    const handleSchemeClick = (e) => {
        const source = e.currentTarget.dataset.source;
        const scheme = e.currentTarget.dataset.scheme;
        setActiveSchemeSource(source);
        setActiveScheme(scheme);
    };
    const isValidHex = (hex) => {
        return /^#[0-9A-F]{6}$/i.test(hex);
    };
    const handleHexInput = (e) => {
        let hex = e.target.value;
        if (!hex) {
            return;
        }
        // if the hex does not have a #, add it
        if (hex.charAt(0) !== '#') {
            hex = '#' + hex;
        }
        setHexInput(hex);
        // check that the hex is valid
        if (isValidHex(hex)) {
            setActiveColor(hex);
            onChange(e);
        }
    };
    const handleSwatchClick = (e, color) => {
        setActiveColor(color);
        //@ts-ignore
        e.target.value = color;
        onChange(e);
    };
    return (React__default.createElement(DistrictrThemeProvider, null,
        React__default.createElement(ColorPickerWrapper, { "data-testid": "ColorPicker", className: "d-colorpicker" },
            React__default.createElement("div", { className: "d-panel-section" },
                React__default.createElement("input", { ref: inputRef, className: "d-panel-input", type: "text", name: "hex", value: hexInput, onInput: handleHexInput })),
            React__default.createElement("div", { className: "d-colorpicker-color", "data-testid": "ColorPickerDisplay", style: { backgroundColor: activeColor } }),
            React__default.createElement("div", { className: "d-panel-section" },
                React__default.createElement("ul", { className: "d-swatchpicker" }, activeColorScheme.map((color, index) => {
                    return (React__default.createElement("li", { key: index, className: "d-swatchpicker-swatch" },
                        React__default.createElement(Button, { "aria-label": "Color Swatch", pressed: activeColor === color, variant: 'swatch', style: { backgroundColor: color }, "dataset-color": color, 
                            //@ts-ignore
                            onClick: (e) => handleSwatchClick(e, color) })));
                }))),
            React__default.createElement("hr", null),
            React__default.createElement("div", { className: "d-panel-section d-scheme-filters" },
                React__default.createElement("div", { className: "d-panel-col" },
                    React__default.createElement("select", { className: 'd-panel-input', value: sourceFilter, onChange: (e) => setSourceFilter(e.target.value) },
                        React__default.createElement("option", { value: "All" }, "All"),
                        sources.map((schemeSource) => {
                            return (React__default.createElement("option", { key: schemeSource, value: schemeSource }, schemeSource));
                        }))),
                React__default.createElement("div", { className: "d-panel-col" },
                    React__default.createElement("select", { className: 'd-panel-input', value: activeSchemeGroup, onChange: handleSchemeGroupChange }, schemeGroups.map((schemeGroup) => {
                        return (React__default.createElement("option", { key: schemeGroup, value: schemeGroup }, schemeGroup));
                    }))),
                React__default.createElement("div", { className: "d-panel-col" },
                    React__default.createElement("input", { className: 'd-panel-input', type: "number", min: "1", max: "435", value: unitCount, onChange: (e) => setUnitCount(parseInt(e.target.value)) }))),
            React__default.createElement("ul", { className: "d-panel-list" }, filteredColorSchemes.map((colorScheme) => {
                return (React__default.createElement("li", { key: colorScheme.id, "data-source": colorScheme.source, "data-scheme": colorScheme.value, onClick: handleSchemeClick, className: "d-list-item d-scheme-item" },
                    React__default.createElement("div", { className: "d-scheme-info" },
                        React__default.createElement("div", { className: "d-scheme-title" }, colorScheme.label),
                        React__default.createElement("div", { className: "d-scheme-groups" }, colorScheme.groups.toString())),
                    React__default.createElement("div", { className: "d-scheme-colors" }, colorScheme.colors.map((color, index) => {
                        return React__default.createElement("div", { className: "d-scheme-color", key: index, style: { backgroundColor: color } });
                    }))));
            })))));
};

/**
 * Checks if `value` is the
 * [language type](http://www.ecma-international.org/ecma-262/7.0/#sec-ecmascript-language-types)
 * of `Object`. (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
 * @example
 *
 * _.isObject({});
 * // => true
 *
 * _.isObject([1, 2, 3]);
 * // => true
 *
 * _.isObject(_.noop);
 * // => true
 *
 * _.isObject(null);
 * // => false
 */
function isObject(value) {
  var type = typeof value;
  return value != null && (type == 'object' || type == 'function');
}

var isObject_1 = isObject;

var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

function createCommonjsModule(fn) {
  var module = { exports: {} };
	return fn(module, module.exports), module.exports;
}

/** Detect free variable `global` from Node.js. */

var freeGlobal = typeof commonjsGlobal == 'object' && commonjsGlobal && commonjsGlobal.Object === Object && commonjsGlobal;

var _freeGlobal = freeGlobal;

/** Detect free variable `self`. */
var freeSelf = typeof self == 'object' && self && self.Object === Object && self;

/** Used as a reference to the global object. */
var root = _freeGlobal || freeSelf || Function('return this')();

var _root = root;

/**
 * Gets the timestamp of the number of milliseconds that have elapsed since
 * the Unix epoch (1 January 1970 00:00:00 UTC).
 *
 * @static
 * @memberOf _
 * @since 2.4.0
 * @category Date
 * @returns {number} Returns the timestamp.
 * @example
 *
 * _.defer(function(stamp) {
 *   console.log(_.now() - stamp);
 * }, _.now());
 * // => Logs the number of milliseconds it took for the deferred invocation.
 */
var now = function() {
  return _root.Date.now();
};

var now_1 = now;

/** Used to match a single whitespace character. */
var reWhitespace = /\s/;

/**
 * Used by `_.trim` and `_.trimEnd` to get the index of the last non-whitespace
 * character of `string`.
 *
 * @private
 * @param {string} string The string to inspect.
 * @returns {number} Returns the index of the last non-whitespace character.
 */
function trimmedEndIndex(string) {
  var index = string.length;

  while (index-- && reWhitespace.test(string.charAt(index))) {}
  return index;
}

var _trimmedEndIndex = trimmedEndIndex;

/** Used to match leading whitespace. */
var reTrimStart = /^\s+/;

/**
 * The base implementation of `_.trim`.
 *
 * @private
 * @param {string} string The string to trim.
 * @returns {string} Returns the trimmed string.
 */
function baseTrim(string) {
  return string
    ? string.slice(0, _trimmedEndIndex(string) + 1).replace(reTrimStart, '')
    : string;
}

var _baseTrim = baseTrim;

/** Built-in value references. */
var Symbol$1 = _root.Symbol;

var _Symbol = Symbol$1;

/** Used for built-in method references. */
var objectProto$1 = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto$1.hasOwnProperty;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var nativeObjectToString$1 = objectProto$1.toString;

/** Built-in value references. */
var symToStringTag$1 = _Symbol ? _Symbol.toStringTag : undefined;

/**
 * A specialized version of `baseGetTag` which ignores `Symbol.toStringTag` values.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the raw `toStringTag`.
 */
function getRawTag(value) {
  var isOwn = hasOwnProperty.call(value, symToStringTag$1),
      tag = value[symToStringTag$1];

  try {
    value[symToStringTag$1] = undefined;
    var unmasked = true;
  } catch (e) {}

  var result = nativeObjectToString$1.call(value);
  if (unmasked) {
    if (isOwn) {
      value[symToStringTag$1] = tag;
    } else {
      delete value[symToStringTag$1];
    }
  }
  return result;
}

var _getRawTag = getRawTag;

/** Used for built-in method references. */
var objectProto = Object.prototype;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var nativeObjectToString = objectProto.toString;

/**
 * Converts `value` to a string using `Object.prototype.toString`.
 *
 * @private
 * @param {*} value The value to convert.
 * @returns {string} Returns the converted string.
 */
function objectToString(value) {
  return nativeObjectToString.call(value);
}

var _objectToString = objectToString;

/** `Object#toString` result references. */
var nullTag = '[object Null]',
    undefinedTag = '[object Undefined]';

/** Built-in value references. */
var symToStringTag = _Symbol ? _Symbol.toStringTag : undefined;

/**
 * The base implementation of `getTag` without fallbacks for buggy environments.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the `toStringTag`.
 */
function baseGetTag(value) {
  if (value == null) {
    return value === undefined ? undefinedTag : nullTag;
  }
  return (symToStringTag && symToStringTag in Object(value))
    ? _getRawTag(value)
    : _objectToString(value);
}

var _baseGetTag = baseGetTag;

/**
 * Checks if `value` is object-like. A value is object-like if it's not `null`
 * and has a `typeof` result of "object".
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
 * @example
 *
 * _.isObjectLike({});
 * // => true
 *
 * _.isObjectLike([1, 2, 3]);
 * // => true
 *
 * _.isObjectLike(_.noop);
 * // => false
 *
 * _.isObjectLike(null);
 * // => false
 */
function isObjectLike(value) {
  return value != null && typeof value == 'object';
}

var isObjectLike_1 = isObjectLike;

/** `Object#toString` result references. */
var symbolTag = '[object Symbol]';

/**
 * Checks if `value` is classified as a `Symbol` primitive or object.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a symbol, else `false`.
 * @example
 *
 * _.isSymbol(Symbol.iterator);
 * // => true
 *
 * _.isSymbol('abc');
 * // => false
 */
function isSymbol(value) {
  return typeof value == 'symbol' ||
    (isObjectLike_1(value) && _baseGetTag(value) == symbolTag);
}

var isSymbol_1 = isSymbol;

/** Used as references for various `Number` constants. */
var NAN = 0 / 0;

/** Used to detect bad signed hexadecimal string values. */
var reIsBadHex = /^[-+]0x[0-9a-f]+$/i;

/** Used to detect binary string values. */
var reIsBinary = /^0b[01]+$/i;

/** Used to detect octal string values. */
var reIsOctal = /^0o[0-7]+$/i;

/** Built-in method references without a dependency on `root`. */
var freeParseInt = parseInt;

/**
 * Converts `value` to a number.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to process.
 * @returns {number} Returns the number.
 * @example
 *
 * _.toNumber(3.2);
 * // => 3.2
 *
 * _.toNumber(Number.MIN_VALUE);
 * // => 5e-324
 *
 * _.toNumber(Infinity);
 * // => Infinity
 *
 * _.toNumber('3.2');
 * // => 3.2
 */
function toNumber(value) {
  if (typeof value == 'number') {
    return value;
  }
  if (isSymbol_1(value)) {
    return NAN;
  }
  if (isObject_1(value)) {
    var other = typeof value.valueOf == 'function' ? value.valueOf() : value;
    value = isObject_1(other) ? (other + '') : other;
  }
  if (typeof value != 'string') {
    return value === 0 ? value : +value;
  }
  value = _baseTrim(value);
  var isBinary = reIsBinary.test(value);
  return (isBinary || reIsOctal.test(value))
    ? freeParseInt(value.slice(2), isBinary ? 2 : 8)
    : (reIsBadHex.test(value) ? NAN : +value);
}

var toNumber_1 = toNumber;

/** Error message constants. */
var FUNC_ERROR_TEXT$1 = 'Expected a function';

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeMax = Math.max,
    nativeMin = Math.min;

/**
 * Creates a debounced function that delays invoking `func` until after `wait`
 * milliseconds have elapsed since the last time the debounced function was
 * invoked. The debounced function comes with a `cancel` method to cancel
 * delayed `func` invocations and a `flush` method to immediately invoke them.
 * Provide `options` to indicate whether `func` should be invoked on the
 * leading and/or trailing edge of the `wait` timeout. The `func` is invoked
 * with the last arguments provided to the debounced function. Subsequent
 * calls to the debounced function return the result of the last `func`
 * invocation.
 *
 * **Note:** If `leading` and `trailing` options are `true`, `func` is
 * invoked on the trailing edge of the timeout only if the debounced function
 * is invoked more than once during the `wait` timeout.
 *
 * If `wait` is `0` and `leading` is `false`, `func` invocation is deferred
 * until to the next tick, similar to `setTimeout` with a timeout of `0`.
 *
 * See [David Corbacho's article](https://css-tricks.com/debouncing-throttling-explained-examples/)
 * for details over the differences between `_.debounce` and `_.throttle`.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Function
 * @param {Function} func The function to debounce.
 * @param {number} [wait=0] The number of milliseconds to delay.
 * @param {Object} [options={}] The options object.
 * @param {boolean} [options.leading=false]
 *  Specify invoking on the leading edge of the timeout.
 * @param {number} [options.maxWait]
 *  The maximum time `func` is allowed to be delayed before it's invoked.
 * @param {boolean} [options.trailing=true]
 *  Specify invoking on the trailing edge of the timeout.
 * @returns {Function} Returns the new debounced function.
 * @example
 *
 * // Avoid costly calculations while the window size is in flux.
 * jQuery(window).on('resize', _.debounce(calculateLayout, 150));
 *
 * // Invoke `sendMail` when clicked, debouncing subsequent calls.
 * jQuery(element).on('click', _.debounce(sendMail, 300, {
 *   'leading': true,
 *   'trailing': false
 * }));
 *
 * // Ensure `batchLog` is invoked once after 1 second of debounced calls.
 * var debounced = _.debounce(batchLog, 250, { 'maxWait': 1000 });
 * var source = new EventSource('/stream');
 * jQuery(source).on('message', debounced);
 *
 * // Cancel the trailing debounced invocation.
 * jQuery(window).on('popstate', debounced.cancel);
 */
function debounce(func, wait, options) {
  var lastArgs,
      lastThis,
      maxWait,
      result,
      timerId,
      lastCallTime,
      lastInvokeTime = 0,
      leading = false,
      maxing = false,
      trailing = true;

  if (typeof func != 'function') {
    throw new TypeError(FUNC_ERROR_TEXT$1);
  }
  wait = toNumber_1(wait) || 0;
  if (isObject_1(options)) {
    leading = !!options.leading;
    maxing = 'maxWait' in options;
    maxWait = maxing ? nativeMax(toNumber_1(options.maxWait) || 0, wait) : maxWait;
    trailing = 'trailing' in options ? !!options.trailing : trailing;
  }

  function invokeFunc(time) {
    var args = lastArgs,
        thisArg = lastThis;

    lastArgs = lastThis = undefined;
    lastInvokeTime = time;
    result = func.apply(thisArg, args);
    return result;
  }

  function leadingEdge(time) {
    // Reset any `maxWait` timer.
    lastInvokeTime = time;
    // Start the timer for the trailing edge.
    timerId = setTimeout(timerExpired, wait);
    // Invoke the leading edge.
    return leading ? invokeFunc(time) : result;
  }

  function remainingWait(time) {
    var timeSinceLastCall = time - lastCallTime,
        timeSinceLastInvoke = time - lastInvokeTime,
        timeWaiting = wait - timeSinceLastCall;

    return maxing
      ? nativeMin(timeWaiting, maxWait - timeSinceLastInvoke)
      : timeWaiting;
  }

  function shouldInvoke(time) {
    var timeSinceLastCall = time - lastCallTime,
        timeSinceLastInvoke = time - lastInvokeTime;

    // Either this is the first call, activity has stopped and we're at the
    // trailing edge, the system time has gone backwards and we're treating
    // it as the trailing edge, or we've hit the `maxWait` limit.
    return (lastCallTime === undefined || (timeSinceLastCall >= wait) ||
      (timeSinceLastCall < 0) || (maxing && timeSinceLastInvoke >= maxWait));
  }

  function timerExpired() {
    var time = now_1();
    if (shouldInvoke(time)) {
      return trailingEdge(time);
    }
    // Restart the timer.
    timerId = setTimeout(timerExpired, remainingWait(time));
  }

  function trailingEdge(time) {
    timerId = undefined;

    // Only invoke if we have `lastArgs` which means `func` has been
    // debounced at least once.
    if (trailing && lastArgs) {
      return invokeFunc(time);
    }
    lastArgs = lastThis = undefined;
    return result;
  }

  function cancel() {
    if (timerId !== undefined) {
      clearTimeout(timerId);
    }
    lastInvokeTime = 0;
    lastArgs = lastCallTime = lastThis = timerId = undefined;
  }

  function flush() {
    return timerId === undefined ? result : trailingEdge(now_1());
  }

  function debounced() {
    var time = now_1(),
        isInvoking = shouldInvoke(time);

    lastArgs = arguments;
    lastThis = this;
    lastCallTime = time;

    if (isInvoking) {
      if (timerId === undefined) {
        return leadingEdge(lastCallTime);
      }
      if (maxing) {
        // Handle invocations in a tight loop.
        clearTimeout(timerId);
        timerId = setTimeout(timerExpired, wait);
        return invokeFunc(lastCallTime);
      }
    }
    if (timerId === undefined) {
      timerId = setTimeout(timerExpired, wait);
    }
    return result;
  }
  debounced.cancel = cancel;
  debounced.flush = flush;
  return debounced;
}

var debounce_1 = debounce;

/** Error message constants. */
var FUNC_ERROR_TEXT = 'Expected a function';

/**
 * Creates a throttled function that only invokes `func` at most once per
 * every `wait` milliseconds. The throttled function comes with a `cancel`
 * method to cancel delayed `func` invocations and a `flush` method to
 * immediately invoke them. Provide `options` to indicate whether `func`
 * should be invoked on the leading and/or trailing edge of the `wait`
 * timeout. The `func` is invoked with the last arguments provided to the
 * throttled function. Subsequent calls to the throttled function return the
 * result of the last `func` invocation.
 *
 * **Note:** If `leading` and `trailing` options are `true`, `func` is
 * invoked on the trailing edge of the timeout only if the throttled function
 * is invoked more than once during the `wait` timeout.
 *
 * If `wait` is `0` and `leading` is `false`, `func` invocation is deferred
 * until to the next tick, similar to `setTimeout` with a timeout of `0`.
 *
 * See [David Corbacho's article](https://css-tricks.com/debouncing-throttling-explained-examples/)
 * for details over the differences between `_.throttle` and `_.debounce`.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Function
 * @param {Function} func The function to throttle.
 * @param {number} [wait=0] The number of milliseconds to throttle invocations to.
 * @param {Object} [options={}] The options object.
 * @param {boolean} [options.leading=true]
 *  Specify invoking on the leading edge of the timeout.
 * @param {boolean} [options.trailing=true]
 *  Specify invoking on the trailing edge of the timeout.
 * @returns {Function} Returns the new throttled function.
 * @example
 *
 * // Avoid excessively updating the position while scrolling.
 * jQuery(window).on('scroll', _.throttle(updatePosition, 100));
 *
 * // Invoke `renewToken` when the click event is fired, but not more than once every 5 minutes.
 * var throttled = _.throttle(renewToken, 300000, { 'trailing': false });
 * jQuery(element).on('click', throttled);
 *
 * // Cancel the trailing throttled invocation.
 * jQuery(window).on('popstate', throttled.cancel);
 */
function throttle(func, wait, options) {
  var leading = true,
      trailing = true;

  if (typeof func != 'function') {
    throw new TypeError(FUNC_ERROR_TEXT);
  }
  if (isObject_1(options)) {
    leading = 'leading' in options ? !!options.leading : leading;
    trailing = 'trailing' in options ? !!options.trailing : trailing;
  }
  return debounce_1(func, wait, {
    'leading': leading,
    'maxWait': wait,
    'trailing': trailing
  });
}

var throttle_1 = throttle;

const DistrictrContext = createContext(null);
const DistrictrDispatchContext = createContext(null);

const StyledCursor = styled.div `
  position: absolute;
  top: 0;
  left: 0;
  width: 1px;
  height: 1px;
  background: #000;
  pointer-events: none;
  z-index: 1000;
  background: transparent;
  transform: translate(-50%, -50%);

  &.d-cursor--hidden {
    opacity: 0;
  }

  &.d-cursor--visible {
    opacity: 1;
  }
`;
const CursorBounds = styled.div `
  width: 100%;
  height: 100%;
  border-radius: 50%;
  border: 2px solid #333333;
  pointer-events: none;
  opacity: 1;

  &.d-brush-pan {
    opacity: 0;
  }
`;
const CursorCenter = styled.div `
  position: relative;
  top: calc(-50% - 4px);
  left: calc(50% - 4px);
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: transparent;
  pointer-events: none;
`;

const Cursor = ({ position }) => {
    if (!position)
        return null;
    const districtr = React__default.useContext(DistrictrContext);
    const districtrDispatch = React__default.useContext(DistrictrDispatchContext);
    const cursorCircle = React__default.useRef(null);
    const cursorDot = React__default.useRef(null);
    useEffect(() => {
        districtrDispatch({ type: 'update_brush_size' });
    }, [districtr.activeTool]);
    // if given the length of the diagonal of a square, return the length of the side
    const getSideLength = (diagonal) => {
        return Math.sqrt(2 * Math.pow(diagonal, 2));
    };
    return (React__default.createElement(StyledCursor, { "data-testid": "Cursor", className: `d-cursor-${districtr.activeTool.toLowerCase()} d-cursor--${districtr.cursorVisible ? 'visible' : 'hidden'}`, style: {
            top: position.y + 50,
            left: position.x + 48,
            width: getSideLength(districtr.brushSize * 2),
            height: getSideLength(districtr.brushSize * 2)
        } },
        React__default.createElement(CursorBounds, { ref: cursorCircle, className: `d-brush-${districtr.activeTool}` }),
        React__default.createElement(CursorCenter, { ref: cursorDot })));
};

function styleInject(css, ref) {
  if ( ref === void 0 ) ref = {};
  var insertAt = ref.insertAt;

  if (!css || typeof document === 'undefined') { return; }

  var head = document.head || document.getElementsByTagName('head')[0];
  var style = document.createElement('style');
  style.type = 'text/css';

  if (insertAt === 'top') {
    if (head.firstChild) {
      head.insertBefore(style, head.firstChild);
    } else {
      head.appendChild(style);
    }
  } else {
    head.appendChild(style);
  }

  if (style.styleSheet) {
    style.styleSheet.cssText = css;
  } else {
    style.appendChild(document.createTextNode(css));
  }
}

var css_248z$2 = ".layer-control-panel {\n  z-index: 1000;\n  margin: 10px 0;\n  border: 1px solid var(--foreground-border);\n  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);\n  background: rgb(253, 253, 247);\n}\n\n.layer-control-panel__header {\n  display: flex;\n  flex-direction: row;\n  align-items: center;\n  justify-content: flex-start;\n  padding: 10px;\n  background-color: #fff;\n}\n\n.layer-control-panel__quick-actions {\n  align-self: flex-end;\n  display: flex;\n  flex-direction: row;\n  align-items: center;\n  justify-content: space-between;\n  padding: 0 4px;\n}\n\n.layer-control-panel__title {\n  font-size: 12px;\n  font-weight: 600;\n  margin-left: 10px;\n  flex-grow: 1;\n}\n\n.layer-control-panel__content {\n  background: rgba(250, 250, 250);\n  padding: 0;\n  height: 0;\n  display: none;\n  overflow: hidden;\n  transition: all 0.2s ease-in-out;\n}\n\n.layer-control-panel__open {\n  border-top: 1px solid var(--foreground-border);\n  padding: 0;\n  height: auto;\n  display: block;\n}\n\n.layer-control-panel__content__inner {\n  display: flex;\n  flex-direction: column;\n  padding: 10px;\n  background-color: rgba(var(--foreground), 0.1);\n}\n\n.layer-control-panel__content__inner__row {\n  display: flex;\n  flex-direction: row;\n  align-items: center;\n  justify-content: space-between;\n  margin-bottom: 10px;\n}\n";
styleInject(css_248z$2);

const LayerControl = ({ map, layer }) => {
    const districtr = React__default.useContext(DistrictrContext);
    React__default.useContext(DistrictrDispatchContext);
    const [open, setOpen] = React__default.useState(false);
    const [layerName, setLayerName] = React__default.useState(null);
    const [layerTypeName, setLayerTypeName] = React__default.useState(null);
    const [visible, setVisible] = React__default.useState(true);
    const [opacity, setOpacity] = React__default.useState(1);
    const [fillColor, setFillColor] = React__default.useState(null);
    const [strokeColor, setStrokeColor] = React__default.useState(null);
    const [strokeWidth, setStrokeWidth] = React__default.useState(null);
    const [originalPaintProperties, setOriginalPaintProperties] = React__default.useState(null);
    const [originalLayoutProperties, setOriginalLayoutProperties] = React__default.useState(null);
    React__default.useEffect(() => {
        if (districtr.mapboxMap) {
            // if layer has the paint property, set the original paint properties
            if (layer.hasOwnProperty('paint')) {
                //@ts-ignore
                setOriginalPaintProperties(layer.paint);
            }
            if (layer.hasOwnProperty('layout')) {
                //@ts-ignore
                setOriginalLayoutProperties(layer.layout);
                //@ts-ignore
                if (layer.layout.visibility === 'none') {
                    setVisible(false);
                }
            }
            if (layer.hasOwnProperty('id')) {
                setLayerName(layer.id
                    .replace(/_/g, ' ')
                    .replace(/-/g, ' ')
                    .replace(/\w\S*/g, (txt) => {
                    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
                }));
                setLayerTypeName(layer.type
                    .replace(/_/g, ' ')
                    .replace(/-/g, ' ')
                    .replace(/\w\S*/g, (txt) => {
                    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
                }));
            }
        }
    }, []);
    React__default.useEffect(() => { }, [open]);
    const toggleVisibility = () => {
        if (visible) {
            districtr.mapboxMap.setLayoutProperty(layer.id, 'visibility', 'none');
        }
        else {
            districtr.mapboxMap.setLayoutProperty(layer.id, 'visibility', 'visible');
        }
        setVisible(!visible);
    };
    if (!layerName) {
        return null;
    }
    return (React__default.createElement("li", { "data-testid": "LayerControl", className: "layer-control-panel" },
        React__default.createElement("div", { className: "layer-control-panel__header" },
            React__default.createElement(Button, { accessibilityLabel: "Open", size: "small", pressed: open, variant: "toggle", onClick: () => setOpen(!open) }, "\u271A"),
            React__default.createElement("div", { className: "layer-control-panel__title" },
                layerName,
                " (",
                layerTypeName,
                ")"),
            React__default.createElement("div", { className: "layer-control-panel__quick-actions" },
                React__default.createElement(Button, { accessibilityLabel: "visible", size: "small", variant: "toggle", onClick: () => toggleVisibility() }, visible ? React__default.createElement(BiShow, null) : React__default.createElement(BiHide, null)))),
        React__default.createElement("div", { className: `layer-control-panel__content ${open ? ' layer-control-panel__open' : ''}` },
            React__default.createElement("div", { className: "layer-control-panel__content__inner" },
                React__default.createElement("div", { className: "layer-control-panel__content__inner__row" },
                    React__default.createElement("label", { htmlFor: "visibility" }, "Visibility"),
                    React__default.createElement("input", { id: "visibility", type: "checkbox", checked: visible, onChange: toggleVisibility })),
                React__default.createElement("div", { className: "layer-control-panel__content__inner__row" },
                    React__default.createElement("label", { htmlFor: "opacity" }, "Opacity"),
                    React__default.createElement("input", { id: "opacity", type: "range", min: "0", max: "1", step: "0.05", value: opacity, onChange: (e) => {
                            const value = parseFloat(e.target.value);
                            setOpacity(value);
                            if (originalPaintProperties) {
                                if (originalPaintProperties['fill-color']) {
                                    districtr.mapboxMap.setPaintProperty(layer.id, 'fill-opacity', value);
                                }
                                if (originalPaintProperties['stroke-color']) {
                                    districtr.mapboxMap.setPaintProperty(layer.id, 'line-opacity', value);
                                }
                                if (originalPaintProperties['background-color']) {
                                    districtr.mapboxMap.setPaintProperty(layer.id, 'background-opacity', value);
                                }
                            }
                            else {
                                if (layer.type === 'raster') {
                                    districtr.mapboxMap.setPaintProperty(layer.id, 'raster-opacity', value);
                                }
                            }
                        } })),
                originalPaintProperties && originalPaintProperties.fill && (React__default.createElement("div", { className: "layer-control-panel__content__inner__row" },
                    React__default.createElement("label", { htmlFor: "fill-color" }, "Fill Color"),
                    React__default.createElement("input", { id: "fill-color", type: "color", value: fillColor, onChange: (e) => {
                            const value = e.target.value;
                            setFillColor(value);
                            map.setPaintProperty(layer.id, 'fill-color', value);
                        } }))),
                originalPaintProperties && originalPaintProperties.stroke && (React__default.createElement("div", { className: "layer-control-panel__content__inner__row" },
                    React__default.createElement("label", { htmlFor: "stroke-color" }, "Stroke Color"),
                    React__default.createElement("input", { id: "stroke-color", type: "color", value: strokeColor, onChange: (e) => {
                            const value = e.target.value;
                            setStrokeColor(value);
                            map.setPaintProperty(layer.id, 'line-color', value);
                        } }))),
                originalPaintProperties && originalPaintProperties.stroke && (React__default.createElement("div", { className: "layer-control-panel__content__inner__row" },
                    React__default.createElement("label", { htmlFor: "stroke-width" }, "Stroke Width"),
                    React__default.createElement("input", { id: "stroke-width", type: "range", min: "0", max: "10", step: "0.5", value: strokeWidth, onChange: (e) => {
                            const value = parseFloat(e.target.value);
                            setStrokeWidth(value);
                            map.setPaintProperty(layer.id, 'line-width', value);
                        } })))))));
};

var css_248z$1 = ".d-debug-panel {\n  position: absolute;\n  top: 50px;\n  bottom: 0;\n  right: 48px;\n  width: 300px;\n  height: 100%;\n  z-index: 1;\n  display: flex;\n  flex-direction: column;\n  justify-content: flex-start;\n  align-items: stretch;\n  padding: 0.5rem;\n  background: rgb(253, 253, 247);\n  color: #333333;\n  border-right: 1px solid #e0e0e0;\n}\n\n.d-debug-panel--scrollable {\n  overflow-y: auto;\n}\n\n.d-debug-panel-unit {\n  display: flex;\n  flex-direction: row;\n  margin-bottom: 0.5rem;\n}\n\n.d-debug-panel-unit.active {\n  font-weight: bold;\n}\n\n.unit-name {\n  flex-grow: 1;\n}\n\n.unit-population {\n  text-align: right;\n}\n\n.d-debug-panel--scrollable {\n  overflow-y: auto;\n}\n\n.d-debug-panel__section {\n  margin-bottom: 10px;\n}\n\n.d-debug-panel__section-content {\n  display: grid;\n  grid-auto-rows: 1fr;\n  grid-template-columns: 1fr 1fr;\n  gap: 10px 10px;\n  margin-bottom: 10px;\n}\n\n.d-debug-panel__list {\n  margin: 0;\n  padding: 0;\n  list-style-type: none;\n  width: 100%;\n}\n\n.d-debug-panel__list-item {\n  width: 100%;\n}\n";
styleInject(css_248z$1);

const DebugPanel = ({ map }) => {
    const [mapLayers, setMapLayers] = React__default.useState(null);
    const [mapGroups, setMapGroups] = React__default.useState(null);
    useEffect(() => {
        if (map) {
            setMapLayers(map.getStyle().layers);
        }
    }, []);
    useEffect(() => {
        setMapLayers(map.getStyle().layers);
    }, [map]);
    useEffect(() => {
        if (mapLayers) {
            // if the layer.metadata.group is not already in the array, add it
            const groups = mapLayers.reduce((acc, layer) => {
                if (layer.metadata && layer.metadata['mapbox:group']) {
                    if (!acc.includes(layer.metadata['mapbox:group'])) ;
                }
                else if (!layer.metadata) {
                    if (!acc.includes('Districtr')) {
                        acc.push('Districtr');
                    }
                }
                return acc;
            }, []);
            setMapGroups(groups);
        }
    }, [mapLayers]);
    return (React__default.createElement("div", { "data-testid": "DebugPanel", className: "d-debug-panel d-debug-panel--scrollable " },
        React__default.createElement("div", { className: "d-debug-panel__content" },
            React__default.createElement("div", { className: "d-debug-panel__section" },
                React__default.createElement("h4", { style: { marginBottom: 5 } }, "Layer Control"),
                React__default.createElement("ul", { className: "d-debug-panel__list" }, mapLayers && mapGroups && (React__default.createElement(React__default.Fragment, null, mapGroups.map((group) => (React__default.createElement("li", { key: group, className: "d-debug-panel__list-item" },
                    React__default.createElement("h5", null, group),
                    React__default.createElement("ul", { className: "d-debug-panel__list" }, mapLayers.map((layer) => {
                        if (!layer.metadata && group === 'Districtr') {
                            return React__default.createElement(LayerControl, { key: layer.id, map: map, layer: layer });
                        }
                    }))))))))))));
};

const StyledSplitStitcher = styled.div `
  position: absolute;
  top: 50px;
  bottom: 0;
  right: 48px;
  width: 300px;
  height: 100%;
  z-index: 1;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: stretch;
  padding: 0.5rem;
  background: rgb(253, 253, 247);
  color: #333333;
  border-right: 1px solid #e0e0e0;
`;

const SplitStitcher = ({ foo }) => {
    const districtr = React__default.useContext(DistrictrContext);
    const districtrDispatch = React__default.useContext(DistrictrDispatchContext);
    const [splits, setSplits] = React__default.useState(new Map());
    const [totalFeatures, setTotalFeatures] = React__default.useState(9178);
    const [drawnFeatures, setDrawnFeatures] = React__default.useState(0);
    React__default.useEffect(() => {
        calculateSplits();
    }, []);
    React__default.useEffect(() => {
        const newSplits = new Map();
        let count = 0;
        districtr.unitAssignments.forEach((value, key) => {
            count += 1;
            if (!newSplits.has(key.slice(0, 5))) {
                newSplits.set(key.slice(0, 5), new Set());
            }
            newSplits.get(key.slice(0, 5)).add(value);
        });
        setSplits(newSplits);
        setDrawnFeatures(count);
    }, [districtr.unitAssignments]);
    const calculateSplits = () => {
        const newSplits = new Map();
        districtr.unitAssignments.forEach((value, key) => {
            if (!newSplits.has(key.slice(0, 5))) {
                newSplits.set(key.slice(0, 5), new Set());
            }
            newSplits.get(key.slice(0, 5)).add(value);
        });
    };
    const togglePaintByCounty = () => {
        districtrDispatch({ type: 'toggle_paint_by_county' });
    };
    return (React__default.createElement(StyledSplitStitcher, { "data-testid": "SplitStitcher" },
        React__default.createElement("h4", null, "Stitch Split Counties"),
        React__default.createElement("small", null, "Paint by County will only paint counties that are in view. The map's bounds will be locked while drawing by county."),
        React__default.createElement("br", null),
        React__default.createElement("div", { style: { marginTop: 12 } },
            React__default.createElement(Button, { accessibilityLabel: "Paint By County", pressed: districtr.paintByCounty, fullWidth: true, variant: "secondary", onClick: togglePaintByCounty }, districtr.paintByCounty ? 'Turn Off Paint By County' : 'Turn On Paint By County')),
        React__default.createElement("br", null),
        React__default.createElement("ul", { style: { listStyle: 'none', padding: 0 } },
            Array.from(splits).map(([key, value]) => {
                if (value.size > 1) {
                    return (React__default.createElement("li", { key: key },
                        key,
                        " County: ",
                        value.size,
                        " Districts"));
                }
            }),
            React__default.createElement("div", null,
                React__default.createElement(Button, { accessibilityLabel: "Recalculate", fullWidth: true, onClick: calculateSplits }, "Recalculate"),
                React__default.createElement("br", null),
                React__default.createElement("small", null,
                    React__default.createElement("strong", null,
                        "You have drawn ",
                        drawnFeatures.toLocaleString(),
                        " of ",
                        totalFeatures.toLocaleString(),
                        " Features."),
                    ' ',
                    "To activate the Split County Tool, draw at least one county that is split between two districts or more. For the most accurate results from the Split County tool complete your entire map.")))));
};

const StyledRange = styled.input `
  -webkit-appearance: none;
  background: transparent;
  width: 300px;

  &::-webkit-slider-runnable-track {
    width: 300px;
    height: 5px;
    background: #ddd;
    border: none;
    border-radius: 3px;
  }

  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    border: none;
    height: 16px;
    width: 16px;
    border-radius: 50%;
    background: goldenrod;
    margin-top: -4px;
  }

  &:focus {
    outline: none;
  }

  &:focus::-webkit-slider-runnable-track {
    background: #ffffff;
  }

  &::-moz-range-track {
    width: 100px;
    height: 5px;
    background: #ddd;
    border: none;
    border-radius: 3px;
  }

  &::-moz-range-thumb {
    border: none;
    height: 16px;
    width: 16px;
    border-radius: 50%;
    background: goldenrod;
  }

  /*hide the outline behind the border*/
  &:-moz-focusring {
    outline: 0;
    outline-offset: -1px;
  }

  &:focus::-moz-range-track {
    background: #ccc;
  }
`;
const StyledInput = styled.input `
  border: none;
  background-color: #fff;
  color: #333;
  font-size: 1rem;
  text-align: center;
  padding: 4px 2px;
  margin: 0;
  outline: none;
  border-radius: 3px;
  border: 2px solid #333;
  width: 36px;
  font-size: 0.85rem;

  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  &[type='number'] {
    -moz-appearance: textfield;
  }

  &:focus {
    border-color: #6a806c;
  }
`;
const StyledRangeSlider = styled.div `
  display: flex;

  &.d-rangeslider--vertical {
    margin-top: 12px;
    width: 48px;
    height: 160px;
    flex-direction: column-reverse;
    align-items: center;
    justify-content: space-around;
  }

  &.d-rangeslider--horizontal {
    flex-direction: row;
    align-items: center;
  }

  &.d-rangeslider--horizontal {
    ${StyledRange} {
      height: 12px;
    }

    ${StyledInput} {
      margin-right: 6px;
    }
  }

  &.d-rangeslider--vertical {
    ${StyledRange} {
      margin-top: 10px;
      width: 100px;
      transform: rotate(270deg);
    }

    ${StyledInput} {
      margin-top: 8px;
    }
  }
`;

const RangeSlider = ({ align, min, max, name }) => {
    const districtr = React__default.useContext(DistrictrContext);
    const districtrDispatch = React__default.useContext(DistrictrDispatchContext);
    const rangeSlider = React__default.useRef(null);
    const rangeInput = React__default.useRef(null);
    const range = React__default.useRef(null);
    const handleChange = (e) => {
        districtrDispatch({ type: 'set_brush_size', payload: parseInt(e.target.value) });
    };
    return (React__default.createElement(StyledRangeSlider, { ref: rangeSlider, "data-testid": "RangeSlider", className: `d-rangeslider d-rangeslider--${align}` },
        React__default.createElement(StyledInput, { name: name, ref: rangeInput, type: "number", value: districtr.brushSizeValue, min: min, onChange: handleChange, max: max, className: "d-input-number" }),
        React__default.createElement(StyledRange, { name: name, ref: range, type: "range", min: min, max: max, value: districtr.brushSizeValue, onChange: handleChange, className: "d-range" })));
};

var css_248z = ".d-toolbar {\n  position: absolute;\n  width: 48px;\n  top: 50px;\n  bottom: 0;\n  z-index: 9000;\n  background-color: rgb(236, 233, 225);\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: space-between;\n  padding-top: 12px;\n}\n\n.d-toolbar.d-toolbar--right {\n  right: 0;\n  border-left: 1px solid #e6e6e6;\n  box-shadow: rgba(0, 0, 0, 0.1) -1px 1px 1px;\n}\n\n.d-toolbar.d-toolbar--left {\n  left: 0;\n  border-right: 1px solid #e6e6e6;\n  box-shadow: rgba(0, 0, 0, 0.1) 1px 1px 1px;\n}\n\n.d-toolbar-group {\n  list-style: none;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n  padding: 0;\n  margin: 0;\n}\n\n.d-toolbar-item {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  width: 100%;\n  height: auto;\n  cursor: pointer;\n  transition: background-color 0.2s ease;\n  margin: 0;\n  padding: 0 0 8px 0;\n}\n\n.d-toolbar-panel {\n  position: absolute;\n  width: 300px;\n  height: 100%;\n  top: calc(50vh - 200px);\n  left: 47px;\n  z-index: 9999;\n  transition: transform 0.2s ease;\n  overflow: hidden;\n}\n";
styleInject(css_248z);

const Toolbar = ({ position, children }) => {
    const districtr = React__default.useContext(DistrictrContext);
    const districtrDispatch = React__default.useContext(DistrictrDispatchContext);
    const [panelOpen, setPanelOpen] = React__default.useState(false);
    const [currentColor, setCurrentColor] = React__default.useState(null);
    const [unitCount, setUnitCount] = React__default.useState(Object.keys(districtr.units).length);
    React__default.useEffect(() => {
        setCurrentColor(districtr.units[districtr.activeUnit].color);
        //setUnitCount(Object.keys(districtr.units).length)
    }, []);
    React__default.useEffect(() => {
        setCurrentColor(districtr.units[districtr.activeUnit].color);
    }, [districtr.activeUnit]);
    React__default.useEffect(() => { }, [currentColor]);
    const handleOptionChange = (e) => {
        districtrDispatch({
            type: 'update_tool_options',
            payload: { tool: districtr.activeTool, property: e.target.name, value: e.target.value }
        });
    };
    const handleColorChange = (e) => {
        setCurrentColor(e.target.value);
        districtrDispatch({ type: 'update_unit_color', payload: { unit: districtr.activeUnit, color: e.target.value } });
    };
    const handleToolChange = (tool) => {
        districtrDispatch({ type: 'update_active_tool', payload: { activeTool: tool } });
    };
    const createToolButtons = () => {
        if (!districtr.tools)
            return null;
        const toolButtons = [];
        for (const [key, value] of Object.entries(districtr.tools)) {
            const tool = districtr.tools[key];
            const icon = () => {
                if (tool.name === 'brush') {
                    return React__default.createElement(BiBrush, null);
                }
                else if (tool.name === 'eraser') {
                    return React__default.createElement(BiEraser, null);
                }
                else if (tool.name === 'pan') {
                    return React__default.createElement(BiMove, null);
                }
                else {
                    return tool.icon;
                }
            };
            if (tool.enabled) {
                toolButtons.push(React__default.createElement("li", { key: key, className: "d-toolbar-item" },
                    React__default.createElement(Button, { accessibilityLabel: `${tool.name} button`, variant: 'toolbar', pressed: districtr.activeTool === tool.name, onClick: () => handleToolChange(tool.name) }, icon())));
            }
        }
        return toolButtons;
    };
    const createToolOptions = () => {
        if (!districtr.tools)
            return null;
        const toolOptions = [];
        for (const [key, value] of Object.entries(districtr.tools)) {
            const tool = districtr.tools[key];
            if (tool.name === districtr.activeTool && tool.enabled && 'options' in tool) {
                const optionInputs = tool.options.inputs;
                optionInputs.forEach((optionInput, index) => {
                    if (optionInput.type === 'rangeSlider') {
                        toolOptions.push(React__default.createElement("li", { key: index, className: "d-toolbar-item" },
                            React__default.createElement(RangeSlider, Object.assign({}, optionInput.config, { onChange: handleOptionChange, name: optionInput.property }))));
                    }
                    if (optionInput.type === 'colorPicker') {
                        if (!districtr.units)
                            return null;
                        toolOptions.push(React__default.createElement("li", { key: index, className: "d-toolbar-item" },
                            React__default.createElement(Button, { accessibilityLabel: "Color Swatch", variant: 'swatch', onClick: () => (panelOpen === index ? setPanelOpen(false) : setPanelOpen(index)), style: { backgroundColor: currentColor } }),
                            panelOpen === index && (React__default.createElement("div", { className: "d-panel d-toolbar-panel" },
                                React__default.createElement(ColorPicker, { color: currentColor, defaultUnitCount: unitCount, onChange: handleColorChange })))));
                    }
                });
            }
        }
        return toolOptions;
    };
    const toolButtons = createToolButtons();
    const toolOptions = createToolOptions();
    return (React__default.createElement("div", { "data-testid": "Toolbar", className: `d-toolbar d-toolbar--${position}` },
        districtr.tools && position == 'left' && (React__default.createElement(React__default.Fragment, null,
            React__default.createElement("ul", { className: "d-toolbar-group d-toolbar-group--top" }, toolButtons),
            React__default.createElement("ul", { className: "d-toolbar-group d-toolbar-group--middle" }, toolOptions))),
        children));
};

const StyledTableController = styled.div `
  padding: 0;
  background: transparent;
  color: ${(props) => props.theme.foreground};
  padding-bottom: 10px;
  margin-bottom: 10px;
`;
const StyledTableItem = styled.div `
  display: grid;
  grid-template-columns: repeat(16, 1fr);
  grid-template-rows: minmax(36px, auto);
  grid-column-gap: calc(${(props) => props.theme.spacing['sm']} / 2);
  grid-row-gap: 0;
  padding: 0;
  background-color: ${(props) => props.theme.colors.white};
  border-radius: ${(props) => props.theme.shapes.borderRadius['md']};
  border: 0.5px solid ${(props) => props.theme.colors.green['500']};
  margin-bottom: calc(${(props) => props.theme.spacing['xs']} / 2);
  &:last-child {
    border-bottom: none;
  }
`;
styled.div `
  display: flex;
  align-items: center;
  justify-content: flex-start;
  font-size: ${(props) => props.theme.type.fontSize['sm']};
  font-weight: ${(props) => props.theme.type.fontWeight['400']};
  color: ${(props) => props.theme.foreground};
  grid-area: 1 / 1 / 2 / 5;
`;
const TableItemCell = styled.div `
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: ${(props) => props.theme.type.fontSize['md']};
  font-weight: ${(props) => props.theme.type.fontWeight['400']};
  color: ${(props) => props.theme.foreground};
  min-height: 36px;

  &.toggle-wrapper {
    grid-area: 1/1/2/3;
    border-right: 0.5px solid ${(props) => props.theme.colors.gray['200']};
  }
  &.cell-name {
    grid-area: 1 / 3 / 2 / 12;
    justify-content: flex-start;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    font-weight: ${(props) => props.theme.type.fontWeight['600']};
    line-height: ${(props) => props.theme.type.lineHeight['sm']};
  }

  &.cell-value {
    grid-area: 1 / 12 / 2 / 17;
    justify-content: flex-end;
    font-weight: ${(props) => props.theme.type.fontWeight['600']};
    padding-right: ${(props) => props.theme.spacing['xs']};
    cursor: pointer;
  }

  &.cell-wrapper {
    grid-area: 2 / 1 / 3 / 17;
    border-top: 0.5px solid ${(props) => props.theme.colors.gray['200']};
    display: flex;
    align-items: center;
    justify-content: space-between;

    .cell-controls {
      display: flex;
      align-items: center;
      justify-content: space-between;
      width: 100%;
      //flex-grow: 1;

      border-right: 0.5px solid ${(props) => props.theme.colors.gray['200']};
      padding-left: calc(${(props) => props.theme.spacing['sm']} / 2);

      justify-content: flex-start;
      border-right: 0.5px solid ${(props) => props.theme.colors.gray['200']};
    }

    .cell-state_left {
      border-right: 0.5px solid ${(props) => props.theme.colors.gray['200']};
      text-align: center;
      justify-content: center;
      font-size: ${(props) => props.theme.type.fontSize['xs']};
      border-right: 0.5px solid ${(props) => props.theme.colors.gray['200']};
      padding: 0 ${(props) => props.theme.spacing['xs']};
    }

    .cell-state_right {
      border-right: 0.5px solid ${(props) => props.theme.colors.gray['200']};
      text-align: center;
      justify-content: center;
      font-size: ${(props) => props.theme.type.fontSize['xs']};
      padding: 0 ${(props) => props.theme.spacing['xs']};
    }
  }
`;

const TableControllerItem = ({ item, total, activeValue, setActiveValue }) => {
    const districtr = React__default.useContext(DistrictrContext);
    const districtrDispatch = React__default.useContext(DistrictrDispatchContext);
    const [activeValues, setActiveValues] = React__default.useState([]);
    const [activeHeaderLabel, setActiveHeaderLabel] = React__default.useState(['District', 'District']);
    const [open, setOpen] = React__default.useState(false);
    const [datasetShareValue, setDatasetShareValue] = React__default.useState('');
    const [datasetShareValueRaw, setDatasetShareValueRaw] = React__default.useState('0');
    React__default.useEffect(() => {
        const totalShare = (item.value / total.value) * 100;
        let totalShareValue = totalShare.toFixed(1) + '%';
        if (totalShare < 0.1 && totalShare > 0) {
            totalShareValue = '< 0.1%';
        }
        if (totalShare === 0) {
            totalShareValue = '0%';
        }
        const raw = item.value.toLocaleString();
        let datasetShare = (item.sum / total.sum) * 100;
        let datasetShareValue = datasetShare.toFixed(1) + '%';
        if (datasetShare < 0.1 && datasetShare > 0) {
            datasetShareValue = '< 0.1%';
        }
        if (datasetShare === 0) {
            datasetShareValue = '0%';
        }
        setDatasetShareValueRaw(item.sum.toLocaleString());
        setDatasetShareValue(datasetShareValue);
        setActiveValues([totalShareValue, raw]);
    }, [item, activeValue]);
    const changeActiveValue = () => {
        if (activeValue === 1) {
            setActiveValue(0);
        }
        else {
            setActiveValue(1);
        }
    };
    const handleOverlayClick = () => {
        districtrDispatch({
            type: 'set_demo_overlay',
            payload: {
                name: item.name,
                value: item.value,
                sum: item.sum,
                dataset: item.dataset,
                type: item.type,
                key: item.key
            }
        });
    };
    const handleLabelClick = () => {
        districtrDispatch({
            type: 'set_demo_labels',
            payload: {
                name: item.name,
                value: item.value,
                sum: item.sum,
                dataset: item.dataset,
                type: item.type,
                key: item.key
            }
        });
    };
    return (React__default.createElement(StyledTableItem, { "data-testid": "TableController" },
        React__default.createElement(TableItemCell, { className: "toggle-wrapper" },
            React__default.createElement(Button, { accessibilityLabel: "Toggle Open", pressed: open, variant: "toggle", onClick: () => setOpen(!open) },
                React__default.createElement(BiChevronRight, null))),
        React__default.createElement(TableItemCell, { className: "cell-name" }, item.name),
        React__default.createElement(TableItemCell, { onClick: changeActiveValue, className: "cell-value" },
            districtr.activeDemoOverlay === item.key && React__default.createElement(BiMapAlt, null),
            districtr.activeDemoLabel === item.key && React__default.createElement(MdOutlineLabel, null),
            activeValues[activeValue]),
        open && (React__default.createElement(React__default.Fragment, null,
            React__default.createElement(TableItemCell, { className: "cell-wrapper" },
                React__default.createElement("div", { className: "cell-controls" },
                    React__default.createElement(Button, { accessibilityLabel: "Demographic Overlay", pressed: districtr.activeDemoOverlay === item.key, size: "small", variant: "toolbar", style: { marginRight: 4 }, onClick: handleOverlayClick },
                        React__default.createElement(BiMapAlt, null)),
                    React__default.createElement(Button, { accessibilityLabel: "Demographic Labels", pressed: districtr.activeDemoLabel === item.key, size: "small", variant: "toolbar", style: { marginRight: 4 }, onClick: handleLabelClick },
                        React__default.createElement(MdOutlineLabel, null))),
                React__default.createElement("div", { className: "cell-state_left" },
                    activeValue == 1 ? activeHeaderLabel[0] : activeHeaderLabel[1],
                    React__default.createElement("br", null),
                    activeValue == 1 ? activeValues[0] : activeValues[1]),
                React__default.createElement("div", { className: "cell-state_right" },
                    "State",
                    React__default.createElement("br", null),
                    activeValue == 1 ? datasetShareValue : datasetShareValueRaw))))));
};

const TableController = ({ data, activeSet }) => {
    const [activeValue, setActiveValue] = React__default.useState(0);
    const [chartData, setChartData] = React__default.useState([]);
    const [chartTotal, setChartTotal] = React__default.useState(null);
    useEffect(() => { }, [activeValue]);
    if (!data)
        return null;
    React__default.useEffect(() => {
        // If the data item type is 'total', and the dataset equals activeSet, set it to a variable called 'total' and remove total from the data array
        const total = data.find((item) => item.type === 'total' && item.dataset === activeSet);
        data = data.filter((item) => item.type !== 'total');
        // Remove any item from the dataset that are not of the dataset type equal to activeSet
        data = data.filter((item) => item.dataset === activeSet);
        // sort the data so the largest value is at the top and then sort by name
        data.sort((a, b) => {
            if (a.value > b.value) {
                return -1;
            }
            if (a.value < b.value) {
                return 1;
            }
            if (a.name < b.name) {
                return -1;
            }
            if (a.name > b.name) {
                return 1;
            }
            return 0;
        });
        setChartData(data);
        setChartTotal(total);
    }, [data, activeSet]);
    return (React__default.createElement(DistrictrThemeProvider, null,
        React__default.createElement(StyledTableController, { "data-testid": "TableController" },
            chartData.map((item, index) => {
                return (React__default.createElement(TableControllerItem, { key: index, item: item, total: chartTotal, activeValue: activeValue, setActiveValue: setActiveValue }));
            }),
            React__default.createElement(Button, { accessibilityLabel: "Coalition Builder", variant: "secondary", fullWidth: true },
                ' ',
                "+ Add Custom Coalition"))));
};

const UnitControllerWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  width: 100%;
`;

const UnitHeader = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  //margin-bottom: 12px;
  width: 100%;
  padding: 8px 8px 4px;
  border-bottom: 1px solid #e6e6e6;
`;

const UnitPagerTitle = styled.h4`
  margin: 0;
`;

const UnitInformation = styled.div`
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: top;
  width: 100%;
  //margin-bottom: 12px;
  padding: 8px;
`;
const UnitColor = styled.div`
  width: 64px;
  height: 56px;
  border-radius: 3px;
  border: 2px solid #333333;
  margin-right: 4px;
`;

const UnitDetails = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
`;

const InputWrapper = styled.div`
  width: 100%;
`;

const UnitOptionsRow = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  margin-bottom: 8px;
  padding: 0;
`;

const DatasetPickerWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  flex-shrink: 1;
`;

const DatasetPicker = styled.select`
  width: 100%;
  padding: 3px 8px;
  font-size: 12px;
  font-weight: 700;
  border: 1px solid #333333;
  border-radius: 3px;
  height: 24px;
`;

const GhostInput = styled.input`
  border: 1px solid rgba(255, 255, 255, 0);
  border-radius: 3px;
  padding: 2px 4px;
  font-size: 16px;
  font-weight: 700;
  width: 100%;
  line-height: 1;
  margin-bottom: 2px;

  &:focus {
    outline: none;
    border: 1px solid #333333;
  }
`;

const ChartWrapper = styled.div`
  width: 100%;
  height: 48px;
  margin-bottom: 18px;
  cursor: pointer;
  transition: all 0.2s ease-in-out;

  &:hover {
    transform: scale(1.01);
  }
`;

const UnitNotePadWrapper = styled.div`
  width: 100%;
  height: 100%;
  padding: 8px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;

  label {
    font-size: 10px;
  }
`;

const UnitNotePad = styled.textarea`
  width: 100%;
  height: 100%;
  padding: 8px;
  font-size: 12px;
  font-weight: 400;
  border: 1px solid #333333;
  border-radius: 3px;
  resize: none;
`;

const PopulationWrapper = styled.div`
  width: 100%;
  height: 100%;
  padding: 0 8px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  line-height: 1;
`;

const PopulationLabel = styled.label`
  font-size: 10px;
`;

const PopulationValue = styled.div`
  font-size: 16px;
  font-weight: 700;
`;

const UnitController = ({ dataSets, activeDataSet, setActiveDataSet }) => {
    const districtr = React__default.useContext(DistrictrContext);
    const districtrDispatch = React__default.useContext(DistrictrDispatchContext);
    const [showNotes, setShowNotes] = React__default.useState(false);
    const changeActiveUnit = (unitId) => {
        districtrDispatch({ type: 'set_active_unit', payload: unitId });
    };
    const handleTextInputChange = (e) => {
        districtrDispatch({ type: 'update_unit_name', payload: { unit: districtr.activeUnit, name: e.target.value } });
    };
    const getPopulationVariance = () => {
        if (districtr.units[districtr.activeUnit].population / districtr.units[districtr.activeUnit].unitIdealPopulation >
            1) {
            return `+${(districtr.units[districtr.activeUnit].population - districtr.units[districtr.activeUnit].unitIdealPopulation).toLocaleString()}`;
        }
        else if (districtr.units[districtr.activeUnit].population / districtr.units[districtr.activeUnit].unitIdealPopulation <
            1) {
            return `${(districtr.units[districtr.activeUnit].population - districtr.units[districtr.activeUnit].unitIdealPopulation).toLocaleString()}`;
        }
        else {
            return `0`;
        }
    };
    const handleUnitLockChange = () => {
        districtrDispatch({ type: 'toggle_unit_lock', payload: { unit: districtr.activeUnit } });
    };
    const handleUnitVisibilityChange = () => {
        districtrDispatch({ type: 'toggle_unit_visibility', payload: { unit: districtr.activeUnit } });
    };
    const handleNoteChange = (e) => {
        districtrDispatch({ type: 'update_unit_note', payload: { unit: districtr.activeUnit, note: e.target.value } });
    };
    return (React__default.createElement(UnitControllerWrapper, { "data-testid": "UnitController" },
        React__default.createElement(UnitHeader, null,
            React__default.createElement(Button, { variant: "toolbar", onClick: () => changeActiveUnit('previous'), style: { border: 'none' } },
                React__default.createElement(FaArrowCircleLeft, null)),
            React__default.createElement("div", null,
                React__default.createElement(UnitPagerTitle, null,
                    districtr.activeUnit,
                    " of ",
                    Object.keys(districtr.units).length)),
            React__default.createElement(Button, { variant: "toolbar", onClick: () => changeActiveUnit('next'), style: { border: 'none' } },
                React__default.createElement(FaArrowCircleRight, null))),
        React__default.createElement(UnitInformation, null,
            React__default.createElement(UnitColor, { style: { backgroundColor: districtr.units[districtr.activeUnit].color } }),
            React__default.createElement(UnitDetails, null,
                React__default.createElement(InputWrapper, null,
                    React__default.createElement(GhostInput, { type: "text", value: districtr.units[districtr.activeUnit].name, onChange: (e) => {
                            handleTextInputChange(e);
                        } })),
                React__default.createElement(UnitOptionsRow, null,
                    React__default.createElement(Button, { pressed: districtr.lockedUnits.has(districtr.activeUnit), size: "small", variant: "toolbar", onClick: handleUnitLockChange, style: { marginRight: 4 } }, districtr.lockedUnits.has(districtr.activeUnit) ? React__default.createElement(BiLock, null) : React__default.createElement(BiLockOpen, null)),
                    React__default.createElement(Button, { pressed: districtr.hiddenUnits.has(districtr.activeUnit), size: "small", variant: "toolbar", onClick: handleUnitVisibilityChange, style: { marginRight: 4 } }, districtr.hiddenUnits.has(districtr.activeUnit) ? React__default.createElement(BiHide, null) : React__default.createElement(BiShowAlt, null)),
                    React__default.createElement(Button, { pressed: showNotes, size: "small", variant: "toolbar", onClick: () => setShowNotes(!showNotes), style: { marginRight: 4 } },
                        React__default.createElement(BiNote, null)),
                    React__default.createElement(DatasetPickerWrapper, null,
                        React__default.createElement(DatasetPicker, { onChange: (e) => setActiveDataSet(e.target.value) }, dataSets.map((d) => (React__default.createElement("option", { key: d, value: d }, d)))))))),
        showNotes && (React__default.createElement(UnitNotePadWrapper, null,
            React__default.createElement("label", { htmlFor: "notes" }, "Unit Notes"),
            React__default.createElement(UnitNotePad, { name: "notes", value: districtr.units[districtr.activeUnit].note, onChange: (e) => handleNoteChange(e) }))),
        React__default.createElement(PopulationWrapper, null,
            React__default.createElement("div", null,
                React__default.createElement(PopulationLabel, null, "Population"),
                React__default.createElement(PopulationValue, null, districtr.units[districtr.activeUnit].population.toLocaleString())),
            React__default.createElement("div", null,
                React__default.createElement(PopulationLabel, null, "+/- Ideal"),
                React__default.createElement(PopulationValue, null, getPopulationVariance())),
            React__default.createElement("div", null,
                React__default.createElement(PopulationLabel, null, "Ideal"),
                React__default.createElement(PopulationValue, null, districtr.units[districtr.activeUnit].unitIdealPopulation.toLocaleString())))));
};

const UnitPopulationChart = ({ unitId, variant = 'default' }) => {
    const districtr = React__default.useContext(DistrictrContext);
    const districtrDispatch = React__default.useContext(DistrictrDispatchContext);
    if (!unitId || !districtr.units)
        return null;
    const unit = districtr.units[unitId];
    const members = unit.members || 1;
    const marginBottom = variant === 'default' ? 18 : 0;
    const chartData = [
        {
            name: unit.name,
            population: (unit.population / unit.unitIdealPopulation) * 100
        }
    ];
    const keys = Object.keys(chartData[0]).filter((d) => d !== 'color' && d !== 'subgroups' && d !== 'name');
    const getChartStatus = () => {
        if (unit.population / unit.unitIdealPopulation > 1.2) {
            return 'danger';
        }
        else if (unit.population / unit.unitIdealPopulation > 1.075) {
            return 'warning';
        }
        else {
            return 'success';
        }
    };
    const getStartTickFormat = (value, data) => {
        if (variant === 'default') {
            return '';
        }
        else {
            return `${data[value].name}`;
        }
    };
    const getIdealTickFormat = (value) => {
        if (variant === 'default') {
            return 'Ideal';
        }
        else {
            return '';
        }
    };
    const handleChartClick = (e) => {
        if (variant === 'default') ;
        else {
            districtrDispatch({ type: 'set_active_unit', payload: unitId });
        }
    };
    return (React__default.createElement(ChartWrapper, { style: { width: '100%', height: 48, marginBottom: marginBottom }, onClick: (e) => handleChartClick() },
        React__default.createElement(ParentSize, null, (parent) => (React__default.createElement("svg", { width: parent.width, height: parent.height },
            React__default.createElement("rect", { width: parent.width, height: parent.height, fill: "transparent" }),
            React__default.createElement(Group, { top: 18 },
                React__default.createElement("rect", { key: `background`, x: 0, y: 0, height: parent.height, width: parent.width, fill: '#eeeeee' }),
                React__default.createElement(BarStackHorizontal, { data: chartData, keys: keys, height: parent.height - 18, width: parent.width, y: (d) => d.name, xScale: scaleLinear({
                        range: [0, parent.width],
                        domain: [0, 120]
                    }), yScale: scaleBand({
                        range: [0, 100],
                        domain: chartData.map((d) => d.name),
                        padding: 0
                    }), color: scaleOrdinal({
                        domain: keys,
                        range: [unit.color, '#4afed4']
                    }) }, (barStacks) => barStacks.map((barStack) => barStack.bars.map((bar) => (React__default.createElement("rect", { key: `bar-stack-${barStack.index}-${bar.index}`, x: bar.x, y: bar.y, height: bar.height, width: bar.width, fill: bar.color }))))),
                React__default.createElement(AxisTop, { top: 0, scale: scaleLinear({
                        range: [0, parent.width],
                        domain: [0, 120]
                    }), numTicks: 5, tickLength: 3, hideAxisLine: true, stroke: "#000000", tickStroke: "#ffffff", tickValues: [100], tickFormat: (d) => getIdealTickFormat(), tickLabelProps: () => ({
                        fill: '#000000',
                        fontSize: 12,
                        textAnchor: 'middle'
                    }) }),
                React__default.createElement(AxisTop, { top: 0, scale: scaleLinear({
                        range: [0, parent.width],
                        domain: [0, 120]
                    }), numTicks: 5, tickLength: 3, hideAxisLine: true, stroke: "#000000", tickStroke: "#ffffff", tickValues: [0], tickFormat: (d) => getStartTickFormat(d, chartData), tickLabelProps: () => ({
                        fill: '#000000',
                        fontSize: 11,
                        textAnchor: 'start'
                    }) }),
                Array.from(Array(members).keys()).map((member, i) => {
                    if (i + 1 === members) {
                        return null;
                    }
                    return (React__default.createElement(Line, { key: `member-${i}`, from: {
                            x: scaleLinear({
                                domain: [0, 120],
                                range: [0, parent.width]
                            })((100 / members) * (i + 1)),
                            y: parent.height
                        }, to: {
                            x: scaleLinear({
                                domain: [0, 120],
                                range: [0, parent.width]
                            })((100 / members) * (i + 1)),
                            y: 0
                        }, stroke: "#ffffff", strokeWidth: 2 }));
                }),
                getChartStatus() === 'danger' && (React__default.createElement(React__default.Fragment, null,
                    React__default.createElement("rect", { key: `background`, x: 0, y: 0, height: parent.height, width: parent.width, fill: variant === 'default' ? '#a60000' : `${unit.hoverColor}` }),
                    React__default.createElement("text", { key: `bar-stack-text`, style: { fontWeight: 'bold' }, x: parent.width / 2, y: parent.height / 2 - 5, textAnchor: "middle", fill: "#ffffff" },
                        "OVER +",
                        Math.round((unit.population / unit.unitIdealPopulation) * 100 - 100) + '%'))),
                React__default.createElement(Line, { from: {
                        x: scaleLinear({
                            domain: [0, 120],
                            range: [0, parent.width]
                        })(0),
                        y: parent.height
                    }, to: {
                        x: scaleLinear({
                            domain: [0, 120],
                            range: [0, parent.width]
                        })(0),
                        y: 0
                    }, stroke: "#808080", strokeWidth: 3 }),
                React__default.createElement(Line, { from: {
                        x: scaleLinear({
                            domain: [0, 120],
                            range: [0, parent.width]
                        })(100),
                        y: parent.height
                    }, to: {
                        x: scaleLinear({
                            domain: [0, 120],
                            range: [0, parent.width]
                        })(100),
                        y: 0
                    }, stroke: "#363636", strokeWidth: 2 }),
                React__default.createElement(Line, { from: {
                        x: scaleLinear({
                            domain: [0, 120],
                            range: [0, parent.width]
                        })(120),
                        y: parent.height
                    }, to: {
                        x: scaleLinear({
                            domain: [0, 120],
                            range: [0, parent.width]
                        })(120),
                        y: 0
                    }, stroke: "#808080", strokeWidth: 3 })))))));
};

const UnitPropertiesContainer = styled.div `
  position: absolute;
  top: 50px;
  right: 48px;
  width: 300px;
  background: rgb(253, 253, 247);
  padding: 0;
  display: flex;
  flex-direction: column;
  z-index: 1000;
  overflow: hidden;
  border-left: 1px solid #e6e6e6;
  border-bottom: 1px solid #e6e6e6;
  max-height: 100%;
  overflow: hidden;
  box-shadow: -1px 2px 3px rgba(0, 0, 0, 0.1);

  &.d-unit-danger {
    color: #a00000;
    background: #fac7c7;
  }

  &.d-unit-warning {
    color: #8a5c00;
    background: #fff3c2;
  }

  &.d-unit-success {
    background: #ffffff;
  }
`;

const UnitProperties = () => {
    const districtr = React__default.useContext(DistrictrContext);
    React__default.useContext(DistrictrDispatchContext);
    const [dataSets, setDataSets] = React__default.useState(['Population', 'Civilian Voting Age Population']);
    const [activeDataSet, setActiveDataSet] = React__default.useState('Population');
    const [showPanel, setShowPanel] = React__default.useState('');
    const [allUnitData, setAllUnitData] = React__default.useState(null);
    const [allData, setAllData] = React__default.useState(null);
    const [chartData, setChartData] = React__default.useState(null);
    const [allSubgroupChartData, setAllSubgroupChartData] = React__default.useState(null);
    const [subgroupChartData, setSubgroupChartData] = React__default.useState(null);
    const [keys, setKeys] = React__default.useState(null);
    React__default.useEffect(() => {
        if (!districtr.mapboxMap) {
            return;
        }
        const layer = districtr.mapboxMap.getLayer(districtr.interactiveLayerIds[districtr.activeInteractiveLayer]);
        if (!layer) {
            return;
        }
        const mapping = districtr.columnSets[layer.id].columnSets;
        const availableSets = [];
        const newData = [];
        const subgroupDataSets = [];
        for (const [key, value] of Object.entries(mapping)) {
            const demographicDataset = [];
            if ('columnPopulations' in districtr.units[districtr.activeUnit]) {
                const dataset = mapping[key];
                const newDataset = {};
                availableSets.push(dataset.name);
                if ('total' in dataset && dataset.total !== null) {
                    newDataset[dataset.total.name] = Math.round((districtr.units[districtr.activeUnit].columnPopulations[dataset.total.key] /
                        districtr.units[districtr.activeUnit].unitIdealPopulation) *
                        100);
                    newDataset['name'] = dataset.total.name;
                    newDataset['color'] = [districtr.units[districtr.activeUnit].color];
                    const newTotalDemographic = {
                        sum: dataset.total.sum,
                        value: districtr.units[districtr.activeUnit].population,
                        name: dataset.total.name,
                        key: dataset.total.key,
                        type: 'total',
                        dataset: dataset.name
                    };
                    demographicDataset.push(newTotalDemographic);
                }
                if ('subgroups' in dataset) {
                    newDataset['subgroups'] = {};
                    dataset.subgroups.forEach((column) => {
                        const value = Math.round(
                        //@ts-ignore
                        (districtr.units[districtr.activeUnit].columnPopulations[column.key] /
                            districtr.units[districtr.activeUnit].unitIdealPopulation) *
                            100);
                        const newDemographic = {
                            sum: column.sum,
                            value: districtr.units[districtr.activeUnit].columnPopulations[column.key],
                            name: column.name,
                            key: column.key,
                            type: 'subgroup',
                            dataset: dataset.name
                        };
                        demographicDataset.push(newDemographic);
                        //@ts-ignore
                        newDataset['subgroups'][column.name] = value;
                        const subgroupData = {
                            name: column.name,
                            colors: [districtr.units[districtr.activeUnit].color]
                        };
                        subgroupData[column.name] = value;
                    });
                    newDataset['subgroups']['name'] = 'Subgroups';
                    newDataset['subgroups']['colors'] = ['#4a77fe', '#4afed4', '#fefb4a', '#fe4a4a', '#4afea1'];
                }
                newData.push(newDataset);
                subgroupDataSets.push(demographicDataset);
            }
        }
        if (newData.length > 0) {
            setAllData(newData);
            setChartData([Object.assign({}, newData[dataSets.indexOf(activeDataSet)])]);
            //@ts-ignore
            setAllSubgroupChartData(subgroupDataSets);
            setSubgroupChartData(subgroupDataSets[dataSets.indexOf(activeDataSet)]);
            setKeys(Object.keys(newData[availableSets.indexOf(activeDataSet)]).filter((d) => d !== 'color' && d !== 'subgroups' && d !== 'name'));
            setDataSets(availableSets);
        }
        const newAllUnitData = Object.keys(districtr.units).map((unit) => {
            return [
                {
                    name: districtr.units[unit].name,
                    population: Math.round((districtr.units[unit].population / districtr.units[unit].unitIdealPopulation) * 100),
                    colors: [districtr.units[unit].color]
                }
            ];
        });
        setAllUnitData(newAllUnitData);
    }, [districtr.activeUnit, districtr.units[districtr.activeUnit].population]);
    React__default.useEffect(() => {
        if (allData) {
            setChartData([allData[dataSets.indexOf(activeDataSet)]]);
            //@ts-ignore
            setSubgroupChartData(allSubgroupChartData[dataSets.indexOf(activeDataSet)]);
            setKeys(Object.keys(allData[dataSets.indexOf(activeDataSet)]).filter((d) => d !== 'color' && d !== 'subgroups' && d !== 'name'));
        }
    }, [activeDataSet]);
    return (React__default.createElement(UnitPropertiesContainer, { "data-testid": "UnitProperties" },
        React__default.createElement(UnitController, { dataSets: dataSets, activeDataSet: activeDataSet, setActiveDataSet: setActiveDataSet }),
        React__default.createElement("div", { style: { padding: '0 8px' } },
            React__default.createElement(UnitPopulationChart, { key: districtr.units[districtr.activeUnit].id, unitId: districtr.activeUnit })),
        React__default.createElement("div", { style: {
                display: 'flex',
                justifyContent: 'space-between',
                width: '100%',
                flexDirection: 'row',
                padding: '0 8px'
            } },
            React__default.createElement(Button, { accessibilityLabel: "All Units", fullWidth: true, variant: "secondary", pressed: showPanel === 'all', onClick: () => (showPanel === 'all' ? setShowPanel('') : setShowPanel('all')) }, "All Units"),
            "\u00A0",
            React__default.createElement(Button, { accessibilityLabel: "Demographics", fullWidth: true, variant: "secondary", pressed: showPanel === 'demographics', onClick: () => (showPanel === 'demographics' ? setShowPanel('') : setShowPanel('demographics')) }, "Demographics")),
        React__default.createElement("div", { style: {
                marginTop: 12,
                width: '100%',
                padding: '8px',
                maxHeight: 'calc(100vh - 350px)',
                overflowY: 'scroll',
                overflowX: 'hidden'
            } },
            showPanel === 'demographics' && React__default.createElement(TableController, { data: subgroupChartData, activeSet: activeDataSet }),
            showPanel === 'all' &&
                districtr.units &&
                Object.keys(districtr.units).map((unit) => {
                    if (districtr.units[unit].population > 1) {
                        return React__default.createElement(UnitPopulationChart, { key: `population-chart-${unit}`, unitId: unit, variant: "allUnits" });
                    }
                }))));
};

const defaultToolConfig = {
    brush: {
        name: 'brush',
        icon: 'B',
        tooltip: 'Brush Tool',
        cursor: 'brush',
        shortcut: 'b',
        enabled: true,
        size: 50,
        options: {
            inputs: [
                {
                    type: 'colorPicker',
                    name: 'Brush Color',
                    property: 'color',
                    config: {
                        color: '#000000',
                        defaultUnitCount: 1
                    }
                },
                {
                    type: 'rangeSlider',
                    name: 'Brush Size',
                    property: 'size',
                    config: {
                        align: 'vertical',
                        min: 1,
                        max: 100
                    }
                }
            ]
        }
    },
    pan: {
        name: 'pan',
        icon: 'P',
        tooltip: 'Pan Tool',
        cursor: 'pan',
        shortcut: 'p',
        enabled: true
    },
    eraser: {
        name: 'eraser',
        icon: 'E',
        tooltip: 'Eraser Tool',
        cursor: 'eraser',
        shortcut: 'e',
        enabled: true,
        size: 50,
        options: {
            inputs: [
                {
                    type: 'rangeSlider',
                    name: 'Eraser Size',
                    property: 'size',
                    config: {
                        align: 'vertical',
                        min: 1,
                        max: 100
                    }
                }
            ]
        }
    }
};
const defaultMapStyleConfig = {
    'streets-v12': {
        name: 'Streets',
        url: 'mapbox://styles/mapbox/streets-v12'
    },
    'outdoors-v12': {
        name: 'Outdoors',
        url: 'mapbox://styles/mapbox/outdoors-v12'
    },
    'light-v11': {
        name: 'Light',
        url: 'mapbox://styles/mapbox/light-v11'
    },
    'dark-v11': {
        name: 'Dark',
        url: 'mapbox://styles/mapbox/dark-v11'
    },
    'satellite-v9': {
        name: 'Satellite',
        url: 'mapbox://styles/mapbox/satellite-v9'
    },
    'satellite-streets-v12': {
        name: 'Satellite Streets',
        url: 'mapbox://styles/mapbox/satellite-streets-v12'
    },
    'navigation-day-v1': {
        name: 'Navigation Preview Day',
        url: 'mapbox://styles/mapbox/navigation-preview-day-v4'
    },
    'navigation-night-v1': {
        name: 'Navigation Preview Night',
        url: 'mapbox://styles/mapbox/navigation-preview-night-v4'
    },
    'districtr-v1': {
        name: 'Districtr Light',
        url: 'mapbox://styles/districtr/clek2rian000701o4m5zm294j'
    },
    'districtr-md-v1': {
        name: 'Districtr Maryland Light',
        url: 'mapbox://styles/districtr/cleos4lys000t01mgngsue9zw'
    },
    'districtr-pa-v1': {
        name: 'Districtr Pennsylvania Light',
        url: 'mapbox://styles/districtr/clfkmvtb1000u01ln7zpxtz0t'
    }
};

createCommonjsModule(function (module, exports) {
!function(t,e){e(exports);}(commonjsGlobal,(function(t){var e;!function(t){t[t.Unknown=0]="Unknown",t[t.Point=1]="Point",t[t.LineString=2]="LineString",t[t.Polygon=3]="Polygon",t[t.MultiPoint=4]="MultiPoint",t[t.MultiLineString=5]="MultiLineString",t[t.MultiPolygon=6]="MultiPolygon",t[t.GeometryCollection=7]="GeometryCollection",t[t.CircularString=8]="CircularString",t[t.CompoundCurve=9]="CompoundCurve",t[t.CurvePolygon=10]="CurvePolygon",t[t.MultiCurve=11]="MultiCurve",t[t.MultiSurface=12]="MultiSurface",t[t.Curve=13]="Curve",t[t.Surface=14]="Surface",t[t.PolyhedralSurface=15]="PolyhedralSurface",t[t.TIN=16]="TIN",t[t.Triangle=17]="Triangle";}(e||(e={}));const n=new Int32Array(2),r=new Float32Array(n.buffer),s=new Float64Array(n.buffer),i=1===new Uint16Array(new Uint8Array([1,0]).buffer)[0];var o,a;!function(t){t[t.UTF8_BYTES=1]="UTF8_BYTES",t[t.UTF16_STRING=2]="UTF16_STRING";}(o||(o={}));class c{constructor(t){this.bytes_=t,this.position_=0,this.text_decoder_=new TextDecoder;}static allocate(t){return new c(new Uint8Array(t))}clear(){this.position_=0;}bytes(){return this.bytes_}position(){return this.position_}setPosition(t){this.position_=t;}capacity(){return this.bytes_.length}readInt8(t){return this.readUint8(t)<<24>>24}readUint8(t){return this.bytes_[t]}readInt16(t){return this.readUint16(t)<<16>>16}readUint16(t){return this.bytes_[t]|this.bytes_[t+1]<<8}readInt32(t){return this.bytes_[t]|this.bytes_[t+1]<<8|this.bytes_[t+2]<<16|this.bytes_[t+3]<<24}readUint32(t){return this.readInt32(t)>>>0}readInt64(t){return BigInt.asIntN(64,BigInt(this.readUint32(t))+(BigInt(this.readUint32(t+4))<<BigInt(32)))}readUint64(t){return BigInt.asUintN(64,BigInt(this.readUint32(t))+(BigInt(this.readUint32(t+4))<<BigInt(32)))}readFloat32(t){return n[0]=this.readInt32(t),r[0]}readFloat64(t){return n[i?0:1]=this.readInt32(t),n[i?1:0]=this.readInt32(t+4),s[0]}writeInt8(t,e){this.bytes_[t]=e;}writeUint8(t,e){this.bytes_[t]=e;}writeInt16(t,e){this.bytes_[t]=e,this.bytes_[t+1]=e>>8;}writeUint16(t,e){this.bytes_[t]=e,this.bytes_[t+1]=e>>8;}writeInt32(t,e){this.bytes_[t]=e,this.bytes_[t+1]=e>>8,this.bytes_[t+2]=e>>16,this.bytes_[t+3]=e>>24;}writeUint32(t,e){this.bytes_[t]=e,this.bytes_[t+1]=e>>8,this.bytes_[t+2]=e>>16,this.bytes_[t+3]=e>>24;}writeInt64(t,e){this.writeInt32(t,Number(BigInt.asIntN(32,e))),this.writeInt32(t+4,Number(BigInt.asIntN(32,e>>BigInt(32))));}writeUint64(t,e){this.writeUint32(t,Number(BigInt.asUintN(32,e))),this.writeUint32(t+4,Number(BigInt.asUintN(32,e>>BigInt(32))));}writeFloat32(t,e){r[0]=e,this.writeInt32(t,n[0]);}writeFloat64(t,e){s[0]=e,this.writeInt32(t,n[i?0:1]),this.writeInt32(t+4,n[i?1:0]);}getBufferIdentifier(){if(this.bytes_.length<this.position_+4+4)throw new Error("FlatBuffers: ByteBuffer is too short to contain an identifier.");let t="";for(let e=0;e<4;e++)t+=String.fromCharCode(this.readInt8(this.position_+4+e));return t}__offset(t,e){const n=t-this.readInt32(t);return e<this.readInt16(n)?this.readInt16(n+e):0}__union(t,e){return t.bb_pos=e+this.readInt32(e),t.bb=this,t}__string(t,e){t+=this.readInt32(t);const n=this.readInt32(t);t+=4;const r=this.bytes_.subarray(t,t+n);return e===o.UTF8_BYTES?r:this.text_decoder_.decode(r)}__union_with_string(t,e){return "string"==typeof t?this.__string(e):this.__union(t,e)}__indirect(t){return t+this.readInt32(t)}__vector(t){return t+this.readInt32(t)+4}__vector_len(t){return this.readInt32(t+this.readInt32(t))}__has_identifier(t){if(4!=t.length)throw new Error("FlatBuffers: file identifier must be length 4");for(let e=0;e<4;e++)if(t.charCodeAt(e)!=this.readInt8(this.position()+4+e))return !1;return !0}createScalarList(t,e){const n=[];for(let r=0;r<e;++r){const e=t(r);null!==e&&n.push(e);}return n}createObjList(t,e){const n=[];for(let r=0;r<e;++r){const e=t(r);null!==e&&n.push(e.unpack());}return n}}class u{constructor(t){let e;this.minalign=1,this.vtable=null,this.vtable_in_use=0,this.isNested=!1,this.object_start=0,this.vtables=[],this.vector_num_elems=0,this.force_defaults=!1,this.string_maps=null,this.text_encoder=new TextEncoder,e=t||1024,this.bb=c.allocate(e),this.space=e;}clear(){this.bb.clear(),this.space=this.bb.capacity(),this.minalign=1,this.vtable=null,this.vtable_in_use=0,this.isNested=!1,this.object_start=0,this.vtables=[],this.vector_num_elems=0,this.force_defaults=!1,this.string_maps=null;}forceDefaults(t){this.force_defaults=t;}dataBuffer(){return this.bb}asUint8Array(){return this.bb.bytes().subarray(this.bb.position(),this.bb.position()+this.offset())}prep(t,e){t>this.minalign&&(this.minalign=t);const n=1+~(this.bb.capacity()-this.space+e)&t-1;for(;this.space<n+t+e;){const t=this.bb.capacity();this.bb=u.growByteBuffer(this.bb),this.space+=this.bb.capacity()-t;}this.pad(n);}pad(t){for(let e=0;e<t;e++)this.bb.writeInt8(--this.space,0);}writeInt8(t){this.bb.writeInt8(this.space-=1,t);}writeInt16(t){this.bb.writeInt16(this.space-=2,t);}writeInt32(t){this.bb.writeInt32(this.space-=4,t);}writeInt64(t){this.bb.writeInt64(this.space-=8,t);}writeFloat32(t){this.bb.writeFloat32(this.space-=4,t);}writeFloat64(t){this.bb.writeFloat64(this.space-=8,t);}addInt8(t){this.prep(1,0),this.writeInt8(t);}addInt16(t){this.prep(2,0),this.writeInt16(t);}addInt32(t){this.prep(4,0),this.writeInt32(t);}addInt64(t){this.prep(8,0),this.writeInt64(t);}addFloat32(t){this.prep(4,0),this.writeFloat32(t);}addFloat64(t){this.prep(8,0),this.writeFloat64(t);}addFieldInt8(t,e,n){(this.force_defaults||e!=n)&&(this.addInt8(e),this.slot(t));}addFieldInt16(t,e,n){(this.force_defaults||e!=n)&&(this.addInt16(e),this.slot(t));}addFieldInt32(t,e,n){(this.force_defaults||e!=n)&&(this.addInt32(e),this.slot(t));}addFieldInt64(t,e,n){(this.force_defaults||e!==n)&&(this.addInt64(e),this.slot(t));}addFieldFloat32(t,e,n){(this.force_defaults||e!=n)&&(this.addFloat32(e),this.slot(t));}addFieldFloat64(t,e,n){(this.force_defaults||e!=n)&&(this.addFloat64(e),this.slot(t));}addFieldOffset(t,e,n){(this.force_defaults||e!=n)&&(this.addOffset(e),this.slot(t));}addFieldStruct(t,e,n){e!=n&&(this.nested(e),this.slot(t));}nested(t){if(t!=this.offset())throw new Error("FlatBuffers: struct must be serialized inline.")}notNested(){if(this.isNested)throw new Error("FlatBuffers: object serialization must not be nested.")}slot(t){null!==this.vtable&&(this.vtable[t]=this.offset());}offset(){return this.bb.capacity()-this.space}static growByteBuffer(t){const e=t.capacity();if(3221225472&e)throw new Error("FlatBuffers: cannot grow buffer beyond 2 gigabytes.");const n=e<<1,r=c.allocate(n);return r.setPosition(n-e),r.bytes().set(t.bytes(),n-e),r}addOffset(t){this.prep(4,0),this.writeInt32(this.offset()-t+4);}startObject(t){this.notNested(),null==this.vtable&&(this.vtable=[]),this.vtable_in_use=t;for(let e=0;e<t;e++)this.vtable[e]=0;this.isNested=!0,this.object_start=this.offset();}endObject(){if(null==this.vtable||!this.isNested)throw new Error("FlatBuffers: endObject called without startObject");this.addInt32(0);const t=this.offset();let e=this.vtable_in_use-1;for(;e>=0&&0==this.vtable[e];e--);const n=e+1;for(;e>=0;e--)this.addInt16(0!=this.vtable[e]?t-this.vtable[e]:0);this.addInt16(t-this.object_start);const r=2*(n+2);this.addInt16(r);let s=0;const i=this.space;t:for(e=0;e<this.vtables.length;e++){const t=this.bb.capacity()-this.vtables[e];if(r==this.bb.readInt16(t)){for(let e=2;e<r;e+=2)if(this.bb.readInt16(i+e)!=this.bb.readInt16(t+e))continue t;s=this.vtables[e];break}}return s?(this.space=this.bb.capacity()-t,this.bb.writeInt32(this.space,s-t)):(this.vtables.push(this.offset()),this.bb.writeInt32(this.bb.capacity()-t,this.offset()-t)),this.isNested=!1,t}finish(t,e,n){const r=n?4:0;if(e){const t=e;if(this.prep(this.minalign,8+r),4!=t.length)throw new Error("FlatBuffers: file identifier must be length 4");for(let e=3;e>=0;e--)this.writeInt8(t.charCodeAt(e));}this.prep(this.minalign,4+r),this.addOffset(t),r&&this.addInt32(this.bb.capacity()-this.space),this.bb.setPosition(this.space);}finishSizePrefixed(t,e){this.finish(t,e,!0);}requiredField(t,e){const n=this.bb.capacity()-t,r=n-this.bb.readInt32(n);if(!(e<this.bb.readInt16(r)&&0!=this.bb.readInt16(r+e)))throw new Error("FlatBuffers: field "+e+" must be set")}startVector(t,e,n){this.notNested(),this.vector_num_elems=e,this.prep(4,t*e),this.prep(n,t*e);}endVector(){return this.writeInt32(this.vector_num_elems),this.offset()}createSharedString(t){if(!t)return 0;if(this.string_maps||(this.string_maps=new Map),this.string_maps.has(t))return this.string_maps.get(t);const e=this.createString(t);return this.string_maps.set(t,e),e}createString(t){if(null==t)return 0;let e;e=t instanceof Uint8Array?t:this.text_encoder.encode(t),this.addInt8(0),this.startVector(1,e.length,1),this.bb.setPosition(this.space-=e.length);for(let t=0,n=this.space,r=this.bb.bytes();t<e.length;t++)r[n++]=e[t];return this.endVector()}createObjectOffset(t){return null===t?0:"string"==typeof t?this.createString(t):t.pack(this)}createObjectOffsetList(t){const e=[];for(let n=0;n<t.length;++n){const r=t[n];if(null===r)throw new Error("FlatBuffers: Argument for createObjectOffsetList cannot contain null.");e.push(this.createObjectOffset(r));}return e}createStructOffsetList(t,e){return e(this,t.length),this.createObjectOffsetList(t.slice().reverse()),this.endVector()}}class h{constructor(){this.bb=null,this.bb_pos=0;}__init(t,e){return this.bb_pos=t,this.bb=e,this}static getRootAsGeometry(t,e){return (e||new h).__init(t.readInt32(t.position())+t.position(),t)}static getSizePrefixedRootAsGeometry(t,e){return t.setPosition(t.position()+4),(e||new h).__init(t.readInt32(t.position())+t.position(),t)}ends(t){const e=this.bb.__offset(this.bb_pos,4);return e?this.bb.readUint32(this.bb.__vector(this.bb_pos+e)+4*t):0}endsLength(){const t=this.bb.__offset(this.bb_pos,4);return t?this.bb.__vector_len(this.bb_pos+t):0}endsArray(){const t=this.bb.__offset(this.bb_pos,4);return t?new Uint32Array(this.bb.bytes().buffer,this.bb.bytes().byteOffset+this.bb.__vector(this.bb_pos+t),this.bb.__vector_len(this.bb_pos+t)):null}xy(t){const e=this.bb.__offset(this.bb_pos,6);return e?this.bb.readFloat64(this.bb.__vector(this.bb_pos+e)+8*t):0}xyLength(){const t=this.bb.__offset(this.bb_pos,6);return t?this.bb.__vector_len(this.bb_pos+t):0}xyArray(){const t=this.bb.__offset(this.bb_pos,6);return t?new Float64Array(this.bb.bytes().buffer,this.bb.bytes().byteOffset+this.bb.__vector(this.bb_pos+t),this.bb.__vector_len(this.bb_pos+t)):null}z(t){const e=this.bb.__offset(this.bb_pos,8);return e?this.bb.readFloat64(this.bb.__vector(this.bb_pos+e)+8*t):0}zLength(){const t=this.bb.__offset(this.bb_pos,8);return t?this.bb.__vector_len(this.bb_pos+t):0}zArray(){const t=this.bb.__offset(this.bb_pos,8);return t?new Float64Array(this.bb.bytes().buffer,this.bb.bytes().byteOffset+this.bb.__vector(this.bb_pos+t),this.bb.__vector_len(this.bb_pos+t)):null}m(t){const e=this.bb.__offset(this.bb_pos,10);return e?this.bb.readFloat64(this.bb.__vector(this.bb_pos+e)+8*t):0}mLength(){const t=this.bb.__offset(this.bb_pos,10);return t?this.bb.__vector_len(this.bb_pos+t):0}mArray(){const t=this.bb.__offset(this.bb_pos,10);return t?new Float64Array(this.bb.bytes().buffer,this.bb.bytes().byteOffset+this.bb.__vector(this.bb_pos+t),this.bb.__vector_len(this.bb_pos+t)):null}t(t){const e=this.bb.__offset(this.bb_pos,12);return e?this.bb.readFloat64(this.bb.__vector(this.bb_pos+e)+8*t):0}tLength(){const t=this.bb.__offset(this.bb_pos,12);return t?this.bb.__vector_len(this.bb_pos+t):0}tArray(){const t=this.bb.__offset(this.bb_pos,12);return t?new Float64Array(this.bb.bytes().buffer,this.bb.bytes().byteOffset+this.bb.__vector(this.bb_pos+t),this.bb.__vector_len(this.bb_pos+t)):null}tm(t){const e=this.bb.__offset(this.bb_pos,14);return e?this.bb.readUint64(this.bb.__vector(this.bb_pos+e)+8*t):BigInt(0)}tmLength(){const t=this.bb.__offset(this.bb_pos,14);return t?this.bb.__vector_len(this.bb_pos+t):0}type(){const t=this.bb.__offset(this.bb_pos,16);return t?this.bb.readUint8(this.bb_pos+t):e.Unknown}parts(t,e){const n=this.bb.__offset(this.bb_pos,18);return n?(e||new h).__init(this.bb.__indirect(this.bb.__vector(this.bb_pos+n)+4*t),this.bb):null}partsLength(){const t=this.bb.__offset(this.bb_pos,18);return t?this.bb.__vector_len(this.bb_pos+t):0}static startGeometry(t){t.startObject(8);}static addEnds(t,e){t.addFieldOffset(0,e,0);}static createEndsVector(t,e){t.startVector(4,e.length,4);for(let n=e.length-1;n>=0;n--)t.addInt32(e[n]);return t.endVector()}static startEndsVector(t,e){t.startVector(4,e,4);}static addXy(t,e){t.addFieldOffset(1,e,0);}static createXyVector(t,e){t.startVector(8,e.length,8);for(let n=e.length-1;n>=0;n--)t.addFloat64(e[n]);return t.endVector()}static startXyVector(t,e){t.startVector(8,e,8);}static addZ(t,e){t.addFieldOffset(2,e,0);}static createZVector(t,e){t.startVector(8,e.length,8);for(let n=e.length-1;n>=0;n--)t.addFloat64(e[n]);return t.endVector()}static startZVector(t,e){t.startVector(8,e,8);}static addM(t,e){t.addFieldOffset(3,e,0);}static createMVector(t,e){t.startVector(8,e.length,8);for(let n=e.length-1;n>=0;n--)t.addFloat64(e[n]);return t.endVector()}static startMVector(t,e){t.startVector(8,e,8);}static addT(t,e){t.addFieldOffset(4,e,0);}static createTVector(t,e){t.startVector(8,e.length,8);for(let n=e.length-1;n>=0;n--)t.addFloat64(e[n]);return t.endVector()}static startTVector(t,e){t.startVector(8,e,8);}static addTm(t,e){t.addFieldOffset(5,e,0);}static createTmVector(t,e){t.startVector(8,e.length,8);for(let n=e.length-1;n>=0;n--)t.addInt64(e[n]);return t.endVector()}static startTmVector(t,e){t.startVector(8,e,8);}static addType(t,n){t.addFieldInt8(6,n,e.Unknown);}static addParts(t,e){t.addFieldOffset(7,e,0);}static createPartsVector(t,e){t.startVector(4,e.length,4);for(let n=e.length-1;n>=0;n--)t.addOffset(e[n]);return t.endVector()}static startPartsVector(t,e){t.startVector(4,e,4);}static endGeometry(t){return t.endObject()}static createGeometry(t,e,n,r,s,i,o,a,c){return h.startGeometry(t),h.addEnds(t,e),h.addXy(t,n),h.addZ(t,r),h.addM(t,s),h.addT(t,i),h.addTm(t,o),h.addType(t,a),h.addParts(t,c),h.endGeometry(t)}}function l(t,e){const{xy:n,z:r,ends:s,parts:i,type:o}=e;if(i){const e=i.map((e=>l(t,e))),n=h.createPartsVector(t,e);return h.startGeometry(t),h.addParts(t,n),h.addType(t,o),h.endGeometry(t)}const a=h.createXyVector(t,n);let c,u;return r&&(c=h.createZVector(t,r)),s&&(u=h.createEndsVector(t,s)),h.startGeometry(t),u&&h.addEnds(t,u),h.addXy(t,a),c&&h.addZ(t,c),h.addType(t,o),h.endGeometry(t)}function b(t,e,n){if(0!==t.length)if(Array.isArray(t[0]))for(const r of t)b(r,e,n);else 2===t.length?e.push(...t):(e.push(t[0],t[1]),n.push(t[2]));}function f(t,e){const n=[];for(let r=0;r<t.length;r+=2){const s=[t[r],t[r+1]];e&&s.push(e[r>>1]),n.push(s);}return n}function d(t){if(!t)return e.Unknown;return e[t]}function _(t){const e=t.coordinates,n=[],r=[];let s,i;const o=d(t.type);let a=0;switch(t.type){case"Point":case"MultiPoint":case"LineString":b(e,n,r);break;case"MultiLineString":case"Polygon":{const t=e;b(t,n,r),t.length>1&&(s=t.map((t=>a+=t.length)));break}case"MultiPolygon":i=e.map((t=>({type:"Polygon",coordinates:t}))).map(_);break}return {xy:n,z:r.length>0?r:void 0,ends:s,type:o,parts:i}}function p(t){const e=d(t.type),n=[];for(let e=0;e<t.geometries.length;e++){const r=t.geometries[e];"GeometryCollection"===r.type?n.push(p(r)):n.push(_(r));}return {type:e,parts:n}}function y(t,e,n){if(!n||0===n.length)return [f(t,e)];let r=0;const s=Array.from(n).map((e=>t.slice(r,r=e<<1)));let i;return e&&(r=0,i=Array.from(n).map((t=>e.slice(r,r=t)))),s.map(((t,e)=>f(t,i?i[e]:void 0)))}function g(t,n){let r=n;if(r===e.Unknown&&(r=t.type()),r===e.GeometryCollection){const n=[];for(let e=0;e<t.partsLength();e++){const r=t.parts(e),s=r.type();n.push(g(r,s));}return {type:e[r],geometries:n}}if(r===e.MultiPolygon){const n=[];for(let r=0;r<t.partsLength();r++)n.push(g(t.parts(r),e.Polygon));return {type:e[r],coordinates:n.map((t=>t.coordinates))}}const s=function(t,n){const r=t.xyArray(),s=t.zArray();switch(n){case e.Point:{const t=Array.from(r);return s&&t.push(s[0]),t}case e.MultiPoint:case e.LineString:return f(r,s);case e.MultiLineString:case e.Polygon:return y(r,s,t.endsArray())}}(t,r);return {type:e[r],coordinates:s}}!function(t){t[t.Byte=0]="Byte",t[t.UByte=1]="UByte",t[t.Bool=2]="Bool",t[t.Short=3]="Short",t[t.UShort=4]="UShort",t[t.Int=5]="Int",t[t.UInt=6]="UInt",t[t.Long=7]="Long",t[t.ULong=8]="ULong",t[t.Float=9]="Float",t[t.Double=10]="Double",t[t.String=11]="String",t[t.Json=12]="Json",t[t.DateTime=13]="DateTime",t[t.Binary=14]="Binary";}(a||(a={}));class w{constructor(){this.bb=null,this.bb_pos=0;}__init(t,e){return this.bb_pos=t,this.bb=e,this}static getRootAsColumn(t,e){return (e||new w).__init(t.readInt32(t.position())+t.position(),t)}static getSizePrefixedRootAsColumn(t,e){return t.setPosition(t.position()+4),(e||new w).__init(t.readInt32(t.position())+t.position(),t)}name(t){const e=this.bb.__offset(this.bb_pos,4);return e?this.bb.__string(this.bb_pos+e,t):null}type(){const t=this.bb.__offset(this.bb_pos,6);return t?this.bb.readUint8(this.bb_pos+t):a.Byte}title(t){const e=this.bb.__offset(this.bb_pos,8);return e?this.bb.__string(this.bb_pos+e,t):null}description(t){const e=this.bb.__offset(this.bb_pos,10);return e?this.bb.__string(this.bb_pos+e,t):null}width(){const t=this.bb.__offset(this.bb_pos,12);return t?this.bb.readInt32(this.bb_pos+t):-1}precision(){const t=this.bb.__offset(this.bb_pos,14);return t?this.bb.readInt32(this.bb_pos+t):-1}scale(){const t=this.bb.__offset(this.bb_pos,16);return t?this.bb.readInt32(this.bb_pos+t):-1}nullable(){const t=this.bb.__offset(this.bb_pos,18);return !t||!!this.bb.readInt8(this.bb_pos+t)}unique(){const t=this.bb.__offset(this.bb_pos,20);return !!t&&!!this.bb.readInt8(this.bb_pos+t)}primaryKey(){const t=this.bb.__offset(this.bb_pos,22);return !!t&&!!this.bb.readInt8(this.bb_pos+t)}metadata(t){const e=this.bb.__offset(this.bb_pos,24);return e?this.bb.__string(this.bb_pos+e,t):null}static startColumn(t){t.startObject(11);}static addName(t,e){t.addFieldOffset(0,e,0);}static addType(t,e){t.addFieldInt8(1,e,a.Byte);}static addTitle(t,e){t.addFieldOffset(2,e,0);}static addDescription(t,e){t.addFieldOffset(3,e,0);}static addWidth(t,e){t.addFieldInt32(4,e,-1);}static addPrecision(t,e){t.addFieldInt32(5,e,-1);}static addScale(t,e){t.addFieldInt32(6,e,-1);}static addNullable(t,e){t.addFieldInt8(7,+e,1);}static addUnique(t,e){t.addFieldInt8(8,+e,0);}static addPrimaryKey(t,e){t.addFieldInt8(9,+e,0);}static addMetadata(t,e){t.addFieldOffset(10,e,0);}static endColumn(t){const e=t.endObject();return t.requiredField(e,4),e}static createColumn(t,e,n,r,s,i,o,a,c,u,h,l){return w.startColumn(t),w.addName(t,e),w.addType(t,n),w.addTitle(t,r),w.addDescription(t,s),w.addWidth(t,i),w.addPrecision(t,o),w.addScale(t,a),w.addNullable(t,c),w.addUnique(t,u),w.addPrimaryKey(t,h),w.addMetadata(t,l),w.endColumn(t)}}class v{constructor(){this.bb=null,this.bb_pos=0;}__init(t,e){return this.bb_pos=t,this.bb=e,this}static getRootAsFeature(t,e){return (e||new v).__init(t.readInt32(t.position())+t.position(),t)}static getSizePrefixedRootAsFeature(t,e){return t.setPosition(t.position()+4),(e||new v).__init(t.readInt32(t.position())+t.position(),t)}geometry(t){const e=this.bb.__offset(this.bb_pos,4);return e?(t||new h).__init(this.bb.__indirect(this.bb_pos+e),this.bb):null}properties(t){const e=this.bb.__offset(this.bb_pos,6);return e?this.bb.readUint8(this.bb.__vector(this.bb_pos+e)+t):0}propertiesLength(){const t=this.bb.__offset(this.bb_pos,6);return t?this.bb.__vector_len(this.bb_pos+t):0}propertiesArray(){const t=this.bb.__offset(this.bb_pos,6);return t?new Uint8Array(this.bb.bytes().buffer,this.bb.bytes().byteOffset+this.bb.__vector(this.bb_pos+t),this.bb.__vector_len(this.bb_pos+t)):null}columns(t,e){const n=this.bb.__offset(this.bb_pos,8);return n?(e||new w).__init(this.bb.__indirect(this.bb.__vector(this.bb_pos+n)+4*t),this.bb):null}columnsLength(){const t=this.bb.__offset(this.bb_pos,8);return t?this.bb.__vector_len(this.bb_pos+t):0}static startFeature(t){t.startObject(3);}static addGeometry(t,e){t.addFieldOffset(0,e,0);}static addProperties(t,e){t.addFieldOffset(1,e,0);}static createPropertiesVector(t,e){t.startVector(1,e.length,1);for(let n=e.length-1;n>=0;n--)t.addInt8(e[n]);return t.endVector()}static startPropertiesVector(t,e){t.startVector(1,e,1);}static addColumns(t,e){t.addFieldOffset(2,e,0);}static createColumnsVector(t,e){t.startVector(4,e.length,4);for(let n=e.length-1;n>=0;n--)t.addOffset(e[n]);return t.endVector()}static startColumnsVector(t,e){t.startVector(4,e,4);}static endFeature(t){return t.endObject()}static finishFeatureBuffer(t,e){t.finish(e);}static finishSizePrefixedFeatureBuffer(t,e){t.finish(e,void 0,!0);}static createFeature(t,e,n,r){return v.startFeature(t),v.addGeometry(t,e),v.addProperties(t,n),v.addColumns(t,r),v.endFeature(t)}}const m=new TextEncoder,I=new TextDecoder;function F(t,e,n){const r=n.columns,s=new u;let i=0,o=1024,c=new Uint8Array(o),h=new DataView(c.buffer);const b=function(t){if(i+t<o)return;o=Math.max(o+t,2*o);const e=new Uint8Array(o);e.set(c),c=e,h=new DataView(c.buffer);};if(r)for(let t=0;t<r.length;t++){const n=r[t],s=e[n.name];if(null!==s)switch(b(2),h.setUint16(i,t,!0),i+=2,n.type){case a.Bool:b(1),h.setUint8(i,s),i+=1;break;case a.Short:b(2),h.setInt16(i,s,!0),i+=2;break;case a.UShort:b(2),h.setUint16(i,s,!0),i+=2;break;case a.Int:b(4),h.setInt32(i,s,!0),i+=4;break;case a.UInt:b(4),h.setUint32(i,s,!0),i+=4;break;case a.Long:b(8),h.setBigInt64(i,BigInt(s),!0),i+=8;break;case a.Float:b(4),h.setFloat32(i,s,!0),i+=4;break;case a.Double:b(8),h.setFloat64(i,s,!0),i+=8;break;case a.DateTime:case a.String:{const t=m.encode(s);b(4),h.setUint32(i,t.length,!0),i+=4,b(t.length),c.set(t,i),i+=t.length;break}case a.Json:{const t=m.encode(JSON.stringify(s));b(4),h.setUint32(i,t.length,!0),i+=4,b(t.length),c.set(t,i),i+=t.length;break}default:throw new Error("Unknown type "+n.type)}}let f=null;i>0&&(f=v.createPropertiesVector(s,c.slice(0,i)));const d=l(s,t);v.startFeature(s),v.addGeometry(s,d),f&&v.addProperties(s,f);const _=v.endFeature(s);return s.finishSizePrefixed(_),s.asUint8Array()}function x(t,e){const n={};if(!e||0===e.length)return n;const r=t.propertiesArray();if(!r)return n;const s=new DataView(r.buffer,r.byteOffset),i=t.propertiesLength();let o=0;for(;o<i;){const t=s.getUint16(o,!0);o+=2;const i=e[t],c=i.name;switch(i.type){case a.Bool:n[c]=!!s.getUint8(o),o+=1;break;case a.Byte:n[c]=s.getInt8(o),o+=1;break;case a.UByte:n[c]=s.getUint8(o),o+=1;break;case a.Short:n[c]=s.getInt16(o,!0),o+=2;break;case a.UShort:n[c]=s.getUint16(o,!0),o+=2;break;case a.Int:n[c]=s.getInt32(o,!0),o+=4;break;case a.UInt:n[c]=s.getUint32(o,!0),o+=4;break;case a.Long:n[c]=Number(s.getBigInt64(o,!0)),o+=8;break;case a.ULong:n[c]=Number(s.getBigUint64(o,!0)),o+=8;break;case a.Float:n[c]=s.getFloat32(o,!0),o+=4;break;case a.Double:n[c]=s.getFloat64(o,!0),o+=8;break;case a.DateTime:case a.String:{const t=s.getUint32(o,!0);o+=4,n[c]=I.decode(r.subarray(o,o+t)),o+=t;break}case a.Json:{const t=s.getUint32(o,!0);o+=4;const e=I.decode(r.subarray(o,o+t));n[c]=JSON.parse(e),o+=t;break}default:throw new Error("Unknown type "+i.type)}}return n}function U(t,e){const n=e.columns;return {type:"Feature",geometry:g(t.geometry(),e.geometryType),properties:x(t,n)}}var P=new Uint8Array(0);function S(t,e){if(!t.length)return e;if(!e.length)return t;var n=new Uint8Array(t.length+e.length);return n.set(t),n.set(e,t.length),n}function O(t){this._source=t,this._array=P,this._index=0;}O.prototype.read=function(){var t=this,e=t._array.subarray(t._index);return t._source.read().then((function(n){return t._array=P,t._index=0,n.done?e.length>0?{done:!1,value:e}:{done:!0,value:void 0}:{done:!1,value:S(e,n.value)}}))},O.prototype.slice=function(t){if((t|=0)<0)throw new Error("invalid length");var e=this,n=this._array.length-this._index;if(this._index+t<=this._array.length)return Promise.resolve(this._array.subarray(this._index,this._index+=t));var r=new Uint8Array(t);return r.set(this._array.subarray(this._index)),function s(){return e._source.read().then((function(i){return i.done?(e._array=P,e._index=0,n>0?r.subarray(0,n):null):n+i.value.length>=t?(e._array=i.value,e._index=t-n,r.set(i.value.subarray(0,t-n),n),r):(r.set(i.value,n),n+=i.value.length,s())}))}()},O.prototype.cancel=function(){return this._source.cancel()};class C{constructor(){this.bb=null,this.bb_pos=0;}__init(t,e){return this.bb_pos=t,this.bb=e,this}static getRootAsCrs(t,e){return (e||new C).__init(t.readInt32(t.position())+t.position(),t)}static getSizePrefixedRootAsCrs(t,e){return t.setPosition(t.position()+4),(e||new C).__init(t.readInt32(t.position())+t.position(),t)}org(t){const e=this.bb.__offset(this.bb_pos,4);return e?this.bb.__string(this.bb_pos+e,t):null}code(){const t=this.bb.__offset(this.bb_pos,6);return t?this.bb.readInt32(this.bb_pos+t):0}name(t){const e=this.bb.__offset(this.bb_pos,8);return e?this.bb.__string(this.bb_pos+e,t):null}description(t){const e=this.bb.__offset(this.bb_pos,10);return e?this.bb.__string(this.bb_pos+e,t):null}wkt(t){const e=this.bb.__offset(this.bb_pos,12);return e?this.bb.__string(this.bb_pos+e,t):null}codeString(t){const e=this.bb.__offset(this.bb_pos,14);return e?this.bb.__string(this.bb_pos+e,t):null}static startCrs(t){t.startObject(6);}static addOrg(t,e){t.addFieldOffset(0,e,0);}static addCode(t,e){t.addFieldInt32(1,e,0);}static addName(t,e){t.addFieldOffset(2,e,0);}static addDescription(t,e){t.addFieldOffset(3,e,0);}static addWkt(t,e){t.addFieldOffset(4,e,0);}static addCodeString(t,e){t.addFieldOffset(5,e,0);}static endCrs(t){return t.endObject()}static createCrs(t,e,n,r,s,i,o){return C.startCrs(t),C.addOrg(t,e),C.addCode(t,n),C.addName(t,r),C.addDescription(t,s),C.addWkt(t,i),C.addCodeString(t,o),C.endCrs(t)}}class V{constructor(){this.bb=null,this.bb_pos=0;}__init(t,e){return this.bb_pos=t,this.bb=e,this}static getRootAsHeader(t,e){return (e||new V).__init(t.readInt32(t.position())+t.position(),t)}static getSizePrefixedRootAsHeader(t,e){return t.setPosition(t.position()+4),(e||new V).__init(t.readInt32(t.position())+t.position(),t)}name(t){const e=this.bb.__offset(this.bb_pos,4);return e?this.bb.__string(this.bb_pos+e,t):null}envelope(t){const e=this.bb.__offset(this.bb_pos,6);return e?this.bb.readFloat64(this.bb.__vector(this.bb_pos+e)+8*t):0}envelopeLength(){const t=this.bb.__offset(this.bb_pos,6);return t?this.bb.__vector_len(this.bb_pos+t):0}envelopeArray(){const t=this.bb.__offset(this.bb_pos,6);return t?new Float64Array(this.bb.bytes().buffer,this.bb.bytes().byteOffset+this.bb.__vector(this.bb_pos+t),this.bb.__vector_len(this.bb_pos+t)):null}geometryType(){const t=this.bb.__offset(this.bb_pos,8);return t?this.bb.readUint8(this.bb_pos+t):e.Unknown}hasZ(){const t=this.bb.__offset(this.bb_pos,10);return !!t&&!!this.bb.readInt8(this.bb_pos+t)}hasM(){const t=this.bb.__offset(this.bb_pos,12);return !!t&&!!this.bb.readInt8(this.bb_pos+t)}hasT(){const t=this.bb.__offset(this.bb_pos,14);return !!t&&!!this.bb.readInt8(this.bb_pos+t)}hasTm(){const t=this.bb.__offset(this.bb_pos,16);return !!t&&!!this.bb.readInt8(this.bb_pos+t)}columns(t,e){const n=this.bb.__offset(this.bb_pos,18);return n?(e||new w).__init(this.bb.__indirect(this.bb.__vector(this.bb_pos+n)+4*t),this.bb):null}columnsLength(){const t=this.bb.__offset(this.bb_pos,18);return t?this.bb.__vector_len(this.bb_pos+t):0}featuresCount(){const t=this.bb.__offset(this.bb_pos,20);return t?this.bb.readUint64(this.bb_pos+t):BigInt("0")}indexNodeSize(){const t=this.bb.__offset(this.bb_pos,22);return t?this.bb.readUint16(this.bb_pos+t):16}crs(t){const e=this.bb.__offset(this.bb_pos,24);return e?(t||new C).__init(this.bb.__indirect(this.bb_pos+e),this.bb):null}title(t){const e=this.bb.__offset(this.bb_pos,26);return e?this.bb.__string(this.bb_pos+e,t):null}description(t){const e=this.bb.__offset(this.bb_pos,28);return e?this.bb.__string(this.bb_pos+e,t):null}metadata(t){const e=this.bb.__offset(this.bb_pos,30);return e?this.bb.__string(this.bb_pos+e,t):null}static startHeader(t){t.startObject(14);}static addName(t,e){t.addFieldOffset(0,e,0);}static addEnvelope(t,e){t.addFieldOffset(1,e,0);}static createEnvelopeVector(t,e){t.startVector(8,e.length,8);for(let n=e.length-1;n>=0;n--)t.addFloat64(e[n]);return t.endVector()}static startEnvelopeVector(t,e){t.startVector(8,e,8);}static addGeometryType(t,n){t.addFieldInt8(2,n,e.Unknown);}static addHasZ(t,e){t.addFieldInt8(3,+e,0);}static addHasM(t,e){t.addFieldInt8(4,+e,0);}static addHasT(t,e){t.addFieldInt8(5,+e,0);}static addHasTm(t,e){t.addFieldInt8(6,+e,0);}static addColumns(t,e){t.addFieldOffset(7,e,0);}static createColumnsVector(t,e){t.startVector(4,e.length,4);for(let n=e.length-1;n>=0;n--)t.addOffset(e[n]);return t.endVector()}static startColumnsVector(t,e){t.startVector(4,e,4);}static addFeaturesCount(t,e){t.addFieldInt64(8,e,BigInt("0"));}static addIndexNodeSize(t,e){t.addFieldInt16(9,e,16);}static addCrs(t,e){t.addFieldOffset(10,e,0);}static addTitle(t,e){t.addFieldOffset(11,e,0);}static addDescription(t,e){t.addFieldOffset(12,e,0);}static addMetadata(t,e){t.addFieldOffset(13,e,0);}static endHeader(t){return t.endObject()}static finishHeaderBuffer(t,e){t.finish(e);}static finishSizePrefixedHeaderBuffer(t,e){t.finish(e,void 0,!0);}}function A(t){const e=V.getRootAsHeader(t),n=e.featuresCount(),r=e.indexNodeSize(),s=[];for(let t=0;t<e.columnsLength();t++){const n=e.columns(t);if(!n)throw new Error("Column unexpectedly missing");if(!n.name())throw new Error("Column name unexpectedly missing");s.push({name:n.name(),type:n.type(),title:n.title(),description:n.description(),width:n.width(),precision:n.precision(),scale:n.scale(),nullable:n.nullable(),unique:n.unique(),primary_key:n.primaryKey()});}const i=e.crs(),o=i?{org:i.org(),code:i.code(),name:i.name(),description:i.description(),wkt:i.wkt(),code_string:i.codeString()}:null;return {geometryType:e.geometryType(),columns:s,envelope:null,featuresCount:Number(n),indexNodeSize:r,crs:o,title:e.title(),description:e.description(),metadata:e.metadata()}}
/*! *****************************************************************************
    Copyright (c) Microsoft Corporation.

    Permission to use, copy, modify, and/or distribute this software for any
    purpose with or without fee is hereby granted.

    THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
    REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
    AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
    INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
    LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
    OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
    PERFORMANCE OF THIS SOFTWARE.
    ***************************************************************************** */var B=function(t,e){return B=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e;}||function(t,e){for(var n in e)e.hasOwnProperty(n)&&(t[n]=e[n]);},B(t,e)};function E(t,e,n,r){return new(n||(n=Promise))((function(s,i){function o(t){try{c(r.next(t));}catch(t){i(t);}}function a(t){try{c(r.throw(t));}catch(t){i(t);}}function c(t){var e;t.done?s(t.value):(e=t.value,e instanceof n?e:new n((function(t){t(e);}))).then(o,a);}c((r=r.apply(t,e||[])).next());}))}function T(t,e){var n,r,s,i,o={label:0,sent:function(){if(1&s[0])throw s[1];return s[1]},trys:[],ops:[]};return i={next:a(0),throw:a(1),return:a(2)},"function"==typeof Symbol&&(i[Symbol.iterator]=function(){return this}),i;function a(i){return function(a){return function(i){if(n)throw new TypeError("Generator is already executing.");for(;o;)try{if(n=1,r&&(s=2&i[0]?r.return:i[0]?r.throw||((s=r.return)&&s.call(r),0):r.next)&&!(s=s.call(r,i[1])).done)return s;switch(r=0,s&&(i=[2&i[0],s.value]),i[0]){case 0:case 1:s=i;break;case 4:return o.label++,{value:i[1],done:!1};case 5:o.label++,r=i[1],i=[0];continue;case 7:i=o.ops.pop(),o.trys.pop();continue;default:if(!(s=o.trys,(s=s.length>0&&s[s.length-1])||6!==i[0]&&2!==i[0])){o=0;continue}if(3===i[0]&&(!s||i[1]>s[0]&&i[1]<s[3])){o.label=i[1];break}if(6===i[0]&&o.label<s[1]){o.label=s[1],s=i;break}if(s&&o.label<s[2]){o.label=s[2],o.ops.push(i);break}s[2]&&o.ops.pop(),o.trys.pop();continue}i=e.call(t,o);}catch(t){i=[6,t],r=0;}finally{n=s=0;}if(5&i[0])throw i[1];return {value:i[0]?i[1]:void 0,done:!0}}([i,a])}}}function N(t){var e="function"==typeof Symbol&&Symbol.iterator,n=e&&t[e],r=0;if(n)return n.call(t);if(t&&"number"==typeof t.length)return {next:function(){return t&&r>=t.length&&(t=void 0),{value:t&&t[r++],done:!t}}};throw new TypeError(e?"Object is not iterable.":"Symbol.iterator is not defined.")}function k(t){return this instanceof k?(this.v=t,this):new k(t)}function L(t,e,n){if(!Symbol.asyncIterator)throw new TypeError("Symbol.asyncIterator is not defined.");var r,s=n.apply(t,e||[]),i=[];return r={},o("next"),o("throw"),o("return"),r[Symbol.asyncIterator]=function(){return this},r;function o(t){s[t]&&(r[t]=function(e){return new Promise((function(n,r){i.push([t,e,n,r])>1||a(t,e);}))});}function a(t,e){try{(n=s[t](e)).value instanceof k?Promise.resolve(n.value.v).then(c,u):h(i[0][2],n);}catch(t){h(i[0][3],t);}var n;}function c(t){a("next",t);}function u(t){a("throw",t);}function h(t,e){t(e),i.shift(),i.length&&a(i[0][0],i[0][1]);}}var R=function(t){function e(e){var n=t.call(this,e)||this;return Object.defineProperty(n,"name",{value:"RepeaterOverflowError",enumerable:!1}),"function"==typeof Object.setPrototypeOf?Object.setPrototypeOf(n,n.constructor.prototype):n.__proto__=n.constructor.prototype,"function"==typeof Error.captureStackTrace&&Error.captureStackTrace(n,n.constructor),n}return function(t,e){function n(){this.constructor=t;}B(t,e),t.prototype=null===e?Object.create(e):(n.prototype=e.prototype,new n);}(e,t),e}(Error);function q(t){null!=t&&"function"==typeof t.then&&t.then(j,j);}!function(){function t(t){if(t<0)throw new RangeError("Capacity may not be less than 0");this._c=t,this._q=[];}Object.defineProperty(t.prototype,"empty",{get:function(){return 0===this._q.length},enumerable:!1,configurable:!0}),Object.defineProperty(t.prototype,"full",{get:function(){return this._q.length>=this._c},enumerable:!1,configurable:!0}),t.prototype.add=function(t){if(this.full)throw new Error("Buffer full");this._q.push(t);},t.prototype.remove=function(){if(this.empty)throw new Error("Buffer empty");return this._q.shift()};}(),function(){function t(t){if(t<1)throw new RangeError("Capacity may not be less than 1");this._c=t,this._q=[];}Object.defineProperty(t.prototype,"empty",{get:function(){return 0===this._q.length},enumerable:!1,configurable:!0}),Object.defineProperty(t.prototype,"full",{get:function(){return !1},enumerable:!1,configurable:!0}),t.prototype.add=function(t){for(;this._q.length>=this._c;)this._q.shift();this._q.push(t);},t.prototype.remove=function(){if(this.empty)throw new Error("Buffer empty");return this._q.shift()};}(),function(){function t(t){if(t<1)throw new RangeError("Capacity may not be less than 1");this._c=t,this._q=[];}Object.defineProperty(t.prototype,"empty",{get:function(){return 0===this._q.length},enumerable:!1,configurable:!0}),Object.defineProperty(t.prototype,"full",{get:function(){return !1},enumerable:!1,configurable:!0}),t.prototype.add=function(t){this._q.length<this._c&&this._q.push(t);},t.prototype.remove=function(){if(this.empty)throw new Error("Buffer empty");return this._q.shift()};}();var M=1024,j=function(){};function $(t){var e=t.err,n=Promise.resolve(t.execution).then((function(t){if(null!=e)throw e;return t}));return t.err=void 0,t.execution=n.then((function(){}),(function(){})),void 0===t.pending?n:t.pending.then((function(){return n}))}function z(t,e){var n=t.state>=3;return Promise.resolve(e).then((function(e){return !n&&t.state>=4?$(t).then((function(t){return {value:t,done:!0}})):{value:e,done:n}}))}function G(t,e){var n,r;if(!(t.state>=2))if(t.state=2,t.onnext(),t.onstop(),null==t.err&&(t.err=e),0!==t.pushes.length||void 0!==t.buffer&&!t.buffer.empty)try{for(var s=N(t.pushes),i=s.next();!i.done;i=s.next()){i.value.resolve();}}catch(t){n={error:t};}finally{try{i&&!i.done&&(r=s.return)&&r.call(s);}finally{if(n)throw n.error}}else D(t);}function D(t){var e,n;if(!(t.state>=3)){t.state<2&&G(t),t.state=3,t.buffer=void 0;try{for(var r=N(t.nexts),s=r.next();!s.done;s=r.next()){var i=s.value,o=void 0===t.pending?$(t):t.pending.then((function(){return $(t)}));i.resolve(z(t,o));}}catch(t){e={error:t};}finally{try{s&&!s.done&&(n=r.return)&&n.call(r);}finally{if(e)throw e.error}}t.pushes=[],t.nexts=[];}}function H(t){t.state>=4||(t.state<3&&D(t),t.state=4);}function W(t,e){if(q(e),t.pushes.length>=M)throw new R("No more than 1024 pending calls to push are allowed on a single repeater.");if(t.state>=2)return Promise.resolve(void 0);var n,r=void 0===t.pending?Promise.resolve(e):t.pending.then((function(){return e}));(r=r.catch((function(e){t.state<2&&(t.err=e),H(t);})),t.nexts.length)?(t.nexts.shift().resolve(z(t,r)),n=t.nexts.length?Promise.resolve(t.nexts[0].value):new Promise((function(e){return t.onnext=e}))):void 0===t.buffer||t.buffer.full?n=new Promise((function(e){return t.pushes.push({resolve:e,value:r})})):(t.buffer.add(r),n=Promise.resolve(void 0));var s=!0,i={},o=n.catch((function(t){if(s)throw t}));return i.then=function(t,e){return s=!1,Promise.prototype.then.call(n,t,e)},i.catch=function(t){return s=!1,Promise.prototype.catch.call(n,t)},i.finally=n.finally.bind(n),t.pending=r.then((function(){return o})).catch((function(e){t.err=e,H(t);})),i}function X(t){if(!(t.state>=1)){t.state=1;var e=W.bind(null,t),n=function(t){var e=G.bind(null,t),n=new Promise((function(e){return t.onstop=e}));return e.then=n.then.bind(n),e.catch=n.catch.bind(n),e.finally=n.finally.bind(n),e}(t);t.execution=new Promise((function(r){return r(t.executor(e,n))})),t.execution.catch((function(){return G(t)}));}}var Z,J=new WeakMap,Y=function(){function t(t,e){J.set(this,{executor:t,buffer:e,err:void 0,state:0,pushes:[],nexts:[],pending:void 0,execution:void 0,onnext:j,onstop:j});}return t.prototype.next=function(t){q(t);var e=J.get(this);if(void 0===e)throw new Error("WeakMap error");if(e.nexts.length>=M)throw new R("No more than 1024 pending calls to next are allowed on a single repeater.");if(e.state<=0&&X(e),e.onnext(t),void 0!==e.buffer&&!e.buffer.empty){var n=z(e,e.buffer.remove());if(e.pushes.length){var r=e.pushes.shift();e.buffer.add(r.value),e.onnext=r.resolve;}return n}if(e.pushes.length){var s=e.pushes.shift();return e.onnext=s.resolve,z(e,s.value)}return e.state>=2?(D(e),z(e,$(e))):new Promise((function(n){return e.nexts.push({resolve:n,value:t})}))},t.prototype.return=function(t){q(t);var e=J.get(this);if(void 0===e)throw new Error("WeakMap error");return D(e),e.execution=Promise.resolve(e.execution).then((function(){return t})),z(e,$(e))},t.prototype.throw=function(t){var e=J.get(this);if(void 0===e)throw new Error("WeakMap error");return e.state<=0||e.state>=2||void 0!==e.buffer&&!e.buffer.empty?(D(e),null==e.err&&(e.err=t),z(e,$(e))):this.next(Promise.reject(t))},t.prototype[Symbol.asyncIterator]=function(){return this},t.race=Q,t.merge=tt,t.zip=et,t.latest=nt,t}();function K(t,e){var n,r,s=[],i=function(t){null!=t&&"function"==typeof t[Symbol.asyncIterator]?s.push(t[Symbol.asyncIterator]()):null!=t&&"function"==typeof t[Symbol.iterator]?s.push(t[Symbol.iterator]()):s.push(function(){return L(this,arguments,(function(){return T(this,(function(n){switch(n.label){case 0:return e.yieldValues?[4,k(t)]:[3,3];case 1:return [4,n.sent()];case 2:n.sent(),n.label=3;case 3:return e.returnValues?[4,k(t)]:[3,5];case 4:return [2,n.sent()];case 5:return [2]}}))}))}());};try{for(var o=N(t),a=o.next();!a.done;a=o.next()){i(a.value);}}catch(t){n={error:t};}finally{try{a&&!a.done&&(r=o.return)&&r.call(o);}finally{if(n)throw n.error}}return s}function Q(t){var e=this,n=K(t,{returnValues:!0});return new Y((function(t,r){return E(e,void 0,void 0,(function(){var e,s,i,o,a,c;return T(this,(function(u){switch(u.label){case 0:if(!n.length)return r(),[2];s=!1,r.then((function(){e(),s=!0;})),u.label=1;case 1:u.trys.push([1,,5,7]),o=void 0,a=0,c=function(){var s,c,u,h,l,b;return T(this,(function(f){switch(f.label){case 0:s=a;try{for(l=void 0,c=N(n),u=c.next();!u.done;u=c.next())h=u.value,Promise.resolve(h.next()).then((function(t){t.done?(r(),void 0===i&&(i=t)):a===s&&(a++,e(t));}),(function(t){return r(t)}));}catch(t){l={error:t};}finally{try{u&&!u.done&&(b=c.return)&&b.call(c);}finally{if(l)throw l.error}}return [4,new Promise((function(t){return e=t}))];case 1:return void 0===(o=f.sent())?[3,3]:[4,t(o.value)];case 2:f.sent(),f.label=3;case 3:return [2]}}))},u.label=2;case 2:return s?[3,4]:[5,c()];case 3:return u.sent(),[3,2];case 4:return [2,i&&i.value];case 5:return r(),[4,Promise.race(n.map((function(t){return t.return&&t.return()})))];case 6:return u.sent(),[7];case 7:return [2]}}))}))}))}function tt(t){var e=this,n=K(t,{yieldValues:!0});return new Y((function(t,r){return E(e,void 0,void 0,(function(){var e,s,i,o=this;return T(this,(function(a){switch(a.label){case 0:if(!n.length)return r(),[2];e=[],s=!1,r.then((function(){var t,n;s=!0;try{for(var r=N(e),i=r.next();!i.done;i=r.next()){(0,i.value)();}}catch(e){t={error:e};}finally{try{i&&!i.done&&(n=r.return)&&n.call(r);}finally{if(t)throw t.error}}})),a.label=1;case 1:return a.trys.push([1,,3,4]),[4,Promise.all(n.map((function(n,a){return E(o,void 0,void 0,(function(){var o;return T(this,(function(c){switch(c.label){case 0:c.trys.push([0,,6,9]),c.label=1;case 1:return s?[3,5]:(Promise.resolve(n.next()).then((function(t){return e[a](t)}),(function(t){return r(t)})),[4,new Promise((function(t){e[a]=t;}))]);case 2:return void 0===(o=c.sent())?[3,4]:o.done?(i=o,[2]):[4,t(o.value)];case 3:c.sent(),c.label=4;case 4:return [3,1];case 5:return [3,9];case 6:return n.return?[4,n.return()]:[3,8];case 7:c.sent(),c.label=8;case 8:return [7];case 9:return [2]}}))}))})))];case 2:return a.sent(),[2,i&&i.value];case 3:return r(),[7];case 4:return [2]}}))}))}))}function et(t){var e=this,n=K(t,{returnValues:!0});return new Y((function(t,r){return E(e,void 0,void 0,(function(){var e,s,i,o;return T(this,(function(a){switch(a.label){case 0:if(!n.length)return r(),[2,[]];s=!1,r.then((function(){e(),s=!0;})),a.label=1;case 1:a.trys.push([1,,6,8]),a.label=2;case 2:return s?[3,5]:(Promise.all(n.map((function(t){return t.next()}))).then((function(t){return e(t)}),(function(t){return r(t)})),[4,new Promise((function(t){return e=t}))]);case 3:return void 0===(i=a.sent())?[2]:(o=i.map((function(t){return t.value})),i.some((function(t){return t.done}))?[2,o]:[4,t(o)]);case 4:return a.sent(),[3,2];case 5:return [3,8];case 6:return r(),[4,Promise.all(n.map((function(t){return t.return&&t.return()})))];case 7:return a.sent(),[7];case 8:return [2]}}))}))}))}function nt(t){var e=this,n=K(t,{yieldValues:!0,returnValues:!0});return new Y((function(t,r){return E(e,void 0,void 0,(function(){var e,s,i,o,a,c=this;return T(this,(function(u){switch(u.label){case 0:if(!n.length)return r(),[2,[]];s=[],i=!1,r.then((function(){var t,n;e();try{for(var r=N(s),o=r.next();!o.done;o=r.next()){(0,o.value)();}}catch(e){t={error:e};}finally{try{o&&!o.done&&(n=r.return)&&n.call(r);}finally{if(t)throw t.error}}i=!0;})),u.label=1;case 1:return u.trys.push([1,,5,7]),Promise.all(n.map((function(t){return t.next()}))).then((function(t){return e(t)}),(function(t){return r(t)})),[4,new Promise((function(t){return e=t}))];case 2:return void 0===(o=u.sent())?[2]:(a=o.map((function(t){return t.value})),o.every((function(t){return t.done}))?[2,a]:[4,t(a.slice())]);case 3:return u.sent(),[4,Promise.all(n.map((function(e,n){return E(c,void 0,void 0,(function(){var c;return T(this,(function(u){switch(u.label){case 0:if(o[n].done)return [2,o[n].value];u.label=1;case 1:return i?[3,4]:(Promise.resolve(e.next()).then((function(t){return s[n](t)}),(function(t){return r(t)})),[4,new Promise((function(t){return s[n]=t}))]);case 2:return void 0===(c=u.sent())?[2,o[n].value]:c.done?[2,c.value]:(a[n]=c.value,[4,t(a.slice())]);case 3:return u.sent(),[3,1];case 4:return [2]}}))}))})))];case 4:return [2,u.sent()];case 5:return r(),[4,Promise.all(n.map((function(t){return t.return&&t.return()})))];case 6:return u.sent(),[7];case 7:return [2]}}))}))}))}class rt{constructor(){this._extraRequestThreshold=262144;}extraRequestThreshold(){return this._extraRequestThreshold}setExtraRequestThreshold(t){if(t<0)throw new Error("extraRequestThreshold cannot be negative");this._extraRequestThreshold=t;}}rt.global=new rt,function(t){t[t.Debug=0]="Debug",t[t.Info=1]="Info",t[t.Warn=2]="Warn",t[t.Error=3]="Error";}(Z||(Z={}));class st{static debug(){for(var t=arguments.length,e=new Array(t),n=0;n<t;n++)e[n]=arguments[n];this.log(Z.Debug,...e);}static info(){for(var t=arguments.length,e=new Array(t),n=0;n<t;n++)e[n]=arguments[n];this.log(Z.Info,...e);}static warn(){for(var t=arguments.length,e=new Array(t),n=0;n<t;n++)e[n]=arguments[n];this.log(Z.Warn,...e);}static error(){for(var t=arguments.length,e=new Array(t),n=0;n<t;n++)e[n]=arguments[n];this.log(Z.Error,...e);}static log(t){if(!(this.logLevel>t)){for(var e=arguments.length,n=new Array(e>1?e-1:0),r=1;r<e;r++)n[r-1]=arguments[r];switch(t){case Z.Debug:console.debug(...n);break;case Z.Info:console.info(...n);break;case Z.Warn:console.warn(...n);break;case Z.Error:console.error(...n);}}}}st.logLevel=Z.Warn;function it(t,e){e=Math.min(Math.max(+e,2),65535);let n=t,r=n;do{n=Math.ceil(n/e),r+=n;}while(1!==n);return 40*r}async function*ot(t,e,n,r){class s{constructor(t,e){this._level=e,this.nodes=t;}level(){return this._level}startNode(){return this.nodes[0]}endNode(){return this.nodes[1]}extendEndNodeToNewOffset(t){console.assert(t>this.nodes[1]),this.nodes[1]=t;}toString(){return `[NodeRange level: ${this._level}, nodes: ${this.nodes[0]}-${this.nodes[1]}]`}}const{minX:i,minY:o,maxX:a,maxY:c}=n;st.info(`tree items: ${t}, nodeSize: ${e}`);const u=function(t,e){if(e<2)throw new Error("Node size must be at least 2");if(0===t)throw new Error("Number of items must be greater than 0");let n=t,r=n;const s=[n];do{n=Math.ceil(n/e),r+=n,s.push(n);}while(1!==n);const i=[];n=r;for(const t of s)i.push(n-t),n-=t;const o=[];for(let t=0;t<s.length;t++)o.push([i[t],i[t]+s[t]]);return o}(t,e),h=u[0][0],l=[(()=>{const t=u.length-1;return new s([0,1],t)})()];for(st.debug(`starting stream search with queue: ${l}, numItems: ${t}, nodeSize: ${e}, levelBounds: ${u}`);0!=l.length;){const n=l.shift();st.debug(`popped node: ${n}, queueLength: ${l.length}`);const b=n.startNode(),f=b>=h,[,d]=u[n.level()],_=Math.min(n.endNode()+e,d),p=_-b,y=await r(40*b,40*p),g=new Float64Array(y),w=new Uint32Array(y);for(let e=b;e<_;e++){const r=5*(e-b);if(a<g[r+0])continue;if(c<g[r+1])continue;if(i>g[r+2])continue;if(o>g[r+3])continue;const u=w[8+(r<<1)],d=at(w[9+(r<<1)],u);if(f){const n=(()=>{if(e<t-1){const t=5*(e-b+1),n=w[8+(t<<1)];return at(w[9+(t<<1)],n)-d}return null})();yield [d,e-h,n];continue}const _=rt.global.extraRequestThreshold()/40,p=l[l.length-1];if(void 0!==p&&p.level()==n.level()-1&&d<p.endNode()+_){st.debug(`Merging "nodeRange" request into existing range: ${p}, newOffset: ${p.endNode()} -> ${d}`),p.extendEndNodeToNewOffset(d);continue}const y=(()=>{const t=n.level()-1;return new s([d,d+1],t)})();void 0!==p&&p.level()==y.level()?st.info(`Same level, but too far away. Pushing new request at offset: ${d} rather than merging with distant ${p}`):st.info(`Pushing new level for ${y} onto queue with nearestNodeRange: ${p} since there's not already a range for this level.`),l.push(y);}}}function at(t,e){if(0!=(4293918720&t))throw Error("integer is too large to be safely represented");return e+t*2**32}const ct=new Uint8Array([102,103,98,3,102,103,98,0]);class ut{constructor(t,e,n,r){this.headerClient=t,this.header=e,this.headerLength=n,this.indexLength=r;}static async open(t){const e=new ht(t),n=(()=>{let t,e=0;for(t=0;t<3;t++){e+=16**t*40;}return e})(),r=2024+n;st.debug(`fetching header. minReqLength: ${r} (assumedHeaderLength: 2024, assumedIndexLength: ${n})`);{const t=new Uint8Array(await e.getRange(0,8,r,"header"));if(!t.subarray(0,3).every(((t,e)=>ct[e]===t)))throw st.error(`bytes: ${t} != ${ct}`),new Error("Not a FlatGeobuf file");st.debug("magic bytes look good");}let s;{const t=await e.getRange(8,4,r,"header");s=new DataView(t).getUint32(0,!0);if(s>10485760||s<8)throw new Error("Invalid header size");st.debug(`headerLength: ${s}`);}const i=await e.getRange(12,s,r,"header"),o=A(new c(new Uint8Array(i))),a=it(o.featuresCount,o.indexNodeSize);return st.debug("completed: opening http reader"),new ut(e,o,s,a)}async*selectBbox(t){const e=this.lengthBeforeTree(),n=this.headerClient,r=async function(t,r){return n.getRange(e+t,r,0,"index")},s=[];let i=[];for await(const e of ot(this.header.featuresCount,this.header.indexNodeSize,t,r)){const[t,,]=e;let[,,n]=e;if(!n){st.info("final feature");n=rt.global.extraRequestThreshold();}if(0==i.length){i.push([t,n]);continue}const r=i[i.length-1],o=t-(r[0]+r[1]);o>rt.global.extraRequestThreshold()&&(st.info(`Pushing new feature batch, since gap ${o} was too large`),s.push(i),i=[]),i.push([t,n]);}this.headerClient.logUsage("header+index"),i.length>0&&s.push(i);const o=s.flatMap((t=>this.readFeatureBatch(t)));yield*Y.merge(o);}lengthBeforeTree(){return ct.length+4+this.headerLength}lengthBeforeFeatures(){return this.lengthBeforeTree()+this.indexLength}buildFeatureClient(){return new ht(this.headerClient.httpClient)}async*readFeatureBatch(t){const[e]=t[0],[n,r]=t[t.length-1],s=n+r-e,i=this.buildFeatureClient();for(const[e]of t)yield await this.readFeature(i,e,s);i.logUsage("feature");}async readFeature(t,e,n){const r=e+this.lengthBeforeFeatures();let s;{const e=await t.getRange(r,4,n,"feature length");s=new DataView(e).getUint32(0,!0);}const i=await t.getRange(r+4,s,n,"feature data"),o=new Uint8Array(i),a=new Uint8Array(s+4);a.set(o,4);const u=new c(a);return u.setPosition(4),v.getRootAsFeature(u)}}class ht{constructor(t){this.bytesEverUsed=0,this.bytesEverFetched=0,this.buffer=new ArrayBuffer(0),this.head=0,this.httpClient="string"==typeof t?new lt(t):t;}async getRange(t,e,n,r){this.bytesEverUsed+=e;const s=t-this.head,i=s+e;if(s>=0&&i<=this.buffer.byteLength)return this.buffer.slice(s,i);const o=Math.max(e,n);return this.bytesEverFetched+=o,st.debug(`requesting for new Range: ${t}-${t+e-1}`),this.buffer=await this.httpClient.getRange(t,o,r),this.head=t,this.buffer.slice(0,e)}logUsage(t){const e=t.split(" ")[0],n=this.bytesEverUsed,r=this.bytesEverFetched,s=(100*n/r).toFixed(2);st.info(`${e} bytes used/requested: ${n} / ${r} = ${s}%`);}}class lt{constructor(t){this.requestsEverMade=0,this.bytesEverRequested=0,this.url=t;}async getRange(t,e,n){this.requestsEverMade+=1,this.bytesEverRequested+=e;const r=`bytes=${t}-${t+e-1}`;st.info(`request: #${this.requestsEverMade}, purpose: ${n}), bytes: (this_request: ${e}, ever: ${this.bytesEverRequested}), Range: ${r}`);return (await fetch(this.url,{headers:{Range:r}})).arrayBuffer()}}async function*bt(t,e,n){const r="function"==typeof(s=t).slice?s:new O("function"==typeof s.read?s:s.getReader());var s;const i=async t=>await r.slice(t);let o=new Uint8Array(await i(8));if(!o.subarray(0,3).every(((t,e)=>ct[e]===t)))throw new Error("Not a FlatGeobuf file");o=new Uint8Array(await i(4));let a=new c(o);const u=a.readUint32(0);o=new Uint8Array(await i(u)),a=new c(o);const h=A(a);n&&n(h);const{indexNodeSize:l,featuresCount:b}=h;if(l>0){const t=it(b,l);await i(t);}let f;for(;f=await ft(i,h,e);)yield f;}async function ft(t,e,n){let r=new Uint8Array(await t(4,"feature length"));if(0===r.byteLength)return;let s=new c(r);const i=s.readUint32(0);r=new Uint8Array(await t(i,"feature data"));const o=new Uint8Array(i+4);o.set(r,4),s=new c(o),s.setPosition(4);return n(v.getRootAsFeature(s),e)}function dt(t){const e=new u;let n=null;t.columns&&(n=V.createColumnsVector(e,t.columns.map((t=>function(t,e){const n=t.createString(e.name);return w.startColumn(t),w.addName(t,n),w.addType(t,e.type),w.endColumn(t)}(e,t)))));const r=e.createString("L1");V.startHeader(e),V.addFeaturesCount(e,BigInt(t.featuresCount)),V.addGeometryType(e,t.geometryType),V.addIndexNodeSize(e,0),n&&V.addColumns(e,n),V.addName(e,r);const s=V.endHeader(e);return e.finishSizePrefixed(s),e.asUint8Array()}function _t(t){if("boolean"==typeof t)return a.Bool;if("number"==typeof t)return t%1==0?a.Int:a.Double;if("string"==typeof t)return a.String;if(null===t)return a.String;if("object"==typeof t)return a.Json;throw new Error(`Unknown type (value '${t}')`)}function pt(t){const n=function(t){const n=t.features[0],r=n.properties;let s=null;r&&(s=Object.keys(r).map((t=>function(t,e){return {name:e,type:_t(t[e]),title:null,description:null,width:-1,precision:-1,scale:-1,nullable:!0,unique:!1,primary_key:!1}}(r,t))));const i=function(t){let n;for(const s of t){if(n===e.Unknown)break;const t=(r=s).getGeometry?d(r.getGeometry().getType()):d(r.geometry.type);void 0===n?n=t:n!==t&&(n=e.Unknown);}var r;if(void 0===n)throw new Error("Could not infer geometry type for collection of features.");return n}(t.features),o={geometryType:i,columns:s,envelope:null,featuresCount:t.features.length,indexNodeSize:0,crs:null,title:null,description:null,metadata:null};return o}(t),r=dt(n),s=t.features.map((t=>F("GeometryCollection"===t.geometry.type?p(t.geometry):_(t.geometry),t.properties,n))),i=s.map((t=>t.length)).reduce(((t,e)=>t+e)),o=new Uint8Array(ct.length+r.length+i);o.set(r,ct.length);let a=ct.length+r.length;for(const t of s)o.set(t,a),a+=t.length;return o.set(ct),o}function yt(t,e){const n=function(t,e,n){if(!t.subarray(0,3).every(((t,e)=>ct[e]===t)))throw new Error("Not a FlatGeobuf file");const r=new c(t),s=r.readUint32(ct.length);r.setPosition(ct.length+4);const i=A(r);n&&n(i);let o=ct.length+4+s;const{indexNodeSize:a,featuresCount:u}=i;a>0&&(o+=it(u,a));const h=[];for(;o<r.capacity();){const t=r.readUint32(o);r.setPosition(o+4);const n=v.getRootAsFeature(r);h.push(e(n,i)),o+=4+t;}return h}(t,U,e);return {type:"FeatureCollection",features:n}}function gt(t,e,n){return async function*(t,e,n,r){const s=await ut.open(t);st.debug("opened reader"),r&&r(s.header);for await(const t of s.selectBbox(e))yield n(t,s.header);}(t,e,U,n)}t.deserialize=function(t,e,n){return t instanceof Uint8Array?yt(t,n):t instanceof ReadableStream?function(t,e){return bt(t,U,e)}(t,n):gt(t,e,n)},t.serialize=function(t){return pt(t)};}));
});

const getBoxAroundPoint = (point, radius) => {
    const southwest = [point.x + radius, point.y + radius];
    const northeast = [point.x - radius, point.y - radius];
    const box = [northeast, southwest];
    return box;
};
const convertBrushSizeToPixels = (mapZoom, size) => {
    // https://docs.mapbox.com/help/glossary/zoom-level/#zoom-levels-and-geographical-distance
    // Zoom scale at equator
    const mapboxZoomScale = [
        78271.484, 39135.742, 19567.871, 9783.936, 4891.968, 2445.984, 1222.992, 611.496, 305.748, 152.874, 76.437, 38.219,
        19.109, 9.555, 4.777, 2.389, 1.194, 0.597, 0.299, 0.149, 0.075, 0.037, 0.019, 0.01, 0.005, 0.0
    ];
    // Limit map zoom level to the available zoom levels in the scale array
    const zoom = Math.floor(Math.min(mapZoom, mapboxZoomScale.length - 1));
    const scaleA = mapboxZoomScale[zoom];
    const scaleB = mapboxZoomScale[zoom + 1];
    const scale = scaleA + (scaleB - scaleA) * (mapZoom - zoom);
    return Math.round((size * 200) / scale);
};
const getHoveredFeatures = (point, brushSize, map, layerIds) => {
    const box = getBoxAroundPoint(point, brushSize);
    const features = map.queryRenderedFeatures(box, {
        layers: layerIds
    });
    return features;
};
const removeHoveredFeatures = (map, features, layer) => {
    features.forEach((feature) => {
        map.setFeatureState({
            source: layer.source,
            sourceLayer: layer.sourceLayer,
            id: feature.id
        }, {
            hover: false
        });
    });
};
const colorFeature = (map, feature, layer, unit) => {
    map.setFeatureState({
        source: layer.source,
        sourceLayer: layer.sourceLayer,
        id: feature.id
    }, Object.assign(Object.assign({}, feature.state), { unit: unit, hover: false }));
};
/**
 * Invoked to update colors of the interactive map
 *
 * @param map maps to state.mapboxMap
 * @param features this is set of features that are currently being hovered over
 * @param layer maps to interactiveLayer
 * @param unit maps to state.activeUnit
 * @param units
 * @param activeTool
 * @param geometryKey
 * @param featureKey
 * @param columnKeys
 * @param currentUnitAssignments
 * @param currentUnitPopulations maps to state.unitPopulations
 * @param currentUnitColumnPopulations maps to state.unitColumnPopulations
 * @param lockedUnits
 * @returns
 */
const colorFeatures = (map, features, layer, unit, units, activeTool, geometryKey, featureKey, columnKeys, currentUnitAssignments, currentUnitPopulations, currentUnitColumnPopulations, lockedUnits) => {
    const assignments = new Map([...currentUnitAssignments]);
    const populations = new Map();
    const columnPopulations = new Map();
    features.forEach((feature) => {
        if (lockedUnits.has(unit)) {
            return;
        }
        if (feature.state.unit && lockedUnits.has(feature.state.unit)) {
            return;
        }
        // When reaching this point, it is clear that lockedUnit does not contain
        // the unit that corresponds with this feature
        let paintUnit = unit;
        if (activeTool === 'eraser') {
            assignments.delete(feature.properties[geometryKey]);
            paintUnit = 0;
        }
        else {
            assignments.set(feature.properties[geometryKey], unit);
            // indicates that we mapping the geometryKey to the unit in each feature
        }
        populations.set(feature.properties[geometryKey], feature.properties[featureKey]);
        // indicates that we mapping this geometryKey to a corresponding featureKey
        columnKeys.forEach((columnKey) => {
            const cpop_key = `${columnKey}-${feature.properties[geometryKey]}`;
            const cpop_value = feature.properties[`${columnKey}`];
            columnPopulations.set(cpop_key, cpop_value);
        });
        // Mapping string consisting of columnKey and feature.properties[geometryKey] to feature.properties[columnKey]
        colorFeature(map, feature, layer, paintUnit);
    });
    if (!mapsAreEqual(currentUnitAssignments, assignments)) {
        // line is only reached if there is no update to assignments that changes
        // one of the key-value pairs.
        return false;
    }
    const newPopulations = new Map([...currentUnitPopulations, ...populations]);
    // update this newPopulations by unrolling populations into currentUnitPopulations
    const newColumnPopulations = new Map([...currentUnitColumnPopulations, ...columnPopulations]);
    // update newColumnPopulations by unrolling columnPopulations into currentUnitColumnPopulations
    const newUnits = units;
    const updatedPopulations = new Map();
    const updatedColumnPopulations = new Map();
    if (assignments.size === 0) {
        Object.keys(newUnits)
            .map(Number)
            .every((unit) => {
            updatedPopulations.set(unit, 0);
            columnKeys.forEach((columnKey) => {
                if (!updatedColumnPopulations.has(unit)) {
                    updatedColumnPopulations.set(unit, {});
                }
                const column = updatedColumnPopulations.get(unit);
                column[columnKey] = 0;
                updatedColumnPopulations.set(unit, column);
            });
        });
    }
    // In this block, key for updatedColumnPopulations is number for some reason
    for (let geoid of assignments.keys()) {
        const unit = assignments.get(geoid);
        const population = newPopulations.get(geoid);
        if (updatedPopulations.has(unit)) {
            updatedPopulations.set(unit, updatedPopulations.get(unit) + population);
        }
        else {
            updatedPopulations.set(unit, population);
        }
        columnKeys.forEach((columnKey) => {
            if (!updatedColumnPopulations.has(unit)) {
                updatedColumnPopulations.set(unit, {});
            }
            const recordKey = `${columnKey}-${geoid}`;
            const column = updatedColumnPopulations.get(unit);
            if (column[columnKey]) {
                column[columnKey] += newColumnPopulations.get(recordKey);
            }
            else {
                column[columnKey] = newColumnPopulations.get(recordKey);
            }
            updatedColumnPopulations.set(unit, column);
        });
    }
    let totalMembers = 0;
    lockedUnits = new Set(lockedUnits);
    for (let unit of updatedPopulations.keys()) {
        newUnits[unit].population = updatedPopulations.get(unit);
        newUnits[unit].columnPopulations = updatedColumnPopulations.get(unit);
        if (newUnits[unit].type === 'multi-varying') {
            if (totalMembers >= newUnits[unit].totalUnits) {
                newUnits[unit].stashed = true;
            }
            else {
                newUnits[unit].stashed = false;
            }
            const ideal = newUnits[unit].idealPopulation;
            const population = newUnits[unit].population;
            // divide the population by the ideal and round up to the nearest integer
            const newMembers = Math.ceil(population / ideal);
            const newTotalMembersCount = totalMembers + newMembers;
            if (newTotalMembersCount > newUnits[unit].totalUnits) {
                newUnits[unit].members = Math.floor(population / ideal);
            }
            else {
                newUnits[unit].members = Math.ceil(population / ideal);
            }
            newUnits[unit].unitIdealPopulation = ideal * newUnits[unit].members;
            totalMembers += newUnits[unit].members;
        }
    }
    return {
        unitAssignments: assignments,
        unitPopulations: newPopulations,
        unitColumnPopulations: newColumnPopulations,
        units: newUnits,
        hoveredFeatures: []
    };
};
const setActiveFeatures = (map, layer, unit) => {
    const paintLayer = map.getLayer(layer);
    //@ts-ignore
    const features = map.queryRenderedFeatures({ layers: [layer] });
    features.forEach((feature) => {
        if (feature.state.unit === unit) {
            map.setFeatureState({
                //@ts-ignore
                source: paintLayer.source,
                //@ts-ignore
                sourceLayer: paintLayer.sourceLayer,
                id: feature.id
            }, Object.assign(Object.assign({}, feature.state), { active: true }));
        }
        else {
            map.setFeatureState({
                //@ts-ignore
                source: paintLayer.source,
                //@ts-ignore
                sourceLayer: paintLayer.sourceLayer,
                id: feature.id
            }, Object.assign(Object.assign({}, feature.state), { active: false }));
        }
    });
};
const repaintMapFeatures = (map, layer, unitAssignments, geokey) => {
    const features = map.queryRenderedFeatures({
        //@ts-ignore
        layers: [layer]
    });
    const paintLayer = map.getLayer(layer);
    features.forEach((feature) => {
        const unit = unitAssignments.get(feature.properties[geokey]);
        if (unit) {
            colorFeature(map, feature, paintLayer, unit);
        }
    });
};
const getMouseParameters = (event, previous) => {
    const currentPoint = event.point;
    let previousPoint = previous;
    if (!previousPoint) {
        previousPoint = currentPoint;
    }
    const dist = Math.sqrt(Math.pow(currentPoint.x - previousPoint.x, 2) + Math.pow(currentPoint.y - previousPoint.y, 2));
    const rads = Math.atan2(currentPoint.y - previousPoint.y, currentPoint.x - previousPoint.x);
    return {
        distance: dist,
        radians: rads,
        point: currentPoint
    };
};
const mapsAreEqual = (m1, m2) => {
    return m1.size === m2.size && Array.from(m1.keys()).every((key) => m1.get(key) === m2.get(key));
};

const DistrictrWrapper = styled.div `
  width: 100%;
  height: 100%;
  flex-grow: 1;
  display: flex;
  flex-direction: column;

  .districtr-mapbox {
    position: absolute;
    top: 50px;
    bottom: 0;
    left: 48px;
    right: 48px;
    z-index: 1;
  }
`;

/**
 * Global Districtr color map for districts.
 *
 * We might consider using fewer colors and just allowing repetitions,
 * since a human being can only hold so many colors in their head at
 * one time.
 */
let _colorScheme = [
    '#0099cd',
    '#ffca5d',
    '#00cd99',
    '#99cd00',
    '#cd0099',
    '#aa44ef',
    // Color brewer:
    '#8dd3c7',
    '#bebada',
    '#fb8072',
    '#80b1d3',
    '#fdb462',
    '#b3de69',
    '#fccde5',
    // "#d9d9d9", Too gray!
    '#bc80bd',
    '#ccebc5',
    '#ffed6f',
    '#ffffb3',
    // other color brewer scheme:
    '#a6cee3',
    '#1f78b4',
    '#b2df8a',
    '#33a02c',
    '#fb9a99',
    '#e31a1c',
    '#fdbf6f',
    '#ff7f00',
    '#cab2d6',
    '#6a3d9a',
    //    "#ffff99",
    '#b15928',
    // random material design colors:
    '#64ffda',
    '#00B8D4',
    '#A1887F',
    '#76FF03',
    '#DCE775',
    '#B388FF',
    '#FF80AB',
    '#D81B60',
    '#26A69A',
    '#FFEA00',
    '#6200EA'
];
//_colorScheme.push(..._colorScheme.map(hex => changeColorLuminance(hex, -0.3)));
/**
 * District color scheme given a certain number if units
 */
const getColorScheme = (unitCount, colorScheme = _colorScheme) => {
    let colors = [];
    for (let i = 0; i < unitCount; i++) {
        colors.push(colorScheme[i % colorScheme.length]);
    }
    return colors;
};
/**
 * Darker colors for when the user hovers over assigned units.
 */
const getHoverColorScheme = (unitCount, colorScheme = _colorScheme) => {
    let colors = [];
    for (let i = 0; i < unitCount; i++) {
        colors.push(changeColorLuminance(colorScheme[i % colorScheme.length], -0.15));
    }
    return colors;
};
/**
 * Brighter colors for when the district is in an active state.
 */
const getSelectedColorScheme = (unitCount, colorScheme = _colorScheme) => {
    let colors = [];
    for (let i = 0; i < unitCount; i++) {
        colors.push(changeColorLuminance(colorScheme[i % colorScheme.length], 0.15));
    }
    return colors;
};
/**
 * Adjusts the color luminance. Use it for shading colors.
 *
 * I got this from stack overflow to find shaded versions of the
 * ColorBrewer colors.
 *
 * @param {string} hex
 * @param {number} lum
 */
function changeColorLuminance(hex, lum) {
    // validate hex string
    hex = String(hex).replace(/[^0-9a-f]/gi, '');
    if (hex.length < 6) {
        hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
    }
    lum = lum || 0;
    // convert to decimal and change luminosity
    let rgb = '#', c, i;
    for (i = 0; i < 3; i++) {
        const z = i * 2;
        c = parseInt(hex.substring(z, z + 2), 16);
        c = Math.round(Math.min(Math.max(0, c + c * lum), 255)).toString(16);
        rgb += ('00' + c).slice(c.length);
    }
    return rgb;
}
function getUnitColorProperty(units) {
    // Convert units from a object to a array of objects
    const unitList = Object.keys(units).map((key) => units[key]);
    const unitColorStyle = [
        'match',
        ['feature-state', 'unit'],
        // for each unit in units, add the unit id and the color
        ...unitList.map((unit) => [unit.id, unit.color]).reduce((list, pair) => [...list, ...pair]),
        'rgba(0, 0, 0, 0)'
    ];
    const hoveredUnitColorStyle = [
        'match',
        ['feature-state', 'unit'],
        ...unitList.map((unit) => [unit.id, unit.hoverColor]).reduce((list, unit) => [...list, ...unit]),
        '#aaaaaa'
    ];
    [
        'match',
        ['feature-state', 'unit'],
        ...unitList.map((unit) => [unit.id, unit.selectedColor]).reduce((list, unit) => [...list, ...unit]),
        '#aaaaaa'
    ];
    const standardColor = ['case', ['boolean', ['feature-state', 'hover'], false], hoveredUnitColorStyle, unitColorStyle];
    const blendWithHoverOption = [
        'case',
        ['boolean', ['feature-state', 'hover'], false],
        ['feature-state', 'blendHoverColor'],
        ['feature-state', 'blendColor']
    ];
    const unitColorProperty = [
        'case',
        ['==', ['feature-state', 'useBlendColor'], true],
        blendWithHoverOption,
        standardColor
    ];
    return unitColorProperty;
}
/**
 * Mapbox color rule for the units layer.
 */
const unitBordersPaintProperty = {
    'line-color': '#777777',
    'line-width': ['interpolate', ['linear'], ['zoom'], 0, 0, 7, 1],
    'line-opacity': 0.3
};
Object.assign(Object.assign({}, unitBordersPaintProperty), { 'line-color': ['case', ['==', ['feature-state', 'color'], null], '#ff4f49', unitBordersPaintProperty['line-color']], 'line-width': ['case', ['==', ['feature-state', 'color'], null], 4, 1], 'line-opacity': ['case', ['==', ['feature-state', 'color'], null], 0.8, 0.3] });
const updateUnitsColorScheme = (units, colorScheme) => {
    const unitList = Object.keys(units).map((key) => units[key]);
    const colors = getColorScheme(unitList.length, colorScheme);
    const hoverColors = getHoverColorScheme(unitList.length, colorScheme);
    const selectedColors = getSelectedColorScheme(unitList.length, colorScheme);
    unitList.forEach((unit, i) => {
        unit.color = colors[i];
        unit.hoverColor = hoverColors[i];
        unit.selectedColor = selectedColors[i];
    });
    const newUnits = {};
    unitList.forEach((unit) => {
        newUnits[unit.id] = unit;
    });
    return newUnits;
};

const intializeDistrictrState = (state) => {
    const sourceColumnSets = state.columnSets[state.interactiveLayerIds[state.activeInteractiveLayer]].columnSets;
    const columnKeys = [];
    let populationSum = state.populationSum;
    sourceColumnSets.forEach((columnSet) => {
        if (columnSet.total !== null && columnSet.type === 'population' && columnSet.total.key === state.featureKey) {
            populationSum = columnSet.total.sum;
            columnKeys.push(columnSet.total.key);
        }
        if (columnSet.subgroups) {
            columnSet.subgroups.forEach((subgroup) => {
                columnKeys.push(subgroup.key);
            });
        }
    });
    console.log('state', state);
    console.log('state', populationSum);
    console.log('state', columnKeys);
    return Object.assign(Object.assign({}, state), { populationSum,
        columnKeys });
};
const districtrReducer = (state, action) => {
    // console.log('action type', action.type)
    if (state.units[1].population != undefined) {
        console.log('Still okay, ', action, state);
    }
    switch (action.type) {
        case 'load_map_state': {
            console.log('load_map_state called');
            const { mapState } = action.payload;
            const currentMap = state.mapboxMap;
            const currentAccessToken = state.mapboxAccessToken;
            const activeLayer = mapState.interactiveLayerIds
                ? mapState.interactiveLayerIds[mapState.activeInteractiveLayer]
                : state.interactiveLayerIds[state.activeInteractiveLayer];
            const geometryKey = mapState.geometryKey ? mapState.geometryKey : state.geometryKey;
            // (map: MapboxMap, layer, unitAssignments: Map<string, number>, geokey)
            repaintMapFeatures(currentMap, activeLayer, mapState.unitAssignments, geometryKey);
            return Object.assign(Object.assign(Object.assign({}, state), mapState), { mapboxMap: currentMap, mapboxAccessToken: currentAccessToken });
        }
        case 'set_mapbox_map': {
            console.log('set_mapbox_map called');
            const events = state.events;
            mapboxgl.accessToken = action.payload.mapboxAccessToken;
            const map = new mapboxgl.Map({
                container: 'districtr-mapbox',
                style: state.mapboxStyle,
                center: state.center,
                zoom: state.zoom,
                attributionControl: false,
                pitchWithRotate: false,
                dragRotate: false,
                preserveDrawingBuffer: true,
                cooperativeGestures: false,
                dragPan: true,
                boxZoom: false,
                touchZoomRotate: true,
                transformRequest: (url, resourceType) => {
                    if (resourceType === 'Source' && url.startsWith('http://api.districtr.org')) {
                        return {
                            url: url,
                            headers: {
                                Authorization: 'Token *FUTURE TOKEN*',
                                'Access-Control-Allow-Origin': '*'
                            }
                        };
                    }
                }
            });
            // const map = structuredClone(action.payload.map)
            map.on('load', () => {
                // Add custome map sources not in style
                if (state.sources.length > 0) {
                    console.log('State sources', state.sources);
                    state.sources.forEach((source) => {
                        map.addSource(source.id, source.config);
                        // if (!map.getSource(source.id)) {
                        //   map.addSource(source.id, source.config)
                        // }
                    });
                }
                // Add custom map layers not in style
                if (state.layers.length > 0) {
                    state.layers.forEach((layer) => {
                        if (map.getLayer(layer.config.id)) {
                            map.removeLayer(layer.config.id);
                        }
                        map.addLayer(layer.config);
                    });
                }
                // Add the interactive drawing layers
                for (const layerId of state.interactiveLayerIds) {
                    const defaultInteractiveColorScheme = getUnitColorProperty(state.units);
                    if (layerId === state.interactiveLayerIds[state.activeInteractiveLayer]) {
                        map.setPaintProperty(layerId, 'fill-color', defaultInteractiveColorScheme);
                        map.setPaintProperty(layerId, 'fill-opacity', [
                            'case',
                            ['==', ['feature-state', 'hidden'], true],
                            0,
                            ['==', ['feature-state', 'active'], true],
                            0.8,
                            1
                        ]);
                    }
                    else {
                        map.setPaintProperty(layerId, 'fill-opacity', 0);
                    }
                }
                events.forEach(([event, callback]) => {
                    map.on(event, callback);
                });
                //calculate the brush size in pixels
                const layer = map.getLayer(state.interactiveLayerIds[state.activeInteractiveLayer]);
                if (layer) {
                    const features = map.queryRenderedFeatures(null, { layers: [layer.id] });
                    features.forEach((feature) => {
                        const unitId = feature.properties[state.geometryKey];
                        const unitAssignment = state.unitAssignments.get(unitId);
                        if (unitAssignment) {
                            colorFeature(map, feature, layer, unitAssignment);
                        }
                    });
                }
                map.fitBounds(state.initialViewState.bounds, state.initialViewState.fitBoundsOptions);
                map.setProjection('mercator');
                const zoom = map.getZoom();
                if (zoom && state.brushSize) {
                    const brushSize = convertBrushSizeToPixels(map.getZoom(), state.brushSize);
                    if (brushSize) {
                        return Object.assign(Object.assign({}, state), { mapboxMap: map, brushSize: brushSize });
                    }
                }
            });
            map.getCanvas().addEventListener('keydown', action.payload.keydownCallBack);
            console.log('map variable', map);
            return Object.assign(Object.assign({}, state), { mapboxMap: map });
        }
        case 'remove_mapbox_map': {
            state.mapboxMap.remove();
            return Object.assign(Object.assign({}, state), { mapboxMap: null });
        }
        case 'set_terrain': {
            if (!state.mapboxMap || !state.mapboxMap.getLayer('terrain-option')) {
                return;
            }
            state.mapboxMap.setLayoutProperty('terrain-option', 'visibility', action.show ? 'visible' : 'none');
            return Object.assign(Object.assign({}, state), { terrain: action.show });
        }
        case 'set_satellite': {
            if (!state.mapboxMap || !state.mapboxMap.getLayer('satellite-option')) {
                return;
            }
            state.mapboxMap.setLayoutProperty('satellite-option', 'visibility', action.show ? 'visible' : 'none');
            return Object.assign(Object.assign({}, state), { satellite: action.show });
        }
        case 'update_unit_color': {
            const newUnits = state.units;
            if (!newUnits[action.payload.unit]) {
                console.log('newUnits does not contain the specified unit', state.units);
                console.log(action.payload);
                return state;
            }
            if (newUnits[action.payload.unit].color === action.payload.color) {
                console.log('newUnits current unit has color in the action.payload.color', state.units);
                console.log(action.payload);
                return state;
            }
            newUnits[action.payload.unit].color = action.payload.color;
            const newPalette = [];
            for (const unit in newUnits) {
                newPalette.push(newUnits[unit].color);
            }
            const updatedUnits = updateUnitsColorScheme(newUnits, newPalette);
            const layer = state.mapboxMap.getLayer(state.interactiveLayerIds[state.activeInteractiveLayer]);
            const defaultInteractiveColorScheme = getUnitColorProperty(updatedUnits);
            state.mapboxMap.setPaintProperty(layer.id, 'fill-color', defaultInteractiveColorScheme);
            return Object.assign(Object.assign({}, state), { units: updatedUnits, palette: newPalette });
        }
        case 'update_active_tool': {
            const tool = action.payload.activeTool;
            const drawingTools = ['brush', 'eraser'];
            const panningTools = ['pan'];
            if (drawingTools.includes(tool)) {
                state.mapboxMap.dragPan.disable();
                state.mapboxMap.doubleClickZoom.disable();
                state.mapboxMap.touchZoomRotate.disable();
                state.mapboxMap.getCanvas().style.cursor = 'none';
            }
            else if (panningTools.includes(tool)) {
                state.mapboxMap.getCanvas().style.cursor = 'grab';
                state.mapboxMap.dragPan.enable();
                state.mapboxMap.doubleClickZoom.enable();
                state.mapboxMap.touchZoomRotate.enable();
            }
            else {
                state.mapboxMap.dragPan.enable();
                state.mapboxMap.doubleClickZoom.enable();
                state.mapboxMap.touchZoomRotate.enable();
                state.mapboxMap.getCanvas().style.cursor = 'default';
            }
            return Object.assign(Object.assign({}, state), { activeTool: action.payload.activeTool });
        }
        case 'update_tool_options': {
            if (action.payload.property === 'size') {
                return Object.assign(Object.assign({}, state), { tools: Object.assign(Object.assign({}, state.tools), { [action.payload.tool]: Object.assign(Object.assign({}, state.tools[action.payload.tool]), { [action.payload.property]: action.payload.value }) }) });
            }
            return Object.assign(Object.assign({}, state), { tools: Object.assign(Object.assign({}, state.tools), { [action.payload.tool]: Object.assign(Object.assign({}, state.tools[action.payload.tool]), { [action.payload.property]: action.payload.value }) }) });
        }
        case 'set_brush_size': {
            const zoom = state.mapboxMap.getZoom();
            if (zoom) {
                const brushSizePixels = convertBrushSizeToPixels(zoom, action.payload);
                return Object.assign(Object.assign({}, state), { brushSize: brushSizePixels, brushSizeValue: action.payload });
            }
            return Object.assign({}, state);
        }
        case 'update_brush_size': {
            const zoom = state.mapboxMap.getZoom();
            if (zoom) {
                const brushSizePixels = convertBrushSizeToPixels(state.zoom, state.brushSizeValue);
                return Object.assign(Object.assign({}, state), { brushSize: brushSizePixels });
            }
            return Object.assign({}, state);
        }
        case 'update_coloring_mode': {
            return Object.assign(Object.assign({}, state), { coloring: action.payload });
        }
        case 'mouse_down_on_map': {
            if (state.activeTool === 'brush' || state.activeTool === 'eraser') {
                //state.mapboxMap.getCanvas().style.cursor = 'crosshair'
                return Object.assign(Object.assign({}, state), { coloring: true });
            }
            //state.mapboxMap.getCanvas().style.cursor = ''
            return Object.assign(Object.assign({}, state), { coloring: false });
        }
        case 'mouse_up_on_map': {
            if (state.activeTool === 'brush' || state.activeTool === 'eraser') {
                //state.mapboxMap.getCanvas().style.cursor = 'crosshair'
                return Object.assign(Object.assign({}, state), { coloring: false });
            }
            //state.mapboxMap.getCanvas().style.cursor = ''
            return Object.assign(Object.assign({}, state), { coloring: false });
        }
        case 'update_map_zoom': {
            const brushSizePixels = convertBrushSizeToPixels(action.payload, state.brushSizeValue);
            return Object.assign(Object.assign({}, state), { brushSize: brushSizePixels, zoom: action.payload });
        }
        case 'update_cursor_visibility': {
            // Need to also check for drawing mode
            if (action.payload) ;
            return Object.assign(Object.assign({}, state), { cursorVisible: action.payload });
        }
        case 'user_clicked_map': {
            console.log(state.mapboxMap.getStyle().layers);
            if (state.activeTool === 'brush' || state.activeTool === 'eraser') {
                const interactiveLayer = state.mapboxMap.getLayer(state.interactiveLayerIds[state.activeInteractiveLayer]);
                const features = getHoveredFeatures(action.payload.point, state.brushSize, state.mapboxMap, [
                    interactiveLayer.id
                ]);
                if (state.hoveredFeatures.length > 0) {
                    removeHoveredFeatures(state.mapboxMap, state.hoveredFeatures, interactiveLayer);
                }
                const results = colorFeatures(state.mapboxMap, features, interactiveLayer, state.activeUnit, state.units, state.activeTool, state.geometryKey, state.featureKey, state.columnKeys, state.unitAssignments, state.unitPopulations, state.unitColumnPopulations, state.lockedUnits);
                if (results) {
                    return Object.assign(Object.assign({}, state), { unitAssignments: results.unitAssignments, unitPopulations: results.unitPopulations, unitColumnPopulations: results.unitColumnPopulations, units: results.units, hoveredFeatures: results.hoveredFeatures });
                }
            }
            return Object.assign({}, state);
        }
        case 'user_moved_mouse': {
            const threshold = state.brushSize / action.payload.offsetFactor;
            const distance = action.payload.distance;
            if (distance < threshold) {
                return Object.assign({}, state);
            }
            const interactiveLayer = state.mapboxMap.getLayer(state.interactiveLayerIds[state.activeInteractiveLayer]);
            if (!interactiveLayer) {
                return Object.assign({}, state);
            }
            let features = getHoveredFeatures(action.payload.point, state.brushSize, state.mapboxMap, [interactiveLayer.id]);
            if (state.hoveredFeatures.length > 0) {
                removeHoveredFeatures(state.mapboxMap, state.hoveredFeatures, interactiveLayer);
            }
            if (state.coloring) {
                if (state.paintByCounty) {
                    const countyGEOIDs = new Set();
                    features.forEach((feature) => {
                        const geoid = feature.properties.GEOID20;
                        const countyGEOID = geoid.slice(0, 5);
                        countyGEOIDs.add(countyGEOID);
                    });
                    let shouldPaint = false;
                    // block just checks whether the county Geoid is already painted?
                    for (const countyGEOID of countyGEOIDs) {
                        if (!state.paintedCountyGEOIDs.has(countyGEOID)) {
                            shouldPaint = true;
                            state.paintedCountyGEOIDs.add(countyGEOID);
                        }
                    }
                    if (shouldPaint && countyGEOIDs.size > 0) {
                        //@ts-ignore
                        const countyFeatures = state.mapboxMap.queryRenderedFeatures({
                            //@ts-ignore
                            layers: [interactiveLayer.id],
                            filter: ['match', ['slice', ['get', 'GEOID20'], 0, 5], [...countyGEOIDs], true, false]
                        });
                        features = countyFeatures;
                    }
                }
                const results = colorFeatures(state.mapboxMap, features, interactiveLayer, state.activeUnit, state.units, state.activeTool, state.geometryKey, state.featureKey, state.columnKeys, state.unitAssignments, state.unitPopulations, state.unitColumnPopulations, state.lockedUnits);
                if (results) {
                    return Object.assign(Object.assign({}, state), { unitAssignments: results.unitAssignments, unitPopulations: results.unitPopulations, unitColumnPopulations: results.unitColumnPopulations, units: results.units, hoveredFeatures: results.hoveredFeatures });
                }
                return Object.assign({}, state);
            }
            if (state.activeTool === 'brush' || state.activeTool === 'eraser') {
                if (!interactiveLayer) {
                    return Object.assign({}, state);
                }
                if (features.length > 0) {
                    features.forEach((feature) => {
                        state.mapboxMap.setFeatureState({
                            // @ts-ignore
                            source: interactiveLayer.source,
                            // @ts-ignore
                            sourceLayer: interactiveLayer.sourceLayer,
                            id: feature.id
                        }, Object.assign(Object.assign({}, feature.state), { hover: true }));
                    });
                }
                return Object.assign(Object.assign({}, state), { hoveredFeatures: features });
            }
            else {
                return Object.assign({}, state);
            }
        }
        case 'set_active_unit': {
            let newActiveUnit = 1;
            if (action.payload === 'next') {
                if (state.activeUnit === Object.keys(state.units).length) {
                    newActiveUnit = 1;
                }
                else {
                    newActiveUnit = state.activeUnit + 1;
                }
            }
            else if (action.payload === 'previous') {
                if (state.activeUnit === 1) {
                    newActiveUnit = Object.keys(state.units).length;
                }
                else {
                    newActiveUnit = state.activeUnit - 1;
                }
            }
            else {
                newActiveUnit = parseInt(action.payload);
            }
            setActiveFeatures(state.mapboxMap, state.interactiveLayerIds[state.activeInteractiveLayer], newActiveUnit);
            return Object.assign(Object.assign({}, state), { activeUnit: newActiveUnit, paintedCountyGEOIDs: new Set() });
        }
        case 'update_unit_name': {
            const newUnits = state.units;
            newUnits[action.payload.unit].name = action.payload.name;
            return Object.assign(Object.assign({}, state), { units: newUnits });
        }
        case 'mouse_left_map': {
            if (state.hoveredFeatures.length > 0) {
                const interactiveLayer = state.mapboxMap.getLayer(state.interactiveLayerIds[state.activeInteractiveLayer]);
                removeHoveredFeatures(state.mapboxMap, state.hoveredFeatures, interactiveLayer);
            }
            return Object.assign(Object.assign({}, state), { hoveredFeatures: [], cursorVisible: false, coloring: false });
        }
        case 'toggle_unit_lock': {
            const unit = state.activeUnit;
            const newLockedUnits = state.lockedUnits;
            if (newLockedUnits.has(unit)) {
                newLockedUnits.delete(unit);
                return Object.assign(Object.assign({}, state), { lockedUnits: newLockedUnits });
            }
            else {
                newLockedUnits.add(unit);
                return Object.assign(Object.assign({}, state), { lockedUnits: newLockedUnits });
            }
        }
        case 'toggle_unit_visibility': {
            const unit = action.payload.unit;
            const newHiddenUnits = state.hiddenUnits;
            if (newHiddenUnits.has(unit)) {
                newHiddenUnits.delete(unit);
            }
            else {
                newHiddenUnits.add(unit);
            }
            const features = state.mapboxMap.queryRenderedFeatures({
                //@ts-ignore
                layers: [state.interactiveLayerIds[state.activeInteractiveLayer]]
            });
            features.forEach((feature) => {
                if (newHiddenUnits.has(feature.state.unit)) {
                    state.mapboxMap.setFeatureState({
                        source: feature.source,
                        sourceLayer: feature.sourceLayer,
                        id: feature.id
                    }, Object.assign(Object.assign({}, feature.state), { hidden: true }));
                }
                else {
                    state.mapboxMap.setFeatureState({
                        source: feature.source,
                        sourceLayer: feature.sourceLayer,
                        id: feature.id
                    }, Object.assign(Object.assign({}, feature.state), { hidden: false }));
                }
            });
            return Object.assign(Object.assign({}, state), { hiddenUnits: newHiddenUnits });
        }
        case 'update_unit_note': {
            const newUnits = state.units;
            newUnits[action.payload.unit].note = action.payload.note;
            return Object.assign(Object.assign({}, state), { units: newUnits });
        }
        case 'map_zoom_ended': {
            return Object.assign(Object.assign({}, state), { zoom: action.payload.zoom, bounds: action.payload.bounds });
        }
        case 'map_move_ended': {
            repaintMapFeatures(state.mapboxMap, state.interactiveLayerIds[state.activeInteractiveLayer], state.unitAssignments, state.geometryKey);
            return Object.assign(Object.assign({}, state), { center: action.payload.center, bounds: action.payload.bounds });
        }
        case 'toggle_paint_by_county': {
            if (!state.paintByCounty) {
                const b = state.initialViewState.bounds;
                state.mapboxMap.setMaxBounds([
                    [b[0][0] - 0.5, b[0][1] - 0.5],
                    [b[1][0] + 0.5, b[1][1] + 0.5]
                ]);
                state.mapboxMap.setZoom(1);
                state.mapboxMap.setMaxZoom(state.mapboxMap.getZoom() + 0.2);
                return Object.assign(Object.assign({}, state), { paintByCounty: !state.paintByCounty });
            }
            state.mapboxMap.setMaxBounds();
            state.mapboxMap.setMaxZoom();
            return Object.assign(Object.assign({}, state), { paintByCounty: !state.paintByCounty });
        }
        case 'set_demo_labels': {
            const layer = state.mapboxMap.getLayer('vtd-centroids');
            if (action.payload.key === state.activeDemoLabel) {
                if (layer) {
                    state.mapboxMap.setLayoutProperty('vtd-centroids', 'visibility', 'none');
                }
                return Object.assign(Object.assign({}, state), { activeDemoLabel: '' });
            }
            // change the text field for the layer
            if (layer) {
                state.mapboxMap.setLayoutProperty('vtd-centroids', 'visibility', 'visible');
                state.mapboxMap.setLayoutProperty('vtd-centroids', 'text-field', ['get', `${action.payload.key}`]);
            }
            return Object.assign(Object.assign({}, state), { activeDemoLabel: action.payload.key });
        }
        case 'set_demo_overlay': {
            const layer = state.mapboxMap.getLayer('demo-density');
            if (action.payload.key === state.activeDemoOverlay) {
                if (layer) {
                    state.mapboxMap.setLayoutProperty('demo-density', 'visibility', 'none');
                }
                return Object.assign(Object.assign({}, state), { activeDemoOverlay: '' });
            }
            const demoStyling = [
                'match',
                ['get', `${action.payload.key}`],
                0,
                '#f7fcf5',
                [1],
                '#e5f5e0',
                [2],
                '#c7e9c0',
                [3],
                '#a1d99b',
                [4],
                '#74c476',
                [5],
                '#41ab5d',
                [6],
                '#238b45',
                [7],
                '#006d2c',
                [8],
                '#00441b',
                [9],
                '#000000',
                '#FFFFFF'
            ];
            if (layer) {
                state.mapboxMap.setLayoutProperty('demo-density', 'visibility', 'visible');
                state.mapboxMap.setPaintProperty('demo-density', 'fill-color', demoStyling);
            }
            return Object.assign(Object.assign({}, state), { activeDemoOverlay: action.payload.key });
        }
        case 'change_active_dataset': {
            const demoLayer = state.mapboxMap.getLayer('demo-density');
            const labelLayer = state.mapboxMap.getLayer('vtd-centroids');
            if (labelLayer) {
                state.mapboxMap.setLayoutProperty('vtd-centroids', 'visibility', 'none');
            }
            if (demoLayer) {
                state.mapboxMap.setLayoutProperty('demo-density', 'visibility', 'none');
            }
            return Object.assign(Object.assign({}, state), { activeDemoOverlay: '', activeDemoLabel: '' });
        }
        default: {
            throw Error('Unknown action: ' + action.type);
        }
    }
};

const Districtr = ({ mapboxContainerId = 'districtr-mapbox', title = 'Districtr Map', mapboxAccessToken, initialViewState = {
    longitude: -95.0,
    latitude: 36.5,
    zoom: 10,
    pitch: 0,
    bearing: 0,
    bounds: [
        [-125, 24],
        [-67, 50]
    ],
    padding: { top: 20, bottom: 20, left: 20, right: 20 },
    fitBoundsOptions: { padding: 20 }
}, mapStyle = 'light-v11', sources, layers, interactiveLayerIds, unitsConfig, columnSets = {}, mapState, setMapState = () => { }, toolsConfig = defaultToolConfig, saveEnabled, compositorData }) => {
    const mapStyleOptions = useRef(defaultMapStyleConfig);
    const mapboxContainerRef = useRef(null);
    const [districtr, districtrDispatch] = useReducer(districtrReducer, {
        mapboxMap: null,
        mapboxAccessToken: mapboxAccessToken,
        mapboxStyle: mapStyleOptions.current[mapStyle].url,
        mapboxContainer: 'districtr-mapbox',
        initialViewState: initialViewState,
        terrain: true,
        satellite: false,
        zoom: initialViewState.zoom,
        center: [initialViewState.longitude, initialViewState.latitude],
        latitude: initialViewState.latitude,
        longitude: initialViewState.longitude,
        bearing: initialViewState.bearing,
        pitch: initialViewState.pitch,
        bounds: initialViewState.bounds,
        tools: toolsConfig,
        activeTool: 'pan',
        units: unitsConfig,
        activeUnit: 1,
        palette: [],
        sources: sources,
        layers: layers,
        coloring: false,
        interactiveLayerIds: interactiveLayerIds,
        activeInteractiveLayer: 0,
        cursorVisible: true,
        unitAssignments: new Map(),
        unitPopulations: new Map(),
        unitColumnPopulations: new Map(),
        columnKeys: [],
        geometryKey: columnSets[interactiveLayerIds[0]].geometryKey,
        featureKey: columnSets[interactiveLayerIds[0]].columnSets[0].total.key,
        populationSum: columnSets[interactiveLayerIds[0]].columnSets[0].total.sum,
        hoveredFeatures: [],
        brushSizeValue: 50,
        brushSize: 100,
        columnSets: columnSets,
        lockedUnits: new Set(),
        hiddenUnits: new Set(),
        compositorData: compositorData,
        paintByCounty: false,
        paintedCountyGEOIDs: new Set(),
        changedFeatures: [],
        changeHistory: [],
        historyIndex: -1,
        events: [
            //['load', () => onLoad()],
            ['click', (e) => onMapClick(e)],
            ['mouseup', (e) => onMapMouseUp()],
            ['touchend', (e) => onMapMouseUp()],
            ['mousedown', (e) => onMapMouseDown()],
            ['touchstart', (e) => onMapMouseDown()],
            ['mouseenter', (e) => onMapMouseEnter()],
            ['mouseover', (e) => onMapMouseOver()],
            ['mouseleave', (e) => onMapMouseLeave(e)],
            ['touchleave', (e) => onMapMouseLeave(e)],
            ['mouseout', (e) => onMapMouseOut(e)],
            ['mousemove', (e) => onMapMouseMove(e)],
            ['touchmove', (e) => onMapMouseMove(e)],
            ['zoom', (e) => onMapZoom(e)],
            ['idle', () => onMapIdle()],
            ['moveend', (e) => onMapMoveEnd(e)],
            ['zoomend', (e) => onMapZoomEnd(e)]
        ]
    }, intializeDistrictrState);
    // const [map, setMap] = useState<MapboxMap>(null)
    const [debug, setDebug] = useState(false);
    const [rightPanel, setRightPanel] = useState('unit');
    const [currentSave, setCurrentSave] = useState(null);
    const [saveLoaded, setSaveLoaded] = useState(false);
    const prevPoint = useRef(null);
    const mousePosition = useRef(null);
    const lastSaved = useRef(null);
    // set map
    // useEffect(() => {
    //   console.log("set map useEffect should only be called once")
    //   mapboxgl.accessToken = mapboxAccessToken
    //   const newMap = new mapboxgl.Map({
    //     container: 'districtr-mapbox',
    //     style: districtr.mapboxStyle,
    //     center: districtr.center,
    //     zoom: districtr.zoom,
    //     attributionControl: false,
    //     pitchWithRotate: false,
    //     dragRotate: false,
    //     preserveDrawingBuffer: true,
    //     cooperativeGestures: false,
    //     dragPan: true,
    //     boxZoom: false,
    //     touchZoomRotate: true,
    //     transformRequest: (url, resourceType) => {
    //       if (resourceType === 'Source' && url.startsWith('http://api.districtr.org')) {
    //         return {
    //           url: url,
    //           headers: {
    //             Authorization: 'Token *FUTURE TOKEN*',
    //             'Access-Control-Allow-Origin': '*'
    //           }
    //         }
    //       }
    //     }
    //   })
    //   console.log("Setting Map to ", newMap);
    //   setMap(newMap)
    // }, [])
    useEffect(() => {
        const keydownCallBack = (e) => {
            if (e.key === 'q') {
                districtrDispatch({ type: 'update_active_tool', payload: { activeTool: 'pan' } });
            }
            if (e.key === 'w') {
                districtrDispatch({ type: 'update_active_tool', payload: { activeTool: 'brush' } });
            }
            if (e.key === 'e') {
                districtrDispatch({ type: 'update_active_tool', payload: { activeTool: 'eraser' } });
            }
            if (e.key === 'a') {
                districtrDispatch({ type: 'set_active_unit', payload: 'previous' });
            }
            if (e.key === 'd') {
                districtrDispatch({ type: 'set_active_unit', payload: 'next' });
            }
        };
        districtrDispatch({ type: 'set_mapbox_map', payload: { mapboxAccessToken, keydownCallBack } });
        districtrDispatch({ type: 'update_active_tool', payload: { activeTool: districtr.activeTool } });
    }, []);
    // useEffect(() => {
    //   if (!districtr.mapboxMap) {
    //     return
    //   }
    //   console.log('i fire once', "main useEffect hook");
    //   // add a keypress listener to the map
    //   districtr.mapboxMap.getCanvas().addEventListener('keydown', (e) => {
    //     if (e.key === 'q') {
    //       districtrDispatch({ type: 'update_active_tool', payload: { activeTool: 'pan' } })
    //     }
    //     if (e.key === 'w') {
    //       districtrDispatch({ type: 'update_active_tool', payload: { activeTool: 'brush' } })
    //     }
    //     if (e.key === 'e') {
    //       districtrDispatch({ type: 'update_active_tool', payload: { activeTool: 'eraser' } })
    //     }
    //     if (e.key === 'a') {
    //       districtrDispatch({ type: 'set_active_unit', payload: 'previous' })
    //     }
    //     if (e.key === 'd') {
    //       districtrDispatch({ type: 'set_active_unit', payload: 'next' })
    //     }
    //   })
    // }, [districtr.mapboxMap])
    useEffect(() => {
        if (!saveLoaded && mapState) {
            setSaveLoaded(true);
            // remove null values from mapState and events
            const mapStateWithoutNulls = Object.keys(mapState).reduce((acc, key) => {
                if (mapState[key] !== null) {
                    acc[key] = mapState[key];
                }
                return acc;
            }, {});
            districtrDispatch({ type: 'load_map_state', payload: { mapState: mapStateWithoutNulls } });
        }
    }, [mapState]);
    useEffect(() => {
        if (!districtr.mapboxMap) {
            return;
        }
        const center = districtr.mapboxMap.getCenter();
        const panOffset = 150;
        if (debug) {
            districtr.mapboxMap.panTo(center, { offset: [-panOffset, 0] });
        }
        else {
            districtr.mapboxMap.panTo(center, { offset: [panOffset, 0] });
        }
    }, [debug]);
    useEffect(() => {
        if (saveEnabled && currentSave && saveLoaded) {
            const mapData = districtr.mapboxMap.getStyle();
            const mapDataString = JSON.stringify(mapData);
            const blob = new Blob([mapDataString], { type: 'application/json' });
            URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.download = 'map.json';
            const image = districtr.mapboxMap.getCanvas().toDataURL();
            const stateData = Object.assign({}, districtr);
            stateData.events = null;
            stateData.mapboxMap = null;
            const saveData = {};
            // for each key in the stateData, if it's a function, remove it
            for (const key in stateData) {
                if (typeof stateData[key] === 'function') {
                    delete stateData[key];
                }
                else {
                    saveData[key] = stateData[key];
                }
            }
            saveData['image'] = image;
            saveData['style'] = mapData;
            setMapState(saveData);
            lastSaved.current = new Date().toISOString();
        }
        setCurrentSave(false);
    }, [currentSave]);
    const throttledZoomDispatch = throttle_1((payload) => districtrDispatch(payload), 100);
    const throttledZoomEndDispatch = throttle_1((payload) => districtrDispatch(payload), 100);
    const throttledMoveEndDispatch = throttle_1((payload) => districtrDispatch(payload), 250);
    const onMapZoom = (e) => {
        // Use the throttled function within onMapZoom
        throttledZoomDispatch({ type: 'update_map_zoom', payload: e.target.getZoom() });
    };
    const onMapZoomEnd = (e) => {
        // Use the throttled function within onMapZoomEnd
        throttledZoomEndDispatch({
            type: 'map_zoom_ended',
            payload: { zoom: e.target.getZoom(), bounds: e.target.getBounds() }
        });
    };
    const onMapMoveEnd = (e) => {
        // Use the throttled function within onMapMoveEnd
        throttledMoveEndDispatch({
            type: 'map_move_ended',
            payload: { center: e.target.getCenter(), bounds: e.target.getBounds() }
        });
    };
    const onMapMouseUp = (e) => {
        districtrDispatch({ type: 'mouse_up_on_map', payload: true });
    };
    const onMapMouseDown = (e) => {
        districtrDispatch({ type: 'mouse_down_on_map', payload: true });
    };
    const onMapClick = (e) => {
        mousePosition.current = { x: e.point.x, y: e.point.y };
        const mouseParams = getMouseParameters(e, prevPoint.current);
        districtrDispatch({
            type: 'user_clicked_map',
            payload: { distance: mouseParams.distance, radians: mouseParams.radians, point: mouseParams.point }
        });
        prevPoint.current = mouseParams.point;
    };
    const throttledMoveDispatch = throttle_1((payload) => districtrDispatch(payload), 50);
    const onMapMouseMove = (e) => {
        mousePosition.current = { x: e.point.x, y: e.point.y };
        const cPoint = e.point;
        let pPoint = prevPoint.current;
        if (!pPoint) {
            prevPoint.current = cPoint;
            pPoint = prevPoint.current;
        }
        const dist = Math.sqrt(Math.pow(cPoint.x - pPoint.x, 2) + Math.pow(cPoint.y - pPoint.y, 2));
        const rads = Math.atan2(cPoint.y - pPoint.y, cPoint.x - pPoint.x);
        const offsetFactor = 15;
        // Use the throttled function within onMapMouseMove
        throttledMoveDispatch({
            type: 'user_moved_mouse',
            payload: { distance: dist, radians: rads, offsetFactor: offsetFactor, point: cPoint }
        });
        prevPoint.current = cPoint;
    };
    const onMapMouseEnter = (e) => {
        districtrDispatch({ type: 'update_cursor_visibility', payload: false });
    };
    const onMapMouseOver = (e) => {
        districtrDispatch({ type: 'update_cursor_visibility', payload: true });
    };
    const onMapMouseLeave = (e) => {
        districtrDispatch({ type: 'mouse_left_map', payload: e });
    };
    const onMapMouseOut = (e) => {
        districtrDispatch({ type: 'mouse_left_map', payload: e });
    };
    const throttledSetCurrentSave = throttle_1((value) => setCurrentSave(value), 60000, { trailing: false });
    const onMapIdle = () => {
        throttledSetCurrentSave(true);
    };
    return (React__default.createElement(DistrictrThemeProvider, null,
        React__default.createElement(DistrictrContext.Provider, { value: districtr },
            React__default.createElement(DistrictrDispatchContext.Provider, { value: districtrDispatch }, districtr && (React__default.createElement(DistrictrWrapper, { "data-testid": "Districtr", className: "districtr-wrapper" },
                React__default.createElement(Toolbar, { position: 'left' },
                    React__default.createElement("ul", { className: "d-toolbar-group d-toolbar-group--bottom" },
                        React__default.createElement("li", { className: "d-toolbar-item" }))),
                React__default.createElement("div", { id: "districtr-mapbox", className: "districtr-mapbox", ref: mapboxContainerRef }),
                React__default.createElement(Cursor, { visible: districtr.cursorVisible, size: districtr.brushSize, tool: districtr.activeTool, position: mousePosition.current }),
                React__default.createElement(Toolbar, { position: 'right' },
                    React__default.createElement("ul", { className: "d-toolbar-group d-toolbar-group--top" },
                        React__default.createElement("li", { className: "d-toolbar-item" },
                            React__default.createElement(Button, { accessibilityLabel: "Zoom In", variant: "toolbar", onClick: () => districtr.mapboxMap.zoomIn({ duration: 200 }) },
                                React__default.createElement(BiZoomIn, null))),
                        React__default.createElement("li", { className: "d-toolbar-item" },
                            React__default.createElement(Button, { accessibilityLabel: "Zoom Out", variant: "toolbar", onClick: () => districtr.mapboxMap.zoomOut({ duration: 200 }) },
                                React__default.createElement(BiZoomOut, null))),
                        React__default.createElement("li", { className: "d-toolbar-item" },
                            React__default.createElement(Button, { accessibilityLabel: "Pan To Bounds", variant: "toolbar", onClick: () => {
                                    if (districtr.mapboxMap) {
                                        districtr.mapboxMap.fitBounds(initialViewState.bounds, { duration: 200 });
                                    }
                                } },
                                React__default.createElement(HiArrowsExpand, null)))),
                    React__default.createElement("ul", { className: "d-toolbar-group d-toolbar-group--bottom" },
                        React__default.createElement("li", { className: "d-toolbar-item" },
                            React__default.createElement(Button, { accessibilityLabel: "Unit Properties", variant: "toolbar", pressed: rightPanel === 'unit', onClick: () => (rightPanel === 'unit' ? setRightPanel('') : setRightPanel('unit')) },
                                React__default.createElement(RxGroup, null))),
                        React__default.createElement("li", { className: "d-toolbar-item" },
                            React__default.createElement(Button, { accessibilityLabel: "Layer Control", variant: "toolbar", pressed: rightPanel === 'debug', onClick: () => (rightPanel === 'debug' ? setRightPanel('') : setRightPanel('debug')) },
                                React__default.createElement(RxLayers, null))),
                        React__default.createElement("li", { className: "d-toolbar-item" },
                            React__default.createElement(Button, { accessibilityLabel: "Stitch Tool", variant: "toolbar", pressed: rightPanel === 'stitch', onClick: () => (rightPanel === 'stitch' ? setRightPanel('') : setRightPanel('stitch')) },
                                React__default.createElement(GiSewingNeedle, null)))),
                    React__default.createElement("ul", { className: "d-toolbar-group d-toolbar-group--bottom" })),
                rightPanel === 'debug' && (React__default.createElement(DebugPanel, { map: districtr.mapboxMap, layers: districtr.layers, units: districtr.units, activeUnit: districtr.activeUnit, sumPopulation: districtr.populationSum, title: title })),
                rightPanel === 'unit' && React__default.createElement(UnitProperties, null),
                rightPanel === 'stitch' && React__default.createElement(SplitStitcher, { foo: 'foo' })))))));
};

const generateUnits = (unitsConfig, unitCount, totalMembers, unitName, unitNamePlural, unitType, sumPopulation) => {
    if (unitsConfig) {
        // for now return it if it exists but we should check that it is valid and try and fix/fill missing values if it is not
        return unitsConfig;
    }
    // if units is empty generate units
    let units = {};
    const idealPopulation = Math.round(sumPopulation / totalMembers);
    const populationPerMember = Math.floor(sumPopulation / totalMembers);
    const populationPerMemberRemainder = sumPopulation % totalMembers;
    const membersPerUnit = Math.floor(totalMembers / unitCount);
    const membersPerUnitRemainder = totalMembers % unitCount;
    const colorScheme = getColorScheme(unitCount);
    const hoverColorScheme = getHoverColorScheme(unitCount);
    const selectedColorScheme = getSelectedColorScheme(unitCount);
    for (let i = 0; i < unitCount; i++) {
        let members = membersPerUnit;
        if (i < membersPerUnitRemainder) {
            members = membersPerUnit + 1;
        }
        let unitIdealPopulation = populationPerMember * members;
        if (i < populationPerMemberRemainder) {
            unitIdealPopulation = populationPerMember + 1;
        }
        // Intl.NumberFormat
        const convertToOrdinal = (i) => {
            const j = i % 10;
            const k = i % 100;
            if (j === 1 && k !== 11) {
                return i + 'st';
            }
            if (j === 2 && k !== 12) {
                return i + 'nd';
            }
            if (j === 3 && k !== 13) {
                return i + 'rd';
            }
            return i + 'th';
        };
        units[i + 1] = {
            name: `${convertToOrdinal(i + 1)} ${unitName}`,
            type: unitType,
            id: i + 1,
            color: colorScheme[i],
            hoverColor: hoverColorScheme[i],
            selectedColor: selectedColorScheme[i],
            lockedColor: '#e59090',
            disabledColor: '#cdcdcd',
            population: 0,
            idealPopulation: idealPopulation,
            unitIdealPopulation: unitIdealPopulation,
            members: members,
            totalUnits: unitCount,
            note: ''
        };
    }
    return units;
};

export { Button, ColorPicker, Districtr, RangeSlider, Toolbar, generateUnits };
//# sourceMappingURL=index.esm.js.map
