import { useState } from "react";

const data = [
  { label: "Apple", value: 10, color: "red" },
  { label: "Banana", value: 20, color: "yellow" },
  { label: "Cherry", value: 30, color: "pink" },
];

const CurvyPieChart = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  // calculate the total value of the data
  const total = data.reduce((acc, item) => acc + item.value, 0);

  // calculate the percentage of each data item
  const percentages = data.map((item) => item.value / total);

  // calculate the start and end angles of each data item
  const angles = percentages.reduce(
    (acc, percentage) => {
      const startAngle = acc[acc.length - 1].endAngle;
      const endAngle = startAngle + percentage * Math.PI * 2;
      return [...acc, { startAngle, endAngle }];
    },
    [{ startAngle: 0, endAngle: 0 }]
  );

  // calculate the position of the label along the arc
  const labelPositions = angles.map(({ startAngle, endAngle }) => {
    const radius = 100;
    const angle = (startAngle + endAngle) / 2;
    const x = radius * Math.cos(angle);
    const y = radius * Math.sin(angle);
    const isLeftHalf = angle > Math.PI / 2 && angle < Math.PI * 1.5;
    return { x, y, isLeftHalf };
  });

  return (
    <svg width="200" height="200">
      {data.map((item, index) => {
        const { startAngle, endAngle } = angles[index];
        const { x, y, isLeftHalf } = labelPositions[index];

        // calculate the path of the arc
        const radius = 100;
        const largeArcFlag = endAngle - startAngle <= Math.PI ? 0 : 1;
        const sweepFlag = 1;
        const x1 = radius * Math.cos(startAngle);
        const y1 = radius * Math.sin(startAngle);
        const x2 = radius * Math.cos(endAngle);
        const y2 = radius * Math.sin(endAngle);
        const d = `M ${x1} ${y1} A ${radius} ${radius} 0 ${largeArcFlag} ${sweepFlag} ${x2} ${y2} L 0 0`;

        // add the active class if the current index is active
        const className = index === activeIndex ? "active" : "";

        return (
          <g key={index} onClick={() => setActiveIndex(index)}>
            <path d={d} fill={item.color} className={className} />
            <text
              x={x}
              y={y}
              textAnchor={isLeftHalf ? "end" : "start"}
              dominantBaseline="central"
              className={className}
            >
              {item.label}
            </text>
          </g>
        );
      })}
    </svg>
  );
};

export default CurvyPieChart;
