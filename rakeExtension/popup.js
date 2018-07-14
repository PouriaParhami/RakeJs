"use strict";

(function () {

    chrome.tabs.query({active: true, currentWindow: true}, function (tabs) {
        chrome.tabs.executeScript(
            tabs[0].id,
            {file: 'rakeExtensionVersion.js'});
    });

    chrome.runtime.onMessage.addListener(
        function (request, sender, sendResponse) {

            if (request.greeting == "objCreated") {

                chrome.storage.local.get(['key'], function (result) {

                    (function reportCssUsage() {

                        var bodyTag = document.querySelector("body");

                        var divWraper = document.createElement("div");

                        var reportDivId = document.createElement("section");
                        var reportDivClass = document.createElement("section");

                        var headerId = document.createElement("p");
                        headerId.setAttribute("style", "font-size: 30px;");

                        var headerClass = document.createElement("p");
                        headerClass.setAttribute("style", "font-size: 30px;");

                        headerClass.innerText = "CSS class reports:";
                        reportDivClass.appendChild(headerClass);

                        headerId.innerText = "CSS id reports:";
                        reportDivId.appendChild(headerId);

                        var ulClass = document.createElement("ul");
                        var ulId = document.createElement("ul");

                        for (let name in result.key) {

                            if (result.key.hasOwnProperty(name)) {

                                let p = document.createElement("p");
                                let liClass = document.createElement("li");
                                let liId = document.createElement("li");
                                let reportType;

                                if (result.key[name].type === "class") {

                                    reportType = "class name:";
                                    liClass.appendChild(p);
                                    ulClass.appendChild(liClass);

                                } else {

                                    reportType = "id name:";
                                    liId.appendChild(p);
                                    ulId.appendChild(liId);
                                }

                                p.innerHTML = `${reportType} '${name}'
                 usage: ${result.key[name].counter}
                 element name: ${result.key[name].elementName}`;
                            }
                        }

                        reportDivClass.appendChild(ulClass);
                        reportDivId.appendChild(ulId);

                        reportDivId.setAttribute("style", "float: right; width:250px; position: relative;");
                        reportDivClass.setAttribute("style", "float: left; width:250px; position: relative;");

                        divWraper.setAttribute("style", "width:500px;");
                        divWraper.appendChild(reportDivClass);
                        divWraper.appendChild(reportDivId);

                        bodyTag.appendChild(divWraper);

                    })();

                });

            }

        });

})();
