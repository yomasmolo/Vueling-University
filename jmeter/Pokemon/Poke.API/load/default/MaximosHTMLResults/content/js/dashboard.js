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

    var data = {"OkPercent": 73.17960307931351, "KoPercent": 26.820396920686488};
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
    createTable($("#apdexTable"), {"supportsControllersDiscrimination": true, "overall": {"data": [0.7317960307931352, 500, 1500, "Total"], "isController": false}, "titles": ["Apdex", "T (Toleration threshold)", "F (Frustration threshold)", "Label"], "items": [{"data": [0.7432835820895523, 500, 1500, "/api/v2/region/johto"], "isController": false}, {"data": [0.75, 500, 1500, "/api/v2/super-contest-effect/2"], "isController": false}, {"data": [0.0, 500, 1500, "/api/v2/super-contest-effect/3"], "isController": false}, {"data": [0.7492625368731564, 500, 1500, "/api/v2/berry/razz"], "isController": false}, {"data": [0.7533234859675036, 500, 1500, "/api/v2/super-contest-effect/1"], "isController": false}, {"data": [0.7533234859675036, 500, 1500, "/api/v2/berry-flavor/dry"], "isController": false}, {"data": [0.7511111111111111, 500, 1500, "/api/v2/pokedex/original-johto"], "isController": false}, {"data": [0.744776119402985, 500, 1500, "/api/v2/pal-park-area/mountain"], "isController": false}, {"data": [0.7529585798816568, 500, 1500, "/api/v2/contest-effect/3"], "isController": false}, {"data": [0.7529585798816568, 500, 1500, "/api/v2/contest-effect/2"], "isController": false}, {"data": [0.7533234859675036, 500, 1500, "/api/v2/contest-effect/1"], "isController": false}, {"data": [0.7466467958271237, 500, 1500, "/api/v2/location-area/eterna-city-area"], "isController": false}, {"data": [0.746268656716418, 500, 1500, "/api/v2/location-area/canalave-city-area"], "isController": false}, {"data": [0.7514792899408284, 500, 1500, "/api/v2/pokedex/national"], "isController": false}, {"data": [0.7466467958271237, 500, 1500, "/api/v2/location/canalave-city"], "isController": false}, {"data": [0.7551622418879056, 500, 1500, "/api/v2/berry-firmness/soft"], "isController": false}, {"data": [0.75, 500, 1500, "/api/v2/generation/generation-ii"], "isController": false}, {"data": [0.7529585798816568, 500, 1500, "/api/v2/contest-type/cute"], "isController": false}, {"data": [0.7551622418879056, 500, 1500, "/api/v2/berry-firmness/very-soft"], "isController": false}, {"data": [0.7562776957163959, 500, 1500, "/api/v2/berry-firmness/hard"], "isController": false}, {"data": [0.7481371087928465, 500, 1500, "/api/v2/location/pastoria-city"], "isController": false}, {"data": [0.7529585798816568, 500, 1500, "/api/v2/contest-type/beauty"], "isController": false}, {"data": [0.7544378698224852, 500, 1500, "/api/v2/berry-flavor/sweet"], "isController": false}, {"data": [0.7548005908419497, 500, 1500, "/api/v2/berry-flavor/spicy"], "isController": false}, {"data": [0.75, 500, 1500, "/api/v2/pokedex/kanto"], "isController": false}, {"data": [0.7477876106194691, 500, 1500, "/api/v2/berry/iapapa"], "isController": false}, {"data": [0.7485119047619048, 500, 1500, "/api/v2/version-group/yellow"], "isController": false}, {"data": [0.7466467958271237, 500, 1500, "/api/v2/version-group/red-blue"], "isController": false}, {"data": [0.7492581602373887, 500, 1500, "/api/v2/version/yellow"], "isController": false}, {"data": [0.7485119047619048, 500, 1500, "/api/v2/version/red"], "isController": false}, {"data": [0.7432835820895523, 500, 1500, "/api/v2/region/hoenn"], "isController": false}, {"data": [0.746268656716418, 500, 1500, "/api/v2/location-area/pastoria-city-area"], "isController": false}, {"data": [0.7466467958271237, 500, 1500, "/api/v2/location/eterna-city"], "isController": false}, {"data": [0.7477876106194691, 500, 1500, "/api/v2/berry/pinap"], "isController": false}, {"data": [0.7492581602373887, 500, 1500, "/api/v2/version/gold"], "isController": false}, {"data": [0.7514792899408284, 500, 1500, "/api/v2/generation/generation-i"], "isController": false}, {"data": [0.7432835820895523, 500, 1500, "/api/v2/pal-park-area/sea"], "isController": false}, {"data": [0.7514792899408284, 500, 1500, "/api/v2/generation/generation-iii"], "isController": false}, {"data": [0.746268656716418, 500, 1500, "/api/v2/pal-park-area/forest"], "isController": false}, {"data": [0.7533234859675036, 500, 1500, "/api/v2/contest-type/cool"], "isController": false}, {"data": [0.7481371087928465, 500, 1500, "/api/v2/version-group/gold-silver"], "isController": false}, {"data": [0.744776119402985, 500, 1500, "/api/v2/region/kanto"], "isController": false}]}, function(index, item){
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
    createTable($("#statisticsTable"), {"supportsControllersDiscrimination": true, "overall": {"data": ["Total", 28318, 7595, 26.820396920686488, 36.12197189067016, 0, 19225, 20.0, 28.0, 38.0, 54.0, 472.9440844411784, 3551.345306341439, 48.793956076934], "isController": false}, "titles": ["Label", "#Samples", "FAIL", "Error %", "Average", "Min", "Max", "Median", "90th pct", "95th pct", "99th pct", "Transactions/s", "Received", "Sent"], "items": [{"data": ["/api/v2/region/johto", 670, 172, 25.671641791044777, 47.21641791044777, 0, 19206, 21.0, 30.0, 40.44999999999993, 55.289999999999964, 11.295434621350056, 65.20309720922685, 1.0986575080922516], "isController": false}, {"data": ["/api/v2/super-contest-effect/2", 676, 169, 25.0, 75.24408284023671, 0, 19202, 21.0, 31.0, 42.299999999999955, 57.0, 11.358862769478938, 20.973227488111842, 1.1980050577184818], "isController": false}, {"data": ["/api/v2/super-contest-effect/3", 677, 677, 100.0, 18.440177252584945, 0, 65, 20.0, 30.0, 43.0, 56.0, 11.37337253254935, 14.024881221125577, 1.2048509029819403], "isController": false}, {"data": ["/api/v2/berry/razz", 678, 170, 25.073746312684367, 49.752212389380496, 0, 19216, 21.0, 36.0, 48.0, 207.26000000000022, 11.331728840754112, 21.91730922102721, 1.0944707681508223], "isController": false}, {"data": ["/api/v2/super-contest-effect/1", 677, 167, 24.667651403249632, 18.933530280649926, 0, 72, 21.0, 33.200000000000045, 43.0, 57.66000000000008, 11.369361502032042, 25.38857498299634, 1.2044259899909313], "isController": false}, {"data": ["/api/v2/berry-flavor/dry", 677, 167, 24.667651403249632, 46.86410635155091, 0, 19222, 21.0, 30.0, 40.0, 52.22000000000003, 11.354297693920335, 40.86104559748428, 1.1527122641509433], "isController": false}, {"data": ["/api/v2/pokedex/original-johto", 675, 168, 24.88888888888889, 20.459259259259262, 0, 73, 23.0, 33.0, 43.0, 62.24000000000001, 11.344347153829348, 259.21014260789735, 1.198246668123225], "isController": false}, {"data": ["/api/v2/pal-park-area/mountain", 670, 171, 25.52238805970149, 47.87462686567164, 0, 19214, 22.0, 31.0, 44.899999999999864, 55.289999999999964, 11.295815490440706, 155.775071283761, 1.183057541221297], "isController": false}, {"data": ["/api/v2/contest-effect/3", 676, 167, 24.70414201183432, 18.329881656804723, 0, 66, 21.0, 29.300000000000068, 41.0, 52.460000000000036, 11.35714525721582, 18.193640586673837, 1.1524428467625416], "isController": false}, {"data": ["/api/v2/contest-effect/2", 676, 167, 24.70414201183432, 18.372781065088734, 0, 70, 20.0, 30.0, 41.14999999999998, 54.460000000000036, 11.35905363624143, 18.738933429392393, 1.1526364955807231], "isController": false}, {"data": ["/api/v2/contest-effect/1", 677, 167, 24.667651403249632, 18.542097488921712, 0, 65, 21.0, 30.0, 43.0, 55.440000000000055, 11.368979646671592, 17.721555772234165, 1.1542028069792436], "isController": false}, {"data": ["/api/v2/location-area/eterna-city-area", 671, 170, 25.33532041728763, 18.739195230998515, 0, 149, 21.0, 29.0, 35.39999999999998, 50.559999999999945, 11.295915962425507, 124.92005280230464, 1.2519307009864988], "isController": false}, {"data": ["/api/v2/location-area/canalave-city-area", 670, 170, 25.37313432835821, 19.853731343283602, 0, 207, 22.0, 31.0, 44.44999999999993, 63.57999999999993, 11.288202985476968, 137.37238578592007, 1.266895449337871], "isController": false}, {"data": ["/api/v2/pokedex/national", 676, 168, 24.85207100591716, 25.668639053254456, 0, 78, 28.0, 47.0, 54.0, 69.23000000000002, 11.35752688172043, 978.265889485677, 1.1502173639112903], "isController": false}, {"data": ["/api/v2/location/canalave-city", 671, 170, 25.33532041728763, 18.283159463487337, 0, 145, 21.0, 29.0, 40.0, 55.0, 11.288884402496677, 19.11198153253756, 1.1853013173169131], "isController": false}, {"data": ["/api/v2/berry-firmness/soft", 678, 166, 24.48377581120944, 47.37168141592923, 0, 19188, 21.0, 30.100000000000023, 43.0, 70.0, 11.36554128809468, 29.22019583766386, 1.1818151339390484], "isController": false}, {"data": ["/api/v2/generation/generation-ii", 676, 169, 25.0, 19.27366863905327, 0, 61, 22.0, 32.0, 42.14999999999998, 52.23000000000002, 11.35905363624143, 135.0836248099123, 1.2146644269223015], "isController": false}, {"data": ["/api/v2/contest-type/cute", 676, 167, 24.70414201183432, 47.01775147928992, 0, 19205, 21.0, 29.300000000000068, 43.0, 55.23000000000002, 11.35580977338776, 20.404691804624637, 1.160657384426078], "isController": false}, {"data": ["/api/v2/berry-firmness/very-soft", 678, 166, 24.48377581120944, 47.427728613569315, 0, 19211, 21.0, 30.0, 40.09999999999991, 100.0, 11.366303436714166, 24.341929484492876, 1.2238055322715842], "isController": false}, {"data": ["/api/v2/berry-firmness/hard", 677, 165, 24.372230428360414, 47.623338257016286, 0, 19211, 21.0, 31.0, 41.200000000000045, 85.94000000000074, 11.34953897736798, 27.623048512154234, 1.1818943839061191], "isController": false}, {"data": ["/api/v2/location/pastoria-city", 671, 169, 25.18628912071535, 18.208643815201192, 0, 140, 21.0, 28.0, 37.799999999999955, 52.0, 11.292304067585533, 19.1161768356305, 1.188026960165598], "isController": false}, {"data": ["/api/v2/contest-type/beauty", 676, 167, 24.70414201183432, 18.485207100591722, 0, 71, 20.0, 30.0, 42.0, 55.23000000000002, 11.356954454580583, 20.423401195756263, 1.1774761699259109], "isController": false}, {"data": ["/api/v2/berry-flavor/sweet", 676, 166, 24.556213017751478, 46.732248520710066, 0, 19225, 21.0, 29.0, 38.0, 55.23000000000002, 11.354283890689823, 40.177697403505384, 1.171146723885987], "isController": false}, {"data": ["/api/v2/berry-flavor/spicy", 677, 166, 24.519940915805023, 18.45642540620385, 0, 60, 21.0, 29.0, 39.10000000000002, 51.0, 11.366116548864227, 40.21144431631214, 1.1729308673169585], "isController": false}, {"data": ["/api/v2/pokedex/kanto", 676, 169, 25.0, 20.4215976331361, 0, 335, 22.0, 32.0, 48.0, 61.0, 11.360008066277917, 166.03471085859647, 1.1232429850689836], "isController": false}, {"data": ["/api/v2/berry/iapapa", 678, 171, 25.221238938053098, 49.441002949852496, 0, 19222, 21.0, 37.0, 46.0, 204.0, 11.327374488346837, 21.741849443446664, 1.1084404498371063], "isController": false}, {"data": ["/api/v2/version-group/yellow", 672, 169, 25.148809523809526, 18.33333333333335, 0, 74, 21.0, 30.0, 40.35000000000002, 54.26999999999998, 11.30342635111268, 19.92497300823367, 1.173267953861163], "isController": false}, {"data": ["/api/v2/version-group/red-blue", 671, 170, 25.33532041728763, 46.204172876304, 0, 19202, 20.0, 27.0, 36.799999999999955, 51.0, 11.293444416393166, 20.4047240543213, 1.1857801060338298], "isController": false}, {"data": ["/api/v2/version/yellow", 674, 169, 25.07418397626113, 18.467359050445125, 0, 61, 21.0, 30.0, 44.0, 53.25, 11.330016137708446, 22.857715264002824, 1.1274595296530392], "isController": false}, {"data": ["/api/v2/version/red", 672, 169, 25.148809523809526, 46.3973214285714, 0, 19187, 20.0, 28.0, 38.35000000000002, 51.26999999999998, 11.304757418747057, 22.51189801535899, 1.0990353052873292], "isController": false}, {"data": ["/api/v2/region/hoenn", 670, 172, 25.671641791044777, 19.167164179104486, 0, 421, 21.0, 30.899999999999977, 40.0, 54.0, 11.29334030036914, 89.5858605957237, 1.0984538026530921], "isController": false}, {"data": ["/api/v2/location-area/pastoria-city-area", 670, 170, 25.37313432835821, 48.346268656716404, 0, 19203, 22.0, 31.899999999999977, 43.44999999999993, 58.289999999999964, 11.2929595981729, 134.78992013812805, 1.2674292925887845], "isController": false}, {"data": ["/api/v2/location/eterna-city", 671, 170, 25.33532041728763, 46.76751117734724, 0, 19222, 20.0, 27.800000000000068, 42.0, 57.0, 11.296106126159493, 19.796545012920657, 1.1695865284254474], "isController": false}, {"data": ["/api/v2/berry/pinap", 678, 171, 25.221238938053098, 78.19321533923312, 0, 19203, 21.0, 37.10000000000002, 46.0, 209.42000000000007, 11.331728840754112, 21.798356361353456, 1.1005914216054953], "isController": false}, {"data": ["/api/v2/version/gold", 674, 169, 25.07418397626113, 47.21068249258158, 0, 19215, 21.0, 30.0, 44.25, 57.0, 11.330016137708446, 22.56340695812601, 1.1108792424522593], "isController": false}, {"data": ["/api/v2/generation/generation-i", 676, 168, 24.85207100591716, 48.55769230769226, 0, 19223, 23.0, 33.0, 43.14999999999998, 59.92000000000007, 11.360198971532283, 213.08558958340336, 1.2088460617416732], "isController": false}, {"data": ["/api/v2/pal-park-area/sea", 670, 172, 25.671641791044777, 76.34179104477607, 0, 19219, 21.0, 33.0, 44.0, 55.57999999999993, 11.293530661092944, 71.50944173928801, 1.139460091275326], "isController": false}, {"data": ["/api/v2/generation/generation-iii", 676, 168, 24.85207100591716, 48.636094674556226, 0, 19222, 23.0, 33.0, 46.0, 55.460000000000036, 11.355046780777048, 219.82134317836326, 1.2249639905598575], "isController": false}, {"data": ["/api/v2/pal-park-area/forest", 670, 170, 25.37313432835821, 19.02388059701493, 0, 147, 22.0, 30.0, 39.0, 54.0, 11.288202985476968, 109.31241207416518, 1.1681763234154396], "isController": false}, {"data": ["/api/v2/contest-type/cool", 677, 167, 24.667651403249632, 46.215657311669084, 0, 19187, 20.0, 28.0, 37.10000000000002, 52.22000000000003, 11.368216012896292, 20.41540704447374, 1.1624885079426384], "isController": false}, {"data": ["/api/v2/version-group/gold-silver", 671, 169, 25.18628912071535, 18.03576751117735, 0, 71, 21.0, 28.0, 39.39999999999998, 54.0, 11.29116394904673, 20.85251061701752, 1.212655074713514], "isController": false}, {"data": ["/api/v2/region/kanto", 670, 171, 25.52238805970149, 47.84179104477613, 0, 19209, 21.0, 32.0, 44.44999999999993, 58.57999999999993, 11.287822629557247, 83.8921908958235, 1.1001217758103645], "isController": false}]}, function(index, item){
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
    createTable($("#errorsTable"), {"supportsControllersDiscrimination": false, "titles": ["Type of error", "Number of errors", "% in errors", "% in all samples"], "items": [{"data": ["Non HTTP response code: java.net.UnknownHostException/Non HTTP response message: pokeapi.co", 7060, 92.95589203423305, 24.9311392047461], "isController": false}, {"data": ["404/Not Found", 510, 6.7149440421329825, 1.8009746451020552], "isController": false}, {"data": ["Non HTTP response code: java.net.SocketTimeoutException/Non HTTP response message: Read timed out", 25, 0.32916392363396973, 0.08828307083833604], "isController": false}]}, function(index, item){
        switch(index){
            case 2:
            case 3:
                item = item.toFixed(2) + '%';
                break;
        }
        return item;
    }, [[1, 1]]);

        // Create top5 errors by sampler
    createTable($("#top5ErrorsBySamplerTable"), {"supportsControllersDiscrimination": false, "overall": {"data": ["Total", 28318, 7595, "Non HTTP response code: java.net.UnknownHostException/Non HTTP response message: pokeapi.co", 7060, "404/Not Found", 510, "Non HTTP response code: java.net.SocketTimeoutException/Non HTTP response message: Read timed out", 25, "", "", "", ""], "isController": false}, "titles": ["Sample", "#Samples", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors"], "items": [{"data": ["/api/v2/region/johto", 670, 172, "Non HTTP response code: java.net.UnknownHostException/Non HTTP response message: pokeapi.co", 171, "Non HTTP response code: java.net.SocketTimeoutException/Non HTTP response message: Read timed out", 1, "", "", "", "", "", ""], "isController": false}, {"data": ["/api/v2/super-contest-effect/2", 676, 169, "Non HTTP response code: java.net.UnknownHostException/Non HTTP response message: pokeapi.co", 167, "Non HTTP response code: java.net.SocketTimeoutException/Non HTTP response message: Read timed out", 2, "", "", "", "", "", ""], "isController": false}, {"data": ["/api/v2/super-contest-effect/3", 677, 677, "404/Not Found", 510, "Non HTTP response code: java.net.UnknownHostException/Non HTTP response message: pokeapi.co", 167, "", "", "", "", "", ""], "isController": false}, {"data": ["/api/v2/berry/razz", 678, 170, "Non HTTP response code: java.net.UnknownHostException/Non HTTP response message: pokeapi.co", 169, "Non HTTP response code: java.net.SocketTimeoutException/Non HTTP response message: Read timed out", 1, "", "", "", "", "", ""], "isController": false}, {"data": ["/api/v2/super-contest-effect/1", 677, 167, "Non HTTP response code: java.net.UnknownHostException/Non HTTP response message: pokeapi.co", 167, "", "", "", "", "", "", "", ""], "isController": false}, {"data": ["/api/v2/berry-flavor/dry", 677, 167, "Non HTTP response code: java.net.UnknownHostException/Non HTTP response message: pokeapi.co", 166, "Non HTTP response code: java.net.SocketTimeoutException/Non HTTP response message: Read timed out", 1, "", "", "", "", "", ""], "isController": false}, {"data": ["/api/v2/pokedex/original-johto", 675, 168, "Non HTTP response code: java.net.UnknownHostException/Non HTTP response message: pokeapi.co", 168, "", "", "", "", "", "", "", ""], "isController": false}, {"data": ["/api/v2/pal-park-area/mountain", 670, 171, "Non HTTP response code: java.net.UnknownHostException/Non HTTP response message: pokeapi.co", 170, "Non HTTP response code: java.net.SocketTimeoutException/Non HTTP response message: Read timed out", 1, "", "", "", "", "", ""], "isController": false}, {"data": ["/api/v2/contest-effect/3", 676, 167, "Non HTTP response code: java.net.UnknownHostException/Non HTTP response message: pokeapi.co", 167, "", "", "", "", "", "", "", ""], "isController": false}, {"data": ["/api/v2/contest-effect/2", 676, 167, "Non HTTP response code: java.net.UnknownHostException/Non HTTP response message: pokeapi.co", 167, "", "", "", "", "", "", "", ""], "isController": false}, {"data": ["/api/v2/contest-effect/1", 677, 167, "Non HTTP response code: java.net.UnknownHostException/Non HTTP response message: pokeapi.co", 167, "", "", "", "", "", "", "", ""], "isController": false}, {"data": ["/api/v2/location-area/eterna-city-area", 671, 170, "Non HTTP response code: java.net.UnknownHostException/Non HTTP response message: pokeapi.co", 170, "", "", "", "", "", "", "", ""], "isController": false}, {"data": ["/api/v2/location-area/canalave-city-area", 670, 170, "Non HTTP response code: java.net.UnknownHostException/Non HTTP response message: pokeapi.co", 170, "", "", "", "", "", "", "", ""], "isController": false}, {"data": ["/api/v2/pokedex/national", 676, 168, "Non HTTP response code: java.net.UnknownHostException/Non HTTP response message: pokeapi.co", 168, "", "", "", "", "", "", "", ""], "isController": false}, {"data": ["/api/v2/location/canalave-city", 671, 170, "Non HTTP response code: java.net.UnknownHostException/Non HTTP response message: pokeapi.co", 170, "", "", "", "", "", "", "", ""], "isController": false}, {"data": ["/api/v2/berry-firmness/soft", 678, 166, "Non HTTP response code: java.net.UnknownHostException/Non HTTP response message: pokeapi.co", 165, "Non HTTP response code: java.net.SocketTimeoutException/Non HTTP response message: Read timed out", 1, "", "", "", "", "", ""], "isController": false}, {"data": ["/api/v2/generation/generation-ii", 676, 169, "Non HTTP response code: java.net.UnknownHostException/Non HTTP response message: pokeapi.co", 169, "", "", "", "", "", "", "", ""], "isController": false}, {"data": ["/api/v2/contest-type/cute", 676, 167, "Non HTTP response code: java.net.UnknownHostException/Non HTTP response message: pokeapi.co", 166, "Non HTTP response code: java.net.SocketTimeoutException/Non HTTP response message: Read timed out", 1, "", "", "", "", "", ""], "isController": false}, {"data": ["/api/v2/berry-firmness/very-soft", 678, 166, "Non HTTP response code: java.net.UnknownHostException/Non HTTP response message: pokeapi.co", 165, "Non HTTP response code: java.net.SocketTimeoutException/Non HTTP response message: Read timed out", 1, "", "", "", "", "", ""], "isController": false}, {"data": ["/api/v2/berry-firmness/hard", 677, 165, "Non HTTP response code: java.net.UnknownHostException/Non HTTP response message: pokeapi.co", 164, "Non HTTP response code: java.net.SocketTimeoutException/Non HTTP response message: Read timed out", 1, "", "", "", "", "", ""], "isController": false}, {"data": ["/api/v2/location/pastoria-city", 671, 169, "Non HTTP response code: java.net.UnknownHostException/Non HTTP response message: pokeapi.co", 169, "", "", "", "", "", "", "", ""], "isController": false}, {"data": ["/api/v2/contest-type/beauty", 676, 167, "Non HTTP response code: java.net.UnknownHostException/Non HTTP response message: pokeapi.co", 167, "", "", "", "", "", "", "", ""], "isController": false}, {"data": ["/api/v2/berry-flavor/sweet", 676, 166, "Non HTTP response code: java.net.UnknownHostException/Non HTTP response message: pokeapi.co", 165, "Non HTTP response code: java.net.SocketTimeoutException/Non HTTP response message: Read timed out", 1, "", "", "", "", "", ""], "isController": false}, {"data": ["/api/v2/berry-flavor/spicy", 677, 166, "Non HTTP response code: java.net.UnknownHostException/Non HTTP response message: pokeapi.co", 166, "", "", "", "", "", "", "", ""], "isController": false}, {"data": ["/api/v2/pokedex/kanto", 676, 169, "Non HTTP response code: java.net.UnknownHostException/Non HTTP response message: pokeapi.co", 169, "", "", "", "", "", "", "", ""], "isController": false}, {"data": ["/api/v2/berry/iapapa", 678, 171, "Non HTTP response code: java.net.UnknownHostException/Non HTTP response message: pokeapi.co", 170, "Non HTTP response code: java.net.SocketTimeoutException/Non HTTP response message: Read timed out", 1, "", "", "", "", "", ""], "isController": false}, {"data": ["/api/v2/version-group/yellow", 672, 169, "Non HTTP response code: java.net.UnknownHostException/Non HTTP response message: pokeapi.co", 169, "", "", "", "", "", "", "", ""], "isController": false}, {"data": ["/api/v2/version-group/red-blue", 671, 170, "Non HTTP response code: java.net.UnknownHostException/Non HTTP response message: pokeapi.co", 169, "Non HTTP response code: java.net.SocketTimeoutException/Non HTTP response message: Read timed out", 1, "", "", "", "", "", ""], "isController": false}, {"data": ["/api/v2/version/yellow", 674, 169, "Non HTTP response code: java.net.UnknownHostException/Non HTTP response message: pokeapi.co", 169, "", "", "", "", "", "", "", ""], "isController": false}, {"data": ["/api/v2/version/red", 672, 169, "Non HTTP response code: java.net.UnknownHostException/Non HTTP response message: pokeapi.co", 168, "Non HTTP response code: java.net.SocketTimeoutException/Non HTTP response message: Read timed out", 1, "", "", "", "", "", ""], "isController": false}, {"data": ["/api/v2/region/hoenn", 670, 172, "Non HTTP response code: java.net.UnknownHostException/Non HTTP response message: pokeapi.co", 172, "", "", "", "", "", "", "", ""], "isController": false}, {"data": ["/api/v2/location-area/pastoria-city-area", 670, 170, "Non HTTP response code: java.net.UnknownHostException/Non HTTP response message: pokeapi.co", 169, "Non HTTP response code: java.net.SocketTimeoutException/Non HTTP response message: Read timed out", 1, "", "", "", "", "", ""], "isController": false}, {"data": ["/api/v2/location/eterna-city", 671, 170, "Non HTTP response code: java.net.UnknownHostException/Non HTTP response message: pokeapi.co", 169, "Non HTTP response code: java.net.SocketTimeoutException/Non HTTP response message: Read timed out", 1, "", "", "", "", "", ""], "isController": false}, {"data": ["/api/v2/berry/pinap", 678, 171, "Non HTTP response code: java.net.UnknownHostException/Non HTTP response message: pokeapi.co", 169, "Non HTTP response code: java.net.SocketTimeoutException/Non HTTP response message: Read timed out", 2, "", "", "", "", "", ""], "isController": false}, {"data": ["/api/v2/version/gold", 674, 169, "Non HTTP response code: java.net.UnknownHostException/Non HTTP response message: pokeapi.co", 168, "Non HTTP response code: java.net.SocketTimeoutException/Non HTTP response message: Read timed out", 1, "", "", "", "", "", ""], "isController": false}, {"data": ["/api/v2/generation/generation-i", 676, 168, "Non HTTP response code: java.net.UnknownHostException/Non HTTP response message: pokeapi.co", 167, "Non HTTP response code: java.net.SocketTimeoutException/Non HTTP response message: Read timed out", 1, "", "", "", "", "", ""], "isController": false}, {"data": ["/api/v2/pal-park-area/sea", 670, 172, "Non HTTP response code: java.net.UnknownHostException/Non HTTP response message: pokeapi.co", 170, "Non HTTP response code: java.net.SocketTimeoutException/Non HTTP response message: Read timed out", 2, "", "", "", "", "", ""], "isController": false}, {"data": ["/api/v2/generation/generation-iii", 676, 168, "Non HTTP response code: java.net.UnknownHostException/Non HTTP response message: pokeapi.co", 167, "Non HTTP response code: java.net.SocketTimeoutException/Non HTTP response message: Read timed out", 1, "", "", "", "", "", ""], "isController": false}, {"data": ["/api/v2/pal-park-area/forest", 670, 170, "Non HTTP response code: java.net.UnknownHostException/Non HTTP response message: pokeapi.co", 170, "", "", "", "", "", "", "", ""], "isController": false}, {"data": ["/api/v2/contest-type/cool", 677, 167, "Non HTTP response code: java.net.UnknownHostException/Non HTTP response message: pokeapi.co", 166, "Non HTTP response code: java.net.SocketTimeoutException/Non HTTP response message: Read timed out", 1, "", "", "", "", "", ""], "isController": false}, {"data": ["/api/v2/version-group/gold-silver", 671, 169, "Non HTTP response code: java.net.UnknownHostException/Non HTTP response message: pokeapi.co", 169, "", "", "", "", "", "", "", ""], "isController": false}, {"data": ["/api/v2/region/kanto", 670, 171, "Non HTTP response code: java.net.UnknownHostException/Non HTTP response message: pokeapi.co", 170, "Non HTTP response code: java.net.SocketTimeoutException/Non HTTP response message: Read timed out", 1, "", "", "", "", "", ""], "isController": false}]}, function(index, item){
        return item;
    }, [[0, 0]], 0);

});
