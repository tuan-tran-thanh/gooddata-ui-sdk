// (C) 2019-2020 GoodData Corporation
import { IVisualizationClass } from "@gooddata/sdk-model";
import sortBy from "lodash/sortBy";

export const visualizationClasses: IVisualizationClass[] = sortBy(
    [
        {
            visualizationClass: {
                checksum: "local",
                icon: "local:scatter",
                orderIndex: 7,
                iconSelected: "local:scatter.selected",
                url: "local:scatter",
                title: "Scatter plot",
                identifier: "gdc.visualization.scatter",
                uri: "/gdc/md/gtl83h4doozbp26q0kf5qg8uiyu4glyn/obj/1",
            },
        },
        {
            visualizationClass: {
                checksum: "local",
                icon: "local:donut",
                orderIndex: 10,
                iconSelected: "local:donut.selected",
                url: "local:donut",
                title: "Donut chart",
                identifier: "gdc.visualization.donut",
                uri: "/gdc/md/gtl83h4doozbp26q0kf5qg8uiyu4glyn/obj/2",
            },
        },
        {
            visualizationClass: {
                checksum: "local",
                icon: "local:area",
                orderIndex: 4,
                iconSelected: "local:area.selected",
                url: "local:area",
                title: "Stacked Area chart",
                identifier: "gdc.visualization.area",
                uri: "/gdc/md/gtl83h4doozbp26q0kf5qg8uiyu4glyn/obj/3",
            },
        },
        {
            visualizationClass: {
                checksum: "local",
                icon: "local:table",
                orderIndex: 0,
                iconSelected: "local:table.selected",
                url: "local:table",
                title: "Table",
                identifier: "gdc.visualization.table",
                uri: "/gdc/md/gtl83h4doozbp26q0kf5qg8uiyu4glyn/obj/4",
            },
        },
        {
            visualizationClass: {
                checksum: "local",
                icon: "local:headline",
                orderIndex: 6,
                iconSelected: "local:headline.selected",
                url: "local:headline",
                title: "Headline",
                identifier: "gdc.visualization.headline",
                uri: "/gdc/md/gtl83h4doozbp26q0kf5qg8uiyu4glyn/obj/5",
            },
        },
        {
            visualizationClass: {
                checksum: "local",
                icon: "local:column",
                orderIndex: 1,
                iconSelected: "local:column.selected",
                url: "local:column",
                title: "Column chart",
                identifier: "gdc.visualization.column",
                uri: "/gdc/md/gtl83h4doozbp26q0kf5qg8uiyu4glyn/obj/6",
            },
        },
        {
            visualizationClass: {
                checksum: "local",
                icon: "local:line",
                orderIndex: 3,
                iconSelected: "local:line.selected",
                url: "local:line",
                title: "Line chart",
                identifier: "gdc.visualization.line",
                uri: "/gdc/md/gtl83h4doozbp26q0kf5qg8uiyu4glyn/obj/7",
            },
        },
        {
            visualizationClass: {
                checksum: "local",
                icon: "local:treemap",
                orderIndex: 12,
                iconSelected: "local:treemap.selected",
                url: "local:treemap",
                title: "Treemap",
                identifier: "gdc.visualization.treemap",
                uri: "/gdc/md/gtl83h4doozbp26q0kf5qg8uiyu4glyn/obj/8",
            },
        },
        {
            visualizationClass: {
                checksum: "local",
                icon: "local:heatmap",
                orderIndex: 13,
                iconSelected: "local:heatmap.selected",
                url: "local:heatmap",
                title: "Heatmap",
                identifier: "gdc.visualization.heatmap",
                uri: "/gdc/md/gtl83h4doozbp26q0kf5qg8uiyu4glyn/obj/9",
            },
        },
        {
            visualizationClass: {
                checksum: "local",
                icon: "local:bubble",
                orderIndex: 8,
                iconSelected: "local:bubble.selected",
                url: "local:bubble",
                title: "Bubble chart",
                identifier: "gdc.visualization.bubble",
                uri: "/gdc/md/gtl83h4doozbp26q0kf5qg8uiyu4glyn/obj/10",
            },
        },
        {
            visualizationClass: {
                checksum: "local",
                icon: "local:pie",
                orderIndex: 9,
                iconSelected: "local:pie.selected",
                url: "local:pie",
                title: "Pie chart",
                identifier: "gdc.visualization.pie",
                uri: "/gdc/md/gtl83h4doozbp26q0kf5qg8uiyu4glyn/obj/11",
            },
        },
        {
            visualizationClass: {
                checksum: "local",
                icon: "local:bar",
                orderIndex: 2,
                iconSelected: "local:bar.selected",
                url: "local:bar",
                title: "Bar chart",
                identifier: "gdc.visualization.bar",
                uri: "/gdc/md/gtl83h4doozbp26q0kf5qg8uiyu4glyn/obj/12",
            },
        },
        {
            visualizationClass: {
                checksum: "local",
                icon: "local:combo",
                orderIndex: 5,
                iconSelected: "local:combo.selected",
                url: "local:combo2",
                title: "Combo",
                identifier: "gdc.visualization.combo",
                uri: "/gdc/md/gtl83h4doozbp26q0kf5qg8uiyu4glyn/obj/669",
            },
        },
        {
            visualizationClass: {
                checksum: "local",
                icon: "local:bullet",
                orderIndex: 19,
                iconSelected: "local:bullet.selected",
                url: "local:bullet",
                title: "Bullet",
                identifier: "gdc.visualization.bullet",
                uri: "/gdc/md/gtl83h4doozbp26q0kf5qg8uiyu4glyn/obj/1000",
            },
        },
        {
            visualizationClass: {
                checksum: "local",
                icon: "local:pushpin",
                orderIndex: 20,
                iconSelected: "local:pushpin.selected",
                url: "local:pushpin",
                title: "Geo Pushpin",
                identifier: "gdc.visualization.pushpin",
                uri: "/gdc/md/gtl83h4doozbp26q0kf5qg8uiyu4glyn/obj/1001",
            },
        },
    ],
    (cls) => cls.visualizationClass.orderIndex,
);
