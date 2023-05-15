import React, { memo } from "react";
import { Links, ListContainer, ListText, Listitems } from "./SidebarStyles";
import { Text } from "../../../context/provider";

const List = ({ NavigationList, hideLeftSection }) => {
  return (
    <>
      <ListContainer>
        {NavigationList.map((element, index) => {
          const { to, icon, textId } = element;
          return (
            <>
              <Listitems key={index}>
                <Links
                  key={index}
                  to={to}
                  sx={{ paddingLeft: hideLeftSection ? "13px" : "18px" }}
                >
                  {icon}
                  <ListText
                    key={index}
                    sx={{ display: !hideLeftSection ? "block" : "none" }}
                  >
                    <Text key={index} tid={textId} />
                  </ListText>
                </Links>
              </Listitems>
            </>
          );
        })}
      </ListContainer>
    </>
  );
};
export default memo(List);
