import Flex from "../../packages/Flex/Flex";
import Text from "../../packages/Text/Text";
import ScreenHeader from "./ScreenHeader";
import styles from "./settings.module.css";
import SvgRadioBox from "../../icons/SvgRadioBox";
import SvgRadioOutline from "../../icons/SvgRadioOutline";
import { useEffect, useState } from "react";
import {PROFILE_ACCESS_LIST, PROCEDURE_ACCESS_LIST} from '../../utils/localStoreConst';

type listInterface = {
  id: number;
  title: string;
  isAdmin: boolean;
  isRequest: boolean;
  isTest: boolean;
}[];

const RoleScreen = () => {
  const [list, setList] = useState<listInterface>([]);
  const [profileList, setProfileList] = useState<listInterface>([]);
  const size = 18;

  useEffect(() => {
    setList(PROCEDURE_ACCESS_LIST);
    setProfileList(PROFILE_ACCESS_LIST);
  }, []);

  const handleUpdateRadio = (
    data: any,
    value: string,
    booleanVal: boolean,
    head: string
  ) => {
    const dataObj = data;
    const selectedColumn = value;
    const passedBoolean = booleanVal;
    const moduleHead = head;

    if (moduleHead === "procedure") {
      const updated = list.map((c) => {
        if (c.id === dataObj.id) {
          c.isAdmin = selectedColumn === "admin" ? passedBoolean : c.isAdmin;
          c.isRequest =
            selectedColumn === "request" ? passedBoolean : c.isRequest;
          c.isTest = selectedColumn === "test" ? passedBoolean : c.isTest;
          return c;
        } else {
          return c;
        }
      });
      setList(updated);
    } else if (moduleHead === "profile") {
      const updated = profileList.map((c) => {
        if (c.id === dataObj.id) {
          c.isAdmin = selectedColumn === "admin" ? passedBoolean : c.isAdmin;
          c.isRequest =
            selectedColumn === "request" ? passedBoolean : c.isRequest;
          c.isTest = selectedColumn === "test" ? passedBoolean : c.isTest;
          return c;
        } else {
          return c;
        }
      });
      setProfileList(updated);
    }
  };
  return (
    <Flex>
      <ScreenHeader
        title={"Role Management"}
        description={
          "Select the kinds of notifications you get about your activities and recommendations."
        }
        isSearch={true}
        isBtn={false}
      />

      <Flex className={styles.marginOverall}>
        <Flex className={styles.tableHeader}>
          <Flex flex={2}>
            <Text size={18}>Action</Text>
          </Flex>
          <Flex flex={1}>
            <Text size={18}>Admin</Text>
          </Flex>

          <Flex flex={1}>
            <Text size={18}>Requester</Text>
          </Flex>

          <Flex flex={1}>
            <Text size={18}>Tester</Text>
          </Flex>
        </Flex>

        <Flex row between className={styles.contentSpace}>
          <Flex column>
            <Text size={20} bold="semiBold" className={styles.rightHead}>
              Procedure
            </Text>

            <Text size={16} bold="light" className={styles.rightHead}>
              Control the actions of users under procedure section.
            </Text>
          </Flex>
        </Flex>

        {list.map((res: any) => {
          return (
            <Flex key={res.id} className={styles.tableContent}>
              <Flex flex={2}>
                <Text className={styles.rightHead} size={16}>
                  {res.title}
                </Text>
              </Flex>
              <Flex flex={1}>
                {res.isAdmin ? (
                  <span
                    role="presentation"
                    onClick={() =>
                      handleUpdateRadio(res, "admin", false, "procedure")
                    }
                  >
                    <SvgRadioBox width={size} height={size} />
                  </span>
                ) : (
                  <span
                    role="presentation"
                    onClick={() =>
                      handleUpdateRadio(res, "admin", true, "procedure")
                    }
                  >
                    <SvgRadioOutline width={size} height={size} />
                  </span>
                )}
              </Flex>

              <Flex flex={1}>
                {res.isRequest ? (
                  <span
                    role="presentation"
                    onClick={() =>
                      handleUpdateRadio(res, "request", false, "procedure")
                    }
                  >
                    <SvgRadioBox width={size} height={size} />
                  </span>
                ) : (
                  <span
                    role="presentation"
                    onClick={() =>
                      handleUpdateRadio(res, "request", true, "procedure")
                    }
                  >
                    <SvgRadioOutline width={size} height={size} />
                  </span>
                )}
              </Flex>

              <Flex flex={1}>
                {res.isTest ? (
                  <span
                    role="presentation"
                    onClick={() =>
                      handleUpdateRadio(res, "test", false, "procedure")
                    }
                  >
                    <SvgRadioBox width={size} height={size} />
                  </span>
                ) : (
                  <span
                    role="presentation"
                    onClick={() =>
                      handleUpdateRadio(res, "test", true, "procedure")
                    }
                  >
                    <SvgRadioOutline width={size} height={size} />
                  </span>
                )}
              </Flex>
            </Flex>
          );
        })}

        <Flex row between className={styles.contentSpace}>
          <Flex column>
            <Text size={20} bold="semiBold" className={styles.rightHead}>
              Profile
            </Text>

            <Text size={16} bold="light" className={styles.rightHead}>
              Control the actions of users under profile section.
            </Text>
          </Flex>
        </Flex>

        {profileList.map((res: any) => {
          return (
            <Flex key={res.id} className={styles.tableContent}>
              <Flex flex={2}>
                <Text className={styles.rightHead} size={16}>
                  {res.title}
                </Text>
              </Flex>
              <Flex flex={1}>
                {res.isAdmin ? (
                  <span
                    role="presentation"
                    onClick={() =>
                      handleUpdateRadio(res, "admin", false, "profile")
                    }
                  >
                    <SvgRadioBox width={size} height={size} />
                  </span>
                ) : (
                  <span
                    role="presentation"
                    onClick={() =>
                      handleUpdateRadio(res, "admin", true, "profile")
                    }
                  >
                    <SvgRadioOutline width={size} height={size} />
                  </span>
                )}
              </Flex>

              <Flex flex={1}>
                {res.isRequest ? (
                  <span
                    role="presentation"
                    onClick={() =>
                      handleUpdateRadio(res, "request", false, "profile")
                    }
                  >
                    <SvgRadioBox width={size} height={size} />
                  </span>
                ) : (
                  <span
                    role="presentation"
                    onClick={() =>
                      handleUpdateRadio(res, "request", true, "profile")
                    }
                  >
                    <SvgRadioOutline width={size} height={size} />
                  </span>
                )}
              </Flex>

              <Flex flex={1}>
                {res.isTest ? (
                  <span
                    role="presentation"
                    onClick={() =>
                      handleUpdateRadio(res, "test", false, "profile")
                    }
                  >
                    <SvgRadioBox width={size} height={size} />
                  </span>
                ) : (
                  <span
                    role="presentation"
                    onClick={() =>
                      handleUpdateRadio(res, "test", true, "profile")
                    }
                  >
                    <SvgRadioOutline width={size} height={size} />
                  </span>
                )}
              </Flex>
            </Flex>
          );
        })}
      </Flex>
    </Flex>
  );
};

export default RoleScreen;