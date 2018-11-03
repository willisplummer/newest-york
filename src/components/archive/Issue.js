import React from 'react';
import { compact, sortBy } from 'lodash';
import styled from 'styled-components';
import Columns, { Column } from '../../components/shared/Columns';
import StyledLink from '../../components/shared/Link';
import Article from '../../components/tag/Article';
import { Image } from '../../styles/image';
import { BORDER_WIDTH } from '../../styles/border-width';

const Issue = ({ issue, issueNumber, textColor }) => {
  const { title, blurb, image } = issue.frontmatter;
  const { articles } = issue.fields;
  const sortedArticles = compact(sortBy(articles, 'frontmatter.order'));

  const issueHash = `#issue-${issueNumber}`;
  const isSelected =
    typeof window !== 'undefined' && window.location.hash === issueHash;
  const arrow = isSelected ? '↑' : '↓';

  return (
    <IssueContainer
      to={isSelected ? '/archive' : `/archive${issueHash}`}
      textcolor={textColor}
    >
      <ColumnsEnd>
        <Column>
          <div>Issue {issueNumber}</div>
          <div>{title}</div>
        </Column>
        <Column>
          <Flex>
            <Blurb>{blurb}</Blurb>
            <div>{arrow}</div>
          </Flex>
        </Column>
      </ColumnsEnd>

      {/* this can be extracted into IssueDetails */}
      <SecondCols isSelected={isSelected}>
        <Column>
          <LeftAlignedImage src={image} />
        </Column>
        <Column>
          {sortedArticles.map(
            ({
              fields: { slug },
              frontmatter: { title: articleTitle, author, subtitle },
            }) => (
              <Article
                key={slug}
                slug={slug}
                title={articleTitle}
                author={author}
                subtitle={subtitle}
                small
              />
            ),
          )}
        </Column>
      </SecondCols>
    </IssueContainer>
  );
};

export default Issue;

const LeftAlignedImage = styled(Image)`
  margin-left: 0;
  margin-top: 40px;
  margin-bottom: 16px;
  max-width: 100%;
  height: auto;
`;

const ColumnsEnd = Columns.extend`
  align-items: flex-end;
  padding: 16px 0;
`;

const IssueContainer = styled(StyledLink)`
  text-decoration: none;
  display: block;
  border-bottom: ${({ textcolor }) => `${BORDER_WIDTH} solid ${textcolor}`};
`;

const Blurb = styled.div`
  padding-right: 12px;
`;

const Flex = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
`;

const SecondCols = styled(Columns)`
  overflow: hidden;
  max-height: 0;
  ${({ isSelected }) => isSelected && 'max-height: 1000px;'};
  transition: max-height 1s ease-in;
  -webkit-transition: max-height 1s; /* Safari */
`;
