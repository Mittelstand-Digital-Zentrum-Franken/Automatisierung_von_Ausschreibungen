import { useDropzone } from 'react-dropzone';

export const CreateDropzoneProps = (type, onDrop) =>
  useDropzone({
    onDrop: (acceptedFiles, rejectedFiles) => onDrop(type)(acceptedFiles, rejectedFiles),
    multiple: type === 'pdf',
    accept: `.${type}`,
  });
