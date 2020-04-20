import styled, { css } from 'styled-components';

export const Title = styled.div`
  display: flex;
  flex-direction: column;
  width: 340px;

  input {
    height: 40px;
  }

  .title {
    margin-bottom: 10px;
  }

  .description {
    margin-bottom: 10px;
  }

  .value {
    margin-bottom: 10px;
  }

  .ButtonFile {
    color: #495057;
    width: 350px;
  }
`;

export const Button = styled.div`

 button {
   width: 340px;
   margin-top: -20px;
 }
`;

export const Body = styled.div`
`;

const dragActive = css`
  border-color: #78e5d5;
`;

const dragReject = css`
  border-color: #e57878;
`;

export const DropContainer = styled.div.attrs({
  className: "dropzone"
})`
  border: 1px dashed #ddd;
  border-radius: 4px;
  cursor: pointer;

  transition: height 0.2s ease;

  ${ props => props.isDragActive && dragActive}
  ${ props => props.isDragReject && dragReject}
`;

export const UploadMessage = styled.p``;


export const Wrapper = styled.div`
`;
