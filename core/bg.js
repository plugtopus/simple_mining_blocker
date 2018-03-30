var checkKonst = 1;

chrome['runtime'].onMessage.addListener(
    function(request, sender, sendResponse) {
        if (request.newIconPath !== null) {
            chrome['browserAction'].setIcon({
                path: request.newIconPath,
                tabId: sender.tab.id
            });
            chrome['browserAction'].setTitle({
                title: request.newText
            });
        }
    });

chrome['browserAction'].onClicked.addListener(function(tab) {
    chrome['storage']['sync'].get(["shouldCheck"], function(obj) {

        checkKonst = obj.shouldCheck;

        if (checkKonst === 1) {
            checkKonst = 2;
            updateIcon(3);
        } else {
            checkKonst = 1;
            updateIcon(1);
        }

        var saveObj = {};
        saveObj["shouldCheck"] = checkKonst;

        chrome['storage']['sync'].set(saveObj, function() {
            chrome['tabs'].getSelected(null, function(tab) {
                if (!tab.url.includes("chrome://")) {
                    var reload = 'window.location.reload();';
                    chrome['tabs'].executeScript(tab.id, {
                        code: reload
                    });
                }
            });
        });
    });
});

chrome['tabs'].onUpdated.addListener(function(tabId, changeInfo, tab) {
    if (changeInfo.status == "loading") {
        if (checkKonst === 1) {
            updateIcon(0);
        } else {
            updateIcon(3);
        }
    } else if (changeInfo.status == 'complete' && tab.status == 'complete' && tab.url != undefined) {
        chrome['storage']['sync'].get(["shouldCheck"], function(obj) {

            checkKonst = obj.shouldCheck;

            if (checkKonst == null) {
                checkKonst = 1;
            }

            if (checkKonst !== 1) {
                updateIcon(3);
            }

            var saveObj = {};
            saveObj["shouldCheck"] = checkKonst;

            chrome['storage']['sync'].set(saveObj, function() {});
        });
    }
});

function updateIcon(state) {
    if (checkKonst === 1) {
        if (state === 0) {
            chrome['browserAction'].setIcon({
                path: "img/ok.png",
            });
            chrome['browserAction'].setTitle({
                title: "Всё ОК"
            });
        } else if (state === 1) {
            chrome['browserAction'].setIcon({
                path: "img/not_checked.png",
            });
            chrome['browserAction'].setTitle({
                title: "Не проверено(F5)"
            });
        } else if (state === 2) {
            chrome['browserAction'].setIcon({
                path: "img/blocked.png",
            });
            chrome['browserAction'].setTitle({
                title: "Майнинг скрипт найден и остановлен!"
            });
        } else if (state === 4) {
            chrome['browserAction'].setIcon({
                path: "img/in_progress.png",
            });
            chrome['browserAction'].setTitle({
                title: "Поиск..."
            });
        }
    } else {
        chrome['browserAction'].setIcon({
            path: "img/off.png",
        });
        chrome['browserAction'].setTitle({
            title: "Проверка выключена"
        });
    }
}


chrome['webRequest'].onBeforeRequest.addListener(
    function(details) {
        if (checkKonst === 1) {
            updateIcon(2);
            return {
                cancel: true
            };
        } else {
            return {
                cancel: false
            };
        }
    }, {
        urls: ['*://coinhive.com/lib*',
            '*://coin-hive.com/lib*',
            '*://cnhv.co/lib*',
            '*://coinhive.com/captcha*',
            '*://coin-hive.com/captcha*',
            '*://cnhv.co/captcha*',
            '*://*/miner.pr0gramm.com/*',
            '*://miner.pr0gramm.com/*',
            '*://*/coin-have.com/*',
            '*://coin-have.com/*',
            '*://*/hashforcash.us/*',
            '*://hashforcash.us/*',
            '*://*/hashforcash.com/*',
            '*://hashforcash.com/*',
            '*://*/coinerra.com/*',
            '*://coinerra.com/*',
            '*://*/pr0gramm.com/*',
            '*://pr0gramm.com/*',
            '*://minecrunch.co/web/*',
            '*://mine-crunch.co/web/*',
            '*://jsecoin.com/server*',
            '*://*.jsecoin.com/server*',
            '*://*.35.190.24.124.com/server*',
            '*://load.jsecoin.com/*',
            '*://*.load.jsecoin.com/*',
            '*://server.jsecoin.com/*',
            '*://*.server.jsecoin.com/*',
            '*://static.reasedoper.pw/*',
            '*://mataharirama.xyz/*',
            '*://listat.biz/*',
            '*://crypto-loot.com/lib*',
            '*://cryptoloot.com/lib*',
            '*://gus.host/*',
            '*://*/gus.host/*',
            '*://xbasfbno.info/*',
            '*://*/xbasfbno.info/*',
            '*://azvjudwr.info/*',
            '*://*/azvjudwr.info/*',
            '*://jyhfuqoh.info/*',
            '*://*/jyhfuqoh.info/*',
            '*://jroqvbvw.info/*',
            '*://*/jroqvbvw.info/*',
            '*://projectpoi.com/*',
            '*://*/projectpoi.com/*',
            '*://kdowqlpt.info/*',
            '*://*/kdowqlpt.info/*',
            '*://ppoi.org/*',
            '*://*/ppoi.org/*',
            '*://inwemo.com/*',
            '*://*/inwemo.com/*',
            '*://lmodr.biz/*',
            '*://mine-my-traffic.com/*',
            '*://minemytraffic.com/*',
            '*://coinblind.com/lib/*',
            '*://coinnebula.com/lib/*',
            '*://coinlab.biz/*',
            '*://deepc.cc/*',
            '*://*/coinlab.biz/*',
            '*://gridcash.net/*',
            '*://*/gridcash.net/*',
            '*://socketminer.com/*',
            '*://*/socketminer.com/*',
            '*://ad-miner.com/*',
            '*://*/ad-miner.com/*',
            '*://cloudcoins.co/*',
            '*://*/cloudcoins.co/*',
            '*://webmine.cz/*',
            '*://*/webmine.cz/*',
            '*://hashunited.com/*',
            '*://*/hashunited.com/*',
            '*://mineralt.io/*',
            '*://*/mineralt.io/*',
            '*://authedmine.com/*',
            '*://*/authedmine.com/*',
            '*://easyhash.io/*',
            '*://*/easyhash.io/*',
            '*://webminepool.com/*',
            '*://*/webminepool.com/*',
            '*://monerise.com/*',
            '*://*/monerise.com/*',
            '*://coinpirate.cf/*',
            '*://*/coinpirate.cf/*',
            '*://crypto-webminer.com/*',
            '*://*/crypto-webminer.com/*',
            '*://webmine.pro/*',
            '*://*/webmine.pro/*',
            '*://*/monad.network/*',
            "*://adrenali.gq/*",
            "*://axoncoho.tk/*",
            "*://bongdopy.ml/*",
            "*://depttake.ga/*",
            "*://flophous.cf/*",
            "*://huaweiw.tk/*",
            "*://graylegs.ga/*",
            "*://hewnchin.ga/*",
            "*://xiaomi12.ml/*",
            "*://horse91.tk/*",
            "*://junopink.ml/*",
            "*://kippbeak.cf/*",
            "*://oinkinns.tk/*",
            "*://pasoherb.gq/*",
            "*://presjots.ga/*",
            "*://veerebbs.ml/*",
            "*://werekayo.tk/*",
            "*://zincecru.gq/*",
            "*://*/adrenali.gq/*",
            "*://*/axoncoho.tk/*",
            "*://*/bongdopy.ml/*",
            "*://*/depttake.ga/*",
            "*://*/flophous.cf/*",
            "*://*/huaweiw.tk/*",
            "*://*/graylegs.ga/*",
            "*://*/hewnchin.ga/*",
            "*://*/xiaomi12.ml/*",
            "*://*/horse91.tk/*",
            "*://*/junopink.ml/*",
            "*://*/kippbeak.cf/*",
            "*://*/oinkinns.tk/*",
            "*://*/pasoherb.gq/*",
            "*://*/presjots.ga/*",
            "*://*/veerebbs.ml/*",
            "*://*/werekayo.tk/*",
            "*://*/zincecru.gq/*",
            "*://coinimp.com/*",
            "*://*/coinimp.com/*",
            "*://adless.io/*",
            "*://*/adless.io/*",
            '*://monerominer.rocks/scripts/*',
            '*://cdn.cloudcoins.co/javascript/*',
            '*://minero.pw/miner.min.js*'
        ]
    }, ["blocking"]
);