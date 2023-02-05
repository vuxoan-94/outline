import { observer } from "mobx-react";
import * as React from "react";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import Team from "~/models/Team";
import Scrollable from "~/components/Scrollable";
import SearchPopover from "~/components/SearchPopover";
import useStores from "~/hooks/useStores";
import { NavigationNode } from "~/types";
import history from "~/utils/history";
import { homePath, sharedDocumentPath } from "~/utils/routeHelpers";
import TeamLogo from "../TeamLogo";
import Sidebar from "./Sidebar";
import HeaderButton from "./components/HeaderButton";
import Section from "./components/Section";
import DocumentLink from "./components/SharedDocumentLink";
import useMobile from "~/hooks/useMobile";

type Props = {
  team?: Team;
  rootNode: NavigationNode;
  shareId: string;
};

function SharedSidebar({ rootNode, team, shareId }: Props) {
  const { ui, documents, auth } = useStores();
  const { t } = useTranslation();
  const isMobile = useMobile();

  return (
    <Sidebar isMobile={isMobile}>
      {team && (
        <HeaderButton
          title={team.name}
          image={<TeamLogo model={team} size={32} alt={t("Logo")} />}
          onClick={() =>
            history.push(
              auth.user ? homePath() : sharedDocumentPath(shareId, rootNode.url)
            )
          }
        />
      )}
      <ScrollContainer topShadow flex>
        <TopSection>
          <SearchPopover shareId={shareId} />
        </TopSection>
        <Section>
          <DocumentLink
            index={0}
            depth={0}
            shareId={shareId}
            node={rootNode}
            activeDocumentId={ui.activeDocumentId}
            activeDocument={documents.active}
          />
        </Section>
      </ScrollContainer>
    </Sidebar>
  );
}

const ScrollContainer = styled(Scrollable)`
  padding-bottom: 16px;
  &::-webkit-scrollbar {
    width: 10px;
    border-radius: 10px;
  }
  &::-webkit-scrollbar-track {
    background: #f1f1f1;
    border-radius: 10px;
  }
  &::-webkit-scrollbar-thumb {
    background: #b8c0c8;
    border-radius: 10px;
  }
`;

const TopSection = styled(Section)`
  // this weird looking && increases the specificity of the style rule
  &&:first-child {
    margin-top: 16px;
  }

  && {
    margin-bottom: 16px;
  }
`;

export default observer(SharedSidebar);
