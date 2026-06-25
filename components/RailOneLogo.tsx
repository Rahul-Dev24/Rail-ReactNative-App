import React from 'react';

export default function RailOneLogo({ logoSize = 30 }: { logoSize?: number }) {

    return (
        <div style={styles.outerWrapper}>
            <div style={{ ...styles.logoContainer, fontSize: `${logoSize}px` }}>

                {/* "R" - Thin weight */}
                <span style={{ ...styles.letter, ...styles.lightWeight }}>R</span>

                {/* "a" - Thin weight with custom relative spacing */}
                <span style={{ ...styles.letter, ...styles.lightWeight, ...styles.spacingAdjust }}>a</span>

                {/* Custom scaled "i" - Scaled relative to the current font size */}
                <div style={styles.iLetterContainer}>
                    <div style={styles.orangeDot} />
                    <div style={styles.iStem} />
                </div>

                {/* "l" - Bold weight with custom relative spacing */}
                <span style={{ ...styles.letter, ...styles.boldWeight, ...styles.lSpacingAdjust }}>l</span>

                {/* "One" - Extra bold weight with custom relative spacing */}
                <span style={{ ...styles.letter, ...styles.boldWeight, ...styles.oneSpacingAdjust }}>One</span>

            </div>
        </div>
    );
}

const styles = {
    outerWrapper: {
        display: 'flex',
        flexDirection: 'column' as const,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F9FAFB',
        width: '100%',
        // padding: '24px',
        boxSizing: 'border-box' as const,
    },
    controls: {
        display: 'flex',
        flexDirection: 'column' as const,
        alignItems: 'center',
        marginBottom: '32px',
        padding: '16px',
        backgroundColor: '#FFFFFF',
        borderRadius: '12px',
        boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
        width: '100%',
        maxWidth: '400px',
    },
    controlLabel: {
        fontFamily: 'sans-serif',
        fontSize: '14px',
        color: '#374151',
        marginBottom: '8px',
    },
    slider: {
        width: '100%',
        cursor: 'pointer',
        accentColor: '#F14D24',
    },
    helperText: {
        fontFamily: 'sans-serif',
        fontSize: '11px',
        color: '#9CA3AF',
        marginTop: '8px',
        textAlign: 'center' as const,
    },
    logoContainer: {
        display: 'flex',
        flexDirection: 'row' as const,
        alignItems: 'baseline' as const, // Ensures perfect vertical alignment
        justifyContent: 'center',
        backgroundColor: '#FFFFFF',
        padding: '0.4em 0.7em',
        borderRadius: '0.2em',
        transition: 'all 0.15s ease-out',
    },
    letter: {
        color: '#333333',
        fontSize: '1em', // Inherits container's fontSize directly
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
        lineHeight: '1',
        userSelect: 'none' as const,
    },
    lightWeight: {
        fontWeight: '300',
    },
    boldWeight: {
        fontWeight: '700',
    },
    /* Relative Spacing & Kerning Adjustments (em units):
      Calculated relative to 1em (72px base) 
    */
    spacingAdjust: {
        marginLeft: '-0.014em', // approx -1px at 72px
    },
    lSpacingAdjust: {
        marginLeft: '0.028em', // approx 2px at 72px
    },
    oneSpacingAdjust: {
        marginLeft: '-0.014em', // approx -1px at 72px
    },
    /* --- Custom "i" construction --- */
    iLetterContainer: {
        display: 'flex',
        flexDirection: 'column' as const,
        alignItems: 'center',
        justifyContent: 'flex-end',
        height: '0.722em', // 52px / 72px -> Scales with parent
        width: '0.194em',  // 14px / 72px
        marginHorizontal: '0.02em',
        position: 'relative' as const,
        bottom: '0.028em', // Baseline nudge relative to parent size
    },
    orangeDot: {
        width: '0.16em',   // 11.5px / 72px
        height: '0.16em',  // 11.5px / 72px
        borderRadius: '50%',
        backgroundColor: '#F14D24',
        position: 'absolute' as const,
        top: '0px',
    },
    iStem: {
        width: '0.118em',  // 8.5px / 72px
        height: '0.472em', // 34px / 72px
        backgroundColor: '#333333',
        position: 'absolute' as const,
        bottom: '0px',
        borderRadius: '0.5px',
    },
};