// ==UserScript==
// @name         SkyAware Info Block and Planes Header Freeze
// @namespace    https://github.com/brianmcentire
// @version      1.6
// @description  Enhanced SkyAware interface by keeping info block and planes table headers visible while scrolling
// @author       Brian McEntire
// @homepage     https://github.com/brianmcentire/skyaware-ui-userscript
// @license      MIT
// @match        *://*/skyaware*
// @match        *://*:*/*/skyaware*
// @run-at       document-end
// @grant        none
// ==/UserScript==

/*
 * SkyAware Enhanced UI
 * Copyright (c) 2025 Brian McEntire
 */

(function() {
    "use strict";

    function injectStyles() {
        const css = `
            /* Container styles */
            #planes_table_container {
                height: calc(100vh - 220px);
                position: relative;
                background-color: #ffffff;
                display: flex;
                flex-direction: column;
                overflow: hidden;
            }

            /* Optimize sidebar container */
            #sidebar_container {
                height: calc(100vh - 60px) !important;
                overflow: hidden !important;
            }

            #sidebar_canvas {
                height: 100%;
                overflow: hidden;
            }

            /* Table wrapper styles */
            #planes_table {
                flex: 1 1 auto;
                overflow-x: auto;
                overflow-y: auto;
                position: relative;
                scrollbar-width: none;
                -ms-overflow-style: none;
            }

            #planes_table::-webkit-scrollbar {
                display: none;
            }

            /* Table base styles */
            #tableinfo {
                border-collapse: separate;
                border-spacing: 0;
                text-indent: initial;
                font-size: small;
                background-color: white;
                width: 100%;
            }

            /* Header styles */
            .aircraft_table_header {
                position: sticky;
                top: 0;
                z-index: 89;
                background-color: #002F5D;
                color: #FFFFFF;
                cursor: pointer;
                white-space: nowrap;
                transform: translateY(0);
                isolation: isolate;
            }

            .aircraft_table_header td {
                font-size: smaller;
                padding: 5px;
                text-align: center;
                border: 1px solid #fff;
            }

            .aircraft_table_header td + td {
                border-left: 1px solid #fff;
            }

            /* Panel styles */
            #filter_panel, #column_select_panel {
                position: relative;
                z-index: 88;
                background: white;
                margin-bottom: 10px;
            }

            /* Tbody specific styles */
            #tableinfo tbody tr {
                background-clip: padding-box;
                border: 1px solid white;
            }

            #tableinfo tbody td {
                padding: 2px;
                outline: 1px solid white;
                outline-offset: -1px;
            }

            /* Row background colors */
            .vPosition { background-color: #E5F6FC; }
            .uat { background-color: #CDF7D0; }
            .mlat { background-color: #FDF2E5; }
            .other { background-color: #CCD5F8; }
            .tisb { background-color: #FFF3B8; }
            .squawk7500 { font-weight: bold; background-color: #ff5555; }
            .squawk7600 { font-weight: bold; background-color: #00ffff; }
            .squawk7700 { font-weight: bold; background-color: #ffff00; }
            .selected { background-color: #dddddd; }

            .plane_table_row {
                cursor: pointer;
                font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
            }

            /* Legend container */
            #planes_table_container > div:nth-child(2) {
                flex: 0 0 auto;
                background: white;
                padding: 5px 0;
                z-index: 87;
                border-top: 1px solid #eee;
            }

            .legend {
                display: flex !important;
                align-items: center;
                justify-content: flex-end;
                min-height: 25px;
                padding: 5px 10px;
                background: white;
            }

            /* Info block styles */
            #selected_infoblock {
                position: sticky !important;
                bottom: 0;
                background: white;
                z-index: 86;
            }
        `;

        const style = document.createElement("style");
        style.textContent = css;
        document.head.appendChild(style);
    }

    function setupDynamicTableHeight() {
        const filterPanel = document.querySelector("#filter_panel");
        const columnSelectPanel = document.querySelector("#column_select_panel");
        const planesTableContainer = document.querySelector("#planes_table_container");

        function updateTableHeight() {
            const filterPanelHeight = filterPanel.style.display !== 'none' ? filterPanel.offsetHeight + 10 : 0;
            const columnSelectPanelHeight = columnSelectPanel.style.display !== 'none' ? columnSelectPanel.offsetHeight + 10 : 0;
            const totalPanelHeight = filterPanelHeight + columnSelectPanelHeight;

            planesTableContainer.style.height = `calc(100vh - 220px - ${totalPanelHeight}px)`;
        }

        const panelObserver = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                if (mutation.type === 'attributes' && mutation.attributeName === 'style') {
                    // Removed setTimeout to make changes immediate
                    updateTableHeight();
                }
            });
        });

        panelObserver.observe(filterPanel, { attributes: true });
        panelObserver.observe(columnSelectPanel, { attributes: true });

        updateTableHeight();

        window.addEventListener('resize', updateTableHeight); // Removed setTimeout here too
    }

    function checkElements() {
        const requiredElements = [
            "#planes_table_container",
            "#tableinfo",
            "#filter_panel",
            "#column_select_panel",
            ".legend",
            "#sidebar_container"
        ];

        const allElementsExist = requiredElements.every(selector =>
            !!document.querySelector(selector)
        );

        if (allElementsExist) {
            injectStyles();
            setupDynamicTableHeight();
            observer.disconnect();
        }
    }

    // Observe DOM for dynamic changes
    const observer = new MutationObserver(checkElements);
    observer.observe(document.body, { childList: true, subtree: true });

    // Initial check
    checkElements();
})();// ==UserScript==
// @name         New Userscript
// @namespace    http://tampermonkey.net/
// @version      2025-01-18
// @description  try to take over the world!
// @author       You
// @match        http://*/*
// @icon         data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // Your code here...
})();