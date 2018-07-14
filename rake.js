"use strict";

function Rake() {

    var bodyTag = document.querySelector("body");

    var cssClassObj = {};

    return {
        reportCssUsage,
        reportCssUsageConsole
    };

    function reportCssUsageConsole() {

        getClassOrIdNames(bodyTag);

        let reportType;

        for (let name in cssClassObj) {

            if (cssClassObj.hasOwnProperty(name)) {

                if (cssClassObj[name].type === "class") {

                    console.log(`class name: '${name}'
                 usage: ${cssClassObj[name].counter}
                 element name: ${cssClassObj[name].elementName}`);
                }
            }
        }

        console.log("--------------------------------------------------");

        for (let name in cssClassObj) {

            if (cssClassObj.hasOwnProperty(name)) {

                if (cssClassObj[name].type === "id") {

                    console.log(`id name: '${name}'
                 usage: ${cssClassObj[name].counter}
                 element name: ${cssClassObj[name].elementName}`);

                }
            }
        }
    }

    function reportCssUsage() {

        getClassOrIdNames(bodyTag);

        var reportDivId = document.createElement("div");
        var reportDivClass = document.createElement("div");

        var headerId = document.createElement("h3");
        var headerClass = document.createElement("h3");

        headerClass.innerText = "CSS class reports:";
        reportDivClass.appendChild(headerClass);

        headerId.innerText = "CSS id reports:";
        reportDivId.appendChild(headerId);

        var ulClass = document.createElement("ul");
        var ulId = document.createElement("ul");

        for (let name in cssClassObj) {

            if (cssClassObj.hasOwnProperty(name)) {

                let p = document.createElement("p");
                let liClass = document.createElement("li");
                let liId = document.createElement("li");
                let reportType;

                if (cssClassObj[name].type === "class") {

                    reportType = "class name:";
                    liClass.appendChild(p);
                    ulClass.appendChild(liClass);

                } else {

                    reportType = "id name:";
                    liId.appendChild(p);
                    ulId.appendChild(liId);
                }


                p.innerHTML = `${reportType} '${name}'
                 usage: ${cssClassObj[name].counter}
                 element name: ${cssClassObj[name].elementName}`;

            }
        }

        reportDivClass.appendChild(ulClass);
        reportDivId.appendChild(ulId);

        bodyTag.appendChild(reportDivClass);
        bodyTag.appendChild(reportDivId);
    }

    function countClassOrId(target, obj, attr) {

        if (!target[attr]) {
            return;
        }

        if (attr === "id") {

            if (target[attr] in obj) {
                obj[target[attr]].counter = obj[target[attr]].counter + 1;
            } else {
                obj[target[attr]] = {
                    counter: 1,
                    elementName: [target.tagName],
                    type: "id"
                }
            }

            return;
        }

        let cssClass = target[attr];
        for (let j = 0; j < cssClass.length; j++) {

            if (cssClass[j] in obj) {
                obj[cssClass[j]].counter = obj[cssClass[j]].counter + 1;
                obj[cssClass[j]].elementName = obj[cssClass[j]].elementName + " " + target.tagName + " ";

            } else {

                obj[cssClass[j]] = {
                    counter: 1,
                    elementName: "" + target.tagName,
                    type: "class"

                }
            }
        }
    }

    function getClassOrIdNames(tag) {

        for (let i = 0; i < tag.children.length; i++) {

            countClassOrId(tag.children[i], cssClassObj, "classList");

            countClassOrId(tag.children[i], cssClassObj, "id");

            if (tag.children[i].hasChildNodes()) {

                getClassOrIdNames(tag.children[i]);

            }
        }
    }
}


