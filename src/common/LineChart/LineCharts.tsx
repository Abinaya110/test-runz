import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { FieldArray, FormikProvider, useFormik } from "formik";
import LineChartsList from "./LineChartsList";
import { useEffect } from "react";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  interaction: {
    mode: "index" as const,
    intersect: false,
  },
  stacked: false,
  plugins: {
    title: {
      display: false,
      text: "Chart.js Line Chart - Multi Axis",
    },
  },
  scales: {
    y1: {
      type: "linear" as const,
      display: true,
      position: "left" as const,
    },
    y2: {
      type: "linear" as const,
      display: true,
      position: "right" as const,
      grid: {
        drawOnChartArea: false,
      },
    },
    y3: {
      type: "linear" as const,
      display: true,
      position: "left" as const,
      grid: {
        drawOnChartArea: false,
      },
    },
    y4: {
      type: "linear" as const,
      display: true,
      position: "right" as const,
      grid: {
        drawOnChartArea: false,
      },
    },
  },
};

const labels = ["January", "February", "March", "April", "May", "June", "July"];

export const data = {
  labels,
  datasets: [
    {
      label: "Dataset 1",
      data: [2, 1, 3, 4, 2, 4, 7],
      borderColor: "rgb(255, 99, 132)",
      backgroundColor: "rgba(255, 99, 132, 0.5)",
      yAxisID: "y1",
    },
    {
      label: "Dataset 1",
      data: [2, 1, 6, 4, 1, 3, 8],
      borderColor: "rgb(255, 99, 132)",
      backgroundColor: "rgba(255, 99, 132, 0.5)",
      yAxisID: "y2",
    },
    {
      label: "Dataset 2",
      data: [2, 7, 3, 0, 2, 3, 7],
      borderColor: "rgb(53, 162, 235)",
      backgroundColor: "rgba(53, 162, 235, 0.5)",
      yAxisID: "y3",
    },
    {
      label: "Dataset 2",
      data: [2, 5, 1, 4, 2, 9, 9],
      borderColor: "rgb(53, 162, 235)",
      backgroundColor: "rgba(53, 162, 235, 0.5)",
      yAxisID: "y4",
    },
  ],
};

// import React from "react";
// import {
//   Chart as ChartJS,
//   CategoryScale,
//   LinearScale,
//   PointElement,
//   LineElement,
//   Title,
//   Tooltip,
//   Legend,
// } from "chart.js";
// import { Line } from "react-chartjs-2";
// import faker from "faker";

// ChartJS.register(
//   CategoryScale,
//   LinearScale,
//   PointElement,
//   LineElement,
//   Title,
//   Tooltip,
//   Legend
// );

// export const options = {
//   responsive: true,
//   interaction: {
//     mode: "index" as const,
//     intersect: false,
//   },
//   stacked: false,
//   plugins: {
//     title: {
//       display: true,
//       text: "Chart.js Line Chart - Multi Axis",
//     },
//   },
//   scales: {
//     y1: {
//       type: "linear" as const,
//       display: true,
//       position: "left" as const,
//     },
//     y2: {
//       type: "linear" as const,
//       display: true,
//       position: "right" as const,
//       grid: {
//         drawOnChartArea: false,
//       },
//     },
//     y3: {
//       type: "linear" as const,
//       display: true,
//       position: "left" as const,
//       grid: {
//         drawOnChartArea: false,
//       },
//     },
//     y4: {
//       type: "linear" as const,
//       display: true,
//       position: "right" as const,
//       grid: {
//         drawOnChartArea: false,
//       },
//     },
//   },
// };

// const labels = ["January", "February", "March", "April", "May", "June", "July"];

// export const data = {
//   labels,
//   datasets: [
//     {
//       label: "Dataset 1",
//       data: labels.map(() => faker.datatype.number({ min: -1000, max: 1000 })),
//       borderColor: "rgb(255, 99, 132)",
//       backgroundColor: "rgba(255, 99, 132, 0.5)",
//       yAxisID: "y1",
//     },
//     {
//       label: "Dataset 1",
//       data: labels.map(() => faker.datatype.number({ min: -1000, max: 1000 })),
//       borderColor: "rgb(255, 99, 132)",
//       backgroundColor: "rgba(255, 99, 132, 0.5)",
//       yAxisID: "y2",
//     },
//     {
//       label: "Dataset 2",
//       data: labels.map(() => faker.datatype.number({ min: -1000, max: 1000 })),
//       borderColor: "rgb(53, 162, 235)",
//       backgroundColor: "rgba(53, 162, 235, 0.5)",
//       yAxisID: "y3",
//     },
//     {
//       label: "Dataset 2",
//       data: labels.map(() => faker.datatype.number({ min: -1000, max: 1000 })),
//       borderColor: "rgb(53, 162, 235)",
//       backgroundColor: "rgba(53, 162, 235, 0.5)",
//       yAxisID: "y4",
//     },
//   ],
// };

// export function App() {
//   return <Line options={options} data={data} />;
// }

export type formType = {
  data: {
    labels: string[];
    xAxisLabel: string;
    datasets: {
      label: string;
      data: number[];
      borderColor: string;
      backgroundColor: string;
    }[];
  }[];
};

const initialValues: formType = {
  data: [],
};

const LineCharts = () => {
  const formik = useFormik({
    initialValues,
    onSubmit: () => {},
  });

  let arrayLineDataInitial: any;
  useEffect(() => {
    // arrayLineDataInitial = [{ ...lineData, datasets: [lineData.datasets[0]] }];
    // formik.setFieldValue("data", arrayLineDataInitial);
  }, []);

  return (
    <div style={{ height: 300 }}>
      <Line style={{ height: "100%" }} options={options} data={data} />
      {/* <FormikProvider value={formik}>
        <FieldArray
          name="data"
          render={(formikHelpers) =>
            formik.values.data.map((list, index) => {
              return (
                <LineChartsList
                  formik={formik}
                  formikHelpers={formikHelpers}
                  index={index}
                  options={options}
                  list={list}
                  lineData={lineData}
                  arrayLineDataInitial={arrayLineDataInitial}
                />
              );
            })
          }
        />
      </FormikProvider> */}
    </div>
  );
};

export default LineCharts;
