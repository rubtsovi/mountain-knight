module.exports = {
    plugins: {
        tailwindcss: {},
        autoprefixer: {},
        'postcss-font-magician': {
            variants: {
                'Lobster': {
                    '400': [],
                },
                'Josefin Sans': {
                    '400': [],
                    '600': [],
                    '700': [],
                }
            },
            foundries: ['google']
        }
    }
}
