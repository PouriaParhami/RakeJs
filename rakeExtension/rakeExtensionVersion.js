"use strict";

(function Rake() {

    var bodyTag = document.querySelector("body");

    var cssClassObj = {};

    /*   function reportCssUsage() {

           getClassOrIdNames(bodyTag);

           var divWraper = document.createElement("div");

           var reportDivId = document.createElement("section");
           var reportDivClass = document.createElement("section");

           var headerId = document.createElement("h3");
           headerId.setAttribute("style", "font-size: 30px;");

           var headerClass = document.createElement("h3");
           headerClass.setAttribute("style", "font-size: 30px;");

           headerClass.innerText = "CSS class reports:";
           reportDivClass.appendChild(headerClass);

           headerId.innerText = "CSS id reports:";
           reportDivId.appendChild(headerId);

           var ulClass = document.createElement("ul");
           ulClass.setAttribute("style", "list-style: disc;");

           var ulId = document.createElement("ul");
           ulId.setAttribute("style", "list-style: disc;");

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

           reportDivClass.setAttribute("style", "padding: 10px;");
           reportDivId.setAttribute("style", "padding: 10px;");

           divWraper.appendChild(reportDivClass);
           divWraper.appendChild(reportDivId);

           bodyTag.appendChild(divWraper);

       }*/

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

    getClassOrIdNames(bodyTag);

    chrome.storage.local.set({key: cssClassObj}, function () {
        console.log(" in the set storage: "+cssClassObj);
        chrome.runtime.sendMessage({greeting: "objCreated"}, function (response) {
            console.log("done");
        });

    });

})();




