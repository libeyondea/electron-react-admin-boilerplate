import classNames from 'classnames';
import ButtonComponent from 'renderer/components/Button/components';
import ImageComponent from 'renderer/components/Image/components';
import { useState } from 'react';

type OnChangeFile = (
  field: string,
  value: File | null,
  shouldValidate?: boolean
) => void;

type OnBlurFile = (
  field: string,
  isTouched?: boolean,
  shouldValidate?: boolean
) => void;

type Props = {
  className?: string;
  onChangeFile: OnChangeFile;
  onBlurFile: OnBlurFile;
  name: string;
  label?: string;
  isHorizontal?: boolean;
  error?: string;
  touched?: boolean;
  imgUrl?: string;
  canDelete?: boolean;
} & React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>;

const ImageFormComponent: React.FC<Props> = ({
  className,
  onChangeFile,
  onBlurFile,
  name,
  label,
  isHorizontal = false,
  error,
  touched = false,
  imgUrl,
  canDelete = false,
  ...props
}) => {
  const [previewImg, setPreviewImg] = useState(imgUrl || '');

  const _onChangeFile = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      setPreviewImg(URL.createObjectURL(files[0]));
      onChangeFile(name, files[0]);
      event.target.value = '';
    }
  };

  const _onBlurFile = () => {
    onBlurFile(name, true);
  };

  const _onRemoveFile = () => {
    onChangeFile(name, null);
    setPreviewImg('');
  };

  return (
    <div
      className={classNames(
        '',
        {
          'flex items-center': isHorizontal,
        },
        className
      )}
    >
      {label && (
        <label
          htmlFor={name}
          className={classNames(
            'inline-block font-medium text-gray-600',
            isHorizontal ? 'mr-1' : 'mb-1'
          )}
        >
          {label}
        </label>
      )}
      <div className="relative">
        <div className="flex items-start">
          {previewImg && (
            <span className="mr-4 inline-block h-20 w-20 rounded-full overflow-hidden">
              <ImageComponent
                className="h-full w-full"
                src={previewImg}
                alt="Image"
              />
            </span>
          )}
          <ButtonComponent className="relative" styleType="secondary">
            <input
              {...props}
              type="file"
              name={name}
              value=""
              onChange={_onChangeFile}
              onBlur={_onBlurFile}
              accept=".png, .jpg, .jpeg .gif"
              className="absolute w-full inset-0 opacity-0"
            />
            Change
          </ButtonComponent>
          {previewImg && canDelete && (
            <ButtonComponent
              className="ml-4"
              styleType="danger"
              onClick={_onRemoveFile}
            >
              Remove
            </ButtonComponent>
          )}
        </div>
      </div>
      {error && touched && (
        <div className="text-red-700 mt-1 text-sm">{error}</div>
      )}
    </div>
  );
};

export default ImageFormComponent;
