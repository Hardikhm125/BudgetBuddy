import Chart from "react-apexcharts";
import { useSelector } from "react-redux";

export const MyExpPie = () => {

  const { employeeExpenses, totalMoneySpent } = useSelector(state => state.statistic)

  const optionsRadial = {
    plotOptions: {
      radialBar: {
        startAngle: 0,
        endAngle: 360,
        hollow: {
          margin: 0,
          size: "70%",
          background: "#fff",
          position: "front",
          dropShadow: {
            enabled: true,
            top: 3,
            left: 0,
            blur: 4,
            opacity: 0.25
          }
        },
        track: {
          background: "#fff",
          strokeWidth: "67%",
          margin: 0,
          dropShadow: {
            enabled: true,
            top: -3,
            left: 5,
            blur: 4,
            opacity: 0.25
          }
        },
        dataLabels: {
          showOn: "always",
          name: {
            offsetY: -20,
            show: true,
            color: "#888",
            fontSize: "13px"
          },
          value: {
            formatter: function (val) {
              return val;
            },
            color: "#111",
            fontSize: "30px",
            show: true
          }
        }
      }
    },
    fill: {
      type: "gradient",
      gradient: {
        shade: "dark",
        type: "horizontal",
        shadeIntensity: 0.5,
        gradientToColors: ["#ABE5A1"],
        inverseColors: true,
        stops: [0, 100]
      }
    },
    stroke: {
      lineCap: "round"
    },
    labels: ["Percent"]
  };

  const round = (num) => {
    return Math.round((num + Number.EPSILON) * 100) / 100;
  };

  let seriesRadial = [0];
  
  if (totalMoneySpent > 0)
    seriesRadial = [round(employeeExpenses / totalMoneySpent * 100)];
  
  return (
    <div className="d-flex flew-row justify-content-end">
          <Chart
            options={optionsRadial}
            series={seriesRadial}
            type="radialBar"
            width="350"
          />
    </div>
  );
};





