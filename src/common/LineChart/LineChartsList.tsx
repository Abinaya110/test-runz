import { Line } from "react-chartjs-2";
import { ChangeEventHandler } from "react";
import { FieldArrayRenderProps, FormikProps } from "formik";
import Flex from "../../packages/Flex/Flex";
import Button from "../../packages/Button/Button";
import LableWithIcon from "../LableWithIcon";
import SvgPlus from "../../icons/SvgPlus";
import styles from "./linechartslist.module.css";
import Text from "../../packages/Text/Text";
import InputText from "../../packages/InputText/InputText";
import { formType } from "./LineCharts";

const LabelColorInput = ({
  title,
  value,
  onChange,
  color,
  onChangeColor,
  isColor = true,
}: {
  title: string;
  value: string;
  color?: string;
  onChangeColor?: ChangeEventHandler<HTMLInputElement>;
  onChange: ChangeEventHandler<HTMLInputElement>;
  isColor?: boolean;
}) => {
  return (
    <Flex row center>
      <Text type="subTitle">{title}</Text>
      <Flex className={styles.axisLabel}>
        <InputText
          onChange={onChange}
          value={value}
          className={styles.xAxisInput}
          size="small"
        />
      </Flex>

      {isColor && (
        <input
          onChange={onChangeColor}
          className={styles.colorInput}
          type="color"
          value={color}
        />
      )}
    </Flex>
  );
};

type Props = {
  options: any;
  list: {
    labels: string[];
    xAxisLabel: string;
    datasets: {
      label: string;
      data: number[];
      borderColor: string;
      backgroundColor: string;
    }[];
  };
  index: number;
  formikHelpers: FieldArrayRenderProps;
  lineData: {
    labels: string[];
    xAxisLabel: string;
    datasets: {
      label: string;
      data: number[];
      borderColor: string;
      backgroundColor: string;
    }[];
  };
  formik: FormikProps<formType>;
  arrayLineDataInitial: any;
};

const LineChartsList = ({ options, list, index, lineData, formik }: Props) => {
  const handleAddChart = () => {
    formik.setFieldValue("data", [
      ...formik.values.data,
      { ...lineData, datasets: [lineData.datasets[0]] },
    ]);
  };

  return (
    <Flex>
      <Flex row center between className={styles.titleFlex}>
        <Text type="subTitle">Chart no. {index + 1}</Text>
        {index === 0 && (
          <Button
            onClick={handleAddChart}
            height="small"
            className={styles.addBtn}
            types="tertiary"
          >
            <LableWithIcon
              label="Add Chart"
              actionLeft={() => <SvgPlus height={20} width={20} />}
            />
          </Button>
        )}
      </Flex>
      <Flex row start between>
        <LabelColorInput
          title={"X"}
          value={formik.values.data[index].xAxisLabel}
          color={"#DA1C1C"}
          onChangeColor={() => {}}
          onChange={() => {}}
          isColor={false}
        />
        <Flex>
          {list.datasets.map((dataSetList, dataSetIndex: number) => {
            return (
              <div style={{ marginBottom: 8 }}>
                <LabelColorInput
                  title={`Y${dataSetIndex + 1}`}
                  value={formik.values.data[index].datasets[dataSetIndex].label}
                  color={dataSetList.borderColor}
                  onChangeColor={(event) => {
                    formik.setFieldValue(
                      `data[${index}].datasets[${dataSetIndex}].borderColor`,
                      event.target.value
                    );

                    formik.setFieldValue(
                      `data[${index}].datasets[${dataSetIndex}].backgroundColor`,
                      event.target.value
                    );
                  }}
                  onChange={formik.handleChange(
                    `data[${index}].datasets[${dataSetIndex}].label`
                  )}
                />
              </div>
            );
          })}
        </Flex>
      </Flex>
      <Flex end>
        <Button
          onClick={() =>
            formik.setFieldValue("data", [
              {
                labels: list.labels,
                datasets: [
                  ...list.datasets,
                  lineData.datasets[list.datasets.length],
                ],
              },
            ])
          }
          height="small"
          disabled={lineData.datasets.length === list.datasets.length}
          className={styles.addAxis}
          types="tertiary"
        >
          <LableWithIcon
            label={`Add Y${list.datasets.length + 1}`}
            actionLeft={() => <SvgPlus height={20} width={20} />}
          />
        </Button>
      </Flex>

      <Line options={options} data={list} />
    </Flex>
  );
};

export default LineChartsList;
