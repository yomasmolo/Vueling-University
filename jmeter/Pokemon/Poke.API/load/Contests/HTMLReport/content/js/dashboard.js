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

    var data = {"OkPercent": 88.93499308437067, "KoPercent": 11.065006915629322};
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
    createTable($("#apdexTable"), {"supportsControllersDiscrimination": true, "overall": {"data": [0.8893499308437067, 500, 1500, "Total"], "isController": false}, "titles": ["Apdex", "T (Toleration threshold)", "F (Frustration threshold)", "Label"], "items": [{"data": [1.0, 500, 1500, "/api/v2/super-contest-effect/2"], "isController": false}, {"data": [0.0, 500, 1500, "/api/v2/super-contest-effect/3"], "isController": false}, {"data": [1.0, 500, 1500, "/api/v2/super-contest-effect/1"], "isController": false}, {"data": [1.0, 500, 1500, "/api/v2/contest-type/cute"], "isController": false}, {"data": [1.0, 500, 1500, "/api/v2/contest-effect/3"], "isController": false}, {"data": [1.0, 500, 1500, "/api/v2/contest-effect/2"], "isController": false}, {"data": [1.0, 500, 1500, "/api/v2/contest-effect/1"], "isController": false}, {"data": [1.0, 500, 1500, "/api/v2/contest-type/cool"], "isController": false}, {"data": [1.0, 500, 1500, "/api/v2/contest-type/beauty"], "isController": false}]}, function(index, item){
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
    createTable($("#statisticsTable"), {"supportsControllersDiscrimination": true, "overall": {"data": ["Total", 723, 80, 11.065006915629322, 26.352697095435673, 17, 203, 22.0, 37.0, 46.0, 154.51999999999998, 12.049598346721776, 19.510287157094762, 1.653932499125029], "isController": false}, "titles": ["Label", "#Samples", "FAIL", "Error %", "Average", "Min", "Max", "Median", "90th pct", "95th pct", "99th pct", "Transactions/s", "Received", "Sent"], "items": [{"data": ["/api/v2/super-contest-effect/2", 80, 0, 0.0, 23.124999999999996, 19, 82, 21.0, 25.0, 30.950000000000003, 82.0, 1.3498920086393087, 2.392531986112986, 0.1898285637149028], "isController": false}, {"data": ["/api/v2/super-contest-effect/3", 80, 80, 100.0, 23.000000000000007, 18, 47, 21.0, 28.600000000000023, 43.0, 47.0, 1.343251003240593, 1.3006677164313178, 0.1888946723307084], "isController": false}, {"data": ["/api/v2/super-contest-effect/1", 81, 0, 0.0, 22.8395061728395, 19, 43, 21.0, 28.599999999999994, 34.599999999999966, 43.0, 1.3542206543727953, 3.1087285842960557, 0.1904372795211743], "isController": false}, {"data": ["/api/v2/contest-type/cute", 80, 0, 0.0, 31.087499999999984, 18, 203, 22.0, 45.80000000000001, 53.900000000000006, 203.0, 1.3404825737265416, 2.2979981777815013, 0.18196003686327078], "isController": false}, {"data": ["/api/v2/contest-effect/3", 80, 0, 0.0, 24.0125, 17, 114, 21.0, 27.0, 43.80000000000001, 114.0, 1.3431382425036096, 1.9567320607098486, 0.18100886471240052], "isController": false}, {"data": ["/api/v2/contest-effect/2", 80, 0, 0.0, 24.549999999999986, 18, 52, 22.0, 36.80000000000001, 39.900000000000006, 52.0, 1.3494821362302216, 2.0517004529199423, 0.18186380351540096], "isController": false}, {"data": ["/api/v2/contest-effect/1", 81, 0, 0.0, 25.81481481481482, 17, 57, 22.0, 44.0, 49.699999999999974, 57.0, 1.3538132406277683, 1.9038488356788286, 0.18244748750647657], "isController": false}, {"data": ["/api/v2/contest-type/cool", 81, 0, 0.0, 31.679012345679013, 19, 157, 22.0, 49.39999999999999, 137.99999999999923, 157.0, 1.3514415376401496, 2.314790072952816, 0.18344763059763747], "isController": false}, {"data": ["/api/v2/contest-type/beauty", 80, 0, 0.0, 31.049999999999994, 19, 164, 21.5, 45.60000000000002, 85.2000000000001, 164.0, 1.346189442509297, 2.3135987745469233, 0.18536397597051846], "isController": false}]}, function(index, item){
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
    createTable($("#errorsTable"), {"supportsControllersDiscrimination": false, "titles": ["Type of error", "Number of errors", "% in errors", "% in all samples"], "items": [{"data": ["404/Not Found", 80, 100.0, 11.065006915629322], "isController": false}]}, function(index, item){
        switch(index){
            case 2:
            case 3:
                item = item.toFixed(2) + '%';
                break;
        }
        return item;
    }, [[1, 1]]);

        // Create top5 errors by sampler
    createTable($("#top5ErrorsBySamplerTable"), {"supportsControllersDiscrimination": false, "overall": {"data": ["Total", 723, 80, "404/Not Found", 80, "", "", "", "", "", "", "", ""], "isController": false}, "titles": ["Sample", "#Samples", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors"], "items": [{"data": [], "isController": false}, {"data": ["/api/v2/super-contest-effect/3", 80, 80, "404/Not Found", 80, "", "", "", "", "", "", "", ""], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}]}, function(index, item){
        return item;
    }, [[0, 0]], 0);

});
