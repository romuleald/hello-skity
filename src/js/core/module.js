/**
 * init
 */

var webmodule = (function () {


    const SELECTOR_INITIALIZED = 'js-module-init';
    let regIsInit = new RegExp(SELECTOR_INITIALIZED);
    /*
     module auto init
     just add .js-module to an HTML elem and a module name
     that will match a file in "modules" folder and it will work

     <h2 class="js-module" data-module="test">desktop/tablette</h2>

     each module can export a ready() (or init()) and a load() function
     */

    /**
     *
     * @param modules {NodeList}
     * @param loadFlag=false {Boolean}
     * @return {{ready: Array, load: Array}}
     */
    var parseModules = function (modules, loadFlag = false) {
        let ready = [];
        let load = [];
        for (let module of modules) {
            if(!regIsInit.test(module.className)){
                let _moduleName = module.getAttribute('data-module');
                try {
                    let _module = require('../modules/' + _moduleName).default;
                    ready.push({module: _module.ready || _module.init, elem: module});
                    loadFlag && load.push({module: _module.load, elem: module});
                }
                catch (e) {
                    console.error(e);
                    console.error('Module not foud', '../modules/' + _moduleName, module);
                }
            }
        }

        exec(ready, true);

        loadFlag && window.addEventListener('load', function () {
            exec(load);
        });
    };

    var init = function () {
        parseModules(document.querySelectorAll('.js-module'), true);
    };

    /**
     *
     * @param modules
     * @param flag=false {Boolean} addClass to mark module has already done
     */
    var exec = function (modules, flag = false) {
        modules.forEach(function (o) {
            let module = o.module;
            if (module) {
                module(o.elem);
                if (flag) {
                    o.elem.className += ' ' + SELECTOR_INITIALIZED;
                }
            }
        });
    };

    return {
        ready: exec,
        init: init,
        parse: parseModules
    }

})();

module.exports = webmodule;