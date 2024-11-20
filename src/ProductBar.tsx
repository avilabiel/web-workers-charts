import Product from "./Product";
import { BarDatum, ResponsiveBar } from "@nivo/bar";
import _ from "lodash";
import { useEffect, useState } from "react";

interface ProductPriorityAggregationPerYear extends BarDatum {
  year: string;
  p1: number;
  p1Color: string;
  p2: number;
  p2Color: string;
  p3: number;
  p3Color: string;
  p4: number;
  p4Color: string;
}

function ProductBar({ products }: { products: Product[] }) {
  const [transformedData, setTransformedData] = useState<
    ProductPriorityAggregationPerYear[]
  >([]);

  const buildProductPriorityAggregationPerYear = (
    products: Product[]
  ): void => {
    if (products.length === 0) {
      return;
    }

    const groupByYear = _.groupBy(products, (product) =>
      new Date(product.created_at).getFullYear()
    );
    const data: ProductPriorityAggregationPerYear[] = [];

    // It's important to keep it O(n^2) and limit how granullar and far Analytics can go
    // Case that would go O(n^3) if we had to go further and group by year and month and priority
    for (const year in groupByYear) {
      const yearResult: ProductPriorityAggregationPerYear = {
        year,
        p1: 0,
        p1Color: "hsl(27, 70%, 50%)",
        p2: 0,
        p2Color: "hsl(356, 70%, 50%)",
        p3: 0,
        p3Color: "hsl(57, 70%, 50%)",
        p4: 0,
        p4Color: "hsl(258, 70%, 50%)",
      };

      const groupByPriority = _.groupBy(
        groupByYear[year],
        (product) => product.priority
      );

      for (const priority in groupByPriority) {
        yearResult[priority] = groupByPriority[priority].length;
      }

      data.push(yearResult);
    }

    setTransformedData(data);
  };

  useEffect(() => {
    // Approach #1 - This is a heavy operation, so we should use a Web Worker
    buildProductPriorityAggregationPerYear(products);
  }, [products]);

  if (products.length === 0) {
    return "Loading...";
  }

  return (
    <div
      style={{
        width: 1000,
        height: 680,
        textAlign: "center",
        margin: "0 auto",
      }}
    >
      <ResponsiveBar
        data={transformedData}
        keys={["p1", "p2", "p3", "p4"]}
        indexBy="year"
        margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
        padding={0.3}
        valueScale={{ type: "linear" }}
        indexScale={{ type: "band", round: true }}
        colors={{ scheme: "nivo" }}
        defs={[
          {
            id: "dots",
            type: "patternDots",
            background: "inherit",
            color: "#38bcb2",
            size: 4,
            padding: 1,
            stagger: true,
          },
          {
            id: "lines",
            type: "patternLines",
            background: "inherit",
            color: "#eed312",
            rotation: -45,
            lineWidth: 6,
            spacing: 10,
          },
        ]}
        fill={[
          {
            match: {
              id: "fries",
            },
            id: "dots",
          },
          {
            match: {
              id: "sandwich",
            },
            id: "lines",
          },
        ]}
        borderColor={{
          from: "color",
          modifiers: [["darker", 1.6]],
        }}
        axisTop={null}
        axisRight={null}
        axisBottom={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: "country",
          legendPosition: "middle",
          legendOffset: 32,
          truncateTickAt: 0,
        }}
        axisLeft={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: "food",
          legendPosition: "middle",
          legendOffset: -40,
          truncateTickAt: 0,
        }}
        labelSkipWidth={12}
        labelSkipHeight={12}
        labelTextColor={{
          from: "color",
          modifiers: [["darker", 1.6]],
        }}
        legends={[
          {
            dataFrom: "keys",
            anchor: "bottom-right",
            direction: "column",
            justify: false,
            translateX: 120,
            translateY: 0,
            itemsSpacing: 2,
            itemWidth: 100,
            itemHeight: 20,
            itemDirection: "left-to-right",
            itemOpacity: 0.85,
            symbolSize: 20,
            effects: [
              {
                on: "hover",
                style: {
                  itemOpacity: 1,
                },
              },
            ],
          },
        ]}
        role="application"
        ariaLabel="Nivo bar chart demo"
        barAriaLabel={(e) =>
          e.id + ": " + e.formattedValue + " in country: " + e.indexValue
        }
      />
    </div>
  );
}

export default ProductBar;
