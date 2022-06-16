import classNames from 'classnames';
import ButtonComponent from 'renderer/components/Button/components';
import CardComponent from 'renderer/components/Card/components';
import useOnClickOutside from 'renderer/hooks/useClickOutside';
import useLockedScroll from 'renderer/hooks/useLockedScroll';
import { useRef } from 'react';

type Props = {
  className?: string;
  title: string;
  content?: string;
  show: boolean;
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
  onClick?: () => void;
  styleType?: 'success' | 'warning' | 'danger';
};

const ModalComponent: React.FC<Props> = ({
  className,
  title,
  content,
  show,
  setShow,
  onClick,
  styleType = 'success',
}) => {
  const outsideRef = useRef(null);

  useOnClickOutside(outsideRef, () => {
    setShow(false);
  });

  useLockedScroll(show);

  return show ? (
    <div className="h-full w-full fixed overflow-x-hidden overflow-y-auto z-50 top-0 left-0">
      <div className="min-h-full flex items-center py-8 sm:px-16 bg-gray-900/50 z-40 justify-center">
        <CardComponent
          ref={outsideRef}
          className={classNames('sm:max-w-lg z-50', className)}
          title={title}
          onClickClose={() => setShow(false)}
        >
          {content && (
            <p className="text-sm text-gray-500 text-center mb-4">{content}</p>
          )}
          <div className="sm:flex sm:flex-row-reverse">
            <ButtonComponent
              className="w-full sm:w-auto sm:ml-4"
              styleType={styleType}
              onClick={onClick || (() => setShow(false))}
            >
              OK
            </ButtonComponent>
            <ButtonComponent
              className="w-full sm:w-auto mt-4 sm:mt-0"
              styleType="default"
              onClick={() => setShow(false)}
            >
              Cancel
            </ButtonComponent>
          </div>
        </CardComponent>
      </div>
    </div>
  ) : null;
};

export default ModalComponent;
