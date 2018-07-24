import React from 'react';
import { compact, sortBy } from 'lodash';
import styled from 'styled-components';
import Columns, { Column } from '../../components/shared/Columns';
import StyledLink from '../../components/shared/Link';
import Article from '../../components/tag/Article';
import { Image } from '../../styles/image';

const Issue = ({ issue, issueNumber, textColor }) => {
  const { title, blurb, image } = issue.frontmatter;
  const { articles } = issue.fields;
  const sortedArticles = compact(sortBy(articles, 'frontmatter.order'));

  const issueHash = `#issue-${issueNumber}`;
  const isSelected =
    typeof window !== 'undefined' && window.location.hash === issueHash;
  const arrow = isSelected ? '↑' : '↓';

  return (
    <IssueContainer to={isSelected ? '#' : issueHash} textcolor={textColor}>
      <ColumnsEnd>
        <Column>
          <div>Issue {issueNumber}</div>
          <div>{title}</div>
        </Column>
        <Column>
          <Flex>
            <div>{blurb}</div>
            <div>{arrow}</div>
          </Flex>
        </Column>
      </ColumnsEnd>

      {/* this can be extracted into IssueDetails */}
      {isSelected && (
        <Columns>
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
                />
              ),
            )}
          </Column>
        </Columns>
      )}
    </IssueContainer>
  );
};

export default Issue;

const LeftAlignedImage = styled(Image)`
  margin-left: 0;
  margin-bottom: 16px;
`;

const ColumnsEnd = Columns.extend`
  align-items: flex-end;
  padding: 16px 0;
`;

const IssueContainer = styled(StyledLink)`
  text-decoration: none;
  display: block;
  border-bottom: ${({ textcolor }) => `2px solid ${textcolor}`};
`;

const Flex = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
`;
