import { dark } from "@shared/styles/theme";
import { CodeIcon, DocumentIcon, PromoteIcon } from "outline-icons";
import React from "react";
import styled from "styled-components";
import Tab from "~/components/Tab";
import Tabs from "~/components/Tabs";
import shareLogo from "./niteco-logo.svg";
import breakpoint from "styled-components-breakpoint";

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
      <ShareLogo src={shareLogo} alt="share-logo" />
      <Tabs transparentBackGround>
        {headerItems.map((item, index) => (
          <Tab key={index} to={item.url} useDarkMode>
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

const ShareLogo = styled.img``;

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
  padding: 10px 20px;
  ${breakpoint("desktop")`
    padding: 20px 156px;
    display: flex;
    gap: 120px;
  `}

  ${breakpoint("tablet")`
    padding: 20px 100px;
    display: flex;
    gap: 30px;
  `}
  background: linear-gradient(180deg, ${dark.background}, #4a4a4a);
`;

export default ShareHeader;
