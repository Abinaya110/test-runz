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
  plugins: {
    legend: {
      position: "top" as const,
      // display: false,
    },
    title: {
      display: false,
      text: "Chart.js Line Chart",
    },
  },
};

const labels = ["January", "February", "March", "April", "May", "June", "July"];

const lineData = {
  labels,
  xAxisLabel: "Time",
  datasets: [
    {
      label: "Distance",
      data: [2, 5, 1, 7, 5, 2],
      borderColor: "#DA1C1C",
      backgroundColor: "#DA1C1C",
    },
    {
      label: "Acceleration",
      data: [2, 1, 4, 6, 2, 5],
      borderColor: "#008000",
      backgroundColor: "#008000",
    },
    {
      label: "Speed",
      data: [8, 2, 4, 1, 5, 7],
      borderColor: "#4682B4",
      backgroundColor: "#4682B4",
    },
    {
      label: "Speed 4",
      data: [4, 1, 5, 7, 3, 4],
      borderColor: "#FF4500",
      backgroundColor: "#FF4500",
    },
  ],
};

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
    arrayLineDataInitial = [{ ...lineData, datasets: [lineData.datasets[0]] }];
    formik.setFieldValue("data", arrayLineDataInitial);
  }, []);

  return (
    <div>
      <FormikProvider value={formik}>
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
      </FormikProvider>
    </div>
  );
};

export default LineCharts;
