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
    createTable($("#apdexTable"), {"supportsControllersDiscrimination": true, "overall": {"data": [1.0, 500, 1500, "Total"], "isController": false}, "titles": ["Apdex", "T (Toleration threshold)", "F (Frustration threshold)", "Label"], "items": [{"data": [1.0, 500, 1500, "/api/v2/pokedex/kanto"], "isController": false}, {"data": [1.0, 500, 1500, "/api/v2/generation/generation-i"], "isController": false}, {"data": [1.0, 500, 1500, "/api/v2/pokedex/national"], "isController": false}, {"data": [1.0, 500, 1500, "/api/v2/version-group/yellow"], "isController": false}, {"data": [1.0, 500, 1500, "/api/v2/version-group/red-blue"], "isController": false}, {"data": [1.0, 500, 1500, "/api/v2/version/yellow"], "isController": false}, {"data": [1.0, 500, 1500, "/api/v2/generation/generation-ii"], "isController": false}, {"data": [1.0, 500, 1500, "/api/v2/version/red"], "isController": false}, {"data": [1.0, 500, 1500, "/api/v2/pokedex/original-johto"], "isController": false}, {"data": [1.0, 500, 1500, "/api/v2/generation/generation-iii"], "isController": false}, {"data": [1.0, 500, 1500, "/api/v2/version/gold"], "isController": false}, {"data": [1.0, 500, 1500, "/api/v2/version-group/gold-silver"], "isController": false}]}, function(index, item){
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
    createTable($("#statisticsTable"), {"supportsControllersDiscrimination": true, "overall": {"data": ["Total", 964, 0, 0.0, 27.985477178423235, 17, 362, 22.0, 38.0, 49.75, 137.20000000000027, 16.05462569739362, 319.6652803366225, 2.2092805395953032], "isController": false}, "titles": ["Label", "#Samples", "FAIL", "Error %", "Average", "Min", "Max", "Median", "90th pct", "95th pct", "99th pct", "Transactions/s", "Received", "Sent"], "items": [{"data": ["/api/v2/pokedex/kanto", 80, 0, 0.0, 28.712499999999995, 19, 350, 22.0, 34.900000000000006, 54.65000000000002, 350.0, 1.3448768597125325, 25.292812788938388, 0.1773031016222577], "isController": false}, {"data": ["/api/v2/generation/generation-i", 81, 0, 0.0, 31.716049382716022, 19, 215, 22.0, 45.8, 110.99999999999966, 215.0, 1.3514189899394364, 32.809466215568015, 0.19136304056759598], "isController": false}, {"data": ["/api/v2/pokedex/national", 81, 0, 0.0, 37.17283950617285, 24, 229, 28.0, 49.0, 59.29999999999994, 229.0, 1.3534739163853893, 154.2133109094593, 0.18240175826287472], "isController": false}, {"data": ["/api/v2/version-group/yellow", 80, 0, 0.0, 25.7, 18, 145, 21.0, 37.900000000000006, 48.95, 145.0, 1.3424620754463685, 2.237201905247349, 0.1861617331185394], "isController": false}, {"data": ["/api/v2/version-group/red-blue", 81, 0, 0.0, 24.23456790123456, 18, 133, 21.0, 28.0, 40.49999999999996, 133.0, 1.3533382343113012, 2.3325929219157255, 0.19031318920002674], "isController": false}, {"data": ["/api/v2/version/yellow", 80, 0, 0.0, 22.637499999999992, 18, 55, 22.0, 25.900000000000006, 32.0, 55.0, 1.3432058966738865, 2.69797136557867, 0.17839453315200055], "isController": false}, {"data": ["/api/v2/generation/generation-ii", 80, 0, 0.0, 33.8375, 20, 184, 24.0, 51.900000000000006, 115.95, 184.0, 1.3427549975662567, 20.380454024278688, 0.19144748988737642], "isController": false}, {"data": ["/api/v2/version/red", 81, 0, 0.0, 28.864197530864196, 17, 362, 21.0, 39.19999999999999, 49.79999999999998, 362.0, 1.3542206543727953, 2.670056702765285, 0.17588998733552905], "isController": false}, {"data": ["/api/v2/pokedex/original-johto", 80, 0, 0.0, 26.025, 19, 73, 23.0, 38.50000000000003, 43.95, 73.0, 1.341314152540952, 39.90033014142481, 0.18862230270107136], "isController": false}, {"data": ["/api/v2/generation/generation-iii", 80, 0, 0.0, 29.437500000000014, 20, 119, 23.0, 40.0, 58.900000000000006, 119.0, 1.3403702772891013, 33.621532577280725, 0.19241643629052524], "isController": false}, {"data": ["/api/v2/version/gold", 80, 0, 0.0, 23.049999999999994, 18, 49, 21.0, 31.900000000000006, 37.95, 49.0, 1.3415390807103449, 2.6453473747757115, 0.17555296563983028], "isController": false}, {"data": ["/api/v2/version-group/gold-silver", 80, 0, 0.0, 24.31250000000001, 18, 67, 21.0, 37.10000000000005, 52.50000000000003, 67.0, 1.341629073102014, 2.388302828741049, 0.1925971423300743], "isController": false}]}, function(index, item){
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
    createTable($("#top5ErrorsBySamplerTable"), {"supportsControllersDiscrimination": false, "overall": {"data": ["Total", 964, 0, "", "", "", "", "", "", "", "", "", ""], "isController": false}, "titles": ["Sample", "#Samples", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors"], "items": [{"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}]}, function(index, item){
        return item;
    }, [[0, 0]], 0);

});
