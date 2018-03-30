var globCheck;

var scriptsRemove = 0;
var addedScript = false;
var isHive = false;

var searchListURLS = ['CoinHive', 'Coin-Hive',
    'jsecoin',
    'mataharirama',
    'minecrunch',
    'coin-have',
    'hashforcash',
    'coinerra',
    'reasedoper',
    'minemytraffic',
    'lmodr',
    'cryptoloot',
    'crypto-loot',
    'listat',
    'monero.worker',
    'scrypt.worker',
    'scrypt.asm',
    'neoscrypt.asm',
    'gus.host',
    'xbasfbno',
    'azvjudwr',
    'jyhfuqoh',
    'miner.pr0gramm',
    'jroqvbvw',
    'projectpoi',
    'kdowqlpt',
    'ppoi',
    'minemytraffic',
    'inwemo',
    'minero',
    'coinblind',
    'coinnebula',
    'coinlab',
    'cloudcoins',
    'deepc',
    'monerominer',
    'gridcash',
    'monad',
    'ad-miner',
    'socketminer',
    'cloudcoins',
    'webmine',
    'mineralt',
    'authedmine',
    'hashunited',
    'webminepool',
    'monerise',
    'coinpirate',
    'crypto-webminer',
    'c-hive',
    'moneta',
    'monkeyminer',
    'cryptonight'
];

var searchListContent = ['miner',
    "\x6d\x69\x6e\x65\x72",
    "\x4d\x69\x6e\x65\x72",
    'CoinHive',
    "\x63\x6f\x69\x6e\x68\x69\x76\x65",
    'Coin-Hive',
    'Coin-Have',
    'hashforcash',
    'coinerra',
    'jsecoin',
    'mataharirama',
    'minecrunch',
    'reasedoper',
    'minemytraffic',
    'cryptoloot',
    'crypto-loot',
    'inwemo',
    'minero',
    'CoinBlind',
    'coinnebula',
    'minemytraffic',
    'cryptonight',
    'coinlab',
    'cloudcoins',
    'monerominer',
    'deepMiner',
    'gridcash',
    'monad',
    'ad-miner',
    'socketminer',
    'cloudcoins',
    'webmine',
    'mineralt',
    'authedmine',
    'webminepool',
    'monerise',
    'coinpirate',
    'crypto-webminer',
    'c-hive',
    'moneta',
    'CRLT.Anonymous',
    'hashunited'
];

function checkPageForMiningScrpits() {
    try {
        chrome['storage']['sync'].get(["shouldCheck"], function(obj) {
            globCheck = obj.shouldCheck;

            if (globCheck !== 2) {
                updateIcon(4);
                deleteElementsBeforeLoading();
                recheck();
            } else {
                updateIcon(0);
            }
        });
    } catch (e) {}
}

function deleteElementsBeforeLoading() {
    var mutatObs = new MutationObserver(process);
    mutatObs.observe(document, {
        subtree: true,
        childList: true
    });
    document.addEventListener('DOMContentLoaded', function() {
        mutatObs.disconnect();
    }, false);

    function process(mutats) {
        for (var i = 0; i < mutats.length; i++) {
            var nodes = mutats[i].addedNodes;
            for (var o = 0; o < nodes.length; o++) {
                var no = nodes[o];
                if (no.nodeType !== 1)
                    continue;
                window.searchListURLS.forEach(function(searchFor) {
                    if (no.matches('script') && no.src.toUpperCase().includes(searchFor.toUpperCase())) {
                        doDelete([no]);
                        console.log("Майнинг обнаружен и остановлен: " + searchFor);
                    } else if (no.matches('script')) {
                        var currentContext = no.innerText.toString();
                        currentContext = currentContext.replace(/(\r\n|\n|\r)/gm, "");
                        currentContext = currentContext.replace(/ /g, "");

                        if (currentContext.toUpperCase().includes(searchFor.toUpperCase() + ".")) {
                            doDelete([no]);
                            console.log("Майнинг обнаружен и остановлен: " + searchFor);
                        } else if (currentContext.toUpperCase().includes(searchFor.toUpperCase() + "/")) {
                            doDelete([no]);
                            console.log("Майнинг обнаружен и остановлен: " + searchFor);
                        } else if (currentContext.toUpperCase().includes(searchFor.toUpperCase() + "(")) {
                            doDelete([no]);
                            console.log("Майнинг обнаружен и остановлен: " + searchFor);
                        } else if (currentContext.toUpperCase().includes(searchFor.toUpperCase() + "-")) {
                            doDelete([no]);
                            console.log("Майнинг обнаружен и остановлен: " + searchFor);
                        } else if (currentContext.toUpperCase().includes(searchFor.toUpperCase() + "[")) {
                            doDelete([no]);
                            console.log("Майнинг обнаружен и остановлен: " + searchFor);
                        }
                    }
                });
            }
        }
    }

    function doDelete(nodes) {
        [].forEach.call(nodes, function(node) {
            window.scriptsRemove++;
            node.remove();
        });
    }
}

function recheck() {
    document.addEventListener('DOMContentLoaded', function() {
        checkForRunningMiner();
    }, false);
}

function checkForRunningMiner() {
    var scripts = document.getElementsByTagName("script");
    var sl = scripts.length;

    for (var i = 0; i < sl; i++) {
        try {
            var currentContext = scripts[i].textContent;
            currentContext = currentContext.replace(/(\r\n|\n|\r)/gm, "");
            currentContext = currentContext.replace(/ /g, "");

            window.searchListContent.forEach(function(searchFor) {

                if (currentContext.toUpperCase().includes(searchFor.toUpperCase() + ".")) {
                    killMiner(currentContext, searchFor);
                    console.log("Майнинг обнаружен и остановлен: " + searchFor);
                } else if (currentContext.toUpperCase().includes(searchFor.toUpperCase() + "/")) {
                    killMiner(currentContext, searchFor);
                    console.log("Майнинг обнаружен и остановлен: " + searchFor);
                } else if (currentContext.toUpperCase().includes(searchFor.toUpperCase() + "(")) {
                    killMiner(currentContext, searchFor);
                    console.log("Майнинг обнаружен и остановлен: " + searchFor);
                } else if (currentContext.toUpperCase().includes(searchFor.toUpperCase() + "-")) {
                    killMiner(currentContext, searchFor);
                    console.log("Майнинг обнаружен и остановлен: " + searchFor);
                } else if (currentContext.toUpperCase().includes(searchFor.toUpperCase() + "[")) {
                    killMiner(currentContext, searchFor);
                    console.log("Майнинг обнаружен и остановлен: " + searchFor);
                }
            });
        } catch (e) {}
    }

    if (window.scriptsRemove === 0 && !window.isHive) {
        updateIcon(0);
    } else {
        updateIcon(2);
    }

}

function killMiner(currentContext, searchFor) {
    try {
        var cleanScriptSplit = currentContext.split("new" + searchFor);

        var whereIsTheName = cleanScriptSplit[0];

        var startLoc = whereIsTheName.lastIndexOf("var") + 3;
        var endLoc = whereIsTheName.lastIndexOf("=");

        var varName = whereIsTheName.substring(startLoc, endLoc);

        if (window.globCheck !== 2) {
            window.isHive = true;
            if (!varName.includes(";")) {
                console.log("Майнинг обнаружен и остановлен: " + searchFor);
                addScript("try{if(window." + varName + ".isRunning){window." + varName + ".stop();}}catch(e){}");
                addScript("try{window." + varName + " = null;}catch(e){}");
                updateIcon(2);
            }
        }
    } catch (e) {}
}

function addScript(callStopper) {
    var script = document.createElement("script");
    var scriptContent = document.createTextNode(callStopper);
    script.appendChild(scriptContent);
    document.head.appendChild(script);
}

function updateIcon(state) {
    if (window.globCheck === 1) {
        if (state === 0) {
            chrome.runtime.sendMessage({
                "newIconPath": "img/ok.png",
                "newText": "Всё ОК"
            });
        } else if (state === 1) {
            chrome.runtime.sendMessage({
                "newIconPath": "img/not_checked.png",
                "newText": "Не проверено(F5)"
            });
        } else if (state === 2) {
            chrome.runtime.sendMessage({
                "newIconPath": "img/blocked.png",
                "newText": "Майнинг скрипт найден и остановлен!"
            });
        } else if (state === 4) {
            chrome.runtime.sendMessage({
                "newIconPath": "img/in_progress.png",
                "newText": "Поиск..."
            });
        }
    } else {
        chrome.runtime.sendMessage({
            "newIconPath": "img/off.png",
            "newText": "Проверка выключена"
        });
    }
}

checkPageForMiningScrpits();