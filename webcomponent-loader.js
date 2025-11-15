(function(bundleConfig) {
    const body = document.querySelector('body');
    const head = document.querySelector('head');
    const script = Array.prototype.slice.call(document.querySelectorAll('script')).filter(s => s.src.indexOf('./webcomponent-loader.js') >= 0)[0];
    let tpoceConfiguration;
    let url = '';
    function uuidv4() {
        return ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c =>
            (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
        );
    }

    if(script) {
        debugger;
        url = script.src.replace('./webcomponent-loader.js', '');
        try {
            if(window && window['tpoceConfiguration']) {
                tpoceConfiguration = window['tpoceConfiguration'];
                tpoceConfiguration.apiUrl = url;
            }
        } catch(ignored) {/* ignored */}
    }
    if(head && url) {
        const sanitizedUrl = url.replace(/\/$/,'');
        if(tpoceConfiguration && tpoceConfiguration.tenantId && tpoceConfiguration.useAdminUIStyles) {
            const adminStylesLink = document.createElement('link');
            adminStylesLink.setAttribute('rel', 'stylesheet');
            adminStylesLink.setAttribute('href',
                sanitizedUrl + '/api/theme/'+ (tpoceConfiguration.locale||'en')+'/'+
                (tpoceConfiguration.siteId||'default')+'/'+tpoceConfiguration.tenantId+'.'+uuidv4()+'.css');
            head.appendChild(adminStylesLink);
        }
    }

    if(bundleConfig && body) {
        for(const val of ["runtime", "polyfills-es5", "polyfills", "vendor", "main"]) {
            debugger;
            if(bundleConfig[val]) {
                const js = Array.from(new Set(bundleConfig[val]['js'] || []));
                // const css = Array.from(new Set(bundleConfig[val]['css'] || []));
                const noModule = ['polyfills-es5'].indexOf(val) >= 0;
                for(let jsSrc of js) {
                    const script = document.createElement('script');
                    script.setAttribute('defer', '');
                    if(noModule) script.setAttribute('nomodule', '');
                    script.setAttribute('src', url + '/' + jsSrc)
                    body.appendChild(script);
                }

                // for(let cssSrc of css) {
                //     let style = document.createElement('link');
                //     style.setAttribute('rel', 'stylesheet');
                //     style.setAttribute('href', cssSrc);
                //     head.appendChild(style);
                // }
            }
        }
    } else {
        throw new Error('Failed to load Watson Candidate Assistant core library -- could not find head or body tag')
    }
})({"main":{"js":["./main.d801cda3f6b4f73e.js"]},"polyfills":{"js":["./polyfills.27f3a70993215d4e.js"]},"runtime":{"js":["./runtime.57db86dddef8a927.js"]},"scripts":{"js":["./scripts.b312fb1f47250cb8.js"]}})
