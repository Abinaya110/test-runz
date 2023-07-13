import { Dropdown, MenuProps, Button as ButtonAntd } from "antd";
import LableWithIcon from "../../common/LableWithIcon";
import SvgArrowDown from "../../icons/SvgArrowDown";
import SvgEdit from "../../icons/SvgEdit";
import SvgShare from "../../icons/SvgShare";
import SvgSubmit from "../../icons/SvgSubmit";
import Button from "../../packages/Button/Button";
import Flex from "../../packages/Flex/Flex";
import Text from "../../packages/Text/Text";
import {
  error,
  primaryShade4,
  success,
  textShade1,
  white,
  yellow,
} from "../../theme/colors";
import styles from "./raunzeditscreen.module.css";
import Badge from "../../packages/Badge/Badge";
import { useState } from "react";
import SvgNewWindow from "../../icons/SvgNewWindow";
import SvgUnWindow from "../../icons/SvgUnWindow";
import ButtonGroup from "../../packages/ButtonGroup/ButtonGroup";
import RunzRichText from "./RunzRichText";
import SvgPrint from "../../icons/SvgPrint";
import CreateNewRunzModal from "./CreateNewRunzModal";
import Alert from "../../packages/Alert/Alert";

const LabelWithColumn = ({
  title,
  value,
}: {
  title: string;
  value: string;
}) => {
  return (
    <Flex>
      <Text type="captionBold" color="shade-3">
        {title}
      </Text>
      <Text type="button-2" color="shade-2" style={{ marginTop: 4 }}>
        {value}
      </Text>
    </Flex>
  );
};

const RunzEditScreen = () => {
  const [isStatus, setStatus] = useState<any>("error");
  const [isMore, setMore] = useState<boolean>(false);
  const [isFull, setFull] = useState<boolean>(false);
  const [isTab, setTab] = useState("Results");
  const [editNewRunz, setEditNewRunz] = useState(false);

  const items: MenuProps["items"] = [
    {
      label: "Not started",
      key: "error",
      style: {
        backgroundColor: error,
        borderTopLeftRadius: 8,
        borderTopRightRadius: 8,
        borderBottomLeftRadius: 0,
        borderBottomRightRadius: 0,
        color: white,
        fontFamily: "Poppins-Regular",
        fontSize: 14,
        padding: "8px 16px",
      },
    },
    {
      label: "Completed",
      key: "success",
      style: {
        backgroundColor: success,
        borderRadius: 0,
        color: white,
        fontFamily: "Poppins-Regular",
        fontSize: 14,
        padding: "8px 16px",
      },
    },
    {
      label: "Working",
      key: "primary",
      style: {
        backgroundColor: yellow,
        borderTopLeftRadius: 0,
        borderTopRightRadius: 0,
        borderBottomLeftRadius: 8,
        borderBottomRightRadius: 8,
        color: white,
        fontFamily: "Poppins-Regular",
        fontSize: 14,
        padding: "8px 16px",
      },
    },
  ];

  const menuProps = {
    items,
    onClick: (event: any) => {
      setStatus(event.key);
    },
  };

  let status = "Not started";
  if (isStatus === "error") {
    status = "Not started";
  } else if (isStatus === "success") {
    status = "Completed";
  } else if (isStatus === "primary") {
    status = "Working";
  }

  const handleTab = (value: string) => {
    setTab(value);
  };
  return (
    <Flex className={styles.overAll}>
      <CreateNewRunzModal
        title="Edit Runz"
        open={editNewRunz}
        cancelClick={() => {
          setEditNewRunz(false);
        }}
        submit={() => {
          Alert("Runz saved successfully.");
          setEditNewRunz(false);
        }}
      />
      <Flex className={styles.header}>
        <Flex row center between>
          <Flex>
            <Text color="shade-3" type="captionBold">
              ID023659ADN / Dept-Computer science / Lab-Data structure
            </Text>
            <Text className={styles.subTitle} type="subTitle">
              Bubble sort 2
            </Text>
          </Flex>
          <Flex row center>
            <Button types="link">
              <LableWithIcon
                actionLeft={() => <SvgSubmit fill={textShade1} />}
                label="Submit"
                type="button-2"
              />
            </Button>
            <Button types="link" className={styles.svgShare}>
              <LableWithIcon
                actionLeft={() => <SvgShare fill={textShade1} />}
                label="Share"
                type="button-2"
              />
            </Button>
            <Button
              types="link"
              onClick={() => {
                setEditNewRunz(true);
              }}
            >
              <LableWithIcon
                actionLeft={() => <SvgEdit fill={textShade1} />}
                label="Edit"
                type="button-2"
              />
            </Button>
            <Button
              onClick={() => setMore(!isMore)}
              types="link"
              className={styles.svgMore}
            >
              <LableWithIcon
                actitionRight={() => <SvgArrowDown fill={textShade1} />}
                label="More Info"
                type="button-2"
              />
            </Button>
          </Flex>
        </Flex>
        {isMore && (
          <Flex center row between className={styles.moreFlex}>
            <LabelWithColumn
              title="Test objective"
              value="Time period of pendulum"
            />
            <LabelWithColumn title="Created by" value="Username" />
            <LabelWithColumn title="Assigned by" value="Username" />
            <LabelWithColumn title="Created on" value="28/05/2023 (Wed)" />
            <LabelWithColumn title="Due date" value="31/05/2023 (Sat)" />

            <Flex>
              <Dropdown menu={menuProps} overlayStyle={{ marginBottom: 8 }}>
                <ButtonAntd className={styles.statusBtn}>
                  <LableWithIcon
                    type="captionBold"
                    label="Status"
                    actitionRight={() => (
                      <SvgArrowDown
                        height={20}
                        width={20}
                        fillOne={primaryShade4}
                      />
                    )}
                  />
                </ButtonAntd>
              </Dropdown>
              <Badge className={styles.badge} type={isStatus}>
                {status}
              </Badge>
            </Flex>
          </Flex>
        )}
      </Flex>

      <div className={styles.borderBottom} />
      <Flex row>
        <Flex
          height={window.innerHeight - 179}
          flex={7}
          className={styles.textContent}
        >
          <Button
            onClick={() => setFull(!isFull)}
            types="link"
            className={styles.svgNewWindow}
          >
            {isFull ? <SvgUnWindow /> : <SvgNewWindow />}
          </Button>
          <Text tag={"pre"} className={styles.preTag}>
            {`Aim
To measure the time period of a simple pendulum.

Apparatus required
A wire of unknown resistance (~10Ω), battery eliminator or an accumulator (0 to 3V) or two dry cells (1.5 V each), voltmeter (0-5 V), milliammeter (0– 500 mA), rheostat, plug key, connecting wires and a piece of sand paper.

Principle
is directly proportional to the potential difference across its ends, provided the physical state of the conductor remains unchanged. If I be the current flowing through the conductor and V the potential difference across its ends, then according to Ohm's law V I ∝ and hence V = RI where R is the constant of proportionality and is termed as the electrical resistance of the conductor. If V is expressed in volts and I in amperes, then R is expressed in ohms. The resistance R, depends upon the material and dimensions of the conductor. For a wire of uniform cross-section, the resistance depends on the length l and the area of cross-section A. It also depends on the temperature of the conductor. At a given temperature the resistance R = l A ρ where ρ is the specific resistance or resistivity and is characteristic of the material of wire.

Procedure
1. Clean the ends of the connecting wires with the help of sand paper in order to remove any insulating coating on them.
2. Connect various components - resistance, rheostat, battery, key, voltmeter and ammeter as shown in Fig. E 1.2.
3. Note whether pointers in milliammeter and voltmeter coincide with the zero mark on the measuring scale. If it is not so, adjust the pointer to coincide with the zero mark by adjusting the screw provided near the base of the needle using a screw driver. 
4. Note the range and least count of the given voltmeter and milliammeter. 
5. Insert the key K and slide the rheostat contact to one of its extreme ends, so that current passing through the resistance wire is minimum. 
6. Note the milliammeter and voltmeter readings.
7. Remove the key K and allow the wire to cool, if heated. Again insert the key. Shift the rheostat contact slightly to increase the applied voltage. Note the milliammeter and voltmeter reading.
8. Repeat step 7 for four different settings of the rheostat. Record your observations in a tabular form.

Observations
1. Range of ammeter = 0 ... mA to ...mA 
2. Least count of ammeter = ... mA 
3. Range of voltmeter = 0 ... V to ...V 
4. Least count of voltmeter = ...V 
5. Least count of metre scale = ... m 
6. Length of the given wire, l = ...m`}
          </Text>
        </Flex>
        {!isFull && (
          <Flex flex={5}>
            <Flex>
              <ButtonGroup
                defaultSelected={"Results"}
                buttons={["Results", "Charts", "Remarks"]}
                onButtonChange={handleTab}
              />
              <Flex
                height={window.innerHeight - 303}
                className={styles.actionFlex}
              >
                {isTab === "Results" && <RunzRichText height={"100%"} />}
                {isTab === "Charts" && <></>}
                {isTab === "Remarks" && <RunzRichText height={"100%"} />}
              </Flex>
              <Flex row center between className={styles.footer}>
                <Button types="tertiary-1">Back</Button>
                <Flex row center>
                  <SvgPrint />
                  <Button style={{ marginLeft: 8 }}>Save</Button>
                </Flex>
              </Flex>
            </Flex>
          </Flex>
        )}
      </Flex>
    </Flex>
  );
};

export default RunzEditScreen;
