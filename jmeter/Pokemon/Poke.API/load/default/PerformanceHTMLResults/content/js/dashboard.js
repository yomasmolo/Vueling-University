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

    var data = {"OkPercent": 97.6303317535545, "KoPercent": 2.3696682464454977};
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
    createTable($("#apdexTable"), {"supportsControllersDiscrimination": true, "overall": {"data": [0.976303317535545, 500, 1500, "Total"], "isController": false}, "titles": ["Apdex", "T (Toleration threshold)", "F (Frustration threshold)", "Label"], "items": [{"data": [1.0, 500, 1500, "/api/v2/region/johto"], "isController": false}, {"data": [1.0, 500, 1500, "/api/v2/super-contest-effect/2"], "isController": false}, {"data": [0.0, 500, 1500, "/api/v2/super-contest-effect/3"], "isController": false}, {"data": [1.0, 500, 1500, "/api/v2/berry/razz"], "isController": false}, {"data": [1.0, 500, 1500, "/api/v2/super-contest-effect/1"], "isController": false}, {"data": [1.0, 500, 1500, "/api/v2/berry-flavor/dry"], "isController": false}, {"data": [1.0, 500, 1500, "/api/v2/pokedex/original-johto"], "isController": false}, {"data": [1.0, 500, 1500, "/api/v2/pal-park-area/mountain"], "isController": false}, {"data": [1.0, 500, 1500, "/api/v2/contest-effect/3"], "isController": false}, {"data": [1.0, 500, 1500, "/api/v2/contest-effect/2"], "isController": false}, {"data": [1.0, 500, 1500, "/api/v2/contest-effect/1"], "isController": false}, {"data": [1.0, 500, 1500, "/api/v2/location-area/eterna-city-area"], "isController": false}, {"data": [1.0, 500, 1500, "/api/v2/location-area/canalave-city-area"], "isController": false}, {"data": [1.0, 500, 1500, "/api/v2/pokedex/national"], "isController": false}, {"data": [1.0, 500, 1500, "/api/v2/location/canalave-city"], "isController": false}, {"data": [1.0, 500, 1500, "/api/v2/berry-firmness/soft"], "isController": false}, {"data": [1.0, 500, 1500, "/api/v2/generation/generation-ii"], "isController": false}, {"data": [1.0, 500, 1500, "/api/v2/contest-type/cute"], "isController": false}, {"data": [1.0, 500, 1500, "/api/v2/berry-firmness/hard"], "isController": false}, {"data": [1.0, 500, 1500, "/api/v2/berry-firmness/very-soft"], "isController": false}, {"data": [1.0, 500, 1500, "/api/v2/location/pastoria-city"], "isController": false}, {"data": [1.0, 500, 1500, "/api/v2/contest-type/beauty"], "isController": false}, {"data": [1.0, 500, 1500, "/api/v2/berry-flavor/sweet"], "isController": false}, {"data": [1.0, 500, 1500, "/api/v2/berry-flavor/spicy"], "isController": false}, {"data": [1.0, 500, 1500, "/api/v2/pokedex/kanto"], "isController": false}, {"data": [1.0, 500, 1500, "/api/v2/berry/iapapa"], "isController": false}, {"data": [1.0, 500, 1500, "/api/v2/version-group/yellow"], "isController": false}, {"data": [1.0, 500, 1500, "/api/v2/version-group/red-blue"], "isController": false}, {"data": [1.0, 500, 1500, "/api/v2/version/yellow"], "isController": false}, {"data": [1.0, 500, 1500, "/api/v2/version/red"], "isController": false}, {"data": [1.0, 500, 1500, "/api/v2/region/hoenn"], "isController": false}, {"data": [1.0, 500, 1500, "/api/v2/location-area/pastoria-city-area"], "isController": false}, {"data": [1.0, 500, 1500, "/api/v2/location/eterna-city"], "isController": false}, {"data": [1.0, 500, 1500, "/api/v2/berry/pinap"], "isController": false}, {"data": [1.0, 500, 1500, "/api/v2/version/gold"], "isController": false}, {"data": [1.0, 500, 1500, "/api/v2/generation/generation-i"], "isController": false}, {"data": [1.0, 500, 1500, "/api/v2/pal-park-area/sea"], "isController": false}, {"data": [1.0, 500, 1500, "/api/v2/generation/generation-iii"], "isController": false}, {"data": [1.0, 500, 1500, "/api/v2/pal-park-area/forest"], "isController": false}, {"data": [1.0, 500, 1500, "/api/v2/contest-type/cool"], "isController": false}, {"data": [1.0, 500, 1500, "/api/v2/version-group/gold-silver"], "isController": false}, {"data": [1.0, 500, 1500, "/api/v2/region/kanto"], "isController": false}]}, function(index, item){
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
    createTable($("#statisticsTable"), {"supportsControllersDiscrimination": true, "overall": {"data": ["Total", 3376, 80, 2.3696682464454977, 24.473045023696677, 17, 205, 21.0, 32.0, 42.0, 56.0, 56.311716039498265, 526.4637979915183, 7.748500232477649], "isController": false}, "titles": ["Label", "#Samples", "FAIL", "Error %", "Average", "Min", "Max", "Median", "90th pct", "95th pct", "99th pct", "Transactions/s", "Received", "Sent"], "items": [{"data": ["/api/v2/region/johto", 80, 0, 0.0, 24.099999999999998, 18, 61, 21.0, 33.900000000000006, 47.95, 61.0, 1.358626428680604, 9.594469912793166, 0.1777890053156259], "isController": false}, {"data": ["/api/v2/super-contest-effect/2", 80, 0, 0.0, 23.062500000000007, 17, 57, 22.0, 26.900000000000006, 38.900000000000006, 57.0, 1.3598966478547632, 2.426831185829877, 0.19123546610457604], "isController": false}, {"data": ["/api/v2/super-contest-effect/3", 80, 80, 100.0, 23.75, 18, 71, 20.5, 30.900000000000006, 44.95, 71.0, 1.3525393927098126, 1.310668788462839, 0.1902008520998174], "isController": false}, {"data": ["/api/v2/berry/razz", 81, 0, 0.0, 31.580246913580257, 18, 203, 21.0, 49.8, 52.0, 203.0, 1.3520280420630946, 2.5634317361458856, 0.1742848647971958], "isController": false}, {"data": ["/api/v2/super-contest-effect/1", 81, 0, 0.0, 23.629629629629633, 18, 51, 22.0, 30.0, 41.79999999999998, 51.0, 1.3653603034134008, 3.133312921407501, 0.19200379266750947], "isController": false}, {"data": ["/api/v2/berry-flavor/dry", 80, 0, 0.0, 23.73749999999999, 18, 53, 21.0, 31.700000000000017, 40.900000000000006, 53.0, 1.3598735317615462, 5.584246290095021, 0.18326420642880212], "isController": false}, {"data": ["/api/v2/pokedex/original-johto", 80, 0, 0.0, 24.337499999999995, 20, 47, 22.0, 29.0, 40.0, 47.0, 1.3523793424055448, 40.22432130103119, 0.19017834502577974], "isController": false}, {"data": ["/api/v2/pal-park-area/mountain", 80, 0, 0.0, 24.175000000000004, 19, 56, 22.0, 33.70000000000002, 40.0, 56.0, 1.358580283603634, 24.201369724887492, 0.19105035238176107], "isController": false}, {"data": ["/api/v2/contest-effect/3", 80, 0, 0.0, 23.262500000000006, 18, 63, 21.0, 28.900000000000006, 39.80000000000001, 63.0, 1.3523793424055448, 1.971152322288902, 0.18225424731637224], "isController": false}, {"data": ["/api/v2/contest-effect/2", 80, 0, 0.0, 22.025000000000002, 18, 53, 20.0, 25.900000000000006, 33.900000000000006, 53.0, 1.3599660008499788, 2.068868200169996, 0.1832766680832979], "isController": false}, {"data": ["/api/v2/contest-effect/1", 81, 0, 0.0, 24.20987654320988, 18, 53, 21.0, 37.999999999999986, 44.79999999999998, 53.0, 1.3652222278404207, 1.9090298231531575, 0.18398502679880668], "isController": false}, {"data": ["/api/v2/location-area/eterna-city-area", 80, 0, 0.0, 24.449999999999996, 19, 58, 22.0, 33.900000000000006, 44.95, 58.0, 1.3586725768923762, 19.181149665214587, 0.20167796063246207], "isController": false}, {"data": ["/api/v2/location-area/canalave-city-area", 81, 0, 0.0, 24.444444444444446, 19, 57, 21.0, 33.599999999999994, 48.19999999999993, 57.0, 1.3637741185978383, 21.29476462268916, 0.205098842054753], "isController": false}, {"data": ["/api/v2/pokedex/national", 81, 0, 0.0, 31.45679012345679, 25, 69, 28.0, 43.599999999999994, 56.699999999999974, 69.0, 1.3629938749411052, 155.3054155343441, 0.1836847214276099], "isController": false}, {"data": ["/api/v2/location/canalave-city", 81, 0, 0.0, 23.444444444444443, 19, 67, 21.0, 33.39999999999999, 42.0, 67.0, 1.3638889356614863, 2.146878657032447, 0.19179688157739647], "isController": false}, {"data": ["/api/v2/berry-firmness/soft", 81, 0, 0.0, 24.024691358024693, 18, 52, 21.0, 35.0, 42.0, 52.0, 1.3557619884509164, 3.7162007542472173, 0.18668207067537032], "isController": false}, {"data": ["/api/v2/generation/generation-ii", 80, 0, 0.0, 24.2375, 19, 46, 22.0, 31.80000000000001, 37.95, 46.0, 1.3599891200870393, 20.638498954508364, 0.1939046987624099], "isController": false}, {"data": ["/api/v2/contest-type/cute", 80, 0, 0.0, 24.512500000000006, 18, 60, 21.0, 41.30000000000004, 49.80000000000001, 60.0, 1.352287902094356, 2.319094516472557, 0.1835625179600737], "isController": false}, {"data": ["/api/v2/berry-firmness/hard", 80, 0, 0.0, 23.037500000000005, 18, 50, 21.0, 29.900000000000006, 39.95, 50.0, 1.352219329975322, 3.4652270988979414, 0.1861942632094926], "isController": false}, {"data": ["/api/v2/berry-firmness/very-soft", 81, 0, 0.0, 23.246913580246904, 17, 56, 21.0, 29.0, 37.0, 56.0, 1.365038170511805, 2.967917916547296, 0.19462458290500345], "isController": false}, {"data": ["/api/v2/location/pastoria-city", 80, 0, 0.0, 22.6875, 18, 44, 21.0, 27.80000000000001, 40.50000000000003, 44.0, 1.3524250671986207, 2.1301024990279447, 0.19018477507480602], "isController": false}, {"data": ["/api/v2/contest-type/beauty", 80, 0, 0.0, 23.087500000000006, 18, 67, 21.0, 27.0, 37.70000000000002, 67.0, 1.3599660008499788, 2.336644708882278, 0.1872609434764131], "isController": false}, {"data": ["/api/v2/berry-flavor/sweet", 80, 0, 0.0, 22.9875, 18, 51, 21.0, 28.0, 40.900000000000006, 51.0, 1.3523564811684359, 5.442673555936845, 0.1848924876597471], "isController": false}, {"data": ["/api/v2/berry-flavor/spicy", 81, 0, 0.0, 23.13580246913581, 18, 52, 21.0, 30.799999999999997, 40.79999999999998, 52.0, 1.3651992179599541, 5.493040617836917, 0.18664833058046248], "isController": false}, {"data": ["/api/v2/pokedex/kanto", 80, 0, 0.0, 24.35, 18, 50, 22.0, 33.900000000000006, 41.900000000000006, 50.0, 1.3579806827247882, 25.530500988779686, 0.1790306564139125], "isController": false}, {"data": ["/api/v2/berry/iapapa", 80, 0, 0.0, 30.737499999999986, 18, 203, 21.0, 42.80000000000001, 49.900000000000006, 203.0, 1.3479813978567097, 2.528781509065175, 0.17639600323515536], "isController": false}, {"data": ["/api/v2/version-group/yellow", 80, 0, 0.0, 23.749999999999996, 17, 50, 21.0, 33.0, 43.900000000000006, 50.0, 1.3580728945626157, 2.2650076338550598, 0.18832651467567524], "isController": false}, {"data": ["/api/v2/version-group/red-blue", 81, 0, 0.0, 22.50617283950618, 18, 46, 21.0, 25.799999999999997, 40.0, 46.0, 1.3637511575048404, 2.3509515215927266, 0.19177750652411818], "isController": false}, {"data": ["/api/v2/version/yellow", 80, 0, 0.0, 23.362499999999997, 17, 51, 21.0, 32.0, 44.50000000000003, 51.0, 1.3580498404291437, 2.7260794904766756, 0.18036599443199566], "isController": false}, {"data": ["/api/v2/version/red", 81, 0, 0.0, 23.839506172839513, 17, 56, 21.0, 33.19999999999999, 47.0, 56.0, 1.3635674965910811, 2.6898499444472503, 0.1771039814908338], "isController": false}, {"data": ["/api/v2/region/hoenn", 80, 0, 0.0, 24.82499999999999, 19, 54, 22.0, 42.10000000000005, 48.900000000000006, 54.0, 1.3526766088397415, 13.48221626551351, 0.17701041560988806], "isController": false}, {"data": ["/api/v2/location-area/pastoria-city-area", 80, 0, 0.0, 23.112500000000004, 19, 49, 22.0, 25.900000000000006, 34.70000000000002, 49.0, 1.3525165260613028, 20.69010174516898, 0.2034058056771881], "isController": false}, {"data": ["/api/v2/location/eterna-city", 80, 0, 0.0, 23.4375, 18, 64, 21.5, 30.0, 35.95, 64.0, 1.3584418671783465, 2.24423153049702, 0.18837768080012227], "isController": false}, {"data": ["/api/v2/berry/pinap", 81, 0, 0.0, 33.74074074074074, 18, 205, 21.0, 47.8, 188.49999999999875, 205.0, 1.360749924402782, 2.55772228207002, 0.1767380272905957], "isController": false}, {"data": ["/api/v2/version/gold", 80, 0, 0.0, 23.724999999999994, 18, 49, 21.0, 32.900000000000006, 37.0, 49.0, 1.3525393927098126, 2.667220230396632, 0.17699245959288562], "isController": false}, {"data": ["/api/v2/generation/generation-i", 81, 0, 0.0, 24.098765432098762, 20, 59, 22.0, 27.0, 40.699999999999974, 59.0, 1.3654523693127225, 33.1509064559768, 0.19335018901400855], "isController": false}, {"data": ["/api/v2/pal-park-area/sea", 80, 0, 0.0, 23.975, 19, 51, 21.0, 36.60000000000002, 44.95, 51.0, 1.3526308670363856, 10.563069584404166, 0.18360907277154065], "isController": false}, {"data": ["/api/v2/generation/generation-iii", 80, 0, 0.0, 24.700000000000014, 20, 53, 22.0, 29.900000000000006, 50.30000000000004, 53.0, 1.3526079972947842, 33.927757655972606, 0.19417321836165355], "isController": false}, {"data": ["/api/v2/pal-park-area/forest", 81, 0, 0.0, 24.086419753086425, 18, 68, 21.0, 32.8, 40.79999999999998, 68.0, 1.3638430065161387, 16.749960010776043, 0.1891266669192302], "isController": false}, {"data": ["/api/v2/contest-type/cool", 81, 0, 0.0, 23.839506172839506, 18, 53, 21.0, 30.799999999999997, 42.599999999999966, 53.0, 1.365176208855106, 2.339417988303305, 0.18531200491294894], "isController": false}, {"data": ["/api/v2/version-group/gold-silver", 80, 0, 0.0, 22.7, 18, 58, 21.0, 26.0, 33.900000000000006, 58.0, 1.3527223537368955, 2.4082321873943187, 0.19418963476496448], "isController": false}, {"data": ["/api/v2/region/kanto", 81, 0, 0.0, 24.28395061728395, 19, 60, 22.0, 33.19999999999999, 40.79999999999998, 60.0, 1.3638889356614863, 12.65325004946202, 0.1784776536900773], "isController": false}]}, function(index, item){
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
    createTable($("#errorsTable"), {"supportsControllersDiscrimination": false, "titles": ["Type of error", "Number of errors", "% in errors", "% in all samples"], "items": [{"data": ["404/Not Found", 80, 100.0, 2.3696682464454977], "isController": false}]}, function(index, item){
        switch(index){
            case 2:
            case 3:
                item = item.toFixed(2) + '%';
                break;
        }
        return item;
    }, [[1, 1]]);

        // Create top5 errors by sampler
    createTable($("#top5ErrorsBySamplerTable"), {"supportsControllersDiscrimination": false, "overall": {"data": ["Total", 3376, 80, "404/Not Found", 80, "", "", "", "", "", "", "", ""], "isController": false}, "titles": ["Sample", "#Samples", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors"], "items": [{"data": [], "isController": false}, {"data": [], "isController": false}, {"data": ["/api/v2/super-contest-effect/3", 80, 80, "404/Not Found", 80, "", "", "", "", "", "", "", ""], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}]}, function(index, item){
        return item;
    }, [[0, 0]], 0);

});
