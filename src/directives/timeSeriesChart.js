'use strict';

angular.module('simpleCharts').directive('timeserieschart', function() {
    return {
        restrict: 'A',
        scope: {
            'data': '=',
            'options': '='
        },
        link: function(scope, element, attributes) {

            //TODO Move to somewhere else
            var bindTooltip = function(tooltipFormatter) {
                return function(ev, pos, item) {
                    if (item) {
                        tooltipContainer.html(tooltipFormatter(item)).css({
                            top: pos.pageY + 10,
                            left: pos.pageX + 10,
                            border: '1px solid ' + item.series.color
                        }).fadeIn(200);
                    } else {
                        tooltipContainer.hide();
                    }
                };
            }

            var chart = null,
                defaultOptions = {
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

            var options = $.extend(defaultOptions, attributes.options || {});

            element.addClass('simple-chart-chart');
            element.append('<div></div>');
            var plotContainer = angular.element(element.children()[0]);
            plotContainer.css({
                width: element[0].clientWidth,
                height: element[0].clientHeight
            });
 
            var tooltipContainer = angular.element('<div class="simple-chart-tooltip"></div>');
            angular.element('body').append(tooltipContainer)

            scope.$watch('data', function(data) {
                if (data) {
                    if (!chart) {
                        chart = $.plot(plotContainer, data, options);
                        $(plotContainer).bind("plothover", bindTooltip(function(item) {
                            return moment(item.datapoint[0]).format("D.M.YYYY") + " : " + item.datapoint[1];
                        }));
                    } else {
                        chart.setData(data);
                        chart.setupGrid();
                        chart.draw();
                    }
                }
            });
        }
    };
});
