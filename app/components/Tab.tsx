import { dark } from "@shared/styles/theme";
import { m } from "framer-motion";
import * as React from "react";
import styled, { useTheme } from "styled-components";
import NavLink from "~/components/NavLink";

type Props = Omit<React.ComponentProps<typeof NavLink>, "children"> & {
  to: string;
  exact?: boolean;
  useDarkMode?: boolean;
};

const TabLink = styled(NavLink)<{ useDarkMode?: boolean }>`
  position: relative;
  display: inline-flex;
  align-items: center;
  font-weight: 500;
  font-size: 14px;
  cursor: var(--pointer);
  color: ${(props) =>
    props.useDarkMode ? dark.textTertiary : props.theme.textTertiary};
  margin-right: 24px;
  padding: 6px 0;

  &:hover {
    color: ${(props) =>
      props.useDarkMode ? dark.textSecondary : props.theme.textSecondary};
  }
  cursor: pointer;
`;

const Active = styled(m.div)<{ useDarkMode?: boolean }>`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 3px;
  width: 100%;
  border-top-left-radius: 2px;
  border-top-right-radius: 2px;
  background: ${(props) =>
    props.useDarkMode ? dark.textSecondary : props.theme.textSecondary};
`;

const transition = {
  type: "spring",
  stiffness: 500,
  damping: 30,
};

const Tab: React.FC<Props> = ({ children, useDarkMode, ...rest }) => {
  const theme = useTheme();
  const activeStyle = {
    color: useDarkMode ? dark.textSecondary : theme.textSecondary,
  };

  return (
    <TabLink {...rest} useDarkMode activeStyle={activeStyle}>
      {(match) => (
        <>
          {children}
          {match && (
            <Active
              useDarkMode
              layoutId="underline"
              initial={false}
              transition={transition}
            />
          )}
        </>
      )}
    </TabLink>
  );
};

export default Tab;
