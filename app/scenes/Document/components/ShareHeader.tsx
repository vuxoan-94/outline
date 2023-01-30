import React from "react";
import styled from "styled-components";
import shareLogo from "./share-logo.png";
import { CodeIcon, DocumentIcon, PromoteIcon } from "outline-icons";
import Tab from "~/components/Tab";
import Tabs from "~/components/Tabs";

type HeaderItem = {
  title: string;
  url: string;
  icon: React.FC<any>;
};

const headerItems: HeaderItem[] = [
  {
    title: "Support Docs",
    url: "/document/support-docs",
    icon: DocumentIcon,
  },
  {
    title: "API Reference",
    url: "/document/api-reference",
    icon: CodeIcon,
  },
  {
    title: "Changelog",
    url: "/document/changelog",
    icon: PromoteIcon,
  },
];

function ShareHeader() {
  return (
    <Wrapper>
      <img src={shareLogo} alt="share-logo" />
      <Tabs>
        {headerItems.map((item, index) => (
          <Tab key={index} to={item.url}>
            <HeaderTabWrapper>
              {item.icon && (
                <IconWrapper>{<item.icon color="currentColor" />}</IconWrapper>
              )}
              {item.title}
            </HeaderTabWrapper>
          </Tab>
        ))}
      </Tabs>
    </Wrapper>
  );
}

const HeaderTabWrapper = styled.div`
  display: inline-flex;
  margin-right: 10px;
  padding: 5px;
`;

const IconWrapper = styled.span`
  margin-left: -4px;
  margin-right: 4px;
  height: 24px;
  overflow: hidden;
  flex-shrink: 0;
`;

const Wrapper = styled.div`
  width: 100%;
  padding: 10px 8px;
  background-color: #1b1b1b;
`;

export default ShareHeader;
