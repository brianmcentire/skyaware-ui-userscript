// ==UserScript==
// @name         SkyAware Planes Header Row and Info Block Freeze
// @namespace    https://github.com/brianmcentire
// @version      1.1
// @description  Keep the skyaware table header pinned without jumping and improve table styling
// @author       Brian McEntire
// @homepage     https://github.com/brianmcentire/skyaware-ui-userscript
// @license      MIT
// @match        *://*/skyaware*
// @match        *://*:*/*/skyaware*
// @run-at       document-end
// @grant        none
// ==/UserScript==

/*
 * SkyAware Planes Header Row and Info Block Freeze
 * Copyright (c) 2025 Brian McEntire
 *
 * A Tampermonkey script that enhances the SkyAware interface by:
 * - Making the table header sticky
 * - Hiding scrollbars while maintaining functionality
 * - Preserving the look of SkyAware
 */

(function () {
  "use strict";
  function injectStyles() {
    const css = `
          /* Container styles */
          #planes_table_container {
            max-height: 70vh;
            overflow-y: auto;
            position: relative;
            /* Prevent margin collapsing */
            padding-top: 1px;
            margin-top: -1px;
            background-color: #ffffff;

            /* Hide scrollbar but keep functionality - Firefox */
            scrollbar-width: none;
            /* Hide scrollbar but keep functionality - IE, Edge */
            -ms-overflow-style: none;
          }

          /* Hide scrollbar but keep functionality - Chrome, Safari, Opera */
          #planes_table_container::-webkit-scrollbar {
            display: none;
          }

          /* Also hide horizontal scrollbar in the table wrapper */
          #planes_table {
            scrollbar-width: none;
            -ms-overflow-style: none;
          }

          #planes_table::-webkit-scrollbar {
            display: none;
          }

          /* Table base styles */
          #planes_table_container #tableinfo {
            border-collapse: separate;
            border-spacing: 0;
            text-indent: initial;
            font-size: small;
            background-color: white;
          }

          /* Header styles */
          #planes_table_container .aircraft_table_header {
            position: sticky;
            top: 0;
            z-index: 9999;
            background-color: #002F5D;
            color: #FFFFFF;
            cursor: pointer;
            white-space: nowrap;
            /* Force pixel alignment */
            transform: translateY(0);
            /* Ensure header is on its own layer */
            isolation: isolate;
            margin: 0;
          }

          /* Header cell styles */
          #planes_table_container .aircraft_table_header td {
            font-size: smaller;
            padding: 5px;
            text-align: center;
            vertical-align: inherit;
            unicode-bidi: isolate;
            border: 1px solid #fff;
          }

          /* Force header cells to touch */
          #planes_table_container .aircraft_table_header td + td {
            border-left: 1px solid #fff;
          }

          /* Tbody specific styles */
          #planes_table_container #tableinfo tbody tr {
            background-clip: padding-box;
            border: 1px solid white;
          }

          #planes_table_container #tableinfo tbody td {
            padding: 2px;
            outline: 1px solid white;
            outline-offset: -1px;
          }

          /* Preserve all row background colors */
          #planes_table_container .vPosition { background-color: #E5F6FC; }
          #planes_table_container .uat { background-color: #CDF7D0; }
          #planes_table_container .mlat { background-color: #FDF2E5; }
          #planes_table_container .other { background-color: #CCD5F8; }
          #planes_table_container .tisb { background-color: #FFF3B8; }
          #planes_table_container .squawk7500 { font-weight: bold; background-color: #ff5555; }
          #planes_table_container .squawk7600 { font-weight: bold; background-color: #00ffff; }
          #planes_table_container .squawk7700 { font-weight: bold; background-color: #ffff00; }
          #planes_table_container .selected { background-color: #dddddd; }

          /* Data row styles */
          #planes_table_container .plane_table_row {
            cursor: pointer;
            font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
          }
        `;
    const style = document.createElement("style");
    style.textContent = css;
    document.head.appendChild(style);
  }

  function checkElements() {
    const tableContainerExists = !!document.querySelector(
      "#planes_table_container"
    );
    const tableExists = !!document.querySelector("#tableinfo");
    /*
        console.log('Looking for table container:', tableContainerExists);
        console.log('Looking for table #tableinfo:', tableExists);
*/
    if (tableContainerExists && tableExists) {
      injectStyles();
      observer.disconnect();
    }
  }

  // Observe DOM for dynamic changes
  const observer = new MutationObserver(checkElements);
  observer.observe(document.body, { childList: true, subtree: true });

  // Initial check
  checkElements();
})();
