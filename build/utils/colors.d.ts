/**
 * District color scheme given a certain number if units
 */
export declare const getColorScheme: (unitCount: any, colorScheme?: string[]) => any[];
/**
 * Darker colors for when the user hovers over assigned units.
 */
export declare const getHoverColorScheme: (unitCount: any, colorScheme?: string[]) => any[];
/**
 * Brighter colors for when the district is in an active state.
 */
export declare const getSelectedColorScheme: (unitCount: any, colorScheme?: string[]) => any[];
/**
 * Adjusts the color luminance. Use it for shading colors.
 *
 * I got this from stack overflow to find shaded versions of the
 * ColorBrewer colors.
 *
 * @param {string} hex
 * @param {number} lum
 */
export declare function changeColorLuminance(hex: any, lum: any): string;
export declare const getUnitOutlineColor: (units: any) => (string | any[])[];
export declare function getUnitColorProperty(units: any): (string | (string | any[])[] | (string | boolean | string[])[])[];
/**
 * Mapbox color rule for the units layer.
 */
export declare const unitBordersPaintProperty: {
    'line-color': string;
    'line-width': (string | number | string[])[];
    'line-opacity': number;
};
export declare const highlightUnassignedUnitBordersPaintProperty: {
    'line-color': (string | (string | string[])[])[];
    'line-width': (string | number | (string | string[])[])[];
    'line-opacity': (string | number | (string | string[])[])[];
};
export declare const updateUnitsColorScheme: (units: any, colorScheme: any) => {};
