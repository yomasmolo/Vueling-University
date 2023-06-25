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
    createTable($("#apdexTable"), {"supportsControllersDiscrimination": true, "overall": {"data": [1.0, 500, 1500, "Total"], "isController": false}, "titles": ["Apdex", "T (Toleration threshold)", "F (Frustration threshold)", "Label"], "items": [{"data": [1.0, 500, 1500, "/api/v2/location-area/canalave-city-area"], "isController": false}, {"data": [1.0, 500, 1500, "/api/v2/region/johto"], "isController": false}, {"data": [1.0, 500, 1500, "/api/v2/location/canalave-city"], "isController": false}, {"data": [1.0, 500, 1500, "/api/v2/region/hoenn"], "isController": false}, {"data": [1.0, 500, 1500, "/api/v2/location-area/pastoria-city-area"], "isController": false}, {"data": [1.0, 500, 1500, "/api/v2/pal-park-area/mountain"], "isController": false}, {"data": [1.0, 500, 1500, "/api/v2/pal-park-area/sea"], "isController": false}, {"data": [1.0, 500, 1500, "/api/v2/location/pastoria-city"], "isController": false}, {"data": [1.0, 500, 1500, "/api/v2/location/eterna-city"], "isController": false}, {"data": [1.0, 500, 1500, "/api/v2/location-area/eterna-city-area"], "isController": false}, {"data": [1.0, 500, 1500, "/api/v2/pal-park-area/forest"], "isController": false}, {"data": [1.0, 500, 1500, "/api/v2/region/kanto"], "isController": false}]}, function(index, item){
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
    createTable($("#statisticsTable"), {"supportsControllersDiscrimination": true, "overall": {"data": ["Total", 964, 0, 0.0, 26.198132780082982, 18, 253, 22.0, 35.0, 46.0, 134.05000000000007, 16.06880917455661, 152.71876745024338, 2.2453189071042807], "isController": false}, "titles": ["Label", "#Samples", "FAIL", "Error %", "Average", "Min", "Max", "Median", "90th pct", "95th pct", "99th pct", "Transactions/s", "Received", "Sent"], "items": [{"data": ["/api/v2/location-area/canalave-city-area", 81, 0, 0.0, 26.148148148148156, 20, 151, 22.0, 33.8, 46.699999999999974, 151.0, 1.3544923997926457, 21.148838308514907, 0.20370295856256584], "isController": false}, {"data": ["/api/v2/region/johto", 80, 0, 0.0, 24.474999999999994, 18, 55, 21.0, 41.50000000000003, 50.750000000000014, 55.0, 1.3480949732908682, 9.51924221264513, 0.17641086564548472], "isController": false}, {"data": ["/api/v2/location/canalave-city", 81, 0, 0.0, 31.395061728395063, 18, 253, 22.0, 46.999999999999986, 123.89999999999931, 253.0, 1.351982908265456, 2.1284961433018426, 0.19012259647482976], "isController": false}, {"data": ["/api/v2/region/hoenn", 80, 0, 0.0, 25.274999999999995, 18, 136, 21.5, 33.60000000000002, 44.900000000000006, 136.0, 1.3456459941800811, 13.410564740290322, 0.17609039376965904], "isController": false}, {"data": ["/api/v2/location-area/pastoria-city-area", 80, 0, 0.0, 24.5125, 19, 49, 22.0, 31.900000000000006, 42.900000000000006, 49.0, 1.345464942229099, 20.582985754889922, 0.20234531357742308], "isController": false}, {"data": ["/api/v2/pal-park-area/mountain", 80, 0, 0.0, 23.525000000000002, 19, 41, 23.0, 28.0, 32.900000000000006, 41.0, 1.3484585433276586, 24.021261398688626, 0.189626982655452], "isController": false}, {"data": ["/api/v2/pal-park-area/sea", 80, 0, 0.0, 24.91250000000001, 19, 52, 22.0, 37.900000000000006, 47.95, 52.0, 1.345464942229099, 10.507568765872282, 0.18263635446273901], "isController": false}, {"data": ["/api/v2/location/pastoria-city", 80, 0, 0.0, 28.925000000000008, 19, 138, 21.5, 40.0, 51.85000000000001, 138.0, 1.343251003240593, 2.1150956226807933, 0.1888946723307084], "isController": false}, {"data": ["/api/v2/location/eterna-city", 80, 0, 0.0, 30.61249999999998, 19, 142, 21.0, 47.80000000000001, 125.00000000000017, 142.0, 1.346053539279525, 2.224241740699611, 0.18665976814227786], "isController": false}, {"data": ["/api/v2/location-area/eterna-city-area", 80, 0, 0.0, 26.262499999999992, 20, 130, 22.0, 36.50000000000003, 48.0, 130.0, 1.3484585433276586, 19.037429732668095, 0.20016181502519934], "isController": false}, {"data": ["/api/v2/pal-park-area/forest", 81, 0, 0.0, 23.7037037037037, 19, 55, 22.0, 29.799999999999997, 38.39999999999995, 55.0, 1.354515050167224, 16.634158131270905, 0.18783314172240803], "isController": false}, {"data": ["/api/v2/region/kanto", 81, 0, 0.0, 24.617283950617285, 18, 146, 21.0, 26.799999999999997, 41.699999999999974, 146.0, 1.3543112240632682, 12.56411686577271, 0.17722432033640423], "isController": false}]}, function(index, item){
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
