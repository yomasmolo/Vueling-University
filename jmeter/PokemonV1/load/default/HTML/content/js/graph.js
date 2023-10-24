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
$(document).ready(function() {

    $(".click-title").mouseenter( function(    e){
        e.preventDefault();
        this.style.cursor="pointer";
    });
    $(".click-title").mousedown( function(event){
        event.preventDefault();
    });

    // Ugly code while this script is shared among several pages
    try{
        refreshHitsPerSecond(true);
    } catch(e){}
    try{
        refreshResponseTimeOverTime(true);
    } catch(e){}
    try{
        refreshResponseTimePercentiles();
    } catch(e){}
});


var responseTimePercentilesInfos = {
        getOptions: function() {
            return {
                series: {
                    points: { show: false }
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendResponseTimePercentiles'
                },
                xaxis: {
                    tickDecimals: 1,
                    axisLabel: "Percentiles",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Percentile value in ms",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s : %x.2 percentile was %y ms"
                },
                selection: { mode: "xy" },
            };
        },
        createGraph: function() {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesResponseTimePercentiles"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotResponseTimesPercentiles"), dataset, options);
            // setup overview
            $.plot($("#overviewResponseTimesPercentiles"), dataset, prepareOverviewOptions(options));
        }
};

/**
 * @param elementId Id of element where we display message
 */
function setEmptyGraph(elementId) {
    $(function() {
        $(elementId).text("No graph series with filter="+seriesFilter);
    });
}

// Response times percentiles
function refreshResponseTimePercentiles() {
    var infos = responseTimePercentilesInfos;
    prepareSeries(infos.data);
    if(infos.data.result.series.length == 0) {
        setEmptyGraph("#bodyResponseTimePercentiles");
        return;
    }
    if (isGraph($("#flotResponseTimesPercentiles"))){
        infos.createGraph();
    } else {
        var choiceContainer = $("#choicesResponseTimePercentiles");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotResponseTimesPercentiles", "#overviewResponseTimesPercentiles");
        $('#bodyResponseTimePercentiles .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
}

var responseTimeDistributionInfos = {
        data: {"result": {"minY": 1.0, "minX": 0.0, "maxY": 21.0, "series": [{"data": [[0.0, 5.0]], "isOverall": false, "label": "Request for Pokemon : suicune", "isController": false}, {"data": [[0.0, 6.0]], "isOverall": false, "label": "Request for Pokemon : skitty", "isController": false}, {"data": [[0.0, 2.0]], "isOverall": false, "label": "Request for Pokemon : araquanid-totem", "isController": false}, {"data": [[0.0, 4.0]], "isOverall": false, "label": "Request for Pokemon : chewtle", "isController": false}, {"data": [[0.0, 5.0]], "isOverall": false, "label": "Find Pokemon with : pressure", "isController": false}, {"data": [[0.0, 7.0]], "isOverall": false, "label": "Request for Pokemon : barboach", "isController": false}, {"data": [[0.0, 3.0]], "isOverall": false, "label": "Request for Pokemon : maushold-family-of-three", "isController": false}, {"data": [[0.0, 5.0]], "isOverall": false, "label": "Request for Pokemon : kyurem", "isController": false}, {"data": [[0.0, 14.0]], "isOverall": false, "label": "Request for Pokemon : elekid", "isController": false}, {"data": [[0.0, 4.0]], "isOverall": false, "label": "Request for Pokemon : dewott", "isController": false}, {"data": [[0.0, 2.0]], "isOverall": false, "label": "Request for Pokemon : chinchou", "isController": false}, {"data": [[0.0, 14.0]], "isOverall": false, "label": "Request for Pokemon : pawmi", "isController": false}, {"data": [[0.0, 4.0]], "isOverall": false, "label": "Request for Pokemon : corviknight-gmax", "isController": false}, {"data": [[0.0, 2.0]], "isOverall": false, "label": "Request for Pokemon : poliwag", "isController": false}, {"data": [[0.0, 5.0]], "isOverall": false, "label": "Request for Pokemon : dusknoir", "isController": false}, {"data": [[0.0, 14.0]], "isOverall": false, "label": "Request for Pokemon : voltorb-hisui", "isController": false}, {"data": [[0.0, 9.0]], "isOverall": false, "label": "Request for Pokemon : igglybuff", "isController": false}, {"data": [[0.0, 21.0]], "isOverall": false, "label": "Request for Pokemon : pikachu-alola-cap", "isController": false}, {"data": [[0.0, 7.0]], "isOverall": false, "label": "Request for Pokemon : goldeen", "isController": false}, {"data": [[0.0, 5.0]], "isOverall": false, "label": "Request for Pokemon : giratina-altered", "isController": false}, {"data": [[0.0, 7.0]], "isOverall": false, "label": "Find Pokemon with : hydration", "isController": false}, {"data": [[0.0, 21.0]], "isOverall": false, "label": "Request for Pokemon : pikachu-libre", "isController": false}, {"data": [[0.0, 7.0]], "isOverall": false, "label": "Request for Pokemon : rhydon", "isController": false}, {"data": [[0.0, 2.0]], "isOverall": false, "label": "Request for Pokemon : mantine", "isController": false}, {"data": [[0.0, 3.0]], "isOverall": false, "label": "Request for Pokemon : happiny", "isController": false}, {"data": [[0.0, 6.0]], "isOverall": false, "label": "Request for Pokemon : stufful", "isController": false}, {"data": [[0.0, 6.0]], "isOverall": false, "label": "Request for Pokemon : wigglytuff", "isController": false}, {"data": [[0.0, 21.0]], "isOverall": false, "label": "Request for Pokemon : pikachu-pop-star", "isController": false}, {"data": [[0.0, 2.0]], "isOverall": false, "label": "Request for Pokemon : wooper-paldea", "isController": false}, {"data": [[0.0, 5.0]], "isOverall": false, "label": "Request for Pokemon : spiritomb", "isController": false}, {"data": [[0.0, 21.0]], "isOverall": false, "label": "Request for Pokemon : pikachu-kalos-cap", "isController": false}, {"data": [[0.0, 7.0]], "isOverall": false, "label": "Request for Pokemon : cubone", "isController": false}, {"data": [[0.0, 21.0]], "isOverall": false, "label": "Request for Pokemon : pikachu-cosplay", "isController": false}, {"data": [[0.0, 4.0]], "isOverall": false, "label": "Request for Pokemon : omastar", "isController": false}, {"data": [[0.0, 14.0]], "isOverall": false, "label": "Request for Pokemon : bellibolt", "isController": false}, {"data": [[0.0, 13.0]], "isOverall": false, "label": "Request for Pokemon : indeedee-female", "isController": false}, {"data": [[0.0, 7.0]], "isOverall": false, "label": "Find Pokemon with : lightning-rod", "isController": false}, {"data": [[0.0, 4.0]], "isOverall": false, "label": "Request for Pokemon : oshawott", "isController": false}, {"data": [[0.0, 5.0]], "isOverall": false, "label": "Request for Pokemon : vespiquen", "isController": false}, {"data": [[0.0, 13.0]], "isOverall": false, "label": "Request for Pokemon : lapras", "isController": false}, {"data": [[0.0, 4.0]], "isOverall": false, "label": "Request for Pokemon : slowbro-mega", "isController": false}, {"data": [[0.0, 14.0]], "isOverall": false, "label": "Request for Pokemon : natu", "isController": false}, {"data": [[0.0, 21.0]], "isOverall": false, "label": "Request for Pokemon : pikachu", "isController": false}, {"data": [[0.0, 9.0]], "isOverall": false, "label": "Request for Pokemon : jigglypuff", "isController": false}, {"data": [[0.0, 3.0]], "isOverall": false, "label": "Request for Pokemon : vivillon", "isController": false}, {"data": [[0.0, 4.0]], "isOverall": false, "label": "Request for Pokemon : drednaw-gmax", "isController": false}, {"data": [[0.0, 9.0]], "isOverall": false, "label": "Request for Pokemon : tympole", "isController": false}, {"data": [[0.0, 2.0]], "isOverall": false, "label": "Request for Pokemon : politoed", "isController": false}, {"data": [[0.0, 21.0]], "isOverall": false, "label": "Request for Pokemon : pikachu-unova-cap", "isController": false}, {"data": [[0.0, 13.0]], "isOverall": false, "label": "Find Pokemon : zapdos", "isController": false}, {"data": [[0.0, 4.0]], "isOverall": false, "label": "Request for Pokemon : clamperl", "isController": false}, {"data": [[0.0, 9.0]], "isOverall": false, "label": "Request for Pokemon : vaporeon", "isController": false}, {"data": [[0.0, 19.0]], "isOverall": false, "label": "Request for Pokemon : kadabra", "isController": false}, {"data": [[0.0, 4.0]], "isOverall": false, "label": "Request for Pokemon : dialga-origin", "isController": false}, {"data": [[0.0, 5.0]], "isOverall": false, "label": "Request for Pokemon : deoxys-normal", "isController": false}, {"data": [[0.0, 3.0]], "isOverall": false, "label": "Request for Pokemon : spewpa", "isController": false}, {"data": [[0.0, 4.0]], "isOverall": false, "label": "Request for Pokemon : eternatus", "isController": false}, {"data": [[0.0, 13.0], [1400.0, 1.0]], "isOverall": false, "label": "Find Pokemon : mew", "isController": false}, {"data": [[0.0, 14.0]], "isOverall": false, "label": "Request for Pokemon : arctozolt", "isController": false}, {"data": [[0.0, 14.0]], "isOverall": false, "label": "Request for Pokemon : clefairy", "isController": false}, {"data": [[0.0, 4.0]], "isOverall": false, "label": "Request for Pokemon : samurott-hisui", "isController": false}, {"data": [[0.0, 13.0]], "isOverall": false, "label": "Request for Pokemon : musharna", "isController": false}, {"data": [[0.0, 4.0]], "isOverall": false, "label": "Request for Pokemon : cloyster", "isController": false}, {"data": [[0.0, 6.0]], "isOverall": false, "label": "Request for Pokemon : cinccino", "isController": false}, {"data": [[0.0, 4.0]], "isOverall": false, "label": "Request for Pokemon : samurott", "isController": false}, {"data": [[0.0, 19.0]], "isOverall": false, "label": "Request for Pokemon : abra", "isController": false}, {"data": [[0.0, 6.0]], "isOverall": false, "label": "Request for Pokemon : minccino", "isController": false}, {"data": [[0.0, 2.0]], "isOverall": false, "label": "Request for Pokemon : dewpider", "isController": false}, {"data": [[0.0, 4.0]], "isOverall": false, "label": "Request for Pokemon : turtwig", "isController": false}, {"data": [[0.0, 13.0]], "isOverall": false, "label": "Request for Pokemon : lapras-gmax", "isController": false}, {"data": [[0.0, 4.0]], "isOverall": false, "label": "Request for Pokemon : crawdaunt", "isController": false}, {"data": [[0.0, 14.0]], "isOverall": false, "label": "Find Pokemon with : synchronize", "isController": false}, {"data": [[0.0, 5.0]], "isOverall": false, "label": "Request for Pokemon : pawniard", "isController": false}, {"data": [[0.0, 7.0]], "isOverall": false, "label": "Request for Pokemon : goodra", "isController": false}, {"data": [[0.0, 7.0]], "isOverall": false, "label": "Request for Pokemon : phione", "isController": false}, {"data": [[0.0, 13.0]], "isOverall": false, "label": "Find Pokemon : pikachu", "isController": false}, {"data": [[0.0, 13.0]], "isOverall": false, "label": "Request for Pokemon : kirlia", "isController": false}, {"data": [[0.0, 21.0]], "isOverall": false, "label": "Request for Pokemon : raichu", "isController": false}, {"data": [[0.0, 4.0]], "isOverall": false, "label": "Request for Pokemon : grotle", "isController": false}, {"data": [[0.0, 21.0]], "isOverall": false, "label": "Request for Pokemon : pikachu-gmax", "isController": false}, {"data": [[0.0, 7.0]], "isOverall": false, "label": "Request for Pokemon : rhyperior", "isController": false}, {"data": [[0.0, 21.0]], "isOverall": false, "label": "Request for Pokemon : pikachu-world-cap", "isController": false}, {"data": [[0.0, 7.0]], "isOverall": false, "label": "Request for Pokemon : plusle", "isController": false}, {"data": [[0.0, 4.0]], "isOverall": false, "label": "Request for Pokemon : eternatus-eternamax", "isController": false}, {"data": [[0.0, 4.0]], "isOverall": false, "label": "Request for Pokemon : drednaw", "isController": false}, {"data": [[0.0, 5.0]], "isOverall": false, "label": "Request for Pokemon : mewtwo", "isController": false}, {"data": [[0.0, 13.0]], "isOverall": false, "label": "Request for Pokemon : beheeyem", "isController": false}, {"data": [[0.0, 2.0]], "isOverall": false, "label": "Request for Pokemon : cacnea", "isController": false}, {"data": [[0.0, 2.0]], "isOverall": false, "label": "Request for Pokemon : mantyke", "isController": false}, {"data": [[0.0, 5.0]], "isOverall": false, "label": "Request for Pokemon : solosis", "isController": false}, {"data": [[0.0, 21.0]], "isOverall": false, "label": "Request for Pokemon : electrike", "isController": false}, {"data": [[0.0, 7.0]], "isOverall": false, "label": "Request for Pokemon : luvdisc", "isController": false}, {"data": [[0.0, 13.0]], "isOverall": false, "label": "Find Pokemon : lapras", "isController": false}, {"data": [[0.0, 21.0]], "isOverall": false, "label": "Request for Pokemon : pikachu-belle", "isController": false}, {"data": [[0.0, 4.0]], "isOverall": false, "label": "Request for Pokemon : kingler-gmax", "isController": false}, {"data": [[0.0, 4.0]], "isOverall": false, "label": "Request for Pokemon : torkoal", "isController": false}, {"data": [[0.0, 3.0]], "isOverall": false, "label": "Request for Pokemon : maushold", "isController": false}, {"data": [[0.0, 7.0]], "isOverall": false, "label": "Request for Pokemon : dewgong", "isController": false}, {"data": [[0.0, 14.0]], "isOverall": false, "label": "Request for Pokemon : mew", "isController": false}, {"data": [[0.0, 3.0]], "isOverall": false, "label": "Find Pokemon with : friend-guard", "isController": false}, {"data": [[0.0, 14.0]], "isOverall": false, "label": "Request for Pokemon : toxel", "isController": false}, {"data": [[0.0, 19.0]], "isOverall": false, "label": "Request for Pokemon : zapdos", "isController": false}, {"data": [[0.0, 14.0]], "isOverall": false, "label": "Request for Pokemon : tadbulb", "isController": false}, {"data": [[0.0, 4.0]], "isOverall": false, "label": "Request for Pokemon : kingambit", "isController": false}, {"data": [[0.0, 6.0]], "isOverall": false, "label": "Find Pokemon with : cute-charm", "isController": false}, {"data": [[0.0, 2.0]], "isOverall": false, "label": "Request for Pokemon : seismitoad", "isController": false}, {"data": [[0.0, 14.0]], "isOverall": false, "label": "Request for Pokemon : voltorb", "isController": false}, {"data": [[0.0, 2.0]], "isOverall": false, "label": "Request for Pokemon : volcanion", "isController": false}, {"data": [[0.0, 5.0]], "isOverall": false, "label": "Request for Pokemon : absol", "isController": false}, {"data": [[0.0, 7.0]], "isOverall": false, "label": "Request for Pokemon : togedemaru-totem", "isController": false}, {"data": [[0.0, 4.0]], "isOverall": false, "label": "Request for Pokemon : crustle", "isController": false}, {"data": [[0.0, 5.0]], "isOverall": false, "label": "Request for Pokemon : wailord", "isController": false}, {"data": [[0.0, 14.0]], "isOverall": false, "label": "Request for Pokemon : electrode-hisui", "isController": false}, {"data": [[0.0, 21.0]], "isOverall": false, "label": "Request for Pokemon : pikachu-partner-cap", "isController": false}, {"data": [[0.0, 7.0]], "isOverall": false, "label": "Request for Pokemon : blitzle", "isController": false}, {"data": [[0.0, 21.0]], "isOverall": false, "label": "Request for Pokemon : pikachu-phd", "isController": false}, {"data": [[0.0, 4.0]], "isOverall": false, "label": "Request for Pokemon : kingler", "isController": false}, {"data": [[0.0, 4.0]], "isOverall": false, "label": "Request for Pokemon : deoxys-attack", "isController": false}, {"data": [[0.0, 7.0]], "isOverall": false, "label": "Request for Pokemon : zebstrika", "isController": false}, {"data": [[0.0, 14.0]], "isOverall": false, "label": "Request for Pokemon : cleffa", "isController": false}, {"data": [[0.0, 5.0]], "isOverall": false, "label": "Request for Pokemon : lugia", "isController": false}, {"data": [[0.0, 7.0]], "isOverall": false, "label": "Request for Pokemon : marowak", "isController": false}, {"data": [[0.0, 5.0]], "isOverall": false, "label": "Request for Pokemon : articuno", "isController": false}, {"data": [[0.0, 7.0]], "isOverall": false, "label": "Request for Pokemon : wingull", "isController": false}, {"data": [[0.0, 2.0]], "isOverall": false, "label": "Request for Pokemon : quagsire", "isController": false}, {"data": [[0.0, 7.0]], "isOverall": false, "label": "Request for Pokemon : togedemaru", "isController": false}, {"data": [[0.0, 7.0]], "isOverall": false, "label": "Request for Pokemon : swanna", "isController": false}, {"data": [[0.0, 2.0]], "isOverall": false, "label": "Request for Pokemon : frillish", "isController": false}, {"data": [[0.0, 5.0]], "isOverall": false, "label": "Find Pokemon with : magic-guard", "isController": false}, {"data": [[0.0, 5.0]], "isOverall": false, "label": "Request for Pokemon : weavile", "isController": false}, {"data": [[0.0, 13.0]], "isOverall": false, "label": "Request for Pokemon : umbreon", "isController": false}, {"data": [[0.0, 6.0]], "isOverall": false, "label": "Request for Pokemon : sylveon", "isController": false}, {"data": [[0.0, 21.0]], "isOverall": false, "label": "Request for Pokemon : pikachu-starter", "isController": false}, {"data": [[0.0, 4.0]], "isOverall": false, "label": "Request for Pokemon : sneasler", "isController": false}, {"data": [[0.0, 7.0]], "isOverall": false, "label": "Request for Pokemon : sliggoo", "isController": false}, {"data": [[0.0, 9.0]], "isOverall": false, "label": "Request for Pokemon : palpitoad", "isController": false}, {"data": [[0.0, 4.0]], "isOverall": false, "label": "Request for Pokemon : escavalier", "isController": false}, {"data": [[0.0, 7.0]], "isOverall": false, "label": "Request for Pokemon : marowak-alola", "isController": false}, {"data": [[0.0, 4.0]], "isOverall": false, "label": "Request for Pokemon : turtonator", "isController": false}, {"data": [[0.0, 21.0]], "isOverall": false, "label": "Request for Pokemon : pikachu-original-cap", "isController": false}, {"data": [[0.0, 3.0]], "isOverall": false, "label": "Request for Pokemon : scatterbug", "isController": false}, {"data": [[0.0, 2.0]], "isOverall": false, "label": "Request for Pokemon : lanturn", "isController": false}, {"data": [[0.0, 6.0]], "isOverall": false, "label": "Request for Pokemon : milotic", "isController": false}, {"data": [[0.0, 13.0]], "isOverall": false, "label": "Request for Pokemon : elgyem", "isController": false}, {"data": [[0.0, 7.0]], "isOverall": false, "label": "Request for Pokemon : pincurchin", "isController": false}, {"data": [[0.0, 14.0]], "isOverall": false, "label": "Request for Pokemon : emolga", "isController": false}, {"data": [[0.0, 7.0]], "isOverall": false, "label": "Request for Pokemon : sceptile-mega", "isController": false}, {"data": [[0.0, 2.0]], "isOverall": false, "label": "Request for Pokemon : cacturne", "isController": false}, {"data": [[0.0, 2.0]], "isOverall": false, "label": "Request for Pokemon : jellicent", "isController": false}, {"data": [[0.0, 2.0]], "isOverall": false, "label": "Request for Pokemon : wooper", "isController": false}, {"data": [[0.0, 14.0]], "isOverall": false, "label": "Request for Pokemon : electrode", "isController": false}, {"data": [[0.0, 11.0]], "isOverall": false, "label": "Request for Pokemon : shelmet", "isController": false}, {"data": [[0.0, 7.0]], "isOverall": false, "label": "Request for Pokemon : alomomola", "isController": false}, {"data": [[0.0, 20.0], [100.0, 1.0]], "isOverall": false, "label": "Request for Pokemon : manectric", "isController": false}, {"data": [[0.0, 7.0]], "isOverall": false, "label": "Request for Pokemon : accelgor", "isController": false}, {"data": [[0.0, 7.0]], "isOverall": false, "label": "Request for Pokemon : seel", "isController": false}, {"data": [[0.0, 5.0]], "isOverall": false, "label": "Request for Pokemon : moltres", "isController": false}, {"data": [[0.0, 13.0]], "isOverall": false, "label": "Request for Pokemon : ralts", "isController": false}, {"data": [[0.0, 7.0]], "isOverall": false, "label": "Request for Pokemon : gorebyss", "isController": false}, {"data": [[0.0, 5.0]], "isOverall": false, "label": "Request for Pokemon : dusclops", "isController": false}, {"data": [[0.0, 4.0]], "isOverall": false, "label": "Request for Pokemon : palkia-origin", "isController": false}, {"data": [[0.0, 4.0]], "isOverall": false, "label": "Request for Pokemon : omanyte", "isController": false}, {"data": [[0.0, 2.0]], "isOverall": false, "label": "Request for Pokemon : maractus", "isController": false}, {"data": [[0.0, 13.0]], "isOverall": false, "label": "Request for Pokemon : gardevoir", "isController": false}, {"data": [[0.0, 4.0]], "isOverall": false, "label": "Request for Pokemon : corphish", "isController": false}, {"data": [[0.0, 21.0]], "isOverall": false, "label": "Request for Pokemon : pikachu-sinnoh-cap", "isController": false}, {"data": [[0.0, 14.0]], "isOverall": false, "label": "Request for Pokemon : electabuzz", "isController": false}, {"data": [[0.0, 6.0]], "isOverall": false, "label": "Request for Pokemon : delcatty", "isController": false}, {"data": [[0.0, 5.0]], "isOverall": false, "label": "Request for Pokemon : entei", "isController": false}, {"data": [[0.0, 14.0]], "isOverall": false, "label": "Request for Pokemon : stunfisk", "isController": false}, {"data": [[0.0, 6.0], [100.0, 1.0]], "isOverall": false, "label": "Request for Pokemon : manaphy", "isController": false}, {"data": [[0.0, 5.0]], "isOverall": false, "label": "Request for Pokemon : duosion", "isController": false}, {"data": [[0.0, 2.0]], "isOverall": false, "label": "Request for Pokemon : clodsire", "isController": false}, {"data": [[0.0, 11.0]], "isOverall": false, "label": "Request for Pokemon : clefable", "isController": false}, {"data": [[0.0, 14.0]], "isOverall": false, "label": "Request for Pokemon : flaaffy", "isController": false}, {"data": [[0.0, 13.0], [1400.0, 1.0]], "isOverall": false, "label": "Find Pokemon : clefairy", "isController": false}, {"data": [[0.0, 4.0]], "isOverall": false, "label": "Request for Pokemon : klawf", "isController": false}, {"data": [[0.0, 14.0]], "isOverall": false, "label": "Request for Pokemon : xatu", "isController": false}, {"data": [[0.0, 4.0]], "isOverall": false, "label": "Request for Pokemon : corviknight", "isController": false}, {"data": [[0.0, 13.0]], "isOverall": false, "label": "Request for Pokemon : indeedee-male", "isController": false}, {"data": [[0.0, 4.0]], "isOverall": false, "label": "Request for Pokemon : deoxys-defense", "isController": false}, {"data": [[0.0, 7.0]], "isOverall": false, "label": "Request for Pokemon : marowak-totem", "isController": false}, {"data": [[0.0, 5.0]], "isOverall": false, "label": "Request for Pokemon : dialga", "isController": false}, {"data": [[0.0, 14.0]], "isOverall": false, "label": "Request for Pokemon : ampharos", "isController": false}, {"data": [[0.0, 7.0]], "isOverall": false, "label": "Request for Pokemon : rhyhorn", "isController": false}, {"data": [[0.0, 14.0]], "isOverall": false, "label": "Find Pokemon with : static", "isController": false}, {"data": [[0.0, 7.0]], "isOverall": false, "label": "Request for Pokemon : smoochum", "isController": false}, {"data": [[0.0, 2.0]], "isOverall": false, "label": "Request for Pokemon : poliwrath", "isController": false}, {"data": [[0.0, 2.0]], "isOverall": false, "label": "Request for Pokemon : dracovish", "isController": false}, {"data": [[0.0, 5.0]], "isOverall": false, "label": "Request for Pokemon : raikou", "isController": false}, {"data": [[0.0, 21.0]], "isOverall": false, "label": "Request for Pokemon : pikachu-rock-star", "isController": false}, {"data": [[0.0, 4.0]], "isOverall": false, "label": "Request for Pokemon : deoxys-speed", "isController": false}, {"data": [[0.0, 7.0]], "isOverall": false, "label": "Request for Pokemon : seaking", "isController": false}, {"data": [[0.0, 21.0]], "isOverall": false, "label": "Request for Pokemon : pikachu-hoenn-cap", "isController": false}, {"data": [[0.0, 7.0]], "isOverall": false, "label": "Request for Pokemon : whiscash", "isController": false}, {"data": [[0.0, 5.0]], "isOverall": false, "label": "Request for Pokemon : reuniclus", "isController": false}, {"data": [[0.0, 5.0]], "isOverall": false, "label": "Request for Pokemon : sigilyph", "isController": false}, {"data": [[0.0, 2.0]], "isOverall": false, "label": "Request for Pokemon : arctovish", "isController": false}, {"data": [[0.0, 5.0]], "isOverall": false, "label": "Request for Pokemon : palkia", "isController": false}, {"data": [[0.0, 19.0]], "isOverall": false, "label": "Request for Pokemon : alakazam", "isController": false}, {"data": [[0.0, 21.0]], "isOverall": false, "label": "Request for Pokemon : pichu", "isController": false}, {"data": [[0.0, 14.0]], "isOverall": false, "label": "Request for Pokemon : mareep", "isController": false}, {"data": [[0.0, 13.0]], "isOverall": false, "label": "Request for Pokemon : munna", "isController": false}, {"data": [[0.0, 4.0]], "isOverall": false, "label": "Request for Pokemon : dwebble", "isController": false}, {"data": [[0.0, 4.0]], "isOverall": false, "label": "Request for Pokemon : shellder", "isController": false}, {"data": [[0.0, 4.0]], "isOverall": false, "label": "Request for Pokemon : torterra", "isController": false}, {"data": [[0.0, 5.0]], "isOverall": false, "label": "Request for Pokemon : aerodactyl", "isController": false}, {"data": [[0.0, 2.0]], "isOverall": false, "label": "Request for Pokemon : poliwhirl", "isController": false}, {"data": [[0.0, 6.0]], "isOverall": false, "label": "Request for Pokemon : lopunny", "isController": false}, {"data": [[0.0, 7.0]], "isOverall": false, "label": "Request for Pokemon : ducklett", "isController": false}, {"data": [[0.0, 13.0]], "isOverall": false, "label": "Request for Pokemon : rabsca", "isController": false}, {"data": [[0.0, 4.0]], "isOverall": false, "label": "Request for Pokemon : krabby", "isController": false}, {"data": [[0.0, 5.0]], "isOverall": false, "label": "Request for Pokemon : wailmer", "isController": false}, {"data": [[0.0, 2.0]], "isOverall": false, "label": "Request for Pokemon : araquanid", "isController": false}, {"data": [[0.0, 6.0]], "isOverall": false, "label": "Request for Pokemon : enamorus-incarnate", "isController": false}, {"data": [[0.0, 14.0]], "isOverall": false, "label": "Request for Pokemon : espeon", "isController": false}, {"data": [[0.0, 4.0]], "isOverall": false, "label": "Find Pokemon with : shell-armor", "isController": false}, {"data": [[0.0, 7.0]], "isOverall": false, "label": "Request for Pokemon : goomy", "isController": false}, {"data": [[0.0, 5.0]], "isOverall": false, "label": "Request for Pokemon : bisharp", "isController": false}, {"data": [[0.0, 5.0]], "isOverall": false, "label": "Request for Pokemon : ho-oh", "isController": false}, {"data": [[0.0, 2.0]], "isOverall": false, "label": "Find Pokemon with : water-absorb", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 100, "maxX": 1400.0, "title": "Response Time Distribution"}},
        getOptions: function() {
            var granularity = this.data.result.granularity;
            return {
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendResponseTimeDistribution'
                },
                xaxis:{
                    axisLabel: "Response times in ms",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Number of responses",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                bars : {
                    show: true,
                    barWidth: this.data.result.granularity
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: function(label, xval, yval, flotItem){
                        return yval + " responses for " + label + " were between " + xval + " and " + (xval + granularity) + " ms";
                    }
                }
            };
        },
        createGraph: function() {
            var data = this.data;
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotResponseTimeDistribution"), prepareData(data.result.series, $("#choicesResponseTimeDistribution")), options);
        }

};

// Response time distribution
function refreshResponseTimeDistribution() {
    var infos = responseTimeDistributionInfos;
    prepareSeries(infos.data);
    if(infos.data.result.series.length == 0) {
        setEmptyGraph("#bodyResponseTimeDistribution");
        return;
    }
    if (isGraph($("#flotResponseTimeDistribution"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesResponseTimeDistribution");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        $('#footerResponseTimeDistribution .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};


var syntheticResponseTimeDistributionInfos = {
        data: {"result": {"minY": 2.0, "minX": 0.0, "ticks": [[0, "Requests having \nresponse time <= 500ms"], [1, "Requests having \nresponse time > 500ms and <= 1,500ms"], [2, "Requests having \nresponse time > 1,500ms"], [3, "Requests in error"]], "maxY": 1842.0, "series": [{"data": [[0.0, 1842.0]], "color": "#9ACD32", "isOverall": false, "label": "Requests having \nresponse time <= 500ms", "isController": false}, {"data": [[1.0, 2.0]], "color": "yellow", "isOverall": false, "label": "Requests having \nresponse time > 500ms and <= 1,500ms", "isController": false}, {"data": [], "color": "orange", "isOverall": false, "label": "Requests having \nresponse time > 1,500ms", "isController": false}, {"data": [], "color": "#FF6347", "isOverall": false, "label": "Requests in error", "isController": false}], "supportsControllersDiscrimination": false, "maxX": 1.0, "title": "Synthetic Response Times Distribution"}},
        getOptions: function() {
            return {
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendSyntheticResponseTimeDistribution'
                },
                xaxis:{
                    axisLabel: "Response times ranges",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                    tickLength:0,
                    min:-0.5,
                    max:3.5
                },
                yaxis: {
                    axisLabel: "Number of responses",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                bars : {
                    show: true,
                    align: "center",
                    barWidth: 0.25,
                    fill:.75
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: function(label, xval, yval, flotItem){
                        return yval + " " + label;
                    }
                }
            };
        },
        createGraph: function() {
            var data = this.data;
            var options = this.getOptions();
            prepareOptions(options, data);
            options.xaxis.ticks = data.result.ticks;
            $.plot($("#flotSyntheticResponseTimeDistribution"), prepareData(data.result.series, $("#choicesSyntheticResponseTimeDistribution")), options);
        }

};

// Response time distribution
function refreshSyntheticResponseTimeDistribution() {
    var infos = syntheticResponseTimeDistributionInfos;
    prepareSeries(infos.data, true);
    if (isGraph($("#flotSyntheticResponseTimeDistribution"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesSyntheticResponseTimeDistribution");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        $('#footerSyntheticResponseTimeDistribution .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var activeThreadsOverTimeInfos = {
        data: {"result": {"minY": 1.9994577006507592, "minX": 1.68742752E12, "maxY": 1.9994577006507592, "series": [{"data": [[1.68742752E12, 1.9994577006507592]], "isOverall": false, "label": "Ej3. RequestPokemon", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.68742752E12, "title": "Active Threads Over Time"}},
        getOptions: function() {
            return {
                series: {
                    stack: true,
                    lines: {
                        show: true,
                        fill: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Number of active threads",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20
                },
                legend: {
                    noColumns: 6,
                    show: true,
                    container: '#legendActiveThreadsOverTime'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                selection: {
                    mode: 'xy'
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s : At %x there were %y active threads"
                }
            };
        },
        createGraph: function() {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesActiveThreadsOverTime"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotActiveThreadsOverTime"), dataset, options);
            // setup overview
            $.plot($("#overviewActiveThreadsOverTime"), dataset, prepareOverviewOptions(options));
        }
};

// Active Threads Over Time
function refreshActiveThreadsOverTime(fixTimestamps) {
    var infos = activeThreadsOverTimeInfos;
    prepareSeries(infos.data);
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 7200000);
    }
    if(isGraph($("#flotActiveThreadsOverTime"))) {
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesActiveThreadsOverTime");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotActiveThreadsOverTime", "#overviewActiveThreadsOverTime");
        $('#footerActiveThreadsOverTime .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var timeVsThreadsInfos = {
        getOptions: function() {
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    axisLabel: "Number of active threads",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Average response times in ms",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20
                },
                legend: { noColumns: 2,show: true, container: '#legendTimeVsThreads' },
                selection: {
                    mode: 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s: At %x.2 active threads, Average response time was %y.2 ms"
                }
            };
        },
        createGraph: function() {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesTimeVsThreads"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotTimesVsThreads"), dataset, options);
            // setup overview
            $.plot($("#overviewTimesVsThreads"), dataset, prepareOverviewOptions(options));
        }
};

// Time vs threads
function refreshTimeVsThreads(){
    var infos = timeVsThreadsInfos;
    prepareSeries(infos.data);
    if(infos.data.result.series.length == 0) {
        setEmptyGraph("#bodyTimeVsThreads");
        return;
    }
    if(isGraph($("#flotTimesVsThreads"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesTimeVsThreads");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotTimesVsThreads", "#overviewTimesVsThreads");
        $('#footerTimeVsThreads .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var bytesThroughputOverTimeInfos = {
        data : {"result": {"minY": 4282.833333333333, "minX": 1.68742752E12, "maxY": 4111862.3333333335, "series": [{"data": [[1.68742752E12, 4111862.3333333335]], "isOverall": false, "label": "Bytes received per second", "isController": false}, {"data": [[1.68742752E12, 4282.833333333333]], "isOverall": false, "label": "Bytes sent per second", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.68742752E12, "title": "Bytes Throughput Over Time"}},
        getOptions : function(){
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity) ,
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Bytes / sec",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendBytesThroughputOverTime'
                },
                selection: {
                    mode: "xy"
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s at %x was %y"
                }
            };
        },
        createGraph : function() {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesBytesThroughputOverTime"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotBytesThroughputOverTime"), dataset, options);
            // setup overview
            $.plot($("#overviewBytesThroughputOverTime"), dataset, prepareOverviewOptions(options));
        }
};

// Bytes throughput Over Time
function refreshBytesThroughputOverTime(fixTimestamps) {
    var infos = bytesThroughputOverTimeInfos;
    prepareSeries(infos.data);
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 7200000);
    }
    if(isGraph($("#flotBytesThroughputOverTime"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesBytesThroughputOverTime");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotBytesThroughputOverTime", "#overviewBytesThroughputOverTime");
        $('#footerBytesThroughputOverTime .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
}

var responseTimesOverTimeInfos = {
        getOptions: function(){
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Average response time in ms",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendResponseTimesOverTime'
                },
                selection: {
                    mode: 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s : at %x Average response time was %y ms"
                }
            };
        },
        createGraph: function() {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesResponseTimesOverTime"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotResponseTimesOverTime"), dataset, options);
            // setup overview
            $.plot($("#overviewResponseTimesOverTime"), dataset, prepareOverviewOptions(options));
        }
};

// Response Times Over Time
function refreshResponseTimeOverTime(fixTimestamps) {
    var infos = responseTimesOverTimeInfos;
    prepareSeries(infos.data);
    if(infos.data.result.series.length == 0) {
        setEmptyGraph("#bodyResponseTimeOverTime");
        return;
    }
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 7200000);
    }
    if(isGraph($("#flotResponseTimesOverTime"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesResponseTimesOverTime");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotResponseTimesOverTime", "#overviewResponseTimesOverTime");
        $('#footerResponseTimesOverTime .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var latenciesOverTimeInfos = {
        getOptions: function() {
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Average response latencies in ms",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendLatenciesOverTime'
                },
                selection: {
                    mode: 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s : at %x Average latency was %y ms"
                }
            };
        },
        createGraph: function () {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesLatenciesOverTime"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotLatenciesOverTime"), dataset, options);
            // setup overview
            $.plot($("#overviewLatenciesOverTime"), dataset, prepareOverviewOptions(options));
        }
};

// Latencies Over Time
function refreshLatenciesOverTime(fixTimestamps) {
    var infos = latenciesOverTimeInfos;
    prepareSeries(infos.data);
    if(infos.data.result.series.length == 0) {
        setEmptyGraph("#bodyLatenciesOverTime");
        return;
    }
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 7200000);
    }
    if(isGraph($("#flotLatenciesOverTime"))) {
        infos.createGraph();
    }else {
        var choiceContainer = $("#choicesLatenciesOverTime");
        });
    }
};
