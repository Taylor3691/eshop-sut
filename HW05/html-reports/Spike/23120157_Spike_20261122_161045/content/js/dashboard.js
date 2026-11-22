/*
   Licensed to the Apache Software Foundation (ASF) under one or more
   contributor license agreements.  See the NOTICE file distributed with
   this work for additional information regarding copyright ownership.
   The ASF licenses this file to You under the Apache License, Version 2.0
   (the "License"); you may not use this file except in compliance with
   the License.  You may obtain a copy of the License at

       http://www.apache.org/licenses/LICENSE-2.0

   Unless required by applicable law or agreed to in writing, software
   distributed under the License is distributed on an "AS IS" BASIS,
   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   See the License for the specific language governing permissions and
   limitations under the License.
*/
var showControllersOnly = false;
var seriesFilter = "";
var filtersOnlySampleSeries = true;

/*
 * Add header in statistics table to group metrics by category
 * format
 *
 */
function summaryTableHeader(header) {
    var newRow = header.insertRow(-1);
    newRow.className = "tablesorter-no-sort";
    var cell = document.createElement('th');
    cell.setAttribute("data-sorter", false);
    cell.colSpan = 1;
    cell.innerHTML = "Requests";
    newRow.appendChild(cell);

    cell = document.createElement('th');
    cell.setAttribute("data-sorter", false);
    cell.colSpan = 3;
    cell.innerHTML = "Executions";
    newRow.appendChild(cell);

    cell = document.createElement('th');
    cell.setAttribute("data-sorter", false);
    cell.colSpan = 7;
    cell.innerHTML = "Response Times (ms)";
    newRow.appendChild(cell);

    cell = document.createElement('th');
    cell.setAttribute("data-sorter", false);
    cell.colSpan = 1;
    cell.innerHTML = "Throughput";
    newRow.appendChild(cell);

    cell = document.createElement('th');
    cell.setAttribute("data-sorter", false);
    cell.colSpan = 2;
    cell.innerHTML = "Network (KB/sec)";
    newRow.appendChild(cell);
}

/*
 * Populates the table identified by id parameter with the specified data and
 * format
 *
 */
function createTable(table, info, formatter, defaultSorts, seriesIndex, headerCreator) {
    var tableRef = table[0];

    // Create header and populate it with data.titles array
    var header = tableRef.createTHead();

    // Call callback is available
    if(headerCreator) {
        headerCreator(header);
    }

    var newRow = header.insertRow(-1);
    for (var index = 0; index < info.titles.length; index++) {
        var cell = document.createElement('th');
        cell.innerHTML = info.titles[index];
        newRow.appendChild(cell);
    }

    var tBody;

    // Create overall body if defined
    if(info.overall){
        tBody = document.createElement('tbody');
        tBody.className = "tablesorter-no-sort";
        tableRef.appendChild(tBody);
        var newRow = tBody.insertRow(-1);
        var data = info.overall.data;
        for(var index=0;index < data.length; index++){
            var cell = newRow.insertCell(-1);
            cell.innerHTML = formatter ? formatter(index, data[index]): data[index];
        }
    }

    // Create regular body
    tBody = document.createElement('tbody');
    tableRef.appendChild(tBody);

    var regexp;
    if(seriesFilter) {
        regexp = new RegExp(seriesFilter, 'i');
    }
    // Populate body with data.items array
    for(var index=0; index < info.items.length; index++){
        var item = info.items[index];
        if((!regexp || filtersOnlySampleSeries && !info.supportsControllersDiscrimination || regexp.test(item.data[seriesIndex]))
                &&
                (!showControllersOnly || !info.supportsControllersDiscrimination || item.isController)){
            if(item.data.length > 0) {
                var newRow = tBody.insertRow(-1);
                for(var col=0; col < item.data.length; col++){
                    var cell = newRow.insertCell(-1);
                    cell.innerHTML = formatter ? formatter(col, item.data[col]) : item.data[col];
                }
            }
        }
    }

    // Add support of columns sort
    table.tablesorter({sortList : defaultSorts});
}

$(document).ready(function() {

    // Customize table sorter default options
    $.extend( $.tablesorter.defaults, {
        theme: 'blue',
        cssInfoBlock: "tablesorter-no-sort",
        widthFixed: true,
        widgets: ['zebra']
    });

    var data = {"OkPercent": 100.0, "KoPercent": 0.0};
    var dataset = [
        {
            "label" : "FAIL",
            "data" : data.KoPercent,
            "color" : "#FF6347"
        },
        {
            "label" : "PASS",
            "data" : data.OkPercent,
            "color" : "#9ACD32"
        }];
    $.plot($("#flot-requests-summary"), dataset, {
        series : {
            pie : {
                show : true,
                radius : 1,
                label : {
                    show : true,
                    radius : 3 / 4,
                    formatter : function(label, series) {
                        return '<div style="font-size:8pt;text-align:center;padding:2px;color:white;">'
                            + label
                            + '<br/>'
                            + Math.round10(series.percent, -2)
                            + '%</div>';
                    },
                    background : {
                        opacity : 0.5,
                        color : '#000'
                    }
                }
            }
        },
        legend : {
            show : true
        }
    });

    // Creates APDEX table
    createTable($("#apdexTable"), {"supportsControllersDiscrimination": true, "overall": {"data": [0.9833333333333333, 500, 1500, "Total"], "isController": false}, "titles": ["Apdex", "T (Toleration threshold)", "F (Frustration threshold)", "Label"], "items": [{"data": [1.0, 500, 1500, "Baseline - 1 VU - 03 - Product detail"], "isController": false}, {"data": [1.0, 500, 1500, "Recovery - 1 VU - 01 - Login"], "isController": false}, {"data": [1.0, 500, 1500, "Baseline - 1 VU - 01 - Login"], "isController": false}, {"data": [1.0, 500, 1500, "Spike Peak - 4 VU - 04 - Add item to cart"], "isController": false}, {"data": [1.0, 500, 1500, "Spike Peak - 4 VU - 02 - Search products"], "isController": false}, {"data": [1.0, 500, 1500, "Recovery - 1 VU - 02 - Search products"], "isController": false}, {"data": [1.0, 500, 1500, "Recovery - 1 VU - 04 - Add item to cart"], "isController": false}, {"data": [1.0, 500, 1500, "Spike Peak - 4 VU - 01 - Login"], "isController": false}, {"data": [0.875, 500, 1500, "Spike Peak - 4 VU - 05 - Checkout"], "isController": false}, {"data": [1.0, 500, 1500, "Baseline - 1 VU - 04 - Add item to cart"], "isController": false}, {"data": [1.0, 500, 1500, "Baseline - 1 VU - 05 - Checkout"], "isController": false}, {"data": [1.0, 500, 1500, "Recovery - 1 VU - 03 - Product detail"], "isController": false}, {"data": [1.0, 500, 1500, "Recovery - 1 VU - 05 - Checkout"], "isController": false}, {"data": [1.0, 500, 1500, "Baseline - 1 VU - 02 - Search products"], "isController": false}, {"data": [1.0, 500, 1500, "Spike Peak - 4 VU - 03 - Product detail"], "isController": false}]}, function(index, item){
        switch(index){
            case 0:
                item = item.toFixed(3);
                break;
            case 1:
            case 2:
                item = formatDuration(item);
                break;
        }
        return item;
    }, [[0, 0]], 3);

    // Create statistics table
    createTable($("#statisticsTable"), {"supportsControllersDiscrimination": true, "overall": {"data": ["Total", 30, 0, 0.0, 53.5, 3, 595, 6.0, 270.30000000000035, 462.4499999999998, 595.0, 0.4195217452104601, 0.18083681478114946, 0.11512266641029226], "isController": false}, "titles": ["Label", "#Samples", "FAIL", "Error %", "Average", "Min", "Max", "Median", "90th pct", "95th pct", "99th pct", "Transactions/s", "Received", "Sent"], "items": [{"data": ["Baseline - 1 VU - 03 - Product detail", 1, 0, 0.0, 4.0, 4, 4, 4.0, 4.0, 4.0, 4.0, 250.0, 110.107421875, 31.982421875], "isController": false}, {"data": ["Recovery - 1 VU - 01 - Login", 1, 0, 0.0, 10.0, 10, 10, 10.0, 10.0, 10.0, 10.0, 100.0, 67.96875, 26.3671875], "isController": false}, {"data": ["Baseline - 1 VU - 01 - Login", 1, 0, 0.0, 120.0, 120, 120, 120.0, 120.0, 120.0, 120.0, 8.333333333333334, 5.6640625, 2.197265625], "isController": false}, {"data": ["Spike Peak - 4 VU - 04 - Add item to cart", 4, 0, 0.0, 5.25, 4, 7, 5.0, 7.0, 7.0, 7.0, 2.6143790849673203, 0.7506127450980392, 1.0263480392156863], "isController": false}, {"data": ["Spike Peak - 4 VU - 02 - Search products", 4, 0, 0.0, 7.5, 5, 14, 5.5, 14.0, 14.0, 14.0, 2.616088947024199, 1.1573127861347285, 0.39343525179856115], "isController": false}, {"data": ["Recovery - 1 VU - 02 - Search products", 1, 0, 0.0, 3.0, 3, 3, 3.0, 3.0, 3.0, 3.0, 333.3333333333333, 147.4609375, 50.130208333333336], "isController": false}, {"data": ["Recovery - 1 VU - 04 - Add item to cart", 1, 0, 0.0, 10.0, 10, 10, 10.0, 10.0, 10.0, 10.0, 100.0, 28.7109375, 39.2578125], "isController": false}, {"data": ["Spike Peak - 4 VU - 01 - Login", 4, 0, 0.0, 9.5, 6, 13, 9.5, 13.0, 13.0, 13.0, 2.6212319790301444, 1.781618610747051, 0.6911451507208388], "isController": false}, {"data": ["Spike Peak - 4 VU - 05 - Checkout", 4, 0, 0.0, 321.5, 50, 595, 320.5, 595.0, 595.0, 595.0, 2.5396825396825395, 0.7762896825396826, 1.1111111111111112], "isController": false}, {"data": ["Baseline - 1 VU - 04 - Add item to cart", 1, 0, 0.0, 4.0, 4, 4, 4.0, 4.0, 4.0, 4.0, 250.0, 71.77734375, 98.14453125], "isController": false}, {"data": ["Baseline - 1 VU - 05 - Checkout", 1, 0, 0.0, 19.0, 19, 19, 19.0, 19.0, 19.0, 19.0, 52.63157894736842, 16.087582236842106, 23.026315789473685], "isController": false}, {"data": ["Recovery - 1 VU - 03 - Product detail", 1, 0, 0.0, 5.0, 5, 5, 5.0, 5.0, 5.0, 5.0, 200.0, 88.0859375, 25.5859375], "isController": false}, {"data": ["Recovery - 1 VU - 05 - Checkout", 1, 0, 0.0, 27.0, 27, 27, 27.0, 27.0, 27.0, 27.0, 37.03703703703704, 11.320891203703704, 16.203703703703702], "isController": false}, {"data": ["Baseline - 1 VU - 02 - Search products", 1, 0, 0.0, 5.0, 5, 5, 5.0, 5.0, 5.0, 5.0, 200.0, 88.4765625, 30.078125], "isController": false}, {"data": ["Spike Peak - 4 VU - 03 - Product detail", 4, 0, 0.0, 5.75, 5, 6, 6.0, 6.0, 6.0, 6.0, 2.638522427440633, 1.1620836081794195, 0.3375453496042216], "isController": false}]}, function(index, item){
        switch(index){
            // Errors pct
            case 3:
                item = item.toFixed(2) + '%';
                break;
            // Mean
            case 4:
            // Mean
            case 7:
            // Median
            case 8:
            // Percentile 1
            case 9:
            // Percentile 2
            case 10:
            // Percentile 3
            case 11:
            // Throughput
            case 12:
            // Kbytes/s
            case 13:
            // Sent Kbytes/s
                item = item.toFixed(2);
                break;
        }
        return item;
    }, [[0, 0]], 0, summaryTableHeader);

    // Create error table
    createTable($("#errorsTable"), {"supportsControllersDiscrimination": false, "titles": ["Type of error", "Number of errors", "% in errors", "% in all samples"], "items": []}, function(index, item){
        switch(index){
            case 2:
            case 3:
                item = item.toFixed(2) + '%';
                break;
        }
        return item;
    }, [[1, 1]]);

        // Create top5 errors by sampler
    createTable($("#top5ErrorsBySamplerTable"), {"supportsControllersDiscrimination": false, "overall": {"data": ["Total", 30, 0, "", "", "", "", "", "", "", "", "", ""], "isController": false}, "titles": ["Sample", "#Samples", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors"], "items": [{"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}]}, function(index, item){
        return item;
    }, [[0, 0]], 0);

});
