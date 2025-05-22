import styled, { css } from "styled-components";
import { rem } from "polished";

export const Environments = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
`;

export const EditorContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: ${rem("150px")};
  overflow: hidden;

  ${({ theme }) =>
    theme.isDarkMode &&
    css`
      .monaco-editor {
        --vscode-editorGutter-background: ${theme.colors.gray700};
        --vscode-editor-background: ${theme.colors.gray700};
      }

      .monaco-editor .view-overlays .current-line-exact {
        border-color: ${theme.colors.gray600};
      }
    `};
`;
