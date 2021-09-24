module.exports = {
    mode: "jit",
    purge: ["./src/**/*.{ts,vue,html}"],
    darkMode: false, // or 'media' or 'class'
    theme: {
        gradientColorStops: theme => ({
            ...theme('colors'),
            'transparent-black': 'rgba(0,0,0,.2)',
            'primary': '#c29402',
        }),
        letterSpacing: {
            widest: '0.25em',
            wide: '0.15em',
        },
        extend: {
            fontFamily: {
                lobster: ['Lobster', 'sans-serif']
            },
            backgroundColor: {
                'primary': '#ddbe5c'
            }
        }
    },
    variants: {
        extend: {
            translate: ['group-hover']
        },
    },
    plugins: [],
}
