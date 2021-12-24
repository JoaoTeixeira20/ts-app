import { createPortal } from 'react-dom';
import { Fragment, ReactElement } from 'react';
import styled from 'styled-components';
import { useState } from 'react';
import { useEffect, useRef } from 'react';

const Wrapper = styled.div`
  --portal-width: 100vw;
  --portal-height: 100vh;
  position: fixed;
  transform-origin: center center;
  top: 50%;
  right: 50%;
  transform: translate(50%, -50%);
  display: flex;
  align-items: center;
  justify-content: center;
  width: var(--portal-width);
  height: var(--portal-height);
  border: 1px solid black;
  background: white;
  transition: all 300ms cubic-bezier(0.07, 0.55, 0.82, 0.45);

  @keyframes slideInFromTop {
    0% {
      transform: translateY(-100%);
      opacity: 0;
    }
    100% {
      transform: translateY(0%);
      opacity: 1;
    }
  }

  &.in-from-top {
    animation: slideInFromTop 0.3s;
  }

  @keyframes slideOutToTop {
    0% {
      transform: translateY(0%);
      opacity: 1;
    }
    100% {
      transform: translateY(-100%);
      opacity: 0;
    }
  }

  &.out-from-top {
    animation: slideOutToTop 0.3s;
  }

  @keyframes slideInFromBottom {
    0% {
      transform: translateY(100%);
      opacity: 0;
    }
    100% {
      transform: translateY(0%);
      opacity: 1;
    }
  }

  &.in-from-bottom {
    animation: slideInFromBottom 0.3s;
  }

  @keyframes slideOutToBottom {
    0% {
      transform: translateY(0%);
      opacity: 1;
    }
    100% {
      transform: translateY(100%);
      opacity: 0;
    }
  }

  &.out-from-bottom {
    animation: slideOutToBottom 0.3s;
  }

  @keyframes slideInFromLeft {
    0% {
      transform: translateX(-100%);
      opacity: 0;
    }
    100% {
      transform: translateX(0%);
      opacity: 1;
    }
  }

  &.in-from-left {
    animation: slideInFromLeft 0.3s;
  }

  @keyframes slideOutToLeft {
    0% {
      transform: translateX(0%);
      opacity: 1;
    }
    100% {
      transform: translateX(-100%);
      opacity: 0;
    }
  }

  &.out-from-left {
    animation: slideOutToLeft 0.3s;
  }

  @keyframes slideInFromRight {
    0% {
      transform: translateX(100%);
      opacity: 0;
    }
    100% {
      transform: translateX(0%);
      opacity: 1;
    }
  }

  &.in-from-right {
    animation: slideInFromRight 0.3s;
  }

  @keyframes slideOutToRight {
    0% {
      transform: translateX(0%);
      opacity: 1;
    }
    100% {
      transform: translateX(100%);
      opacity: 0;
    }
  }

  &.out-from-right {
    animation: slideOutToRight 0.3s;
  }

  @keyframes fadeIn {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }

  &.fade-in {
    animation: fadeIn 0.3s;
  }

  @keyframes fadeOut {
    0% {
      opacity: 1;
    }
    100% {
      opacity: 0;
    }
  }

  &.fade-out {
    animation: fadeOut 0.3s;
  }
`;

type AnimationTypesName =
  | 'fromTop'
  | 'fromBottom'
  | 'fromLeft'
  | 'fromRight'
  | 'fadeIn';

type AnimationClasses = {
  in: string;
  out: string;
};

const AnimationRecord: Record<AnimationTypesName, AnimationClasses> = {
  fromTop: {
    in: 'in-from-top',
    out: 'out-from-top',
  },
  fromBottom: {
    in: 'in-from-bottom',
    out: 'out-from-bottom',
  },
  fromLeft: {
    in: 'in-from-left',
    out: 'out-from-left',
  },
  fromRight: {
    in: 'in-from-right',
    out: 'out-from-right',
  },
  fadeIn: {
    in: 'fade-in',
    out: 'fade-out',
  },
};

type Props = {
  modalState: boolean;
  top?: string;
  left?: string;
  width?: string;
  height?: string;
  children: ReactElement | ReactElement[];
  animation: AnimationTypesName;
};

const Portal = ({
  modalState,
  top,
  left,
  width,
  height,
  children,
  animation,
}: Props): ReactElement => {
  const portalRef = useRef<HTMLDivElement | null>(null);

  const [modalOpen, setmodalOpen] = useState(false);

  useEffect(() => {
    if (!modalState) {
      portalRef.current?.classList.add(AnimationRecord[animation].out);
      setTimeout(() => {
        setmodalOpen(false);
      }, 250);
    } else {
      setmodalOpen(true);
    }
  }, [modalState, animation]);

  return !modalOpen ? (
    <></>
  ) : (
    createPortal(
      <Wrapper
        ref={portalRef}
        className={`${AnimationRecord[animation].in}`}
        style={{ top, left, width, height }}
      >
        {children}
      </Wrapper>,
      document.body
    )
  );
};

export default Portal;
