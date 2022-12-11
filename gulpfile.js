const { src, dest, series, watch } = require(`gulp`),
    htmlCompressor = require(`gulp-htmlmin`),
    cssCompressor = require(`gulp-clean-css`),
    babel = require(`gulp-babel`),
    jsCompressor = require(`gulp-uglify`),
    jsValidator = require(`gulp-eslint`),
    htmlValidator = require(`gulp-html`),
    cssValidator = require(`gulp-stylelint`),
    browserSync = require(`browser-sync`),
    reload = browserSync.reload;

let browserChoice = `default`;

async function chrome () {
    browserChoice = `google chrome`;
}


let compressHTML = () => {
    return src([`index.html`])
        .pipe(htmlCompressor({collapseWhitespace: true}))
        .pipe(dest(`prod`));
};
exports.compressHTML = compressHTML;

let compressCSS = () => {
    return src([`styles/main.css`])
        .pipe(cssCompressor({collapseWhitespace: true}))
        .pipe(dest(`prod/styles`));
};

exports.compressCSS = compressCSS;

let validateCSS = () => {
    return src([`styles/main.css`])
        .pipe(cssValidator({
            failAfterError: false,
            reporters: [
                {formatter: `string`, console: true}
            ]
        }));
};
exports.validateCSS = validateCSS;

let validateHTML = () => {
    return src([`*.html`])
        .pipe(htmlValidator());
};
exports.validateHTML = validateHTML;

let validateJS = () => {
    return src([`scripts/main.js`,`*.js`])
        .pipe(jsValidator())
        .pipe(jsValidator.formatEach(`compact`));
};
exports.validateJS = validateJS;


let transpileJSForDev = () => {
    return src(`scripts/main.js`)
        .pipe(babel())
        .pipe(dest(`temp/js`));
};
exports.transpileJSForDev = transpileJSForDev;

let transpileJSForProd = () => {
    return src(`scripts/main.js`)
        .pipe(babel())
        .pipe(jsCompressor())
        .pipe(dest(`prod/js`));
};
exports.transpileJSForProd = transpileJSForProd;

let serve = () => {
    browserSync({
        notify: true,
        reloadDelay: 50,
        browser: browserChoice,
        server: {
            baseDir: [
                `temp`,
                `prod`,
                `.`
            ]
        }
    });

    /*
    testing
    */
    watch(`scripts/main.js` ,series(validateJS, transpileJSForDev)).on(`change`, reload);

    watch(`styles/main.css`,validateCSS).on(`change`, reload);

    watch(`index.html`,validateHTML).on(`change`, reload);

};

exports.chrome = series(chrome, serve);

exports.default = serve;

exports.serve = series(
    validateHTML,
    validateJS,
    validateCSS,
    transpileJSForDev,
    serve
);
exports.build = series(
    compressHTML,
    compressCSS,
    transpileJSForProd
);








