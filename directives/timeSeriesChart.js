'use strict';

angular.module('mean.system').directive('timeserieschart', function() {
    return {
        restrict: 'E',
        scope: {
            'data': '='
        },
        link: function(scope, element, attributes) {

            //TODO Move to somewhere else
            function bindTooltip(tooltipFormatter) {
                return function(ev, pos, item) {
                    console.log('tooltip');
                    if (item) {
                        $("#tooltip").html(tooltipFormatter(item)).css({
                            top: pos.pageY + 10,
                            left: pos.pageX + 10,
                            border: '1px solid ' + item.series.color
                        }).fadeIn(200);
                    } else {
                        $("#tooltip").hide();
                    }
                };
            }

            var chart = null,
                options = {
                    xaxis: {
                        mode: "time",
                        tickFormatter: function(value) {
                            return moment(value).format("D.M");
                        }
                    },
                    grid: {
                        hoverable: true,
                        borderWidth: 0
                    },
                    series: {
                        color: '#397ab3',
                        shadowSize: 0
                    }
                };

            element.addClass('flotchart');

            $(element.append('<div></div><div id="tooltip"></div>'));
            var plotContainer = $(element.children()[0]);
            plotContainer.css({
                width: element[0].clientWidth,
                height: element[0].clientHeight
            });

            scope.$watch('data', function(data) {
                if (data) {
                    if (!chart) {
                        chart = $.plot(plotContainer, data, options);
                        $(chart).bind("plothover", bindTooltip(function(item) {
                            return moment(item.datapoint[0]).format("D.M.YYYY") + " : " + item.datapoint[1];
                        }));
                    } else {
                        chart.setData(data);
                        chart.setupGrid();
                        chart.draw();
                    }
                }
            }, true);
        }
    };
});
